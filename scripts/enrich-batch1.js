#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SRC = path.resolve(__dirname, '../data/components.json');
const DEST = path.resolve(__dirname, '../public/data/components.json');

const enrichments = {
  'Primary Button': {
    usage: 'Use the Primary Button for the single most important action on a page — the step that moves the user forward in the flow, such as Next, Submit, Buy now, or Get a quote. Never place more than one Primary Button in the same view; if a second action is needed, use the Secondary Button or a Text Link instead. Position the Primary Button at the bottom of a form or content area, aligned to the right on desktop or full-width on mobile. Button labels must be concise action verbs that describe what happens on click — avoid vague labels like "Continue" when a more specific term like "Submit payment" is available. Pair with a Secondary Button only when a clear back or cancel action is equally essential to the user.',
    accessibility: 'The button must meet WCAG AA contrast ratio of at least 4.5:1 between label text (#1A1A1A) and background (#FFD100). A visible focus ring of 2px solid offset must appear on keyboard focus — never suppress outline via CSS without providing an equivalent indicator. The button must be reachable and activatable via Tab and Enter/Space keys. In the Disabled state, set aria-disabled="true" rather than the HTML disabled attribute so it remains in the focus order and screen readers can announce its unavailable status. In the Loading state, replace visible label with a spinner and add an aria-label such as "Submitting, please wait" so screen readers announce the in-progress state. Minimum touch target must be 44×44px even if the visual button is smaller. Icon variants (With Arrow, With Checkmark) must treat the icon as decorative (aria-hidden="true") since the text label already conveys the action. Test with VoiceOver (macOS/iOS) and NVDA (Windows) to confirm state announcements.',
    anatomy: [
      { part: 'Container', description: 'Full-width or auto-width block, 48px height, 8px border radius, #FFD100 background. Min-width 120px to prevent illegibly narrow buttons.' },
      { part: 'Label', description: 'Arial Semi Bold 16px, colour #1A1A1A, centred horizontally and vertically. Single line; truncation not permitted — resize the button instead.' },
      { part: 'Leading icon (optional)', description: '20×20px icon, 8px gap to label. Used in With Checkmark variant only. Always aria-hidden.' },
      { part: 'Trailing icon (optional)', description: '20×20px right-pointing arrow icon, 8px gap to label. Used in With Arrow variant only. Always aria-hidden.' },
      { part: 'Spinner (loading state)', description: '20px animated spinner replaces label during async submission. Yellow-on-yellow contrast is handled by using a dark (#1A1A1A) spinner fill.' },
      { part: 'Focus ring', description: '2px solid #1A1A1A ring, 2px offset from container edge. Visible on keyboard focus only. Never suppressed.' },
      { part: 'Padding', description: '24px horizontal padding (left and right), ensuring comfortable tap area and readable proportion at all label lengths.' }
    ],
    states: [
      { state: 'Default', description: 'Resting state, ready for interaction.', background: '#FFD100', border: 'none', textColor: '#1A1A1A' },
      { state: 'Hover', description: 'Darkened background communicates interactivity. Cursor changes to pointer.', background: '#E6BC00', border: 'none', textColor: '#1A1A1A' },
      { state: 'Active / Pressed', description: 'Further darkened during the moment of click or tap.', background: '#CCA800', border: 'none', textColor: '#1A1A1A' },
      { state: 'Focus', description: 'Keyboard focus ring visible. Background unchanged.', background: '#FFD100', border: '2px solid #1A1A1A (focus ring, 2px offset)', textColor: '#1A1A1A' },
      { state: 'Disabled', description: 'Action unavailable, typically because form validation has not passed. aria-disabled="true".', background: '#E5E5E5', border: 'none', textColor: '#9CA3AF' },
      { state: 'Loading', description: 'Submission in progress. Spinner replaces label. Not interactive.', background: '#FFD100', border: 'none', textColor: '#1A1A1A' }
    ],
    dosDonts: [
      { type: 'do', text: 'Use one Primary Button per view to give users a clear next action.' },
      { type: 'do', text: 'Write labels as specific action verbs: "Submit payment", "Get a quote", "Save changes".' },
      { type: 'do', text: 'Show a loading spinner after submission to prevent duplicate clicks.' },
      { type: 'dont', text: 'Don\'t use Primary Button for destructive actions like Delete — use a danger-styled button instead.' },
      { type: 'dont', text: 'Don\'t truncate the button label — expand the button width or use a shorter label.' },
      { type: 'dont', text: 'Don\'t disable the button as the only way to indicate an incomplete form — show inline validation errors too.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=2:100'
  },

  'Secondary Button': {
    usage: 'Use the Secondary Button for supporting actions that complement but do not compete with the Primary Button — examples include Save quote, View details, Go back, and Show Card. Multiple Secondary Buttons may appear on a single page, such as a row of product cards each with their own View details button. Do not use a Secondary Button when the action is the only option on screen; upgrade it to a Primary Button in that context. For inline text actions within prose or table rows, use a Text Link instead to reduce visual weight. Pair with the Primary Button at the end of forms to offer a clear back/cancel path.',
    accessibility: 'The #1A1A1A border on a white (#FFFFFF) background achieves a contrast ratio of 21:1, well above the WCAG AA minimum of 3:1 for UI components. Label text (#1A1A1A on #FFFFFF) meets the 4.5:1 contrast requirement for normal text. The focus ring must be a visible 2px outline offset from the button boundary. Both the full-size and Small variants must maintain a minimum touch target of 44×44px, achieved by adding transparent padding around the Small variant if needed. In Disabled state, use aria-disabled="true" to keep the button focusable and allow screen readers to announce unavailability. External link icon variants must include a visually hidden text such as "(opens in new tab)" appended to the accessible label. Test that the button is keyboard-activatable via Enter and Space keys in all states.',
    anatomy: [
      { part: 'Container', description: '44px height (36px for Small variant), 8px border radius, white (#FFFFFF) background, 1px solid #1A1A1A border.' },
      { part: 'Label', description: 'Arial Medium 16px (#1A1A1A), centred. 14px for Small variant.' },
      { part: 'Trailing icon — external link (optional)', description: '16×16px external link icon, 6px gap, aria-hidden. Visible hint that the link opens a new tab.' },
      { part: 'Focus ring', description: '2px solid #1A1A1A ring, 2px offset. Consistent with Primary Button focus treatment.' },
      { part: 'Padding', description: '16px horizontal padding, providing adequate tap area and visual balance.' },
      { part: 'Disabled overlay', description: 'Border lightens to #D1D5DB, label lightens to #9CA3AF, cursor set to not-allowed.' }
    ],
    states: [
      { state: 'Default', description: 'Resting state with white background and dark border.', background: '#FFFFFF', border: '1px solid #1A1A1A', textColor: '#1A1A1A' },
      { state: 'Hover', description: 'Light grey fill communicates hover without overwhelming the Primary Button.', background: '#F3F4F6', border: '1px solid #1A1A1A', textColor: '#1A1A1A' },
      { state: 'Active / Pressed', description: 'Slightly darker grey fill during press.', background: '#E5E7EB', border: '1px solid #1A1A1A', textColor: '#1A1A1A' },
      { state: 'Focus', description: 'Focus ring visible around border.', background: '#FFFFFF', border: '1px solid #1A1A1A + 2px solid #1A1A1A focus ring (2px offset)', textColor: '#1A1A1A' },
      { state: 'Disabled', description: 'Muted colours, not interactive. aria-disabled="true".', background: '#FFFFFF', border: '1px solid #D1D5DB', textColor: '#9CA3AF' }
    ],
    dosDonts: [
      { type: 'do', text: 'Pair a Secondary Button with a Primary Button to offer forward and back actions at the end of a form.' },
      { type: 'do', text: 'Use the Small variant inside product cards and compact layouts where the full 44px height would be disproportionate.' },
      { type: 'dont', text: 'Don\'t use a Secondary Button as the sole action on a page — a lone secondary action should be a Primary Button.' },
      { type: 'dont', text: 'Don\'t place more than three Secondary Buttons in a horizontal row — use a vertical list or different component layout instead.' },
      { type: 'dont', text: 'Don\'t style a destructive action (Delete, Remove) as a Secondary Button — add a red border or danger variant.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=2:200'
  },

  'Text Input': {
    usage: 'Use Text Input for any free-form text entry: name, email, phone number, address, sum insured amount, and similar single-line values. Always display the label above the field — never rely on placeholder text as the only label, as it disappears on input and fails WCAG 2.1 Success Criterion 3.3.2. Show inline validation on blur (when the user leaves the field), not on each keystroke, to avoid interrupting the typing experience. For currency and numeric inputs, use the With Prefix variant to display the unit symbol inside the field. When a field is pre-filled or read-only, use the Disabled variant and explain why the field cannot be edited via a helper text below.',
    accessibility: 'Every Text Input must have a visible label element programmatically linked to the input via a matching htmlFor/id pair — aria-label or aria-labelledby are acceptable alternatives only when a visible label is genuinely not possible. Error messages must be linked to the input via aria-describedby so screen readers announce the error when the field receives focus. Set aria-invalid="true" on the input element when in the Error state. The 48px height provides the minimum 44px touch target with room for browser chrome. Placeholder text colour must meet 4.5:1 contrast against the white background — #6B7280 at normal size does not meet this; use #4B5563 or darker. The Calendar Icon variant must announce the datepicker trigger with an accessible label such as "Open date picker for Date of birth". In the Disabled state, do not rely on colour alone to convey the state — include helper text or a visible "Cannot be edited" label. Focus transitions must be visible and not suppressed.',
    anatomy: [
      { part: 'Label', description: 'Arial Semi Bold 14px, #1A1A1A, positioned above the input with 4px gap. Mandatory — never omit.' },
      { part: 'Input container', description: '48px height, full column width, 4px border radius, 1px solid #D1D5DB border, white background, 12px 16px padding.' },
      { part: 'Placeholder text', description: '16px Regular, #6B7280. Disappears on input. Must not replace the label.' },
      { part: 'Prefix (optional)', description: 'Dollar sign or other symbol inside the left edge of the field. 16px, #1A1A1A, 12px left padding before the glyph.' },
      { part: 'Trailing icon (optional)', description: '20px icon (validation state or calendar). Right-aligned inside the container with 12px right padding.' },
      { part: 'Error/success message', description: '14px Regular, 4px gap below input. Error: #DC2626. Success: #16A34A. Linked via aria-describedby.' },
      { part: 'Focus ring', description: '2px solid #2563EB ring offset inside the border on keyboard focus.' },
      { part: 'Helper text (optional)', description: '13px Regular, #6B7280, 4px below input. Used for formatting hints (e.g. "DD/MM/YYYY").' }
    ],
    states: [
      { state: 'Default (empty)', description: 'Resting state awaiting user input.', background: '#FFFFFF', border: '1px solid #D1D5DB', textColor: '#1A1A1A' },
      { state: 'Focus', description: 'Blue border indicates active input field.', background: '#FFFFFF', border: '2px solid #2563EB', textColor: '#1A1A1A' },
      { state: 'Filled', description: 'User has entered a value. Label remains visible above.', background: '#FFFFFF', border: '1px solid #D1D5DB', textColor: '#1A1A1A' },
      { state: 'Error', description: 'Validation failed. Red border, error icon, red message below. aria-invalid="true".', background: '#FFFFFF', border: '1px solid #DC2626', textColor: '#1A1A1A' },
      { state: 'Success', description: 'Validation passed. Green border with checkmark icon.', background: '#FFFFFF', border: '1px solid #16A34A', textColor: '#1A1A1A' },
      { state: 'Disabled', description: 'Field is not editable. Read-only data display.', background: '#F9FAFB', border: '1px solid #E5E7EB', textColor: '#9CA3AF' }
    ],
    dosDonts: [
      { type: 'do', text: 'Always show a visible, persistent label above the field — never use placeholder as the sole label.' },
      { type: 'do', text: 'Trigger validation on blur, after the user finishes typing, not on each keystroke.' },
      { type: 'do', text: 'Link error messages to the input via aria-describedby so screen readers announce them on focus.' },
      { type: 'dont', text: 'Don\'t use Text Input for selecting from a predefined list — use Dropdown Select or Radio Card instead.' },
      { type: 'dont', text: 'Don\'t set placeholder text colour lighter than #4B5563 — very light placeholders fail contrast requirements.' },
      { type: 'dont', text: 'Don\'t disable autocomplete for common fields like name, email, and address — it frustrates users with disabilities who rely on autofill.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=2:300'
  },

  'Dropdown Select': {
    usage: 'Use Dropdown Select when the user must choose exactly one value from a predefined list of four or more options, such as Building type, Roof material, Year built, or Excess amount. For two or three options, use Radio Card instead — visible options reduce cognitive load and eliminate the extra tap to open the dropdown. Always include a default empty option (e.g. "Select an option") so the field is never silently pre-selected. The With Info Icon variant is appropriate when the label alone may be ambiguous and brief explanatory text would help the user make an informed choice. Do not use Dropdown Select for free-text entry — use Text Input in that case.',
    accessibility: 'Use the native HTML <select> element rather than a custom widget wherever possible; native select elements have built-in keyboard handling and screen reader support across all platforms and browsers without extra ARIA work. If a custom dropdown is required, implement full ARIA combobox or listbox patterns per WCAG 1.3.1. The visible label must be programmatically associated via htmlFor/id. Error state requires aria-invalid="true" on the select element and the error message linked via aria-describedby. The dropdown must be operable by keyboard: Tab to reach the field, arrow keys to navigate options, Enter or Space to confirm selection. The chevron icon is decorative (aria-hidden). Info icon tooltips must be keyboard-focusable and their content programmatically associated. Minimum touch target is 44px height, which the 48px container already satisfies. Test with a screen reader to confirm option labels are announced on navigation.',
    anatomy: [
      { part: 'Label', description: 'Arial Semi Bold 14px, #1A1A1A, positioned above with 4px gap. Optional info (i) icon 14px, #2563EB placed inline after label text.' },
      { part: 'Select container', description: '48px height, full column width, 4px border radius, 1px solid #D1D5DB border, white background.' },
      { part: 'Selected value text', description: '16px Regular #1A1A1A. Placeholder "Select an option" uses #6B7280.' },
      { part: 'Chevron icon', description: '16px chevron-down, #6B7280, right-aligned with 12px right padding. Rotates on open. aria-hidden.' },
      { part: 'Dropdown option list', description: 'White background, 1px #E5E7EB border, 8px border radius, box-shadow. Each option 40px height, 16px padding, 14px text.' },
      { part: 'Error message', description: '14px #DC2626, 4px below container, linked via aria-describedby.' },
      { part: 'Info tooltip (optional)', description: 'Popover max-width 280px, #1A1A1A text on white, 12px border radius, shadow, triggered by icon click or keyboard.' }
    ],
    states: [
      { state: 'Default', description: 'Resting state, shows placeholder or selected value.', background: '#FFFFFF', border: '1px solid #D1D5DB', textColor: '#6B7280' },
      { state: 'Focus', description: 'Blue border indicates the field is active.', background: '#FFFFFF', border: '2px solid #2563EB', textColor: '#1A1A1A' },
      { state: 'Open', description: 'Option list visible below the trigger.', background: '#FFFFFF', border: '2px solid #2563EB', textColor: '#1A1A1A' },
      { state: 'Selected', description: 'A valid option has been chosen.', background: '#FFFFFF', border: '1px solid #D1D5DB', textColor: '#1A1A1A' },
      { state: 'Error', description: 'No selection made when required. Red border and error message.', background: '#FFFFFF', border: '1px solid #DC2626', textColor: '#1A1A1A' },
      { state: 'Disabled', description: 'Field is locked. Cannot be interacted with.', background: '#F9FAFB', border: '1px solid #E5E7EB', textColor: '#9CA3AF' }
    ],
    dosDonts: [
      { type: 'do', text: 'Include an empty default option ("Select an option") so the field starts in a clearly unselected state.' },
      { type: 'do', text: 'Use native <select> for maximum screen reader and keyboard compatibility.' },
      { type: 'dont', text: 'Don\'t use Dropdown Select for 2–3 options — use Radio Card so all options are visible at a glance.' },
      { type: 'dont', text: 'Don\'t pre-select an option unless it is genuinely the correct default for the majority of users; silent defaults cause incorrect submissions.' },
      { type: 'dont', text: 'Don\'t use Dropdown Select for free-text search — use an autocomplete Text Input or combobox pattern.' },
      { type: 'dont', text: 'Don\'t nest Dropdowns inside other Dropdowns — flatten the option hierarchy or use a separate step.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=2:400'
  },

  'Radio Card': {
    usage: 'Use Radio Card when the user must choose exactly one option from a small set (2–5) and the full option text needs to be permanently visible without opening a dropdown. Typical uses include Yes/No binary choices, cover type selection (Home and Contents / Home only / Contents only), gender, and policy holder title. For horizontal groups of two options (Yes/No), place cards side by side at equal 50% width. For three or more options, use a vertical group or a multi-option horizontal row. If there are more than five options or the labels are long, use Dropdown Select instead. Always group related Radio Cards in a <fieldset> with a <legend> that describes the question.',
    accessibility: 'Each card must contain a visually hidden native <input type="radio"> element so keyboard and screen reader users can interact with it natively. All cards in a group must share the same name attribute so they form a mutual-exclusion group. The containing <fieldset> and <legend> provide the question context that each radio\'s label alone does not convey. The teal selected border (2px #0D9488) and background (#F0FDFA) must not be the only indicator of selection — use the radio circle fill as well. The teal border (#0D9488 on white) achieves 3.1:1 contrast, meeting the WCAG AA 3:1 requirement for UI components. The card\'s full clickable area must activate the radio so users can tap anywhere on the card, not just the small radio circle. Minimum touch target is 44px height; most Radio Cards will exceed this. Test arrow-key navigation between cards in the group with a screen reader.',
    anatomy: [
      { part: 'Card container', description: 'Min-height 48px, full column width (or 50% in horizontal pair), 8px border radius, 1px solid #D1D5DB border (default) / 2px solid #0D9488 (selected), white background (default) / #F0FDFA (selected), 12px 16px padding.' },
      { part: 'Radio circle', description: '20px diameter circle input, 2px border, positioned left-aligned inline with label text. Unfilled (#D1D5DB ring) default; teal fill (#0D9488) selected.' },
      { part: 'Primary label', description: 'Arial Regular 16px, #1A1A1A, 12px gap from radio circle. Wraps if the label is long.' },
      { part: 'Description text (optional)', description: '14px Regular, #6B7280, displayed below the primary label with 4px gap. Used for address confirmation and extended descriptions.' },
      { part: 'Fieldset / legend', description: 'Visually hidden or styled as section heading. Groups cards and provides question context for screen readers.' }
    ],
    states: [
      { state: 'Default (unselected)', description: 'Card is not selected, resting state.', background: '#FFFFFF', border: '1px solid #D1D5DB', textColor: '#1A1A1A' },
      { state: 'Hover (unselected)', description: 'Subtle teal tint communicates the card is interactive.', background: '#F0FDFA', border: '1px solid #0D9488', textColor: '#1A1A1A' },
      { state: 'Selected', description: 'Card is the active choice. Teal border and light teal background.', background: '#F0FDFA', border: '2px solid #0D9488', textColor: '#1A1A1A' },
      { state: 'Focus (keyboard)', description: 'Focus ring on the card boundary when navigated via keyboard.', background: '#FFFFFF', border: '1px solid #D1D5DB + 2px solid #1A1A1A focus ring (2px offset)', textColor: '#1A1A1A' },
      { state: 'Error (group)', description: 'No selection made. Error text below the group. No individual card border changes.', background: '#FFFFFF', border: '1px solid #DC2626', textColor: '#1A1A1A' }
    ],
    dosDonts: [
      { type: 'do', text: 'Use a <fieldset> and <legend> to group Radio Cards so screen readers announce the question before each option.' },
      { type: 'do', text: 'Make the entire card surface the clickable target, not just the radio circle — increases usability on touch devices.' },
      { type: 'do', text: 'Default to no selection on first render so users must actively make a choice.' },
      { type: 'dont', text: 'Don\'t use Radio Card for more than 5 options — switch to Dropdown Select for longer lists.' },
      { type: 'dont', text: 'Don\'t place Radio Cards and Checkboxes in the same group — they have different selection semantics.' },
      { type: 'dont', text: 'Don\'t rely on colour alone to indicate the selected state — always maintain the filled radio circle indicator.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=2:500'
  },

  'Checkbox': {
    usage: 'Use Checkbox for non-exclusive selections where zero or more options may be chosen simultaneously, and for consent or agreement capture (e.g. "I agree to the Terms and Conditions", marketing opt-in). For a single binary Yes/No choice that semantically means the user is opting into something, Checkbox is appropriate; for a binary navigational choice between two named options, use Radio Card instead. The With Card variant adds a visible border around the label, drawing attention to important legal agreements. Always include clear, plain-language label text — avoid dense legal text directly on the label; instead link to the full document.',
    accessibility: 'The native <input type="checkbox"> element must be used, associated with its label via htmlFor/id or by wrapping both in a <label> element. Never replace the native checkbox with a purely visual custom control unless you implement full ARIA checkbox role, aria-checked state (including the indeterminate state where applicable), and keyboard activation via Space bar. The checked state uses blue (#2563EB) fill on a white background — contrast ratio 3.1:1 for the component boundary meets WCAG AA for UI components. Error state must set aria-invalid="true" on the checkbox and link the error message via aria-describedby. The 20px checkbox with 12px gap and 16px label text provides an effective touch target that meets 44px minimum when the label is included in the interactive area. For checkbox groups, use a <fieldset> and <legend>.',
    anatomy: [
      { part: 'Checkbox input', description: '20×20px square, 4px border radius. Default: white fill, 1.5px solid #D1D5DB border. Checked: #2563EB fill, white 12px checkmark icon. Error: white fill, 1.5px solid #DC2626 border.' },
      { part: 'Label text', description: '16px Regular, #1A1A1A, positioned 12px to the right of the checkbox. Clickable area extends to include the label.' },
      { part: 'Error message', description: '14px Regular, #DC2626, positioned 4px below the checkbox row. Linked via aria-describedby.' },
      { part: 'Card container (optional)', description: 'White background, 1px solid #E5E7EB border, 12px border radius, 16px padding. Wraps checkbox and extended label text for legal agreements.' },
      { part: 'Focus ring', description: '2px solid #2563EB ring, 2px offset from checkbox boundary.' }
    ],
    states: [
      { state: 'Unchecked', description: 'Default resting state, no selection.', background: '#FFFFFF', border: '1.5px solid #D1D5DB', textColor: '#1A1A1A' },
      { state: 'Checked', description: 'User has selected the option. Blue fill with white checkmark.', background: '#2563EB', border: '1.5px solid #2563EB', textColor: '#FFFFFF (checkmark)' },
      { state: 'Focus', description: 'Keyboard focus ring visible. Background unchanged.', background: '#FFFFFF', border: '1.5px solid #D1D5DB + 2px solid #2563EB focus ring', textColor: '#1A1A1A' },
      { state: 'Error', description: 'Required checkbox not checked. Red border and error message.', background: '#FFFFFF', border: '1.5px solid #DC2626', textColor: '#1A1A1A' },
      { state: 'Disabled (unchecked)', description: 'Non-interactive, pre-existing state shown for context.', background: '#F9FAFB', border: '1.5px solid #E5E7EB', textColor: '#9CA3AF' },
      { state: 'Disabled (checked)', description: 'Pre-selected, cannot be modified.', background: '#E5E7EB', border: '1.5px solid #D1D5DB', textColor: '#9CA3AF (checkmark)' }
    ],
    dosDonts: [
      { type: 'do', text: 'Use Checkbox for multi-select and consent capture where zero or more options can be chosen.' },
      { type: 'do', text: 'Make the label clickable to toggle the checkbox — increases touch target and usability.' },
      { type: 'dont', text: 'Don\'t use Checkbox for a mutually exclusive single choice — use Radio Card instead.' },
      { type: 'dont', text: 'Don\'t pre-check consent or marketing opt-in checkboxes — this is a dark pattern and may violate Australian privacy law.' },
      { type: 'dont', text: 'Don\'t place the label below or to the left of the checkbox — users expect label text to appear to the right.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=2:600'
  },

  'Toggle Switch': {
    usage: 'Use Toggle Switch for binary on/off settings that take immediate effect without requiring a separate save action — optional insurance add-ons (Accidental Damage Cover, Pet Cover) are the primary use case. Always place a clear label to the right or above the toggle that describes what is being enabled, and include a brief description of the consequence (e.g. price change) near the toggle. Do not use Toggle Switch for form fields that are part of a submit flow where the value is collected but not immediately applied; use a Checkbox instead. Toggle is best for settings within a card or panel, not standalone on a bare page.',
    accessibility: 'The toggle must use role="switch" with aria-checked="true" or aria-checked="false" to communicate its on/off state to screen readers. The visual track and thumb change colour, but colour alone must not convey the state — aria-checked must be set programmatically. The teal (#0D9488) track in the On state achieves sufficient contrast against the white thumb. The toggle element must be keyboard-focusable (Tab) and togglable via Space bar. The 48×24px track with a 20px thumb provides a visual hit area, but the overall interactive component (including label) should meet the 44px minimum touch target. When the toggle controls a price, announce the price change to screen readers using an aria-live region. Test that toggling is announced as "on" and "off" by VoiceOver and NVDA.',
    anatomy: [
      { part: 'Track', description: '48px wide × 24px tall, 12px border radius (pill shape). Off: #D1D5DB background. On: #0D9488 background. Transition: 200ms ease.' },
      { part: 'Thumb', description: '20px diameter circle, white (#FFFFFF) fill, 2px inset shadow. Positioned 2px from left edge (Off) or 2px from right edge (On). Slides on transition.' },
      { part: 'Label', description: '16px Semi Bold, #1A1A1A, positioned to the right of the track with 12px gap. Required.' },
      { part: 'Description', description: '14px Regular, #6B7280, below the label. Describes the optional feature and its price impact.' },
      { part: 'Focus ring', description: '2px solid #1A1A1A, 2px offset from track boundary. Visible on keyboard focus.' }
    ],
    states: [
      { state: 'Off', description: 'Feature is disabled. Thumb on the left.', background: '#D1D5DB (track)', border: 'none', textColor: '#1A1A1A' },
      { state: 'On', description: 'Feature is enabled. Thumb on the right.', background: '#0D9488 (track)', border: 'none', textColor: '#1A1A1A' },
      { state: 'Focus (Off)', description: 'Keyboard focus on the Off toggle.', background: '#D1D5DB (track)', border: '2px solid #1A1A1A focus ring (2px offset)', textColor: '#1A1A1A' },
      { state: 'Focus (On)', description: 'Keyboard focus on the On toggle.', background: '#0D9488 (track)', border: '2px solid #1A1A1A focus ring (2px offset)', textColor: '#1A1A1A' },
      { state: 'Disabled (Off)', description: 'Toggle cannot be changed. Feature not available.', background: '#E5E7EB (track)', border: 'none', textColor: '#9CA3AF' },
      { state: 'Disabled (On)', description: 'Feature forced on, user cannot turn off.', background: '#A7F3D0 (track)', border: 'none', textColor: '#9CA3AF' }
    ],
    dosDonts: [
      { type: 'do', text: 'Use Toggle for settings that take immediate effect — the change happens without a separate "Save" button.' },
      { type: 'do', text: 'Always pair the toggle with a label and a short description explaining what will change.' },
      { type: 'do', text: 'Announce price or quantity changes triggered by the toggle using an aria-live region.' },
      { type: 'dont', text: 'Don\'t use Toggle Switch for options in a form that is submitted later — use Checkbox to avoid implying immediate action.' },
      { type: 'dont', text: 'Don\'t label the toggle with abstract states ("Active", "Inactive") — use the feature name ("Accidental Damage Cover").' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=2:700'
  },

  'Stepper Navigation': {
    usage: 'Use Stepper Navigation exclusively in multi-step linear flows such as Quote to Buy and Renewals, where the user must complete steps in order. Position it in a fixed left sidebar on desktop (240px wide) alongside the main content area. The stepper shows overall progress, labels each step, and allows back-navigation to any previously completed step. Do not use Stepper Navigation for non-linear or optional paths, or on mobile layouts where horizontal space is insufficient — collapse it into the Progress Banner heading or a compact progress indicator instead. Always keep step labels concise (2–3 words) to avoid wrapping in the sidebar.',
    accessibility: 'The stepper must be wrapped in a <nav> element with aria-label="Progress" to identify it as a navigation landmark. The currently active step must have aria-current="step" applied to its link or button element. Completed steps must be rendered as <a> or <button> elements so they are keyboard-navigable and can be activated to jump back. Upcoming (locked) steps must use aria-disabled="true" or be rendered as plain <span> elements that are excluded from the Tab order. The step number and completion state (checkmark vs number) must have screen-reader-accessible text, e.g. "Step 1, General information, completed" or "Step 3, Your contents, current step". The green (#16A34A) checkmark on white meets 4.5:1 contrast. Vertical connector lines are decorative; mark them aria-hidden.',
    anatomy: [
      { part: 'Nav container', description: '240px width sidebar. Vertical list layout with 24px gap between step items.' },
      { part: 'Step circle', description: '28px diameter circle. Completed: #16A34A background, white 14px checkmark icon. Current: #1A1A1A background, white step number. Upcoming: white background, #9CA3AF border, #9CA3AF step number.' },
      { part: 'Connector line', description: '2px wide vertical line between step circles. Completed segment: #16A34A. Upcoming segment: #D1D5DB. Decorative — aria-hidden.' },
      { part: 'Step label', description: 'Arial Medium 14px. Completed: #16A34A. Current: #1A1A1A. Upcoming: #9CA3AF. 8px left gap from circle.' },
      { part: 'Clickable target', description: 'Completed steps: entire row (circle + label) is a link back to that step. Current and upcoming steps: non-interactive.' }
    ],
    states: [
      { state: 'Completed', description: 'Step is done and can be revisited by clicking.', background: '#16A34A (circle)', border: 'none', textColor: '#16A34A (label)' },
      { state: 'Current', description: 'The step the user is currently on. aria-current="step".', background: '#1A1A1A (circle)', border: 'none', textColor: '#1A1A1A (label)' },
      { state: 'Upcoming', description: 'Not yet reached. Not interactive.', background: '#FFFFFF (circle)', border: '1px solid #9CA3AF (circle)', textColor: '#9CA3AF (label)' },
      { state: 'Focus (completed step)', description: 'Keyboard focus on a back-navigable completed step.', background: '#16A34A (circle)', border: '2px solid #1A1A1A focus ring (2px offset)', textColor: '#16A34A (label)' }
    ],
    dosDonts: [
      { type: 'do', text: 'Allow users to jump back to any completed step by making completed step rows clickable links.' },
      { type: 'do', text: 'Keep step labels to 2–3 words to prevent wrapping in the 240px sidebar.' },
      { type: 'dont', text: 'Don\'t allow users to jump ahead to upcoming steps — enforce sequential completion.' },
      { type: 'dont', text: 'Don\'t use Stepper Navigation for non-linear flows or optional steps — use tabs or a different navigation pattern.' },
      { type: 'dont', text: 'Don\'t omit the aria-current="step" attribute — screen reader users need this to know where they are in the flow.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=2:800'
  },

  'Progress Banner': {
    usage: 'Progress Banner appears at the top of every Quote to Buy page, occupying the full viewport width, to orient users within the multi-step flow. It shows both a step counter ("Step 2 of 5") and the step name ("Your home") so users always know where they are. The component is fixed to the top of the content area below the Header Bar and is never hidden or minimised mid-flow. Do not use Progress Banner in non-quote applications; use the Stepper Navigation sidebar or Breadcrumb depending on the layout. Content guidelines: step label should match the corresponding Stepper Navigation label exactly to avoid confusion.',
    accessibility: 'The Progress Banner must contain or be the page <h1> so screen readers announce the current step title on page load, providing immediate orientation without requiring users to navigate to the stepper sidebar. The "Step X of 5" label should be rendered as a visually styled paragraph or <span> above the <h1>, or combined into an accessible description via aria-describedby. The yellow (#FFD100) background with dark (#1A1A1A) text achieves a contrast ratio of 14.7:1, well above WCAG AA requirements. At 32px bold, the step title is legible at standard viewing distances. If the banner is dynamically updated during a single-page-app transition, use aria-live="polite" or manage focus to the heading so screen reader users are informed of the page change.',
    anatomy: [
      { part: 'Banner container', description: 'Full viewport width, variable height (~112px), #FFD100 background, 32px vertical padding.' },
      { part: 'Step label', description: '"Step X of 5" text, 14px Regular, #1A1A1A, centred horizontally, 8px above the title.' },
      { part: 'Step title (h1)', description: '32px Bold, #1A1A1A, centred horizontally. E.g. "Your home", "Your contents", "Policy holders".' },
      { part: 'Content constraint', description: 'Text content is constrained to the standard content max-width (e.g. 800px) and centred, matching the page body width.' }
    ],
    states: [
      { state: 'Default', description: 'Renders the current step number and title. No interactive states.', background: '#FFD100', border: 'none', textColor: '#1A1A1A' }
    ],
    dosDonts: [
      { type: 'do', text: 'Ensure the step title in the banner matches exactly the step label used in Stepper Navigation for consistency.' },
      { type: 'do', text: 'Use the banner title as or alongside the page <h1> so screen readers announce the current step on load.' },
      { type: 'dont', text: 'Don\'t hide or remove the Progress Banner mid-flow — it is a critical orientation landmark.' },
      { type: 'dont', text: 'Don\'t use Progress Banner outside the Quote to Buy flow — use Breadcrumb for My Account sub-pages.' },
      { type: 'dont', text: 'Don\'t truncate the step title — shorten the label text instead of clipping it.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=2:900'
  },

  'Sidebar Navigation': {
    usage: 'Sidebar Navigation is the primary wayfinding component for the My Account application. It sits in a fixed 240px left column and presents the top-level sections (My Account home, My details, My products, My claims, My member benefits) with optional collapsible sub-sections. Active items are highlighted with a 3px left border in #1A1A1A. Use Sidebar Navigation only in authenticated, multi-section web applications; do not use it on public site pages or within the Quote to Buy flow where Stepper Navigation serves the equivalent role. Keep top-level item labels concise — the 240px width allows approximately 20–24 characters before wrapping at 14px.',
    accessibility: 'The sidebar must be wrapped in a <nav> element with a unique aria-label (e.g. aria-label="Account navigation") to distinguish it from the header navigation landmark. Each expandable section heading must be a <button> with aria-expanded="true" or aria-expanded="false" reflecting its current open/closed state, and aria-controls pointing to the id of the collapsible content region. The active navigation item must have aria-current="page". All items must be keyboard-navigable via Tab, and section expand/collapse must be triggerable via Enter or Space. The 3px active border colour (#1A1A1A on white) provides strong visual feedback but must not be the only indicator — pair with bold or colour change on the label. Chevron icons are decorative (aria-hidden). Ensure icon-only states (if sidebar is ever collapsed to icon-only mode) have tooltips or aria-labels.',
    anatomy: [
      { part: 'Nav container', description: '240px width, full viewport height (sticky), white background, optional 1px solid #E5E7EB right border separating it from main content.' },
      { part: 'Section header / button', description: '14px Medium, #1A1A1A, 12px 16px padding, full width. Has chevron icon (right-aligned) when collapsible. aria-expanded on button element.' },
      { part: 'Active indicator', description: '3px solid #1A1A1A left border on the active item row. Replaces the left padding of the item to maintain alignment.' },
      { part: 'Child item row', description: '14px Regular, #1A1A1A (active) or #6B7280 (inactive), 12px 16px padding with additional 16px left indent below parent.' },
      { part: 'Section icon (optional)', description: '20×20px icon, #6B7280 (inactive) or #1A1A1A (active), 8px gap before label text. aria-hidden.' },
      { part: 'Chevron icon', description: '16px chevron, right-aligned in collapsible section headers. Points right (collapsed) or down (expanded). aria-hidden. Animates 200ms on state change.' }
    ],
    states: [
      { state: 'Default (inactive)', description: 'Item is navigable but not the current page.', background: '#FFFFFF', border: 'none', textColor: '#6B7280' },
      { state: 'Active (current page)', description: 'Item corresponds to the current route. 3px left border.', background: '#F9FAFB', border: '3px solid #1A1A1A (left)', textColor: '#1A1A1A' },
      { state: 'Hover', description: 'Light grey background on hover.', background: '#F3F4F6', border: 'none', textColor: '#1A1A1A' },
      { state: 'Focus', description: 'Keyboard focus ring on the item boundary.', background: '#FFFFFF', border: '2px solid #1A1A1A focus ring (2px offset)', textColor: '#1A1A1A' },
      { state: 'Section expanded', description: 'Section is open, child items visible. Chevron points down.', background: '#FFFFFF', border: 'none', textColor: '#1A1A1A' },
      { state: 'Section collapsed', description: 'Section is closed, child items hidden. Chevron points right.', background: '#FFFFFF', border: 'none', textColor: '#6B7280' }
    ],
    dosDonts: [
      { type: 'do', text: 'Use aria-expanded on section toggle buttons and aria-current="page" on the active item.' },
      { type: 'do', text: 'Keep top-level labels short enough to avoid wrapping at 14px in the 240px sidebar.' },
      { type: 'dont', text: 'Don\'t use Sidebar Navigation in the Quote to Buy flow — use Stepper Navigation there.' },
      { type: 'dont', text: 'Don\'t nest more than two levels deep (parent → child) — deeper hierarchies should be flattened or redesigned.' },
      { type: 'dont', text: 'Don\'t rely solely on the active left border to convey current page — combine with bold label or background change.' }
    ],
    figmaUrl: 'https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/RAA-Design-System?node-id=2:1000'
  }
};

// Read
const data = JSON.parse(fs.readFileSync(SRC, 'utf8'));

// Enrich the 10 target components (raa-web product, skip taskly duplicates)
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
execSync('git commit -m "Data enrichment batch 1"', { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });
console.log('Committed.');
execSync('git push', { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });
console.log('Pushed.');
