# Security Follow-Up Checklist — 2026-05-19

## Purpose

This checklist converts the findings from `docs/SECURITY-AND-QUALITY-TRIAGE-2026-05-19.md` into a short operational follow-up plan.

It is intended to help close or reduce remaining security and quality ambiguity before and during early integration work.

---

## Triage review

- [ ] Review `docs/SECURITY-AND-QUALITY-TRIAGE-2026-05-19.md` in full.
- [ ] Confirm which findings apply to the core integration path.
- [ ] Confirm which findings apply only to optional/deferred areas such as `Caddy/`.
- [ ] Confirm whether any previously reported findings are already resolved on current `main`.

---

## Dependabot follow-up

For each Dependabot alert:

- [ ] Identify the affected package.
- [ ] Identify the ecosystem and directory.
- [ ] Classify the impact:
  - [ ] runtime
  - [ ] build-time
  - [ ] dev-only
- [ ] Determine whether the alert affects:
  - [ ] core app path
  - [ ] agent-harness
  - [ ] optional runtime path
  - [ ] archived or inactive content
- [ ] Assign disposition:
  - [ ] fix now
  - [ ] fix soon
  - [ ] defer
- [ ] Record whether the finding blocks dev-team kickoff.

---

## Code scanning follow-up

For each current code scanning finding:

- [ ] Identify the file/path involved.
- [ ] Identify the finding type.
- [ ] Assess whether it is:
  - [ ] true positive
  - [ ] acceptable risk
  - [ ] noise / non-blocking
  - [ ] deferred optional-path issue
- [ ] Define the remediation action.
- [ ] Record whether it blocks kickoff or can be handled post-kickoff.

---

## Workflow and CI quality

- [ ] Confirm CodeQL configuration is singular and not conflicting.
- [ ] Confirm SARIF upload behavior is correct.
- [ ] Confirm GitHub Pages is disabled or justified if still present.
- [ ] Confirm workflow permissions are least-privilege where practical.
- [ ] Confirm Dependabot audit and dependency automation behavior is intentional and documented.

---

## Dependency hygiene

- [ ] Verify `.github/dependabot.yml` references only active directories.
- [ ] Verify removed folders are not still referenced in dependency automation.
- [ ] Verify optional/deferred paths are categorized correctly in security discussions.
- [ ] Verify no stale dependency policy text remains in active docs.

---

## Optional-path isolation

- [ ] Ensure issues in optional/deferred paths are not mislabeled as blockers for core integration.
- [ ] Ensure `Caddy/` security posture is documented separately if needed.
- [ ] Ensure deferred runtime work does not create false no-go signals for the main integration path.

---

## Fix priority summary

### Fix now
Use this section for issues that should be resolved before or immediately at kickoff.

- [ ] No current items recorded
- [ ] Update this section if a blocker is identified

### Fix soon
Use this section for important but non-blocking issues.

- [ ] Review medium-severity dependency findings
- [ ] Review workflow/config cleanup items
- [ ] Review optional-path package freshness where appropriate

### Defer
Use this section for non-blocking issues tied to optional or future work.

- [ ] Optional runtime path dependency upgrades
- [ ] Deferred desktop/runtime track issues
- [ ] Non-canonical path cleanup not required for current milestone

---

## Completion condition

This checklist is complete when:

- no critical unresolved blocker remains,
- all medium findings are triaged,
- optional-path issues are clearly separated from core-path issues,
- and the dev team can begin work without inherited security ambiguity.

---

## Operational note

This checklist should be revisited:
- before the first major integration milestone,
- after any meaningful dependency upgrade,
- and before production-oriented release hardening.
