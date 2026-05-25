#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PATTERNS_SRC  = path.resolve(__dirname, '../data/patterns.json');
const TEMPLATES_SRC = path.resolve(__dirname, '../data/templates.json');
const PATTERNS_DEST  = path.resolve(__dirname, '../public/data/patterns.json');
const TEMPLATES_DEST = path.resolve(__dirname, '../public/data/templates.json');

// ─────────────────────────────────────────────────────────────────
// PATTERN ENRICHMENTS  (keyed by pattern id)
// ─────────────────────────────────────────────────────────────────

const patternEnrichments = {

  'payment-flow': {
    visualFlow: [
      {
        step: 1,
        screen: 'Insurance History',
        description: 'User confirms their prior insurance history and any claims in the past five years. Pre-populated where data is available. A Warning Alert Banner appears if a declaration may affect eligibility.',
        components: ['Text Input', 'Radio Card', 'Alert Banner', 'Stepper Navigation', 'Progress Banner']
      },
      {
        step: 2,
        screen: 'Finance Details',
        description: 'User selects payment frequency (monthly or annually) and payment method (credit card or direct debit). Monthly is shown first. Total payable is updated immediately on frequency change via an aria-live region.',
        components: ['Radio Card', 'Summary Table', 'Alert Banner', 'Primary Button', 'Secondary Button']
      },
      {
        step: 3,
        screen: 'Contact Details',
        description: 'User confirms or updates their email address and phone number for policy communications. Inline validation on blur. Pre-filled from authenticated member data where available.',
        components: ['Text Input', 'Primary Button', 'Secondary Button', 'Alert Banner']
      },
      {
        step: 4,
        screen: 'Summary',
        description: 'Full review of policy details, cover selections, payment method, and total price before any charge is made. Edit links beside each section allow back-navigation. User must scroll past all content to reach the Confirm button.',
        components: ['Quote Summary Card', 'Summary Table', 'Accordion', 'Primary Button', 'Secondary Button']
      },
      {
        step: 5,
        screen: 'Payment & Confirmation',
        description: 'Secure card or direct debit details entered. On success, a confirmation screen shows the policy number, start date, and next steps. On failure, all entered data is preserved and an Error Alert Banner explains the failure with a retry CTA.',
        components: ['Text Input', 'Primary Button', 'Alert Banner']
      }
    ],
    interactionNotes: [
      'Payment frequency selection immediately updates the displayed total via an aria-live="polite" region — no submit or recalculate button required.',
      'If the user navigates back from the Summary step, all previously entered data must be re-hydrated from state — never clear fields on back-navigation.',
      'The Chat Widget is hidden during the payment entry step (step 5) to reduce abandonment risk; it reappears on the confirmation screen.',
      'If a payment API call fails, the Primary Button returns to its default state, the loading spinner stops, and an Error Alert Banner is injected above the form with role="alert" so screen readers announce it immediately.',
      'The Confirm button on the Summary step must be the only actionable element at the very bottom of the page — no other CTAs should appear below it to prevent accidental non-confirmation scrolling past.'
    ],
    accessibility: 'All form fields must have programmatically associated labels and error messages (htmlFor/id, aria-describedby). Payment method radio cards must be grouped in a fieldset with a legend. Price updates on frequency change must be announced via aria-live="polite". The Confirm button on the Summary screen must not be reachable until the user has scrolled to it on mobile — use intersection-based reveal rather than a fixed CTA to ensure users review the summary. The payment entry screen must not autofocus the card number field on page load on iOS, as this triggers the keyboard and disrupts VoiceOver users. Error states from the payment gateway must set aria-invalid and aria-describedby on affected fields and inject an Alert Banner with role="alert". Post-payment confirmation must include the policy number as a heading so screen readers announce the success context immediately.'
  },

  'form-validation': {
    visualFlow: [
      {
        step: 1,
        screen: 'User fills in field',
        description: 'Field is in its Default state. No validation shown. Placeholder gives format hints where useful (e.g. "DD/MM/YYYY") but the label above is always present.',
        components: ['Text Input', 'Dropdown Select', 'Checkbox']
      },
      {
        step: 2,
        screen: 'User leaves the field (blur)',
        description: 'Validation runs on blur. If valid, the field transitions to Success state (green border + checkmark icon). If invalid, it transitions to Error state (red border + error icon + error message below).',
        components: ['Text Input', 'Dropdown Select', 'Alert Banner']
      },
      {
        step: 3,
        screen: 'User attempts to proceed with errors',
        description: 'All unvalidated required fields are validated immediately. An Error Alert Banner is injected at the top of the form listing each error as an anchor link to the relevant field. Focus moves to the error summary banner.',
        components: ['Alert Banner', 'Text Input', 'Dropdown Select', 'Info Tooltip']
      },
      {
        step: 4,
        screen: 'User corrects errors and re-blurs',
        description: 'Field transitions from Error to Default while typing, then to Success on a valid blur. The error summary banner is removed once all errors are resolved. Focus is not forcibly moved during correction.',
        components: ['Text Input', 'Alert Banner']
      }
    ],
    interactionNotes: [
      'Validation must trigger on blur (focusout), not on input or change events — triggering on input interrupts the user mid-keystroke and creates an anxiety-inducing stream of error messages.',
      'The error message text must be specific and actionable: "Enter a valid email address (e.g. name@example.com)" not just "Invalid input".',
      'Required fields must be identified visually with an asterisk (*) and a legend "* Required fields" at the top of the form — do not rely on aria-required alone.',
      'Do not clear field values on error — the user\'s input must be preserved so they can correct it rather than re-enter the whole value.',
      'When the error summary Alert Banner is injected, focus must be programmatically moved to it so keyboard and screen reader users are immediately aware of the errors without having to navigate the page.'
    ],
    accessibility: 'Each field\'s error message must be linked via aria-describedby so it is announced when the field receives focus. Fields in error state must have aria-invalid="true". The error summary Alert Banner must use role="alert" and be injected into the DOM after the submit attempt so it triggers immediate announcement — do not use a pre-existing hidden element that is simply unhidden, as some screen readers do not re-announce static role="alert" elements. Anchor links inside the error summary must scroll to and focus the relevant field. Success states (green border + checkmark) must not rely on colour alone — the checkmark icon provides shape-based differentiation for colour-blind users. Never auto-advance to the next field on valid input — allow the user to Tab naturally. Checkbox error messages must be linked via aria-describedby on the input element, not just the wrapper.'
  },

  'progressive-disclosure': {
    visualFlow: [
      {
        step: 1,
        screen: 'Page loads with complex form',
        description: 'Primary form fields are visible. Supplementary explanations and non-essential detail sections are in collapsed Accordion rows or hidden behind Info Tooltip triggers. Mascot Tip (Quote to Buy only) is visible beside the most complex decision field.',
        components: ['Text Input', 'Dropdown Select', 'Accordion', 'Info Tooltip', 'Mascot Tip']
      },
      {
        step: 2,
        screen: 'User triggers disclosure (Accordion open)',
        description: 'User clicks an Accordion header to expand supplementary content (e.g. "About your home — review" or "Key information" inside a Cover Option Card). Content animates open below the header. aria-expanded changes to true. Other Accordions remain in their current state.',
        components: ['Accordion', 'Cover Option Card', 'Summary Table']
      },
      {
        step: 3,
        screen: 'User triggers inline tooltip',
        description: 'User clicks or focuses the Info Tooltip trigger (i) icon beside a form label. A popover appears with a brief explanation (max 60 words). Pressing Escape or clicking outside dismisses it and returns focus to the trigger.',
        components: ['Info Tooltip', 'Text Input', 'Dropdown Select']
      },
      {
        step: 4,
        screen: 'User engages with Mascot Tip (Quote to Buy)',
        description: 'Mascot Tip is visible statically next to the relevant field — it does not require interaction to read. It provides proactive guidance before the user makes an uncertain decision (e.g. "Not sure of your sum insured? We recommend…").',
        components: ['Mascot Tip', 'Radio Card', 'Text Input']
      }
    ],
    interactionNotes: [
      'Never hide content that the user is required to read in order to complete the step — progressive disclosure is for supplementary, not mandatory, information.',
      'Accordion panels that are open by default should be limited to one per page section; most should start closed to reduce initial cognitive load.',
      'Info Tooltips must open on both hover and keyboard focus — CSS :hover-only implementations are not acceptable.',
      'Mascot Tips are static (always visible when on screen) — they do not open or close; use Info Tooltip for on-demand disclosure instead.',
      'When an Accordion is opened, do not scroll the page or move focus into the opened content — only the toggle button should receive focus during the interaction.'
    ],
    accessibility: 'All Accordion toggles must be <button> elements with aria-expanded and aria-controls attributes pointing to their content panel id. Collapsed panels must use display:none so their content is fully removed from the Tab order and accessibility tree. Info Tooltip content must be reachable by keyboard (trigger focusable, Escape to close) and the popover must have role="tooltip" or role="dialog" depending on whether it contains interactive content. Mascot Tip text must be present in the DOM and accessible to screen readers — the illustration is decorative (aria-hidden). Progressive disclosure must not be used as a mechanism to hide content that WCAG Success Criterion 1.3.1 (Info and Relationships) requires to be perceivable — structure, instructions, and required fields must always be exposed.'
  },

  'multi-step-navigation': {
    visualFlow: [
      {
        step: 1,
        screen: 'Step entry — all steps visible',
        description: 'The Stepper Navigation sidebar shows all 5 steps. Current step has dark number circle and bold label. Completed steps (if any) show green checkmarks and are clickable links. Upcoming steps are grey and non-interactive. Progress Banner at top shows "Step X of 5 — [Step Title]".',
        components: ['Stepper Navigation', 'Progress Banner', 'Primary Button']
      },
      {
        step: 2,
        screen: 'User completes current step',
        description: 'User fills in all required fields and activates the Primary Button ("Next"). Client-side validation runs; if errors exist, the error summary is shown and navigation is blocked. If all fields are valid, the current step\'s state transitions to completed (green checkmark) and the next step loads.',
        components: ['Primary Button', 'Secondary Button', 'Alert Banner', 'Stepper Navigation']
      },
      {
        step: 3,
        screen: 'User navigates back to a completed step',
        description: 'User clicks a completed step in the Stepper Navigation. The application navigates back, pre-populating all fields from state. The clicked step transitions from completed (green) to current (dark number). The steps that were after the navigated-to step revert to upcoming (grey) only if the user\'s edit would invalidate them.',
        components: ['Stepper Navigation', 'Text Input', 'Radio Card', 'Dropdown Select']
      },
      {
        step: 4,
        screen: 'Mobile — step counter bar',
        description: 'On mobile viewports the sidebar collapses. A compact step counter bar replaces it at the top of the content area, below the Progress Banner, showing "Step X of 5" and a horizontal progress track. Users cannot back-navigate via the counter bar — the Secondary Button ("Back") handles back-navigation on mobile.',
        components: ['Progress Banner', 'Primary Button', 'Secondary Button']
      },
      {
        step: 5,
        screen: 'Final step — action changes',
        description: 'On the final step the Primary Button label changes from "Next" to the specific terminal action (e.g. "Get my quote", "Continue to purchase"). This signals to the user that the step completes the flow phase rather than advancing to another step.',
        components: ['Primary Button', 'Secondary Button', 'Quote Summary Card']
      }
    ],
    interactionNotes: [
      'Clicking a future (upcoming grey) step must do nothing — it must not navigate forward, as future steps may depend on current-step data that has not yet been collected.',
      'The Progress Banner title must match the Stepper Navigation label for the current step exactly — inconsistent labels create orientation confusion.',
      'On step transition, focus must move to the top of the new page content (the Progress Banner h1 or the first form field) so keyboard and screen reader users know a new step has loaded.',
      'All form state must be persisted in application memory for the lifetime of the session — back-navigating to a completed step must never show a blank form.',
      'The Back Secondary Button must not require re-validation of the current step — allow the user to navigate back even if the current step has invalid or incomplete data.'
    ],
    accessibility: 'The Stepper Navigation must use a <nav aria-label="Progress"> landmark. The active step must have aria-current="step". Completed steps must be <a> or <button> elements in the Tab order; upcoming steps must be excluded from the Tab order (aria-disabled or plain <span>). On step transition in a SPA, focus must be explicitly moved to the new page heading — do not rely on the browser\'s default scroll behaviour for screen reader orientation. The Progress Banner h1 must be updated on each step transition; if it uses an aria-live region rather than a fresh render, use aria-live="polite" to announce the new step name. The mobile step counter bar must include accessible text equivalent to "Step X of 5" — do not rely solely on the visual progress track width to communicate position.'
  },

  'dashboard-layout': {
    visualFlow: [
      {
        step: 1,
        screen: 'Dashboard loads',
        description: 'Authenticated member lands on the My Account home page. The Sidebar Navigation is visible on the left with "My Account home" active. The Member Info Card at the top of the content area greets the user by name and shows their member number (masked), member since year, and savings.',
        components: ['Header Bar', 'Sidebar Navigation', 'Member Info Card', 'Breadcrumb']
      },
      {
        step: 2,
        screen: 'Product grid',
        description: 'Below the Member Info Card, the member\'s products are displayed in a 2-column Product Card grid. Cards are ordered Road Service first, then Insurance policies. Each card shows the product icon, name, policy/product number, and a View details button.',
        components: ['Product Card', 'Secondary Button']
      },
      {
        step: 3,
        screen: 'Quick actions',
        description: 'Below the product grid, 4 Quick Action Cards provide single-tap shortcuts to the most common account tasks: Change payment details, Update contact details, Make a claim, See competitions. Cards are in a 2-column grid on desktop, single column on mobile.',
        components: ['Quick Action Card']
      },
      {
        step: 4,
        screen: 'Cross-sell and contact',
        description: 'A single Promo Banner below the quick actions advertises a relevant product the member does not yet hold (e.g. Car Insurance if they hold Road Service only). The Contact Section closes the page, offering all support channels.',
        components: ['Promo Banner', 'Contact Section']
      }
    ],
    interactionNotes: [
      'The Sidebar Navigation must remain visible and sticky on all My Account pages on desktop — it must not collapse, auto-hide, or scroll off screen.',
      'Product Cards must never show cross-sell content — they are exclusively for products the authenticated member currently holds.',
      'The Promo Banner must be targeted: do not advertise a product the member already holds. If all eligible cross-sell opportunities are exhausted, the Promo Banner slot is left empty rather than showing a generic advertisement.',
      'Quick Action Card order is fixed by task frequency data — do not change the order without a data-backed rationale.',
      'Member number masking defaults to hidden on load; the reveal action is per-session and does not persist across page refreshes.'
    ],
    accessibility: 'The page must have a logical heading hierarchy: h1 for the page title ("My Account"), h2 for major sections ("Your products", "Quick actions"). The Sidebar Navigation must be a <nav aria-label="Account navigation"> landmark distinct from the header <nav>. Product Card grids must use a <ul> or grid role with appropriate labelling so screen readers announce the number of products. The Member Info Card masked member number must have an accessible label ("Member number, hidden — activate to reveal") so screen readers do not literally announce the masking characters. Quick Action Card links must each have unique accessible names including the specific action, not just "Learn more". The Promo Banner CTA must not be the only way to discover the promoted product — it is supplementary to the main navigation. The Contact Section phone numbers must be tel: links.'
  }
};

