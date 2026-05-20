# Contributing

The point of this checklist is community truth, not maintainer opinion. Contributions are welcome and the bar is the same one we hold ourselves to.

## What we accept

### New checklist items

A new item is welcome if it meets all of:

1. **Cites an eligible source.** See [METHODOLOGY.md](./METHODOLOGY.md#source-inclusion-criteria).
2. **Quotes the source verbatim.** No paraphrasing.
3. **Maps to an existing category** or proposes a new one with rationale.
4. **Is scorable Yes / Partial / No** as written.

### New sources

To propose a new source, open an issue titled `source: <title>` with:

- Author, publisher, publication date.
- Link and (if possible) a stable archive (web.archive.org URL).
- Two or three example items the source would unlock that aren't already covered.
- Why it meets the [source-inclusion criteria](./METHODOLOGY.md#source-inclusion-criteria).

### Source disagreement

If you find a source whose guidance conflicts with an existing item, that is valuable — open a PR adding the conflicting quote to the same item under a `disagreement:` block. Both views ship.

### Fragment256-tagged additions

Items added from operational experience without a citable source are tagged `fragment256-addition`. If you can supply a citable source that corroborates one, open a PR to convert it to a regular item.

## What we don't accept

- Items grounded in LLM output rather than published practitioner sources.
- Vendor marketing material as a source.
- Paraphrased quotes "in the spirit of" a source.
- Scoring weights that reward a specific tool or vendor.

## How to propose an item — PR template

Add a file under `data/items/<category>/<id>-<slug>.md` with this frontmatter:

```yaml
---
id: NN-NN
category: persistent-context
title: <imperative practice statement>
source:
  id: founders-playbook-2026-05
  section: "<verbatim section heading>"
  page: <number or null>
  quote: >
    <verbatim quote, ≤2 sentences>
---

## How to score

- **Yes** — <durable condition>
- **Partial** — <exists but not durable>
- **No** — <absent>
```

Then add the new item id to the category index in `data/items/<category>/README.md` (if creating a new category) and run `node build.js` to regenerate `site/data.json`.

## Code of conduct

Be precise. Be civil. Cite or don't claim.
