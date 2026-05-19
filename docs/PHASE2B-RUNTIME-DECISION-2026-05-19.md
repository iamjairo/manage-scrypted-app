# Phase 2B — Service/App Runtime Model Decision (Execution Artifact)

Date: 2026-05-19

This document fulfills Track B requirements from `HANDOFF-GO-NO-GO-CHECKLIST.md`.

## 1) Canonical runtime path (frozen for first release)

- **Decision**: **No desktop runtime in first release**.
- Electron (`server-app`) and Tauri (`server-app-tauri`) remain non-canonical exploratory tracks.
- First-release runtime remains the existing web deployment model (`Docker + Caddy` with Scrypted service).

Decision rationale:

- Prevent strategic split between Electron and Tauri during integration-critical execution.
- Keep dashboard integration critical path aligned to frozen routing/auth/API contracts.
- Current `main` does not contain landed `server-app` or `server-app-tauri` directories, so adopting either as canonical now would add unplanned delivery risk.

## 2) Lifecycle expectations (first release)

Canonical lifecycle expectations for operations:

- Service process lifecycle is managed by container runtime policy (`restart: unless-stopped`) and host startup.
- Reconnect behavior relies on browser/dashboard client reconnect against canonical ingress and websocket proxy path.
- Health model is operator-driven and runbook-based:
  - container/service state checks
  - API/UI reachability checks
  - websocket behavior checks under normal and degraded conditions

## 3) Packaging, distribution, and support policy

For the first release:

- **Packaging**: web distribution only (containerized infra deployment assets).
- **Distribution channel**: repository-documented infra/operator flow.
- **Support scope**: baseline support covers canonical web runtime path only.
- **Out-of-scope**: no production support commitment for Electron/Tauri artifacts until explicit post-release promotion decision.

## 4) Non-canonical track control

To keep non-canonical runtime tracks out of the critical path:

- Electron/Tauri work remains isolated to dedicated PR/workstreams.
- No dependency from integration-critical milestones (Tracks C/D) on desktop runtime delivery.
- Any future canonical promotion requires:
  1. explicit runtime decision update artifact,
  2. lifecycle/support policy revision,
  3. checklist update with evidence links.

## Track B completion statement

Track B checklist items are complete as a **runtime decision and policy freeze** for first-release execution. Desktop runtime adoption remains a later controlled change.
