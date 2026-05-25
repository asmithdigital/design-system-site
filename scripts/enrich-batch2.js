#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SRC = path.resolve(__dirname, '../data/components.json');
const DEST = path.resolve(__dirname, '../public/data/components.json');

const enrichments = {
  'Header Bar': {
    usage: 'The Header Bar is required on every page of every RAA web application — it is never optional. Choose the variant based on application context: Public Site for unauthenticated marketing pages, Quote Flow for the insurance quote journey, and My Account for authenticated account management. Never mix variants on the same user journey — once the Quote Flow header is shown, it persists throughout the entire quote until the confirmation page. Content within the header must not be customised per-page beyond what the three variants define; page-level navigation belongs in Sidebar Navigation or Breadcrumb. The "Need help" link in the Quote and My Account headers must always link to the current contextual support page, not a generic help centre.',
    accessibility: 'The Header Bar must be wrapped in a <header> element with role="banner" so it is recognised as a page landmark by screen readers. The RAA logo must be an <a> element linking to the homepage with an accessible label such as "RAA — return to homepage" since the image alt text alone may be insufficient. All navigation links must be reachable via keyboard Tab and activated via Enter. Dropdown menus in the Public Site variant must implement the ARIA disclosure or menubar pattern with aria-haspopup and aria-expanded on the trigger. The 64px header height ensures adequate touch targets for all interactive elements. The "Log out" button must announce its action clearly to screen readers. If the header is sticky or fixed, ensure it does not obscure focused elements by accounting for its height in scroll-padding-top or focus management. Test skip-navigation link placement so keyboard users can bypass the header to reach main content.',
    anatomy: [
      { part: 'Header container', description: '64px height, full viewport width, white (#FFFFFF) background, position sticky top-0, z-index above page content. No bottom border in default state.' },
      { part: 'RAA logo', description: '32px height, auto width, left-aligned with 24px left padding. Wrapped in an <a> linking to homepage. Alt text: "RAA".' },
      { part: 'Primary navigation (Public Site)', description: 'Centred horizontal list of top-level nav items (Membership, Motor, Home, Travel). 16px Regular, #1A1A1A. Spacing: 32px between items.' },
      { part: 'Context label (Quote/My Account)', description: '"Home Insurance Quote" or "My Account" — 16px Medium, #1A1A1A, centred. Replaces primary nav in application variants.' },
      { part: 'Right action cluster', description: 'Right-aligned group: "Contact Us" dropdown + search icon + account icon (Public Site); "Need help" text link + help icon (Quote Flow); "Need help" + "Log out" button (My Account). 24px right padding.' },
      { part: 'Dropdown menus', description: 'White background, 1px #E5E7EB border, 8px border radius, box-shadow. Opens on click/Enter. Minimum 160px width.' }
    ],
    states: [
      { state: 'Default', description: 'Standard resting state for all variants.', background: '#FFFFFF', border: 'none', textColor: '#1A1A1A' },
      { state: 'Nav item hover', description: 'Underline appears on hovered navigation link.', background: '#FFFFFF', border: 'none (underline on text)', textColor: '#1A1A1A' },
      { state: 'Nav item focus', description: 'Keyboard focus ring on the nav item.', background: '#FFFFFF', border: '2px solid #1A1A1A focus ring', textColor: '#1A1A1A' },
      { state: 'Dropdown open', description: 'Dropdown panel visible below the trigger. Trigger has active underline.', background: '#FFFFFF', border: '1px solid #E5E7EB (dropdown)', textColor: '#1A1A1A' },
      { state: 'Scrolled', description: 'Subtle box-shadow added when page is scrolled to visually separate header from content.', background: '#FFFFFF', border: 'box-shadow: 0 2px 8px rgba(0,0,0,0.08)', textColor: '#1A1A1A' }
    ],
    dosDonts: [
      { type: 'do', text: 'Include a visible skip-to-main-content link as the first focusable element for keyboard users.' },
      { type: 'do', text: 'Use the correct header variant for the application context — Public Site, Quote Flow, or My Account.' },
      { type: 'dont', text: 'Don\'t add custom navigation items or branding elements to the Quote Flow or My Account header variants — they are intentionally minimal.' },
      { type: 'dont', text: 'Don\'t remove the Header Bar from any page — it is a mandatory chrome element across all RAA web products.' },
      { type: 'dont', text: 'Don\'t open dropdowns on hover alone — require a click or Enter keypress to open, preventing accidental activation on mouse-over.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=3:100'
  },

  'Footer': {
    usage: 'The Footer is required on every page of every RAA web product. Use the Public Site variant on all unauthenticated marketing and public-facing pages, and the Application (simplified) variant on all pages within Quote to Buy, My Account, Renewals, and Claims. The Application footer must always include Privacy Policy, Cookie Policy, and Terms and Conditions links plus the current copyright year — update the year programmatically, never hard-code it. The Public Site footer must list all main product categories with their sub-links to support SEO discoverability. Do not place promotional content inside the footer; use Promo Banner within the main content area instead.',
    accessibility: 'The Footer must be wrapped in a <footer> element with role="contentinfo" so it is identified as the page\'s content-info landmark by screen readers. All footer links must have visible underlines or sufficient colour contrast to distinguish them from surrounding text — rely on underline rather than colour alone, as colour-blind users may not distinguish styled links from body text. External links must include an aria-label or visually hidden text indicating they open in a new tab, plus the external link icon. Phone numbers must use <a href="tel:..."> so mobile users can tap to call and screen readers announce them as callable links. The copyright paragraph colour (#6B7280 on #F4F4F4) achieves approximately 4.7:1 contrast, meeting WCAG AA. Social media icon links must have accessible labels describing the destination ("RAA on Facebook"), not just the icon name.',
    anatomy: [
      { part: 'Footer container', description: 'Full viewport width, #F4F4F4 background. Public Site: multi-row layout with 64px top padding, 32px bottom padding. Application: single-row, 24px vertical padding.' },
      { part: 'Category columns (Public Site)', description: '4-column grid (Membership, Motor, Home, Travel). Column heading: 14px Semi Bold, #1A1A1A. Links: 14px Regular, #1A1A1A, 8px vertical gap.' },
      { part: 'Legal link row', description: 'Horizontal list of links (Privacy Policy, Cookie Policy, Terms and Conditions). 14px Regular, #1A1A1A, 24px gap between items. Underlined.' },
      { part: 'Copyright text', description: '"© [year] RAA. All rights reserved." 14px Regular, #6B7280, right-aligned (Public Site) or centred (Application).' },
      { part: 'Social icons (Public Site)', description: '24px icon per platform, left-aligned in bottom row, 16px gap. Wrapped in <a> with accessible label.' },
      { part: 'Divider line', description: '1px solid #E5E7EB horizontal rule separating the link columns from the bottom legal row.' }
    ],
    states: [
      { state: 'Default', description: 'Standard resting footer.', background: '#F4F4F4', border: 'none', textColor: '#1A1A1A' },
      { state: 'Link hover', description: 'Underline darkens or colour shifts on hover.', background: '#F4F4F4', border: 'none', textColor: '#000000' },
      { state: 'Link focus', description: 'Focus ring visible on keyboard navigation.', background: '#F4F4F4', border: '2px solid #1A1A1A focus ring', textColor: '#1A1A1A' }
    ],
    dosDonts: [
      { type: 'do', text: 'Render the copyright year dynamically so it stays current without manual updates.' },
      { type: 'do', text: 'Use underlined links inside the footer — colour alone is insufficient for accessibility.' },
      { type: 'dont', text: 'Don\'t hard-code the copyright year — it will inevitably become stale.' },
      { type: 'dont', text: 'Don\'t use the Public Site footer in application flows (Quote, My Account) — it adds visual noise and competes with task completion.' },
      { type: 'dont', text: 'Don\'t place essential content or calls to action in the footer — users may not scroll that far, especially on mobile.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=3:200'
  },

  'Product Card': {
    usage: 'Use Product Card to display each insurance policy or membership product a member holds in My Account. Each card represents one product and always includes the product\'s icon, product name, policy/product number, and a View details Secondary Button. Arrange cards in a responsive grid: two columns on desktop and tablet, single column on mobile. Do not use Product Card for products the member does not hold — use a promotional Feature Card or Promo Banner for cross-sell opportunities. Cards are non-clickable as a whole; only the View details button navigates to the product detail page, which allows assistive technology users to have a single, clearly-labelled action.',
    accessibility: 'Each Product Card should be a semantic grouping element — use <article> or a <section> with an aria-labelledby pointing to the product name heading so screen readers identify each card as a distinct item. The View details button must have an accessible label that includes the product name, e.g. "View details for Home and Contents Insurance" — the visible label "View details" is insufficient when multiple cards are on screen and would be announced identically by screen readers. The product icon must have a meaningful alt text (e.g. "Home insurance icon") or be aria-hidden if the product name text is immediately adjacent. The 40px icon size and 24px button height meet the minimum 44px touch target when the card\'s padding is included in the interactive area. Policy numbers displayed must not include aria-label masking that prevents copying — users may need to reference their number. Contrast for subtitle text (#6B7280 on white) is 4.6:1, meeting WCAG AA.',
    anatomy: [
      { part: 'Card container', description: 'White background, 1px solid #E5E7EB border, 12px border radius, 20px 24px padding. Full column width in the grid.' },
      { part: 'Product icon', description: '40×40px, coloured SVG icon representing the product type (road service, home, car). Positioned top-left of the content area.' },
      { part: 'Product name', description: '16px Bold, #1A1A1A. E.g. "Home and Contents Insurance", "RAA Road Service Premium". 8px below icon.' },
      { part: 'Product/policy number', description: '14px Regular, #6B7280. E.g. "Policy: 123456789". 4px below name.' },
      { part: 'View details button', description: 'Secondary Button (Small variant), 36px height, label "View details". Positioned bottom-right of card or below product info. aria-label includes product name.' }
    ],
    states: [
      { state: 'Default', description: 'Resting card showing product information.', background: '#FFFFFF', border: '1px solid #E5E7EB', textColor: '#1A1A1A' },
      { state: 'Button hover', description: 'View details button shows hover state; card background does not change.', background: '#FFFFFF', border: '1px solid #E5E7EB', textColor: '#1A1A1A' },
      { state: 'Button focus', description: 'Focus ring on the View details button only.', background: '#FFFFFF', border: '1px solid #E5E7EB (card) + 2px solid #1A1A1A focus ring (button)', textColor: '#1A1A1A' },
      { state: 'Loading', description: 'Skeleton placeholder while product data loads — icon, text rows, and button replaced with grey shimmer shapes.', background: '#F3F4F6 (shimmer)', border: '1px solid #E5E7EB', textColor: 'n/a' }
    ],
    dosDonts: [
      { type: 'do', text: 'Give the View details button an accessible label that includes the product name to differentiate multiple cards for screen reader users.' },
      { type: 'do', text: 'Use <article> or <section> with aria-labelledby to make each card a distinct landmark.' },
      { type: 'dont', text: 'Don\'t make the entire card clickable — use only the View details button as the interactive element.' },
      { type: 'dont', text: 'Don\'t use Product Card for cross-sell promotions — use Feature Card or Promo Banner instead.' },
      { type: 'dont', text: 'Don\'t hard-code policy numbers — always render them from the authenticated data source.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=3:300'
  },

  'Quick Action Card': {
    usage: 'Use Quick Action Card on the My Account home page to surface the most common member tasks as a scannable grid of shortcuts (Change payment details, Update contact details, Make a claim, See competitions). Present 4–6 cards maximum per group — more than that indicates the design needs a dedicated section rather than shortcuts. The card is entirely clickable and navigates to the task destination. Do not use Quick Action Card for tasks that require a modal or overlay to complete — use a full-page flow instead. Arrange cards in a 2-column grid on desktop and a single column on mobile, ordered by task frequency.',
    accessibility: 'Because the entire Quick Action Card is a link, it must be wrapped in an <a> element with an accessible label that includes both the title and enough context to be unambiguous out of context. The icon is decorative (aria-hidden) since the title text carries the meaning. The 16px card title plus 24px icon must together create a visible, well-spaced layout; the overall card must be at least 44px tall to meet minimum touch target requirements. Link hover and focus states must be visually distinct from the resting state — use background colour change or border rather than underline alone on card components. The 14px subtitle text colour (#6B7280 on white) achieves 4.6:1 contrast, meeting WCAG AA. Ensure that keyboard Tab order visits cards in visual reading order (left to right, top to bottom).',
    anatomy: [
      { part: 'Card container', description: 'White background, 1px solid #E5E7EB border, 8px border radius, 16px 20px padding. Full column width. Entire card is an <a> element.' },
      { part: 'Icon', description: '24×24px icon, #1A1A1A or brand colour, left-aligned, vertically centred with text. aria-hidden.' },
      { part: 'Title', description: '14px Semi Bold, #1A1A1A, 8px left gap from icon. Describes the action.' },
      { part: 'Subtitle / description', description: '13px Regular, #6B7280, 2px below title. Adds clarifying context for the action.' },
      { part: 'Chevron or arrow (optional)', description: '16px right-pointing icon, right-aligned. Communicates navigability. aria-hidden.' }
    ],
    states: [
      { state: 'Default', description: 'Resting state, ready for interaction.', background: '#FFFFFF', border: '1px solid #E5E7EB', textColor: '#1A1A1A' },
      { state: 'Hover', description: 'Light grey background on hover to indicate interactivity.', background: '#F9FAFB', border: '1px solid #D1D5DB', textColor: '#1A1A1A' },
      { state: 'Active / Pressed', description: 'Slightly darker grey fill during press.', background: '#F3F4F6', border: '1px solid #D1D5DB', textColor: '#1A1A1A' },
      { state: 'Focus', description: 'Focus ring around the card boundary.', background: '#FFFFFF', border: '2px solid #1A1A1A focus ring (2px offset)', textColor: '#1A1A1A' }
    ],
    dosDonts: [
      { type: 'do', text: 'Make the entire card surface a single <a> link for a large, easy-to-tap target.' },
      { type: 'do', text: 'Limit to 4–6 cards per group; more than that indicates the design needs restructuring.' },
      { type: 'dont', text: 'Don\'t mix Quick Action Cards with full-size Product Cards in the same visual row — they have different visual weights.' },
      { type: 'dont', text: 'Don\'t use Quick Action Card for tasks that open a modal — users expect the card to navigate to a new page.' },
      { type: 'dont', text: 'Don\'t label the card with the destination URL or section name — use the task the user wants to accomplish ("Change payment details", not "Payment settings").' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=3:400'
  },

  'Feature Card': {
    usage: 'Use Feature Card on the RAA public homepage and member benefits pages to promote tools, services, and features (Learners practice test, RAA Rewards, Live fuel prices). Arrange in a 3-column grid on desktop, 2-column on tablet, and single column on mobile. Each card must have a clear illustration or image, a concise heading, 1–2 sentences of body text, and a single CTA button or link. Do not use Feature Card inside Quote to Buy or My Account authenticated flows — its promotional tone is out of place in task-focused applications. Limit the number of Feature Cards per section to 3–6 to avoid overwhelming the page with promotional content.',
    accessibility: 'Illustrations used in Feature Cards must have descriptive alt text that conveys the feature being promoted, not just a generic description of the illustration style (e.g. "Person using RAA Rewards app to find discounts" not "Illustration of a phone"). For With Image variants, photographs must have meaningful alt text describing the scene and its relevance to the feature. The CTA button\'s accessible label must identify the specific feature, not just "Learn more" — use "Learn more about RAA Rewards" to disambiguate multiple cards on the page. The 18px heading on white background (#1A1A1A) achieves sufficient contrast. Body text at 14px (#6B7280) achieves 4.6:1 contrast. The card border (#E5E7EB on white) may not meet 3:1 contrast for UI component boundaries — pair with sufficient padding and grouping context so the boundary is not the sole visual affordance. If cards link to external sites, add "opens in new tab" to the accessible label.',
    anatomy: [
      { part: 'Card container', description: 'White background, 1px solid #E5E7EB border, 12px border radius, 24px padding. Flexible height matching the tallest card in the row.' },
      { part: 'Illustration / image', description: 'Top of card, full card width minus padding. Illustration: SVG or PNG, max-height ~160px, object-fit: contain. Photo: max-height 200px, object-fit: cover, border-radius 8px.' },
      { part: 'Heading', description: '18px Semi Bold, #1A1A1A, 16px top margin from image.' },
      { part: 'Body text', description: '14px Regular, #6B7280, 8px below heading. Maximum 2 sentences to keep cards compact.' },
      { part: 'CTA (button or link)', description: 'Primary Button (full-width) or text link, 16px top margin from body. Label must include feature name in accessible label.' }
    ],
    states: [
      { state: 'Default', description: 'Resting promotional card.', background: '#FFFFFF', border: '1px solid #E5E7EB', textColor: '#1A1A1A' },
      { state: 'CTA hover', description: 'Button or link shows hover state; card background unchanged.', background: '#FFFFFF', border: '1px solid #E5E7EB', textColor: '#1A1A1A' },
      { state: 'CTA focus', description: 'Focus ring on the CTA element.', background: '#FFFFFF', border: '1px solid #E5E7EB (card) + 2px solid focus ring (CTA)', textColor: '#1A1A1A' }
    ],
    dosDonts: [
      { type: 'do', text: 'Use descriptive alt text for illustrations — describe the feature being promoted, not the visual style.' },
      { type: 'do', text: 'Include the feature name in the CTA button\'s accessible label to disambiguate when multiple cards are on screen.' },
      { type: 'dont', text: 'Don\'t use Feature Card inside Quote to Buy or My Account — its promotional style is inappropriate in task-focused flows.' },
      { type: 'dont', text: 'Don\'t exceed 2 sentences in the body text — cards are meant to be scannable, not a full product description.' },
      { type: 'dont', text: 'Don\'t make the entire card clickable if the CTA is an explicit button — maintain a clear primary action.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=3:500'
  },

  'Promo Banner': {
    usage: 'Use Promo Banner for high-visibility cross-sell and promotional messaging within page content — typical uses include "Get a quote online", "Save with RAA Rewards", and "Download the app". Place at most one Promo Banner per page section, and never stack two Promo Banners directly above each other. For multi-card promotion grids use Feature Card instead. The With Image Right variant works best for app or service promotions; Yellow Background for RAA-branded campaigns; Image Background for aspirational lifestyle promotions. Keep heading text under 12 words and body text under 25 words — the banner is a hook, not a product description.',
    accessibility: 'Background images in the Image Background variant must not convey any essential information since they cannot have alt text in a meaningful way; all essential content must be in the text overlay. Background images must be set via CSS (not <img>) so they are excluded from the accessibility tree. The heading text overlaid on a background image must maintain at least 4.5:1 contrast — use a semi-transparent dark overlay if the image does not provide sufficient contrast naturally. In the Yellow Background variant, #1A1A1A on #FFD100 achieves 14.7:1 contrast. The CTA button must meet 4.5:1 contrast on whatever background it sits on. The decorative image in the With Image Right variant must have empty alt text (alt=""). If the banner includes auto-playing animation or a carousel, provide pause controls per WCAG 2.2.2.',
    anatomy: [
      { part: 'Banner container', description: '12px border radius, full content column width. Padding 24px 32px. Min-height ~120px. Background varies by variant.' },
      { part: 'Heading', description: '18px Bold, #1A1A1A (or white on dark backgrounds), max 12 words.' },
      { part: 'Body text', description: '14px Regular, #6B7280 (light backgrounds) or white (dark/image backgrounds). Max 25 words. 8px below heading.' },
      { part: 'CTA button', description: 'Primary Button. 16px top margin from body. Full accessible label including the offer or destination.' },
      { part: 'Decorative image (With Image Right)', description: 'Right-aligned image, 40% of banner width, object-fit: contain or cover. alt="" since it is decorative.' },
      { part: 'Background overlay (Image Background)', description: 'Semi-transparent dark gradient overlay on the left third of the background image, ensuring text contrast >= 4.5:1.' }
    ],
    states: [
      { state: 'Default', description: 'Resting promotional banner.', background: 'Varies by variant (#FFFFFF / #FFD100 / image)', border: 'none', textColor: '#1A1A1A or #FFFFFF depending on variant' },
      { state: 'CTA hover', description: 'Button shows hover state; banner background unchanged.', background: 'Varies', border: 'none', textColor: 'Varies' },
      { state: 'CTA focus', description: 'Focus ring on the CTA button.', background: 'Varies', border: '2px solid focus ring on CTA button', textColor: 'Varies' }
    ],
    dosDonts: [
      { type: 'do', text: 'Keep heading under 12 words and body copy under 25 words — the banner is a hook, not a landing page.' },
      { type: 'do', text: 'Ensure text overlaid on background images has a semi-transparent dark overlay to guarantee 4.5:1 contrast.' },
      { type: 'dont', text: 'Don\'t stack two Promo Banners directly above each other — they lose impact and confuse hierarchy.' },
      { type: 'dont', text: 'Don\'t put essential information solely in a background image — all key content must be in text elements.' },
      { type: 'dont', text: 'Don\'t use Promo Banner as a full-page hero — it is a mid-page promotional element, not a page header.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=3:600'
  },

  'Accordion': {
    usage: 'Use Accordion for content that benefits most users on most visits but is not the primary task on the page — FAQs, legal information, policy detail breakdowns (About your home, About your contents), and glossary sections. Do not use Accordion to hide primary task content or critical warnings that users must read before proceeding; place that content inline instead. Multiple Accordions can be stacked in a group under a section heading; allow multiple sections to be open simultaneously unless content panels are mutually exclusive. Keep heading labels concise (under 10 words) so the toggle row remains single-line. For very long content that is always relevant use a full page section or tabs instead.',
    accessibility: 'Each Accordion toggle must be a <button> element with aria-expanded="true" or aria-expanded="false" reflecting the panel\'s open/closed state. The toggle button must have aria-controls pointing to the id of its content panel. The content panel must use id matching the aria-controls value. When collapsed, hide the panel content using display:none or the hidden attribute rather than visibility:hidden or opacity:0, so the content is fully removed from the accessibility tree and not reached by Tab key. The heading wrapping the button should use an appropriate heading level (h2–h4) consistent with the page\'s heading hierarchy. Focus must not move into the panel on open — only the toggle button receives focus during interaction. The plus/minus icon is decorative (aria-hidden). The panel content must be navigable via keyboard once it is open.',
    anatomy: [
      { part: 'Accordion item container', description: 'Full column width. Bottom border: 1px solid #E5E7EB. No outer border or border-radius on individual items; add a container border if the group is visually isolated.' },
      { part: 'Toggle header row', description: '16px 20px padding, min-height 56px. Flex row: label left, icon right. Acts as the <button> element. cursor: pointer.' },
      { part: 'Label text', description: '16px Medium, #1A1A1A. Single line preferred; wraps gracefully if longer.' },
      { part: 'Toggle icon', description: '20×20px. Plus (+) when closed, minus (−) when open. #6B7280, right-aligned. aria-hidden. Transitions opacity on state change.' },
      { part: 'Content panel', description: 'Variable height, revealed below the header row. 0px top padding, 16px 20px padding sides/bottom. 14px Regular, #1A1A1A. May contain inline links, lists, or other components.' }
    ],
    states: [
      { state: 'Closed', description: 'Default state. Content panel hidden. Plus icon visible.', background: '#FFFFFF', border: '0 0 1px 0 solid #E5E7EB', textColor: '#1A1A1A' },
      { state: 'Open', description: 'Content panel visible. Minus icon visible. aria-expanded="true".', background: '#FFFFFF', border: '0 0 1px 0 solid #E5E7EB', textColor: '#1A1A1A' },
      { state: 'Header hover', description: 'Light grey background on the toggle row.', background: '#F9FAFB', border: '0 0 1px 0 solid #E5E7EB', textColor: '#1A1A1A' },
      { state: 'Header focus', description: 'Focus ring on the toggle button.', background: '#FFFFFF', border: '2px solid #1A1A1A focus ring on toggle button', textColor: '#1A1A1A' }
    ],
    dosDonts: [
      { type: 'do', text: 'Use a <button> with aria-expanded for the toggle and aria-controls pointing to the panel id.' },
      { type: 'do', text: 'Use display:none to hide collapsed content so it is fully removed from the accessibility tree.' },
      { type: 'dont', text: 'Don\'t hide critical information or required steps inside an Accordion — inline essential content.' },
      { type: 'dont', text: 'Don\'t automatically collapse other panels when one opens unless the content sections are mutually exclusive.' },
      { type: 'dont', text: 'Don\'t move keyboard focus into the panel when it opens — only the toggle button itself should receive focus during interaction.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=3:700'
  },

  'Alert Banner': {
    usage: 'Use Alert Banner to communicate status messages that are directly related to content on the current page — warnings about coverage limitations, errors that block form submission, informational policy notices, and success confirmations. Place the banner at the point in the page where the relevant information applies, not always at the top of the page. Use Warning for important but non-blocking notices; Error for blocking conditions that require user action; Information for helpful context; Success for confirmations of completed actions. Do not use Alert Banner as a toast or snackbar for transient global notifications; use a separate toast component for those. Do not stack more than three Alert Banners on a single page — if more are needed, consolidate messages.',
    accessibility: 'Dynamic alerts injected into the page after user actions must use role="alert" so screen readers announce them immediately without requiring the user to navigate to them. Static informational banners that are part of the initial page render should use role="status" or role="note" instead, as role="alert" for static content will interrupt the screen reader\'s reading flow on page load. The Warning banner (#1A1A1A on #FEF3C7) achieves 14.7:1 contrast. The Error banner (#DC2626 on #FEE2E2) achieves approximately 4.6:1 contrast for the error text against its background. The Information banner (#1A1A1A on #EFF6FF) achieves 17:1 contrast. The icon must be aria-hidden and its meaning conveyed by the banner\'s heading text, not the icon alone. Do not rely on colour alone to distinguish Warning, Error, and Information — the icon shape and heading text must also differentiate them for colour-blind users.',
    anatomy: [
      { part: 'Banner container', description: '12px border radius, 20px 24px padding. Full content column width. Background varies by type.' },
      { part: 'Icon', description: '24×24px, top-left aligned with heading. Warning: triangle icon, #D97706. Error: circle-exclamation, #DC2626. Info: circle-i, #2563EB. Success: circle-check, #16A34A. aria-hidden.' },
      { part: 'Heading', description: '16px Bold, #1A1A1A (Warning/Info/Success) or #DC2626 (Error). 8px left gap from icon. Summarises the alert.' },
      { part: 'Body text', description: '14px Regular, #1A1A1A. 4px below heading. Provides detail and, where applicable, the action required.' },
      { part: 'CTA link or button (optional)', description: '14px, coloured link or text button. Used in Error banners to direct users to resolution (e.g. "Call us on 08 8202 4600").' },
      { part: 'Dismiss button (optional)', description: '20px × icon, top-right of container. Present only on dismissible informational banners. aria-label="Dismiss notice".' }
    ],
    states: [
      { state: 'Warning', description: 'Important notice, non-blocking. Yellow background.', background: '#FEF3C7', border: 'none', textColor: '#1A1A1A' },
      { state: 'Error', description: 'Blocking issue requiring user action. Red background.', background: '#FEE2E2', border: 'none', textColor: '#DC2626' },
      { state: 'Information', description: 'Helpful context, non-blocking. Blue background.', background: '#EFF6FF', border: 'none', textColor: '#1A1A1A' },
      { state: 'Success', description: 'Confirmed completed action. Green background.', background: '#F0FDF4', border: 'none', textColor: '#1A1A1A' },
      { state: 'Dismiss focus', description: 'Focus ring on the dismiss button if present.', background: 'Varies by type', border: '2px solid #1A1A1A focus ring on dismiss button', textColor: 'Varies' }
    ],
    dosDonts: [
      { type: 'do', text: 'Use role="alert" for banners injected dynamically after user actions so screen readers announce them immediately.' },
      { type: 'do', text: 'Place the banner at the contextually relevant point in the page, not always at the top.' },
      { type: 'dont', text: 'Don\'t use role="alert" for static banners that are part of the initial page load — use role="note" instead to avoid disruptive announcements.' },
      { type: 'dont', text: 'Don\'t rely on colour alone to communicate alert type — combine icon shape, heading text, and colour together.' },
      { type: 'dont', text: 'Don\'t stack more than three Alert Banners on a single page — consolidate messages or redesign the interaction.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=3:800'
  },

  'Info Tooltip': {
    usage: 'Use Info Tooltip to offer supplementary context for a form label or section heading when the term may be ambiguous to a general audience — examples include explaining what "Building type" means, describing how the excess works, or clarifying what "Under construction" covers. Do not place critical information inside a tooltip — content that the user must read to complete the task correctly should be inline. Keep tooltip text under 60 words; longer explanations should link to a separate help article. In the With Link variant, the linked text (e.g. "Excess explained") should be descriptive and not "click here". Position tooltips to avoid viewport overflow on mobile — prefer a popover panel that opens below the trigger rather than a hover-only tooltip.',
    accessibility: 'The trigger element must be a <button> or <a> so it is keyboard-focusable and activatable via Enter or Space. Never implement tooltips as purely CSS :hover effects — they must open on both hover and keyboard focus. The tooltip content region must be programmatically associated with its trigger via aria-describedby (for supplementary context) or aria-labelledby (if the tooltip provides the primary name for the control). If the tooltip is dismissable, pressing Escape must close it and return focus to the trigger. The tooltip container should use role="tooltip" if it is a simple text overlay, or role="dialog" if it contains interactive elements. The #2563EB icon on white achieves 4.6:1 contrast. Tooltip text must meet 4.5:1 contrast against its background. On mobile, the tooltip must open on tap and be closeable via a tap outside or an explicit close button.',
    anatomy: [
      { part: 'Trigger icon', description: '16×16px circle-i icon, #2563EB fill, white (i) glyph. Inline after the label with 4px left gap. Acts as <button> with aria-describedby.' },
      { part: 'Linked text (With Link variant)', description: '14px, #2563EB, underlined. Replaces or accompanies the icon. Descriptive text (e.g. "Excess explained").' },
      { part: 'Tooltip popover', description: 'White background, 1px solid #E5E7EB border, 8px border radius, box-shadow: 0 4px 12px rgba(0,0,0,0.12). Max-width 320px. 12px 16px padding. Positioned below trigger with 8px gap.' },
      { part: 'Tooltip text', description: '14px Regular, #1A1A1A. Max 60 words. May include a text link to further reading.' },
      { part: 'Close indicator (mobile)', description: 'Implicit tap-outside-to-close behaviour on mobile. Optionally an explicit × button 20×20px top-right of popover for clarity.' }
    ],
    states: [
      { state: 'Closed', description: 'Trigger icon visible; tooltip popover hidden.', background: 'n/a (popover hidden)', border: 'none', textColor: '#2563EB (icon)' },
      { state: 'Open (hover / focus)', description: 'Tooltip popover visible. Triggered by hover or keyboard focus on the icon button.', background: '#FFFFFF (popover)', border: '1px solid #E5E7EB (popover)', textColor: '#1A1A1A (tooltip text)' },
      { state: 'Trigger focus', description: 'Focus ring on the icon trigger button.', background: 'n/a', border: '2px solid #2563EB focus ring on trigger', textColor: '#2563EB' },
      { state: 'Trigger hover', description: 'Icon background lightens slightly.', background: '#EFF6FF (icon bg)', border: 'none', textColor: '#2563EB' }
    ],
    dosDonts: [
      { type: 'do', text: 'Open tooltips on both hover and keyboard focus — never rely on hover alone.' },
      { type: 'do', text: 'Keep tooltip text under 60 words — longer explanations belong on a help page linked from the tooltip.' },
      { type: 'dont', text: 'Don\'t put required or critical information inside a tooltip — place it inline where users will see it without interaction.' },
      { type: 'dont', text: 'Don\'t implement tooltips as CSS :hover-only — keyboard and touch users cannot trigger CSS hover.' },
      { type: 'dont', text: 'Don\'t use "click here" or "more info" as the linked text in the With Link variant — use a descriptive label like "Excess explained".' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=3:900'
  },

  'Chat Widget': {
    usage: 'Chat Widget provides persistent access to live chat support on all RAA web pages except during payment processing — removing it during payment reduces the risk of users abandoning mid-transaction after a chat interaction. The widget is fixed to the bottom-right corner at all times; do not reposition it or place it inline in page content. On pages where the floating widget conflicts with a critical bottom-of-screen UI element (such as a sticky mobile CTA bar), apply a vertical offset to prevent overlap. The widget should only be shown when the live chat service is available; hide it outside business hours or when the chat queue is at capacity, replacing it with a contact us link.',
    accessibility: 'The Chat Widget button must have an accessible label — aria-label="Open live chat" — since it is icon-only and the icon alone does not convey the action to screen readers. The button must be keyboard-focusable and activatable via Enter or Space. Because it is fixed-position, it must appear in a predictable Tab order — typically the last focusable element on the page or managed via a portal so it does not interrupt the natural document reading flow. The 56px button size satisfies the 44px minimum touch target requirement comfortably. When the chat panel opens, focus must move into the panel and a focus trap must be applied so Tab key cycles within the chat UI only. When the panel is closed, focus must return to the chat trigger button. The blue (#2563EB) button on white background achieves 4.6:1 contrast for the button boundary, and white icon on blue achieves 4.6:1 contrast. Ensure any unread message badge provides a text alternative announcing the count.',
    anatomy: [
      { part: 'Trigger button', description: '56×56px circle, #2563EB background, white 24px chat bubble icon. Fixed position: bottom 24px, right 24px. z-index above page content. aria-label="Open live chat".' },
      { part: 'Chat icon', description: '24×24px speech bubble icon, white fill. aria-hidden. The aria-label on the button conveys the action.' },
      { part: 'Unread badge (optional)', description: '18px diameter red (#DC2626) circle badge, positioned top-right of the button. Contains unread message count as text. aria-label on button should include count: "Open live chat, 2 unread messages".' },
      { part: 'Chat panel', description: 'Popover or iframe panel, typically 360px wide × 500px tall, positioned above and left of the trigger. 12px border radius, box-shadow. Contains the chat provider\'s UI. focus-trapped when open.' }
    ],
    states: [
      { state: 'Default (closed)', description: 'Circular button visible in bottom-right corner. Chat panel hidden.', background: '#2563EB', border: 'none', textColor: '#FFFFFF (icon)' },
      { state: 'Hover', description: 'Slightly darkened button background on hover.', background: '#1D4ED8', border: 'none', textColor: '#FFFFFF' },
      { state: 'Focus', description: 'Focus ring on the circular button.', background: '#2563EB', border: '2px solid #FFFFFF focus ring (2px offset, white for contrast against blue)', textColor: '#FFFFFF' },
      { state: 'Active / open', description: 'Chat panel visible. Button may change to a close (×) icon.', background: '#1D4ED8', border: 'none', textColor: '#FFFFFF' },
      { state: 'Unavailable (hidden)', description: 'Widget not rendered outside business hours or when queue is full.', background: 'n/a', border: 'n/a', textColor: 'n/a' }
    ],
    dosDonts: [
      { type: 'do', text: 'Apply aria-label="Open live chat" to the icon-only button so screen readers announce its purpose.' },
      { type: 'do', text: 'Trap focus inside the chat panel when it is open and return focus to the trigger when closed.' },
      { type: 'dont', text: 'Don\'t show the Chat Widget during payment processing — it increases the risk of transaction abandonment.' },
      { type: 'dont', text: 'Don\'t reposition the widget inline or outside the bottom-right corner — its fixed position is a learned convention users rely on.' },
      { type: 'dont', text: 'Don\'t show the widget when live chat is unavailable — display a contact us link instead to avoid user frustration.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=3:1000'
  }
};

// Read
const data = JSON.parse(fs.readFileSync(SRC, 'utf8'));

// Enrich target components (raa-web product only)
const targetNames = Object.keys(enrichments);
let enrichedCount = 0;

data.components = data.components.map(component => {
  const key = component.name;
  if (targetNames.includes(key) && component.product === 'raa-web' && enrichments[key]) {
    enrichedCount++;
    return { ...component, ...enrichments[key] };
  }
  return component;
});

console.log(`Enriched ${enrichedCount} components.`);

// Write back to source
fs.writeFileSync(SRC, JSON.stringify(data, null, 2), 'utf8');
console.log(`Written: ${SRC}`);

// Copy to public/data
const destDir = path.dirname(DEST);
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(SRC, DEST);
console.log(`Copied to: ${DEST}`);

// Build
console.log('Building...');
execSync('npm run build', { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });
console.log('Build complete.');

// Commit and push
execSync('git add data/components.json public/data/components.json', { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });
execSync('git commit -m "Data enrichment batch 2"', { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });
console.log('Committed.');
execSync('git push', { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });
console.log('Pushed.');
