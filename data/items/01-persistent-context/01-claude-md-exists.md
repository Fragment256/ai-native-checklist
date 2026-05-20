---
id: "01-01"
category: persistent-context
category_title: Persistent context
title: A CLAUDE.md (or equivalent) exists for every active codebase
description: >
  AI coding agents lose all context when a session ends unless you give them a
  persistent document to start from. CLAUDE.md is that document — it defines
  the architecture, conventions, and decisions so every session starts informed
  rather than blank.
source:
  id: founders-playbook-2026-05
  section: "Ch.4 MVP Stage — Define your architecture before you build"
  page: 18
  quote: >
    Save this output as CLAUDE.md markdown file(s). This is your architectural
    context document: the first artifact of your build, and the one every
    subsequent session depends on. Functionally, they are persistent "memory"
    for your project.
---

## How to score

- **Yes** — every active codebase in the company has a current, maintained CLAUDE.md (or equivalent persistent-context file) that the AI reads on every session.
- **Partial** — one exists somewhere, but it is out of date, missing for some codebases, or never updated end-of-session.
- **No** — no equivalent persistent-context document exists. Each Claude Code session starts from scratch.
