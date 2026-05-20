# Methodology

This document is the load-bearing differentiator of the checklist. The rules below are public commitments. Items that violate them do not ship.

## Core rules

**No item without a source.** Every checklist item is grounded in a specific, citable passage from a published authority. If we cannot cite, the item does not go in.

**Quotes verbatim, in the source's voice.** Items do not paraphrase the source into Fragment256's framing. The quote shows up exactly as the source wrote it, with location (chapter, section, page where available).

**Sources are versioned and committed.** Every source is archived under [`data/sources/`](./data/sources/) so the citation can be verified against the artefact in the repo, not against a URL that may change.

**Source disagreement is surfaced, not silently resolved.** When two authorities give different guidance on the same item, both are shown. The reader chooses.

**Fragment256 additions are explicitly tagged.** When a maintainer adds an item from operational experience rather than from a source, it is marked `fragment256-addition` and stays that way until a citable source corroborates it. Un-corroborated additions never lose their tag.

## Source inclusion criteria

A source is eligible if it meets all of:

1. **Practitioner authority.** The author has shipped what they are writing about, or works at an organisation that does. Pure analyst reports are not eligible.
2. **Public and stable.** Linkable, archivable, and not behind paywalls that block verification.
3. **Specific to AI-native operating practice.** Generic AI strategy material from outside the practitioner space is out of scope.

Eligible source examples: practitioner-authored playbooks (Anthropic, OpenAI), engineering-team essays (Stripe, Linear), YC / a16z / Sequoia practical guides, prominent practitioner blogs with shipped product attached.

Not eligible: vendor marketing collateral, generic consultancy reports, opinion columns without referenced practice.

## Scoring rubric

Each item is scored **Yes**, **Partial**, or **No**.

- **Yes** — the practice is in place and durable. It would survive someone leaving, the team growing, or three months passing.
- **Partial** — the practice exists but isn't durable. It lives in someone's head, in a chat message, or it isn't updated.
- **No** — the practice is absent.

"Yes" is a high bar on purpose. Partial is honest; Partial is the most common starting score.

## Refresh cadence

- **Per-source review:** when a cited source publishes a meaningful update, the relevant items are re-verified within 30 days.
- **Full review:** quarterly. The whole checklist is walked end-to-end against current sources.
- **Versioning:** the checklist itself is versioned (SemVer-ish). Breaking changes to item ids or scoring rules bump major.

## What this checklist deliberately does not do

- Tell you what tools to buy.
- Score your codebase. (See the [related-work tools](./README.md#related-work).)
- Replace judgement. The checklist surfaces gaps; whether to act on them is a founder call.

## Disagree?

Open an issue with the proposed change and the source. See [CONTRIBUTING.md](./CONTRIBUTING.md).