// ─────────────────────────────────────────────────────────────────
// TEMPLATE ENRICHMENTS  (keyed by template id)
// ─────────────────────────────────────────────────────────────────

const templateEnrichments = {

  'quote-step-page': {
    layoutSpecs: {
      maxWidth: '960px',
      columns: '3',
      gutter: '24px',
      margin: '24px (desktop), 16px (mobile)',
      contentArea: '640px max-width, centred in the space right of the stepper',
      sidebarWidth: '200px (Stepper Navigation, left-fixed)'
    },
    responsiveBehavior: [
      {
        breakpoint: 'Desktop (≥1024px)',
        layout: '3-column: 200px Stepper Navigation | 640px form content (centred) | optional right gutter for Mascot Tip. Progress Banner full-width above all columns. All Stepper steps visible.'
      },
      {
        breakpoint: 'Tablet (768px–1023px)',
        layout: '2-column: Stepper Navigation collapses to a 60px icon-only sidebar OR is hidden behind a toggle. Form content expands to fill available space up to 640px. Mascot Tip moves below its related form field. Progress Banner full-width.'
      },
      {
        breakpoint: 'Mobile (<768px)',
        layout: 'Single column. Stepper Navigation replaced by a compact step-counter bar (Step X of 5 + horizontal track) pinned below the Progress Banner. Form content full viewport width with 16px horizontal margin. Mascot Tip appears inline above the relevant field. Primary/Secondary buttons full-width at bottom of viewport.'
      }
    ],
    pageComposition: [
      {
        zone: 'Page Header',
        components: ['Header Bar'],
        description: 'Quote Flow variant of Header Bar — RAA logo left, "Home Insurance Quote" centred, "Need help" link and icon right. Fixed at top, 64px height. Chat Widget absent during payment entry step.'
      },
      {
        zone: 'Progress Banner',
        components: ['Progress Banner'],
        description: 'Full-width yellow (#FFD100) banner directly below the Header Bar. Shows "Step X of 5" and the current step title as h1. 112px height. Padding 32px 0.'
      },
      {
        zone: 'Navigation Sidebar',
        components: ['Stepper Navigation'],
        description: '200px fixed left column below the Progress Banner. Shows all 5 steps: completed (green checkmark, clickable), current (dark number, current), upcoming (grey, non-interactive). Vertical connector lines between steps.'
      },
      {
        zone: 'Form Content Area',
        components: ['Text Input', 'Dropdown Select', 'Radio Card', 'Checkbox', 'Toggle Switch', 'Alert Banner', 'Info Tooltip', 'Mascot Tip'],
        description: 'Centred content column, max-width 640px. Single-column form layout. Alert Banners appear inline at the point of relevance. Mascot Tip positioned right of or below the most complex field. Form ends with Primary Button (right-aligned) and optional Secondary Button ("Back", left-aligned).'
      },
      {
        zone: 'Page Footer',
        components: ['Footer'],
        description: 'Application Footer variant — single row with Privacy Policy, Cookie Policy, Terms and Conditions links and copyright. Not sticky — scrolls with page content.'
      }
    ]
  },

  'my-account-page': {
    layoutSpecs: {
      maxWidth: '1200px',
      columns: '4 (sidebar + 3 content columns)',
      gutter: '24px',
      margin: '32px (desktop), 16px (mobile)',
      contentArea: 'Flexible: viewport width minus 240px sidebar minus 32px margin each side',
      sidebarWidth: '240px (Sidebar Navigation, left-fixed, full height)'
    },
    responsiveBehavior: [
      {
        breakpoint: 'Desktop (≥1024px)',
        layout: '2-region split: 240px fixed Sidebar Navigation on the left, flexible content area on the right. Header Bar fixed top. Breadcrumb at top of content area. Product Cards in 2-column grid. Quick Action Cards in 2-column grid.'
      },
      {
        breakpoint: 'Tablet (768px–1023px)',
        layout: 'Sidebar Navigation collapses to a hamburger menu (≡) icon in the Header Bar area. Tapping opens the sidebar as a full-height overlay panel with a close (×) button. Content area expands to full width. Product Cards remain 2-column. Breadcrumb simplifies to back arrow + parent page name.'
      },
      {
        breakpoint: 'Mobile (<768px)',
        layout: 'Single column. Sidebar Navigation is a hamburger overlay (same as tablet). Content area is full viewport width with 16px margin. Product Cards stack to 1 column. Quick Action Cards stack to 1 column. Promo Banner stacks text above image. Contact Section rows stack vertically.'
      }
    ],
    pageComposition: [
      {
        zone: 'Page Header',
        components: ['Header Bar'],
        description: 'My Account variant of Header Bar — RAA logo left, "My Account" label, "Need help" link and "Log out" button right. Fixed top, 64px height. On mobile/tablet: hamburger menu icon added left of logo to trigger sidebar overlay.'
      },
      {
        zone: 'Navigation Sidebar',
        components: ['Sidebar Navigation'],
        description: '240px wide, full-height sticky sidebar. Top-level sections: My Account home, My details, My products, My claims, My member benefits. Collapsible sub-sections with chevron toggles. Active item highlighted with 3px left border. Hidden on mobile/tablet (replaced by hamburger overlay).'
      },
      {
        zone: 'Content Header',
        components: ['Breadcrumb'],
        description: 'Breadcrumb trail at the top of the content area below the Header Bar. Shows full path from My Account home to the current page. Omitted on the My Account home page itself. Home icon links to dashboard.'
      },
      {
        zone: 'Main Content',
        components: ['Member Info Card', 'Product Card', 'Quick Action Card', 'Promo Banner', 'Accordion', 'Alert Banner', 'Summary Table', 'Contact Section'],
        description: 'Flexible content area. Dashboard home: Member Info Card → Product Card grid → Quick Action Card grid → Promo Banner → Contact Section. Sub-pages: page heading (h1) → relevant content components → Contact Section at bottom.'
      },
      {
        zone: 'Page Footer',
        components: ['Footer'],
        description: 'Application Footer variant. Single row with legal links and copyright. Sticks below all content, not fixed to viewport.'
      }
    ]
  },

  'quote-result-page': {
    layoutSpecs: {
      maxWidth: '960px',
      columns: '3',
      gutter: '24px',
      margin: '24px (desktop), 16px (mobile)',
      contentArea: '640px max-width centred in the space right of the stepper',
      sidebarWidth: '200px (Stepper Navigation, left-fixed)'
    },
    responsiveBehavior: [
      {
        breakpoint: 'Desktop (≥1024px)',
        layout: '3-column: 200px Stepper Navigation | content column (Quote Summary Card, Coverage Grid, Cover Option Cards, action buttons). Progress Banner full-width. Quote Summary Card is the hero element at the top of the content column. Coverage Grid is 3 columns within the content column.'
      },
      {
        breakpoint: 'Tablet (768px–1023px)',
        layout: 'Stepper Navigation collapses to icon-only or hidden behind toggle. Content column expands. Quote Summary Card and Coverage Grid remain side-by-side where space allows; Coverage Grid drops to 2-column. Cover Option Cards remain full-width stacked.'
      },
      {
        breakpoint: 'Mobile (<768px)',
        layout: 'Single column. Stepper replaced by step-counter bar. Quote Summary Card full-width with monthly price prominent. Coverage Grid collapses to 2-column or single column. Cover Option Cards full-width stacked. Buy now / Save quote buttons full-width, stacked vertically (Buy now on top).'
      }
    ],
    pageComposition: [
      {
        zone: 'Page Header',
        components: ['Header Bar'],
        description: 'Quote Flow variant. Same as all Quote to Buy steps. Chat Widget visible on this page (reappears after being hidden during payment entry).'
      },
      {
        zone: 'Progress Banner',
        components: ['Progress Banner'],
        description: 'Shows "Step 5 of 5 — Your quote". Yellow full-width banner. The page h1 is "Your quote". The final step in the quote sub-flow before the purchase sub-flow begins.'
      },
      {
        zone: 'Navigation Sidebar',
        components: ['Stepper Navigation'],
        description: '200px fixed left column. Step 5 (Your quote) is the current step. Steps 1–4 are completed (green checkmarks, clickable to navigate back). No upcoming steps in this sub-flow — the stepper shows all 5 as either completed or current.'
      },
      {
        zone: 'Quote Content',
        components: ['Quote Summary Card', 'Coverage Grid', 'Cover Option Card', 'Summary Table', 'Accordion', 'Alert Banner'],
        description: 'Centred content column, max-width 640px. Order: (1) Quote Summary Card with pricing and policy details; (2) Coverage Grid showing included cover items in 3-column layout; (3) Cover Option Cards for Accidental Damage Cover and Pet Cover (defaulted off); (4) Optional Summary Table for excess details; (5) Accordion for full PDS and key information. Alert Banners for coverage limitations appear inline after relevant selections.'
      },
      {
        zone: 'Action Bar',
        components: ['Primary Button', 'Secondary Button'],
        description: 'Bottom of content column. Primary Button: "Buy now" (right-aligned on desktop, full-width on mobile). Secondary Button: "Save quote" or "Email this quote to myself" (left-aligned on desktop, full-width below Primary on mobile). 32px top margin from last content element.'
      }
    ]
  }
};

