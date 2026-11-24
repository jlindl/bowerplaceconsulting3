# Apple design audit (web-relevant checks)

Scope: the five pages plus the 404, audited through the screenshots at 1440, 1366x657, 1024, 768, 390 and 375, and through the source in `src/`. App-only conventions (tab bars, toolbars, sheets, safe areas, Liquid Glass) do not apply to this marketing site and were skipped.

## Findings and changes

| # | Severity | Finding | Guideline | Change |
|---|---|---|---|---|
| 1 | Critical | The header hides on scroll down. A keyboard user tabbing back into the nav would focus links that are off screen. | accessibility.md: keyboard and focus | `Header.tsx`: `onFocusCapture` reveals the header whenever anything in it takes focus. |
| 2 | High | The logo descriptor was set at 9.5px, below the 11pt minimum. | typography.md: default and minimum sizes | The header logo is now the wordmark alone. The descriptor is shown only in the footer, at 11px. |
| 3 | Medium | The submit button said "Send message" but actually opens the visitor's email app. | writing.md: labels say what happens | Relabelled "Continue to email", with a note linked by `aria-describedby` that explains the handoff. |
| 4 | Medium | Errors only appeared on submit. | entering-data.md: validate dynamically | Fields are checked when you leave them, and re-checked live while an error is showing. Error text says how to fix the problem. The textarea is now `required`. "Edit your message" keeps what was typed, because the form is hidden rather than unmounted. |
| 5 | Medium (craft) | Cream paper, serif and a vermilion accent sit close to a known template look. The "No. 0X" eyebrows numbered sections that are not a sequence. | design-principles.md: Craft. branding.md | Removed every section number. Numbering is kept only where it is true: the six-stage method, case order and the service identifiers. The boldness now goes into the brand's own device: an arch-topped hero frame that matches the arch in the logo and the founders' arch monograms. |
| 6 | Low | Body text was set in px, so it ignored the browser's text-size preference. | accessibility.md: support larger text | Body text is now 1.0625rem. Page zoom scales everything, and no layout overflows at 200%. |

## Checked and passing
- Contrast (computed): ink #14261F on paper #F3EFE7 is about 14:1. Muted #59655F on paper is 5.3:1 (4.8:1 on paper-2). Accent #B83D0B on paper is 4.9:1, used for 14px error text and labels. Light accent #F08A5D on ink is 6.2:1. On-dark muted #B9C2B8 on ink is 8.4:1.
- Targets: buttons are at least 44px tall, the menu toggle is 44x44, and text links have at least 24px of line box.
- Reduced motion: Lenis is off, every reveal is shown in its finished state, the marquee is static and CSS transitions are disabled.
- Motion never carries meaning. Figures are revealed through a mask and are never counted up. Calls to action are never faded in from invisible.
- Screen readers: there is a skip link, one h1 per page and labelled landmarks. The duplicate marquee row is `aria-hidden`. The mobile menu is `inert` when closed. Decorative SVGs are `aria-hidden`.
- The marquee has a visible pause control (WCAG 2.2.2).
