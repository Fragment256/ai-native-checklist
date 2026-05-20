# AI-Native Checklist

A source-linked checklist for AI-native startup practice. Every item is grounded in a quoted, citable passage from a practitioner authority. No paraphrasing, no LLM-synthesised claims, no opinion presented as fact.

**Live site:** https://fragment256.github.io/ai-native-checklist/

## What it is

A community-maintainable assessment that asks: *is your startup operating AI-natively?* The output is a yes / partial / no score across eight categories, with every claim traceable to its source.

It is deliberately not:

- A scan of your codebase. (Other tools do that — see [Related work](#related-work).)
- A vendor checklist. We are not selling AI.
- A maturity model in the enterprise sense. The framing is founder / small-team practice.

## How to use it

1. Open the [live site](https://fragment256.github.io/ai-native-checklist/).
2. Walk through each item. Score Yes / Partial / No.
3. The score is preserved in the URL — share that URL with a co-founder, advisor, or investor and they see the exact same state.

## Methodology

Every claim must be grounded in a quoted passage from an authoritative source. See [METHODOLOGY.md](./METHODOLOGY.md) for the source-inclusion criteria, scoring rubric, and refresh cadence.

## Sources at v0

- *The Founder's Playbook: Building an AI-Native Startup*, Anthropic, May 2026.

Future sources will be added under [`data/sources/`](./data/sources/) as siblings. See [CONTRIBUTING.md](./CONTRIBUTING.md) to propose one.

## Related work

This checklist assesses **founder and operating practice**. For complementary tools that assess **codebase AI-readiness**, see:

- [kodustech/agent-readiness](https://github.com/kodustech/agent-readiness)
- [getaiready/aiready-cli](https://github.com/caopengau/aiready-cli)
- [f/check-ai](https://github.com/f/check-ai)

These are different layers of the same stack and we recommend running both.

## Maintainer

Curated by [Fragment256](https://fragment256.com). Issues and pull requests welcome.

## License

- Content (checklist items, methodology, sources): [CC-BY 4.0](./LICENSE-CONTENT)
- Site code and build scripts: [MIT](./LICENSE)
