# Dev Team Kickoff Checklist — 2026-05-19

## Purpose

This checklist defines the final repository readiness checks before the IoT Dashboard development team begins integration work against `iamjairo/manage.scrypted.app`.

This is a practical execution checklist, not a new audit.

---

## Repository baseline

- [ ] `main` is the only canonical branch for developer kickoff.
- [ ] No superseded PRs remain open.
- [ ] Root-level historical audit/meta folders have been removed from active repo structure.
- [ ] Historical materials needed for traceability are preserved under `.github/docs/archive-*`.
- [ ] Active repository structure is understandable to a new developer without agent-era context.

---

## Canonical documentation set

Confirm the following documents exist and are current:

- [ ] `docs/INDEX.md`
- [ ] `docs/DEVELOPER-INTEGRATION-STARTER-2026-05-19.md`
- [ ] `docs/IOT-DASHBOARD-INTEGRATION-BOUNDARY-2026-05-19.md`
- [ ] `docs/MAINLINE-REALITY-CHECK-2026-05-19.md`
- [ ] `docs/REPO-CLEANUP-PLAN-2026-05-19.md`
- [ ] `docs/FOLDER-DISPOSITION-2026-05-19.md`
- [ ] `docs/SECURITY-AND-QUALITY-TRIAGE-2026-05-19.md`

---

## Integration clarity

- [ ] The IoT Dashboard integration boundary is explicitly documented.
- [ ] The recommended first integration milestone is defined.
- [ ] Ownership boundaries are clear between this repo and the IoT Dashboard repo.
- [ ] Auth/session assumptions are documented.
- [ ] API and WebSocket proxy assumptions are documented.
- [ ] Routing model is documented and understandable to the dev team.

---

## Repo structure clarity

- [ ] Optional/deferred tracks are clearly marked as non-critical-path.
- [ ] `Caddy/` is documented as optional or experimental unless explicitly adopted as canonical.
- [ ] No historical folders remain at the top level that could be mistaken for active product areas.
- [ ] No duplicate audit/report trees remain in active repo paths.

---

## Branch hygiene

- [ ] Only branches with active intended work remain remote.
- [ ] Historical or superseded agent branches have been removed.
- [ ] Branch names still present are understandable and justified.
- [ ] `main` branch protection is configured appropriately.

---

## Security and quality gate

- [ ] No known critical vulnerabilities block dev-team kickoff.
- [ ] Medium-severity issues have been triaged.
- [ ] Code scanning posture is understood.
- [ ] Dependabot configuration matches actual active directories.
- [ ] CI/workflow state is clean enough that the dev team will not inherit obvious noise or ambiguity.

---

## Developer handoff readiness

- [ ] New developers can start from `docs/DEVELOPER-INTEGRATION-STARTER-2026-05-19.md`.
- [ ] New developers can determine what is implemented vs documented vs deferred.
- [ ] The team knows which optional tracks are not part of the immediate integration path.
- [ ] The repo no longer depends on branch-era context to understand current direction.

---

## Recommended kickoff reading order

1. `docs/DEVELOPER-INTEGRATION-STARTER-2026-05-19.md`
2. `docs/IOT-DASHBOARD-INTEGRATION-BOUNDARY-2026-05-19.md`
3. `docs/MAINLINE-REALITY-CHECK-2026-05-19.md`
4. `docs/SECURITY-AND-QUALITY-TRIAGE-2026-05-19.md`
5. `docs/REPO-CLEANUP-PLAN-2026-05-19.md`

---

## Final go / no-go

### Go if:
- the canonical docs are present,
- no blocker security issues remain,
- repo structure is clean,
- and optional/deferred work is clearly separated from the integration baseline.

### No-go if:
- active repo structure is still misleading,
- blocker security findings remain unresolved,
- or the dev team cannot clearly tell what path is canonical.

---

## Signoff note

Once this checklist is complete, the repository is considered ready for IoT Dashboard developer kickoff on the current `main` baseline.
