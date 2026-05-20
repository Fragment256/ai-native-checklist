---
id: "06-01"
category: security-baseline
category_title: Security baseline
title: A security review was completed before real users touched the product
description: >
  A security review before any user arrives is the minimum responsible bar for
  an MVP. It covers auth, data exposure, input validation, and dependency
  vulnerabilities — anything touching user data or access control.
source:
  id: founders-playbook-2026-05
  section: "Ch.4 MVP Stage — Insecure by inexperience / Security review before any user touches it"
  page: 17
  quote: >
    A security review before any user touches your app or solution is the
    minimum responsible threshold for releasing a minimum viable product into
    the world. […] Run your core application code through Claude with a specific
    brief: review for authentication and session handling, data exposure in API
    responses, input validation and injection risks, and dependencies with known
    vulnerabilities.
---

## How to score

- **Yes** — a security review covering auth, data exposure, input validation, and dependency vulnerabilities was completed before the first real user touched the product. Findings touching auth, secrets, or data handling had human review (not AI-only).
- **Partial** — some review happened but coverage was incomplete or only AI-reviewed.
- **No** — the product shipped to real users without a security pass.
