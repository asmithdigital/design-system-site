#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SRC = path.resolve(__dirname, '../data/components.json');
const DEST = path.resolve(__dirname, '../public/data/components.json');

// Keyed as "Component Name|product" to disambiguate Text Input across products
const enrichments = {

  // ─────────────────────────────────────────
  // RAA WEB — remaining 9
  // ─────────────────────────────────────────

  'Mascot Tip|raa-web': {
    usage: 'Use Mascot Tip to surface short, contextual guidance at the exact point in the Quote to Buy flow where a user is likely to be uncertain — beside complex form fields (e.g. "Building type", "Sum insured", "Excess amount"). The mascot character adds a friendly, non-threatening tone to explanatory content. Keep tip text under 40 words; longer explanations belong in an Info Tooltip or a linked help article. Do not use Mascot Tip for error messages or validation feedback — use Alert Banner or inline field errors instead. Position the component beside the related form field on the right of the content column on desktop, and below the field on mobile.',
    accessibility: 'The speech bubble text must be present in the DOM and accessible to screen readers — do not rely solely on the visual speech bubble shape to convey content. The mascot illustration is purely decorative and must have alt="" or be set as a CSS background image excluded from the accessibility tree. The tip text container should use role="note" or an aria-describedby relationship linking it to the form field it annotates, so screen reader users understand the tip is supplementary to the adjacent field. The speech bubble background (#F3F0FF) with #1A1A1A text achieves approximately 15:1 contrast, exceeding WCAG AA. The 48px mascot image does not need to be interactive and must not receive keyboard focus. If the tip is conditionally shown or hidden, use aria-hidden="true" when hidden so it is removed from the accessibility tree and not read unnecessarily.',
    anatomy: [
      { part: 'Mascot image', description: '48×48px character illustration, positioned to the left or above the speech bubble. Decorative — alt="" or CSS background. Changes per flow context.' },
      { part: 'Speech bubble container', description: 'Max-width 280px, #F3F0FF background, 12px border radius, 12px 16px padding. Has a small triangular tail pointing toward the mascot.' },
      { part: 'Bubble tail', description: '8px CSS triangle on the left edge of the bubble pointing toward the mascot. Same #F3F0FF colour.' },
      { part: 'Tip text', description: '14px Regular, #1A1A1A. Max 40 words. May include a plain text link to further reading.' }
    ],
    states: [
      { state: 'Default (visible)', description: 'Tip is shown beside the relevant form field.', background: '#F3F0FF', border: 'none', textColor: '#1A1A1A' },
      { state: 'Hidden', description: 'Not rendered or aria-hidden when the related field is not visible or tip is not applicable.', background: 'n/a', border: 'n/a', textColor: 'n/a' }
    ],
    dosDonts: [
      { type: 'do', text: 'Keep tip text under 40 words — the mascot tip is a nudge, not a tutorial.' },
      { type: 'do', text: 'Mark the mascot illustration as decorative (alt="") so screen readers do not narrate it.' },
      { type: 'dont', text: 'Don\'t use Mascot Tip for error messages — use inline field errors or Alert Banner for validation feedback.' },
      { type: 'dont', text: 'Don\'t show multiple Mascot Tips simultaneously on the same screen — one at a time per page section.' },
      { type: 'dont', text: 'Don\'t put mandatory or required information inside a Mascot Tip — users may not notice it if it collapses on mobile.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=4:100'
  },

  'Quote Summary Card|raa-web': {
    usage: 'Quote Summary Card appears once per quote journey on the Your Quote page, and again at the Summary step with adapted heading copy. It is the primary decision surface — all pricing, cover type, reference number, start date, address, and excess information is displayed here to allow the member to confirm before purchasing. Do not use this component for any other purpose; it is specifically designed for the end-of-quote reveal and policy confirmation context. Pair it with the Coverage Grid below to show what the policy covers, and the Cover Option Cards above for add-ons. Always display both monthly and yearly pricing so users can compare payment frequency options.',
    accessibility: 'The price figure (36px Bold) is the most visually prominent element and must be programmatically associated with the cover type it represents via a heading or an aria-labelledby relationship — "Home and Contents Insurance — $142.50 per month" must be the complete accessible name, not just "$142.50". All price changes triggered by add-on toggles must be announced to screen readers via an aria-live="polite" region wrapping the price area. The quote reference number and policy details are read-only text — do not mark them as form fields. The 1px #E5E7EB border on white meets UI component contrast requirements. The 36px price text at Bold weight achieves well above 4.5:1 contrast against white. If the card contains expandable sections (e.g. excess breakdown), use the same button/aria-expanded pattern as Accordion.',
    anatomy: [
      { part: 'Card container', description: 'White background, 1px solid #E5E7EB border, 12px border radius, 32px padding. Full content column width.' },
      { part: 'Product icon + cover type', description: '40px product icon left-aligned, 14px Regular cover type label (#6B7280) to the right, e.g. "Home and Contents Insurance".' },
      { part: 'Price display', description: '36px Bold, #1A1A1A. Monthly price prominently displayed. 16px Regular yearly equivalent below in #6B7280.' },
      { part: 'Quote reference + dates', description: '14px Regular key-value pairs: Quote Ref, Start Date. #6B7280 label, #1A1A1A value.' },
      { part: 'Address row', description: 'House icon + insured address in 14px Regular, #1A1A1A. Full insured property address.' },
      { part: 'Excess amounts', description: 'Labelled 14px rows for Standard Excess and applicable optional excesses. Values in Semi Bold.' },
      { part: 'Discount / savings badge (optional)', description: 'Green (#F0FDF4) pill badge, 12px Semi Bold, #16A34A text. "You save $XX.XX" positioned near price.' }
    ],
    states: [
      { state: 'Default', description: 'Displays complete quote details. No user interaction on the card itself.', background: '#FFFFFF', border: '1px solid #E5E7EB', textColor: '#1A1A1A' },
      { state: 'Loading', description: 'Skeleton shimmer while quote data is being fetched.', background: '#F3F4F6 (shimmer)', border: '1px solid #E5E7EB', textColor: 'n/a' },
      { state: 'Price updated', description: 'Price area briefly highlighted (light yellow flash) after an add-on toggle changes the premium. aria-live region announces new price.', background: '#FFFBEB (flash)', border: '1px solid #E5E7EB', textColor: '#1A1A1A' }
    ],
    dosDonts: [
      { type: 'do', text: 'Display both monthly and yearly pricing so users can make an informed payment frequency choice.' },
      { type: 'do', text: 'Wrap the price area in an aria-live="polite" region so screen readers announce premium changes from add-on toggles.' },
      { type: 'dont', text: 'Don\'t reuse this component outside the Quote to Buy flow — it is context-specific to the quote reveal and summary steps.' },
      { type: 'dont', text: 'Don\'t truncate the insured address — display the full address so users can confirm it is correct.' },
      { type: 'dont', text: 'Don\'t show a loading skeleton for longer than 3 seconds — if the quote fetch takes longer, show an error state.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=4:200'
  },

  'Cover Option Card|raa-web': {
    usage: 'Use Cover Option Card in the Contents cover step of Quote to Buy to present optional insurance add-ons (Accidental Damage Cover, Pet Cover) that users can independently toggle on or off. Each card is self-contained and communicates the add-on name, a short description, the applicable excess, and the price impact when toggled on. Do not use Cover Option Card for mandatory cover inclusions — those belong in Coverage Grid. When the add-on has sub-options (e.g. choosing a coverage limit of $2,000 or $5,000), expose the Radio Cards below the toggle only after the toggle is switched on. Never pre-enable add-ons on behalf of the user — always default to off.',
    accessibility: 'The Toggle Switch within the card must have an accessible label that includes the add-on name — not just the generic "Toggle" — e.g. aria-label="Accidental Damage Cover". When the toggle is switched on and sub-options appear, focus must not jump automatically; the content expansion must be announced via an aria-live region or the sub-option region must use aria-hidden="false" on expansion. The price change resulting from toggling must be announced via an aria-live="polite" region. The 1px #E5E7EB card border meets UI component contrast requirements. The excess and price text at 14px Regular must maintain 4.5:1 contrast against the white background. Expandable "Key information" sections within the card must follow the same button/aria-expanded pattern as Accordion.',
    anatomy: [
      { part: 'Card container', description: 'White background, 1px solid #E5E7EB border, 12px border radius, 20px 24px padding. Full content column width.' },
      { part: 'Toggle + add-on name row', description: 'Toggle Switch (48×24px) left-aligned, add-on name in 16px Semi Bold #1A1A1A to the right with 12px gap. Price delta right-aligned ("+ $X.XX/mth").' },
      { part: 'Description text', description: '14px Regular, #6B7280, 8px below the toggle row. 2–3 sentences describing what the cover includes.' },
      { part: 'Excess label', description: '13px Regular, #6B7280. "Excess: $XXX" below description.' },
      { part: 'Sub-option Radio Cards', description: 'Revealed below after toggle is switched on. Full-width Radio Card group for coverage limit selection ($2,000 / $5,000 per claim). 12px top margin.' },
      { part: 'Key information accordion (optional)', description: 'Collapsed by default. "Key information +" toggle row at the bottom of the card. Expands to show a bullet list of cover inclusions/exclusions.' }
    ],
    states: [
      { state: 'Default (off)', description: 'Toggle in Off position. Sub-options hidden. Price delta not shown.', background: '#FFFFFF', border: '1px solid #E5E7EB', textColor: '#1A1A1A' },
      { state: 'Enabled (on)', description: 'Toggle in On position. Sub-options revealed (if applicable). Price delta shown.', background: '#FFFFFF', border: '1px solid #0D9488', textColor: '#1A1A1A' },
      { state: 'Key info expanded', description: 'Accordion section open, key inclusions/exclusions visible.', background: '#FFFFFF', border: '1px solid #E5E7EB', textColor: '#1A1A1A' },
      { state: 'Loading / price updating', description: 'Price delta briefly shows a spinner while the premium recalculates.', background: '#FFFFFF', border: '1px solid #E5E7EB', textColor: '#9CA3AF (spinner)' }
    ],
    dosDonts: [
      { type: 'do', text: 'Default all add-on toggles to Off — never pre-select optional extras on behalf of the user.' },
      { type: 'do', text: 'Announce price changes via aria-live="polite" when the toggle state changes.' },
      { type: 'dont', text: 'Don\'t show sub-option Radio Cards before the user has switched the toggle on — they are conditional on the add-on being selected.' },
      { type: 'dont', text: 'Don\'t use Cover Option Card for mandatory cover inclusions — use Coverage Grid for items that are always included.' },
      { type: 'dont', text: 'Don\'t label the toggle with only "On/Off" — include the add-on name in the toggle\'s accessible label.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=4:300'
  },

  'Coverage Grid|raa-web': {
    usage: 'Use Coverage Grid on the Your Quote page to display the key inclusions of the selected insurance policy in a visually scannable grid format. The 3-column layout gives each inclusion equal visual weight with an icon and a two-line label-plus-description. Do not use Coverage Grid for exclusions or items that are conditionally included — use a Summary Table or bullet list for nuanced conditional content. Keep inclusion labels to 3–4 words and descriptions to one short sentence; longer content breaks the grid rhythm. Coverage Grid is a read-only display component with no interactive states — pair it with an Accordion containing the full Product Disclosure Statement for users who want comprehensive details.',
    accessibility: 'Coverage Grid is a read-only display component; do not use a table element unless the data has meaningful row/column relationships — a CSS grid of <article> or <div> elements with appropriate heading structure is sufficient. Each grid item must have an icon with a meaningful alt text that describes the cover type (e.g. "Fire damage icon"), not a generic name. Alternatively, if the label text immediately follows, mark the icon as aria-hidden and let the text carry the accessible name. The 14px Semi Bold label (#1A1A1A on white) achieves well above 4.5:1 contrast. The 13px description text (#6B7280 on white) achieves approximately 4.6:1 contrast, meeting WCAG AA. The 3-column grid collapses to a 2-column or 1-column layout on small viewports — ensure the reflow does not create orphaned single items that look like errors.',
    anatomy: [
      { part: 'Grid container', description: 'CSS grid, 3 columns, 24px gap. Full content column width. No border or background — sits directly on the page or card background.' },
      { part: 'Grid item', description: 'Flex column, align-items center (icon then text). No border. Approximately 30% of the container width per item.' },
      { part: 'Item icon', description: '32×32px SVG icon, brand colours (green, blue, teal, or grey). Centred above text. Meaningful alt text or aria-hidden if label is immediately adjacent.' },
      { part: 'Item label', description: '14px Semi Bold, #1A1A1A, centred, 8px below icon. Max 4 words. E.g. "Fire damage", "Flood and Storm damage".' },
      { part: 'Item description', description: '13px Regular, #6B7280, centred, 2px below label. One short sentence.' }
    ],
    states: [
      { state: 'Default', description: 'Read-only grid. No interactive states.', background: 'transparent', border: 'none', textColor: '#1A1A1A' }
    ],
    dosDonts: [
      { type: 'do', text: 'Use meaningful icon alt text (e.g. "Fire damage icon") rather than generic names.' },
      { type: 'do', text: 'Keep item labels to 3–4 words and descriptions to one sentence to maintain the grid\'s visual rhythm.' },
      { type: 'dont', text: 'Don\'t use Coverage Grid for conditional or excluded items — use a Summary Table or bullet list for that content.' },
      { type: 'dont', text: 'Don\'t add interactive elements (buttons, toggles) inside Coverage Grid items — it is a read-only display component.' },
      { type: 'dont', text: 'Don\'t exceed 9 items (3×3) in a single Coverage Grid — split into sections or use a different layout for larger lists.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=4:400'
  },

  'Summary Table|raa-web': {
    usage: 'Use Summary Table to display structured key-value data that summarises a user\'s selections or policy details — contents coverage amount, listed items, cover selections, and payment details. The yellow left border variant draws visual attention to the summary and is used when the table is a critical review checkpoint before progression. Do not use Summary Table for large datasets with more than 10 rows — use a paginated data table component instead. Each row must have a concise label (left column) and a clear value (right column); avoid multi-sentence values. Pair Summary Table with an Edit link on the section heading to allow users to jump back and modify their answers.',
    accessibility: 'If the data has genuine row/column header relationships, use a <table> element with <th scope="row"> for the label column and <td> for the value column so screen readers announce each pair correctly. If the content is a simple list of name-value pairs without column semantics, a <dl> (description list) with <dt> for labels and <dd> for values is semantically more appropriate and equally accessible. Do not use a presentational <div> grid without ARIA roles for this content. The yellow left border (#FFD100) is decorative — do not rely on it to convey meaning. Label text 14px Regular (#6B7280 on white) achieves 4.6:1 contrast. Value text 14px Semi Bold (#1A1A1A on white) achieves 21:1 contrast. Horizontal divider lines between rows are decorative (aria-hidden). Any Edit links must have accessible labels identifying the section, e.g. "Edit contents details".',
    anatomy: [
      { part: 'Table container', description: 'White background, optional 3px solid #FFD100 left border, 16px 20px padding, 8px border radius. Full content column width.' },
      { part: 'Row', description: 'Flex row, space-between. 12px vertical padding. Bottom border 1px solid #E5E7EB (omitted on last row). Min-height 40px.' },
      { part: 'Label cell', description: '14px Regular, #6B7280, left-aligned. Max 5 words.' },
      { part: 'Value cell', description: '14px Semi Bold, #1A1A1A, right-aligned. Single line preferred; wraps if necessary.' },
      { part: 'Yellow left border (optional)', description: '3px solid #FFD100, applied to the left edge of the container. Used to indicate a confirmed-summary context.' },
      { part: 'Section heading + Edit link (optional)', description: '16px Semi Bold #1A1A1A left, "Edit" text link #2563EB right. 16px below heading before table rows start.' }
    ],
    states: [
      { state: 'Default', description: 'Read-only key-value display.', background: '#FFFFFF', border: '3px solid #FFD100 (left, optional)', textColor: '#1A1A1A' },
      { state: 'Edit link hover', description: 'Edit link shows underline or colour shift on hover.', background: '#FFFFFF', border: '3px solid #FFD100 (left, optional)', textColor: '#1D4ED8 (link hover)' },
      { state: 'Edit link focus', description: 'Focus ring on the Edit link.', background: '#FFFFFF', border: '3px solid #FFD100 (left) + 2px solid focus ring (Edit link)', textColor: '#2563EB' }
    ],
    dosDonts: [
      { type: 'do', text: 'Use a semantic <table> or <dl> element so screen readers announce label-value pairs correctly.' },
      { type: 'do', text: 'Give Edit links an accessible label that identifies the section: "Edit contents details", not just "Edit".' },
      { type: 'dont', text: 'Don\'t use Summary Table for more than 10 rows — use a paginated data table or split into multiple sections.' },
      { type: 'dont', text: 'Don\'t put multi-sentence values in the value cell — keep values concise and link to more detail if needed.' },
      { type: 'dont', text: 'Don\'t rely on the yellow left border alone to communicate importance — pair it with a clear section heading.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=4:500'
  },

  'Breadcrumb|raa-web': {
    usage: 'Use Breadcrumb on My Account sub-pages to show the user\'s location within the account navigation hierarchy and provide quick back-navigation to parent sections. Place it at the top of the main content area, below the Header Bar and above the page heading. Do not use Breadcrumb in Quote to Buy — the Stepper Navigation fulfils that orientation role in the quote flow. The current page (last breadcrumb item) must not be a link since the user is already on that page. Keep breadcrumb labels concise and consistent with the Sidebar Navigation item labels — the path "Home > My products > Home and Contents Insurance" should match the sidebar structure exactly.',
    accessibility: 'The breadcrumb must be wrapped in a <nav> element with aria-label="Breadcrumb" to make it a distinct navigation landmark, separate from the main header nav. The list of breadcrumb items must use an ordered list <ol> with <li> items to communicate the sequential hierarchy to screen readers. Each linked item must be an <a> element. The current page item must have aria-current="page" applied and must not be a link. The separator characters (forward slashes or chevrons) between items must be aria-hidden so screen readers do not announce them as part of the path. The home icon must have alt="Home" or an aria-label on the link. Link text colour (#2563EB on #FFFFFF) achieves 4.6:1 contrast. The current page text (#6B7280 on #FFFFFF) achieves 4.6:1 contrast, meeting WCAG AA.',
    anatomy: [
      { part: 'Nav container', description: '<nav aria-label="Breadcrumb"> wrapper. No visible border or background — sits inline above the page heading.' },
      { part: 'Ordered list', description: '<ol> with <li> items. Flex row, align-items: center, 8px gap between items. 14px text size.' },
      { part: 'Home icon + link', description: '16px home icon, #2563EB, wrapped in <a href="/account">. aria-label="My Account home".' },
      { part: 'Separator', description: 'Forward slash "/" or chevron "›", 14px, #9CA3AF. aria-hidden="true".' },
      { part: 'Parent page links', description: '14px Regular, #2563EB, underlined on hover. Each an <a> linking to the parent section.' },
      { part: 'Current page label', description: '14px Regular, #6B7280. Not a link. aria-current="page".' }
    ],
    states: [
      { state: 'Default', description: 'Resting breadcrumb trail.', background: 'transparent', border: 'none', textColor: '#2563EB (links), #6B7280 (current)' },
      { state: 'Link hover', description: 'Link text underlines and slightly darkens on hover.', background: 'transparent', border: 'none', textColor: '#1D4ED8' },
      { state: 'Link focus', description: 'Focus ring on the hovered breadcrumb link.', background: 'transparent', border: '2px solid #1A1A1A focus ring', textColor: '#2563EB' }
    ],
    dosDonts: [
      { type: 'do', text: 'Use aria-current="page" on the current (non-linked) last item so screen readers announce the user\'s current location.' },
      { type: 'do', text: 'Match breadcrumb labels exactly to the Sidebar Navigation item labels for consistency.' },
      { type: 'dont', text: 'Don\'t use Breadcrumb in Quote to Buy — use Stepper Navigation there.' },
      { type: 'dont', text: 'Don\'t make the current page item a link — the user is already on that page.' },
      { type: 'dont', text: 'Don\'t use aria-hidden on the entire breadcrumb — only the separator characters should be hidden.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=4:600'
  },

  'Member Info Card|raa-web': {
    usage: 'Member Info Card is used exclusively on the My Account home page to greet the authenticated member and display their key membership details — full name, member number, member since year, and annual savings to date. There is exactly one instance per page; do not reuse this component elsewhere or in a list. The "Show Card" button reveals the digital membership card view, which is a separate modal or panel. Do not display the full member number in plain text by default — mask it (e.g. "•••• 1234") and allow the user to reveal it with an explicit show/hide action. Pair with Quick Action Cards below for the most common account tasks.',
    accessibility: 'The member\'s name should be a heading element (h1 or h2 depending on page structure) so it anchors the page\'s heading hierarchy for screen readers. The masked member number must have an aria-label announcing it as "Member number, hidden — press to reveal" so screen readers do not announce the masking dots as literal content. The Show/Hide toggle for the member number must be a <button> with aria-pressed="true/false" or an aria-expanded pattern. The "Show Card" button opens a modal — the modal must implement full focus trapping and return focus to the "Show Card" button when dismissed. The card container border (#E5E7EB on white) is a decorative affordance; the card must not rely on the border alone to communicate it is a grouped content region. The 16px Bold name text (#1A1A1A on white) achieves 21:1 contrast.',
    anatomy: [
      { part: 'Card container', description: 'White background, 1px solid #E5E7EB border, 12px border radius, 24px padding. Full or half content column width depending on layout.' },
      { part: 'Member name', description: '16px Bold, #1A1A1A. Heading level h2. "Hi, [First Name]" greeting or full name depending on context.' },
      { part: 'Member number row', description: '14px Regular, #6B7280 label + #1A1A1A masked value side by side. Show/hide toggle button (eye icon, 16px) inline after value.' },
      { part: 'Member since row', description: '14px Regular, #6B7280 "Member since" label + #1A1A1A year value.' },
      { part: 'Savings row', description: '14px Regular, #6B7280 "Savings this year" label + #16A34A green bold savings amount value.' },
      { part: 'Show Card button', description: 'Secondary Button, label "Show Card", positioned bottom-right or below the member details. Opens digital membership card.' }
    ],
    states: [
      { state: 'Default (number masked)', description: 'Member number shown as dots. Eye icon shows "reveal" state.', background: '#FFFFFF', border: '1px solid #E5E7EB', textColor: '#1A1A1A' },
      { state: 'Number revealed', description: 'Full member number visible. Eye icon shows "hide" state. aria-pressed changes.', background: '#FFFFFF', border: '1px solid #E5E7EB', textColor: '#1A1A1A' },
      { state: 'Show Card button hover', description: 'Button shows hover state; card background unchanged.', background: '#FFFFFF', border: '1px solid #E5E7EB', textColor: '#1A1A1A' },
      { state: 'Show Card button focus', description: 'Focus ring on the Show Card button.', background: '#FFFFFF', border: '1px solid #E5E7EB (card) + 2px solid focus ring (button)', textColor: '#1A1A1A' }
    ],
    dosDonts: [
      { type: 'do', text: 'Mask the member number by default and require an explicit reveal action — reduces shoulder-surfing risk.' },
      { type: 'do', text: 'Trap focus inside the membership card modal and return it to "Show Card" on dismiss.' },
      { type: 'dont', text: 'Don\'t use more than one Member Info Card on a page — it is a singleton dashboard component.' },
      { type: 'dont', text: 'Don\'t announce the masking dots to screen readers — aria-label the member number field with a meaningful description.' },
      { type: 'dont', text: 'Don\'t hardcode the savings amount — it must be fetched from the authenticated member data source.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=4:700'
  },

  'Contact Section|raa-web': {
    usage: 'Use Contact Section at the bottom of My Account sub-pages and on the RAA public site contact section to surface all primary contact channels: phone, online enquiry, and physical shop locations. The three-row layout (Call us / Enquire online / Visit an RAA shop) is standardised — do not remove or reorder rows without design system approval. Do not use Contact Section mid-page as a content interruption; it is a footer-zone element that appears after the primary content and task completion CTAs. When phone hours differ from enquiry hours, include the opening hours directly below the phone number in 13px Regular text. Pair with Alert Banner (Information variant) if the contact channels have temporary changes (e.g. holiday hours).',
    accessibility: 'Phone numbers must be wrapped in <a href="tel:+61XXXXXXXXX"> links so mobile users can tap to call and screen readers announce them as callable. The email enquiry link must use <a href="mailto:..."> or link to an online contact form — do not use JavaScript click handlers for contact methods. Each row is a logical grouping of icon, heading, and description — use a <dl> or a list structure if the rows are related, or individual <div> containers with semantic heading levels. The 24px icons are decorative (aria-hidden) since the heading text conveys the channel type. The heading text (#1A1A1A at 16px Semi Bold on white) achieves 21:1 contrast. The description text (#6B7280 at 14px on white) achieves 4.6:1 contrast. Link text (#2563EB) achieves 4.6:1 against white background.',
    anatomy: [
      { part: 'Section container', description: 'No outer border. Standard vertical spacing (32px top margin from above content). Rows stacked vertically with 24px gap.' },
      { part: 'Contact row', description: 'Flex row: icon (left) + text content (right). Min-height 56px. 12px gap between icon and text.' },
      { part: 'Row icon', description: '24×24px icon: phone, envelope, location pin. #1A1A1A or brand colour. aria-hidden.' },
      { part: 'Row heading', description: '16px Semi Bold, #1A1A1A. "Call us", "Enquire online", "Visit an RAA shop".' },
      { part: 'Row description', description: '14px Regular, #6B7280. 1–2 sentences. Includes opening hours for phone row.' },
      { part: 'Contact link', description: '14px Regular, #2563EB, underlined. tel: link for phone, mailto: or href for online, address link for shop.' }
    ],
    states: [
      { state: 'Default', description: 'Static display of contact options.', background: 'transparent', border: 'none', textColor: '#1A1A1A' },
      { state: 'Link hover', description: 'Contact link shows underline + colour darkens on hover.', background: 'transparent', border: 'none', textColor: '#1D4ED8' },
      { state: 'Link focus', description: 'Focus ring on the contact link.', background: 'transparent', border: '2px solid #1A1A1A focus ring on link', textColor: '#2563EB' }
    ],
    dosDonts: [
      { type: 'do', text: 'Use tel: links for phone numbers so mobile users can tap to call directly.' },
      { type: 'do', text: 'Include opening hours adjacent to the phone number when hours are limited.' },
      { type: 'dont', text: 'Don\'t place Contact Section mid-page — it belongs after primary content and CTAs, near the bottom of the page.' },
      { type: 'dont', text: 'Don\'t use JavaScript click handlers for contact methods — use semantic href links for phone and email.' },
      { type: 'dont', text: 'Don\'t reorder the three contact rows (Call / Enquire / Visit) without design system review — the ordering reflects channel priority.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=4:800'
  },

  'Person Card|raa-web': {
    usage: 'Use Person Card in the Policy holders step of Quote to Buy to represent each person added to the policy. Each card displays the person\'s name, demographic details (gender, age, whether they are an RAA member), and provides Edit and Delete actions. When multiple persons are added, stack cards vertically with 12px gap. The maximum number of persons is determined by product rules — do not impose a UI limit beyond the product maximum. An "Add another person" Secondary Button below the stack allows adding more policy holders. Do not reuse Person Card outside the policy holders context — for member profile displays in My Account, use Member Info Card instead.',
    accessibility: 'The Edit and Delete buttons are icon-only in compact contexts — both must have aria-label values that include the person\'s name to disambiguate when multiple cards are on screen: "Edit details for Jane Smith" and "Delete Jane Smith from policy". Without these labels, screen reader users would hear multiple consecutive "Edit" and "Delete" announcements with no way to distinguish which person each refers to. The trash (delete) icon button should additionally trigger a confirmation dialog before performing the destructive action — the dialog must announce the person\'s name in its heading ("Remove Jane Smith from your policy?") and must manage focus appropriately. Person icon is decorative (aria-hidden). The 1px #E5E7EB border on white is a decorative affordance. The 40px icon size with 20px 24px padding gives an effective touch target well above 44px minimum.',
    anatomy: [
      { part: 'Card container', description: 'White background, 1px solid #E5E7EB border, 12px border radius, 20px 24px padding. Full content column width.' },
      { part: 'Person icon', description: '40×40px generic person avatar (circle with silhouette), #E5E7EB background. Left-aligned, vertically centred with name. aria-hidden.' },
      { part: 'Name', description: '16px Bold, #1A1A1A. Person\'s full name. 8px left gap from icon.' },
      { part: 'Demographic detail row', description: '14px Regular, #6B7280. Gender, age, and member status (e.g. "Female · Age 34 · RAA Member"). 4px below name.' },
      { part: 'Edit button', description: '20px pencil icon, #6B7280. Top-right of card. aria-label="Edit details for [name]". Hover: #1A1A1A.' },
      { part: 'Delete button', description: '20px trash icon, #6B7280. To the left of Edit. aria-label="Delete [name] from policy". Hover: #DC2626. Triggers confirmation dialog.' }
    ],
    states: [
      { state: 'Default', description: 'Person details visible, Edit and Delete available.', background: '#FFFFFF', border: '1px solid #E5E7EB', textColor: '#1A1A1A' },
      { state: 'Edit button hover', description: 'Pencil icon darkens to #1A1A1A.', background: '#FFFFFF', border: '1px solid #E5E7EB', textColor: '#1A1A1A' },
      { state: 'Delete button hover', description: 'Trash icon turns red (#DC2626) to communicate destructive intent.', background: '#FFFFFF', border: '1px solid #E5E7EB', textColor: '#DC2626 (icon)' },
      { state: 'Icon button focus', description: 'Focus ring around the icon button.', background: '#FFFFFF', border: '1px solid #E5E7EB (card) + 2px solid #1A1A1A focus ring (button)', textColor: '#1A1A1A' },
      { state: 'Deleting', description: 'After confirmation, card briefly shows a removal animation before unmounting.', background: '#FEE2E2', border: '1px solid #DC2626', textColor: '#DC2626' }
    ],
    dosDonts: [
      { type: 'do', text: 'Include the person\'s full name in the aria-label of Edit and Delete buttons to differentiate cards for screen reader users.' },
      { type: 'do', text: 'Require a confirmation dialog before the Delete action removes a person from the policy.' },
      { type: 'dont', text: 'Don\'t use Person Card outside the Policy holders step — use Member Info Card for account-level member displays.' },
      { type: 'dont', text: 'Don\'t change the icon colour on delete hover to red unless you also change the icon shape — colour alone does not convey destructiveness for colour-blind users.' },
      { type: 'dont', text: 'Don\'t allow deletion without a confirmation step — removing a policy holder is hard to reverse mid-quote.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=4:900'
  },

  // ─────────────────────────────────────────
  // TASKLY — 4 components
  // ─────────────────────────────────────────

  'Button|taskly': {
    usage: 'Use the Taskly Button for the primary call-to-action on each screen of the Taskly application — actions such as Create task, Save changes, Sign in, and Add member. One primary Button per screen is the standard; if a secondary action is needed alongside it, pair with a ghost or outline variant. The Taskly Button is deliberately more compact (40px height) than the RAA Web Primary Button to suit the denser information density of a task management interface. Do not use this button for destructive actions such as Delete or Archive without adding a danger colour treatment. Labels must be imperative verbs describing the action: "Create task", not "Task creation".',
    accessibility: 'The Taskly Button must meet WCAG AA 4.5:1 contrast between white (#FFFFFF) label text and the Primary Navy (#1A2B4A) background — the actual ratio is approximately 14:1, well above the minimum. A visible focus ring of 2px solid offset must be present on keyboard focus; the navy background makes a white or light focus ring most visible. The button must be activatable via Enter and Space keys. The 40px height with 20px horizontal padding may approach the 44px minimum touch target on mobile — add vertical padding or transparent area as needed to guarantee the minimum. In Disabled state use aria-disabled="true" to keep the button in the focus order. Loading state must replace the visible label with a spinner and an aria-label describing the in-progress action.',
    anatomy: [
      { part: 'Container', description: '40px height, 8px border radius, #1A2B4A (Primary Navy) background. Auto width with 20px horizontal padding. Min-width 80px.' },
      { part: 'Label', description: 'Arial Semi Bold 14px, #FFFFFF, centred. Single line.' },
      { part: 'Leading icon (optional)', description: '16×16px icon, white, 6px gap to label. Used for context-specific actions (e.g. "+" for create).' },
      { part: 'Spinner (loading)', description: '16px white spinner, replaces label during async actions. aria-label on button updated to describe in-progress state.' },
      { part: 'Focus ring', description: '2px solid #FFFFFF ring, 2px offset from container edge. Visible on keyboard focus.' }
    ],
    states: [
      { state: 'Default', description: 'Resting state, ready for interaction.', background: '#1A2B4A', border: 'none', textColor: '#FFFFFF' },
      { state: 'Hover', description: 'Slightly lighter navy background.', background: '#243A63', border: 'none', textColor: '#FFFFFF' },
      { state: 'Active / Pressed', description: 'Darker navy during press.', background: '#111E33', border: 'none', textColor: '#FFFFFF' },
      { state: 'Focus', description: 'White focus ring visible on keyboard focus.', background: '#1A2B4A', border: '2px solid #FFFFFF focus ring (2px offset)', textColor: '#FFFFFF' },
      { state: 'Disabled', description: 'Action unavailable. aria-disabled="true".', background: '#9CA3AF', border: 'none', textColor: '#FFFFFF' },
      { state: 'Loading', description: 'Spinner shown while async action completes.', background: '#1A2B4A', border: 'none', textColor: '#FFFFFF' }
    ],
    dosDonts: [
      { type: 'do', text: 'Use one primary Button per screen; add a secondary/ghost variant for supporting actions.' },
      { type: 'do', text: 'Write labels as imperative verbs: "Create task", "Save changes", not "Task" or "OK".' },
      { type: 'dont', text: 'Don\'t use the default navy button for destructive actions — apply a red (#DC2626) background for Delete/Remove.' },
      { type: 'dont', text: 'Don\'t truncate button labels — use a shorter label or increase the button width.' },
      { type: 'dont', text: 'Don\'t use aria-disabled without also styling the button visually as disabled — both visual and programmatic state must match.' }
    ],
    figmaUrl: 'https://www.figma.com/design/TASKLY_FIGMA_KEY/Taskly-Design-System?node-id=4:1000'
  },

  'Text Input|taskly': {
    usage: 'Use the Taskly Text Input for all single-line free-text entry in the Taskly application: task names, descriptions, due dates, member names, and search fields. Always display a persistent label above the field at 13px Semi Bold — never use placeholder text as the sole label. The Taskly variant is slightly more compact (40px height) than the RAA Web variant, fitting the dense task management UI. Validation should be triggered on blur rather than on each keystroke. For multi-line text entry (task notes, descriptions), use a <textarea> with matching label and border styling rather than this single-line input.',
    accessibility: 'The label must be programmatically linked to the input via a matching htmlFor/id pair. Error messages must be linked via aria-describedby and the input must receive aria-invalid="true" in the error state. The 40px height provides an effective touch target close to the 44px minimum — supplement with transparent padding if the field appears in dense mobile layouts. The #E0E2E6 border on a white background achieves approximately 1.6:1 contrast, which is below the WCAG 3:1 threshold for UI component boundaries; rely on the label and surrounding context to delineate the field, or increase the border colour to #9CA3AF (3:1) for strict compliance. Placeholder text must meet 4.5:1 contrast — use #6B7280 as the minimum. Focus state must show a visible border colour change. Disabled state must include helper text explaining why the field is locked.',
    anatomy: [
      { part: 'Label', description: 'Arial Semi Bold 13px, #1A1A1A, positioned above with 4px gap. Mandatory.' },
      { part: 'Input container', description: '40px height, full column width, 8px border radius, 1px solid #E0E2E6 border, white background, 12px horizontal padding.' },
      { part: 'Placeholder text', description: '14px Regular, #9CA3AF. Disappears on input. Does not replace the label.' },
      { part: 'Focus border', description: '2px solid #1A2B4A border on focus, replacing the default #E0E2E6 border.' },
      { part: 'Error message', description: '13px Regular, #DC2626, 4px below input. Linked via aria-describedby.' },
      { part: 'Helper text (optional)', description: '12px Regular, #6B7280, 4px below input. Character counts, format hints.' }
    ],
    states: [
      { state: 'Default (empty)', description: 'Resting state awaiting input.', background: '#FFFFFF', border: '1px solid #E0E2E6', textColor: '#9CA3AF (placeholder)' },
      { state: 'Focus', description: 'Navy border on active input.', background: '#FFFFFF', border: '2px solid #1A2B4A', textColor: '#1A1A1A' },
      { state: 'Filled', description: 'User has entered a value.', background: '#FFFFFF', border: '1px solid #E0E2E6', textColor: '#1A1A1A' },
      { state: 'Error', description: 'Validation failed. Red border and error message.', background: '#FFFFFF', border: '1px solid #DC2626', textColor: '#1A1A1A' },
      { state: 'Disabled', description: 'Field locked, not editable.', background: '#F3F4F6', border: '1px solid #E0E2E6', textColor: '#9CA3AF' }
    ],
    dosDonts: [
      { type: 'do', text: 'Always show a persistent visible label above the field — never use placeholder as the only label.' },
      { type: 'do', text: 'Link error messages via aria-describedby and set aria-invalid="true" on the input in the error state.' },
      { type: 'dont', text: 'Don\'t use a single-line Text Input for multi-line content such as task descriptions — use a <textarea> instead.' },
      { type: 'dont', text: 'Don\'t trigger validation on every keystroke — validate on blur to avoid interrupting the user while typing.' },
      { type: 'dont', text: 'Don\'t use placeholder text as the only label — it disappears on input and fails WCAG 2.1 SC 3.3.2.' }
    ],
    figmaUrl: 'https://www.figma.com/design/TASKLY_FIGMA_KEY/Taskly-Design-System?node-id=4:1100'
  },

  'Card|taskly': {
    usage: 'Use the Taskly Card as the primary content container for grouping related information on any Taskly screen — task details, project summaries, team member profiles, and activity feed items. Cards can be stacked vertically in a list or arranged in a grid. Do not use the Card for full-page layouts — it is a surface for discrete content units, not a page wrapper. When a Card represents a navigable item (e.g. a task row), make the entire card a clickable link or add a single primary action. Keep card content focused on one subject — if two unrelated topics appear in the same card, split them into two separate cards.',
    accessibility: 'If the Card represents a navigable or interactive item, it should be either an <a> element (for navigation) or contain a single primary interactive element. Avoid nesting multiple independent links or buttons inside a card unless each has a distinct, clearly-labelled action — screen reader users navigate by interactive element and will hear consecutive generic actions without context. Use <article> for self-contained content cards (e.g. task items) and <section> with aria-labelledby for grouped content cards. The 16px Semi Bold title at #1A1A1A on white achieves 21:1 contrast. The 14px Regular body at #1A1A1A on white achieves 21:1 contrast. The #E0E2E6 border (1px on white) provides a visual affordance at approximately 1.7:1 — supplement with white background and padding to visually define the card, not the border alone. Card content must reflow correctly at 400% zoom without horizontal scrolling.',
    anatomy: [
      { part: 'Card container', description: 'White background, 1px solid #E0E2E6 border, 12px border radius, 16px padding. Flexible height. Shadow optional: 0 1px 4px rgba(0,0,0,0.06).' },
      { part: 'Card title', description: '16px Semi Bold, #1A1A1A. Top of card, margin-bottom 8px.' },
      { part: 'Card body', description: '14px Regular, #1A1A1A. Main content area — text, lists, or nested components.' },
      { part: 'Card footer (optional)', description: 'Bottom area for actions or metadata. 12px top border 1px solid #E0E2E6, 12px top padding. 13px Regular, #6B7280 for metadata.' },
      { part: 'Card action (optional)', description: 'Primary action button or link right-aligned in the card footer.' }
    ],
    states: [
      { state: 'Default', description: 'Resting content container.', background: '#FFFFFF', border: '1px solid #E0E2E6', textColor: '#1A1A1A' },
      { state: 'Hover (clickable card)', description: 'Slightly elevated shadow and border darkens on hover for interactive cards.', background: '#FAFAFA', border: '1px solid #9CA3AF', textColor: '#1A1A1A' },
      { state: 'Focus (clickable card)', description: 'Focus ring on the card boundary.', background: '#FFFFFF', border: '2px solid #1A2B4A focus ring', textColor: '#1A1A1A' },
      { state: 'Selected', description: 'Card is selected in a multi-select context. Left border accent.', background: '#EFF6FF', border: '1px solid #1A2B4A + 3px solid #1A2B4A (left)', textColor: '#1A1A1A' }
    ],
    dosDonts: [
      { type: 'do', text: 'Use <article> for self-contained task or content cards so screen readers identify them as independent items.' },
      { type: 'do', text: 'Keep card content focused on one subject — if two topics appear, split into two cards.' },
      { type: 'dont', text: 'Don\'t nest multiple independent links or buttons without distinct accessible labels — screen readers will announce a confusing list of generic actions.' },
      { type: 'dont', text: 'Don\'t use the Card as a full-page layout wrapper — it is a surface for discrete content units.' },
      { type: 'dont', text: 'Don\'t rely solely on the #E0E2E6 border to define the card boundary at all contrast levels — supplement with padding and background colour.' }
    ],
    figmaUrl: 'https://www.figma.com/design/TASKLY_FIGMA_KEY/Taskly-Design-System?node-id=4:1200'
  },

  'Bottom Nav Bar|taskly': {
    usage: 'Bottom Nav Bar is the primary navigation component in the Taskly mobile application, fixed to the bottom of every screen. It provides access to the four top-level sections: Home, Search, Activity, and Profile. Do not add a fifth item — four is the maximum for this pattern; additional sections should be nested within existing ones. The active item must always reflect the current screen. Do not use Bottom Nav Bar for secondary navigation within a section — use tabs or an in-page navigation pattern for that. On tablet and desktop breakpoints, replace Bottom Nav Bar with a left sidebar navigation to suit the wider viewport.',
    accessibility: 'The Bottom Nav Bar must be wrapped in a <nav> element with aria-label="Main navigation" to create a distinct navigation landmark. Each nav item must be an <a> element with an href pointing to the section route, not a <button>, so it participates correctly in browser history and is announced as a navigation link. The active item must have aria-current="page". Icon labels (10px) that accompany each nav icon must be visible text, not icon-only — 10px is at the minimum legible size; do not go smaller. The icon must be aria-hidden since the text label carries the semantic meaning. The active state colour (#1A2B4A on white) achieves 14:1 contrast. The inactive icon/label (#6B7280 on white) achieves 4.6:1 contrast, meeting WCAG AA. The 56px bar height with four items gives each item approximately 25% width — on a 375px viewport this is ~93px wide per item, well above the 44px minimum touch target.',
    anatomy: [
      { part: 'Bar container', description: 'Full viewport width, 56px height, white (#FFFFFF) background, position fixed bottom-0. Optional top border 1px solid #E0E2E6 for separation from page content.' },
      { part: 'Nav item', description: 'Flex column (icon above label), centred, equal 25% width. Entire item is an <a> element.' },
      { part: 'Nav icon', description: '24×24px icon, #1A2B4A (active) or #6B7280 (inactive). aria-hidden.' },
      { part: 'Nav label', description: '10px Regular, #1A2B4A (active) or #6B7280 (inactive), centred below icon. 2px gap from icon.' },
      { part: 'Active indicator (optional)', description: '2px solid #1A2B4A top border on the active item, full item width, flush with top of bar.' }
    ],
    states: [
      { state: 'Default (inactive item)', description: 'Item is navigable, not the current section.', background: '#FFFFFF', border: 'none', textColor: '#6B7280' },
      { state: 'Active (current section)', description: 'Item is the current screen\'s section. aria-current="page". Navy icon and label.', background: '#FFFFFF', border: '2px solid #1A2B4A (top, item width)', textColor: '#1A2B4A' },
      { state: 'Pressed', description: 'Brief opacity dip during tap press feedback.', background: '#F3F4F6', border: 'none', textColor: '#1A2B4A' },
      { state: 'Focus', description: 'Focus ring on the nav item boundary for keyboard navigation.', background: '#FFFFFF', border: '2px solid #1A2B4A focus ring', textColor: '#1A2B4A or #6B7280' }
    ],
    dosDonts: [
      { type: 'do', text: 'Use visible text labels below each icon — icon-only nav bars fail accessibility and usability for unfamiliar users.' },
      { type: 'do', text: 'Mark the active item with aria-current="page" and a visual active treatment (colour + optional top border).' },
      { type: 'dont', text: 'Don\'t add a fifth nav item — four is the maximum; add overflow sections within existing items instead.' },
      { type: 'dont', text: 'Don\'t use Bottom Nav Bar on tablet or desktop — switch to a sidebar or top navigation at wider breakpoints.' },
      { type: 'dont', text: 'Don\'t use <button> elements for nav items — use <a> elements with href so they participate in browser history and are announced as links.' }
    ],
    figmaUrl: 'https://www.figma.com/design/TASKLY_FIGMA_KEY/Taskly-Design-System?node-id=4:1300'
  }
};

// Read
const data = JSON.parse(fs.readFileSync(SRC, 'utf8'));

let enrichedCount = 0;

data.components = data.components.map(component => {
  const key = `${component.name}|${component.product}`;
  if (enrichments[key]) {
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
execSync('git commit -m "Data enrichment batch 3"', { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });
console.log('Committed.');
execSync('git push', { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });
console.log('Pushed.');
