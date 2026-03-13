---
paths:
  - "css/style.css"
  - "**/*.html"
---

# CSS Transition Gotchas

## Stagger animation vs hover transitions
`.js .stagger-children > *` sets a `transition` property on children that **overrides** any transition set on the child's own class (e.g., `.card`). The stagger rule wins by specificity. If a card needs its own hover transition, the `.stagger-children.visible > *` rule must include the full transition shorthand (transform, box-shadow, border-color, etc.) — not just opacity and transform.

Additionally, the stagger `transition-delay` from `:nth-child()` rules persists after the entrance animation, causing hover interactions to lag. Fix: `.js .stagger-children.visible > .card:hover { transition-delay: 0s; }` with enough specificity to beat the nth-child selectors.

## Asymmetric hover timing
The `.card` base rule transition controls hover-**off** (return to rest). The `.card:hover` transition controls hover-**on** (lift up). Use a slower, springy ease on `:hover` for a smooth float-up, and a faster standard ease on the base for a crisp settle-back.