// ─────────────────────────────────────────────────────────────────
// APPLY ENRICHMENTS
// ─────────────────────────────────────────────────────────────────

const patternsData = JSON.parse(fs.readFileSync(PATTERNS_SRC, 'utf8'));
let pEnriched = 0;
patternsData.patterns = patternsData.patterns.map(p => {
  if (patternEnrichments[p.id]) {
    pEnriched++;
    return { ...p, ...patternEnrichments[p.id] };
  }
  return p;
});
console.log(`Enriched ${pEnriched} patterns.`);

const templatesData = JSON.parse(fs.readFileSync(TEMPLATES_SRC, 'utf8'));
let tEnriched = 0;
templatesData.templates = templatesData.templates.map(t => {
  if (templateEnrichments[t.id]) {
    tEnriched++;
    return { ...t, ...templateEnrichments[t.id] };
  }
  return t;
});
console.log(`Enriched ${tEnriched} templates.`);

// Write back
fs.writeFileSync(PATTERNS_SRC, JSON.stringify(patternsData, null, 2), 'utf8');
console.log(`Written: ${PATTERNS_SRC}`);
fs.writeFileSync(TEMPLATES_SRC, JSON.stringify(templatesData, null, 2), 'utf8');
console.log(`Written: ${TEMPLATES_SRC}`);

// Copy to public/data
const publicDataDir = path.resolve(__dirname, '../public/data');
if (!fs.existsSync(publicDataDir)) fs.mkdirSync(publicDataDir, { recursive: true });
fs.copyFileSync(PATTERNS_SRC, PATTERNS_DEST);
console.log(`Copied to: ${PATTERNS_DEST}`);
fs.copyFileSync(TEMPLATES_SRC, TEMPLATES_DEST);
console.log(`Copied to: ${TEMPLATES_DEST}`);

// Build
console.log('Building...');
execSync('npm run build', { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });
console.log('Build complete.');

// Commit and push
execSync('git add data/patterns.json data/templates.json public/data/patterns.json public/data/templates.json', {
  cwd: path.resolve(__dirname, '..'), stdio: 'inherit'
});
execSync('git commit -m "Data enrichment batch 4: patterns and templates"', {
  cwd: path.resolve(__dirname, '..'), stdio: 'inherit'
});
console.log('Committed.');
execSync('git push', { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });
console.log('Pushed.');
