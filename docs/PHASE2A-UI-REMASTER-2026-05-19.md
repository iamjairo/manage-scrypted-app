# Phase 2A — UI Remaster for Dashboard Alignment (Execution Artifact)

Date: 2026-05-19

This document fulfills Track A requirements from `HANDOFF-GO-NO-GO-CHECKLIST.md`.

## 1) Target integration model (frozen for Track A)

- **Selected model**: embedded surface inside the IoT Dashboard shell.
- **Ingress model**: keep current canonical Caddy ingress and `/scrypted/*` backend namespace unchanged.
- **UI hosting expectation**: management UI remains deployable as a standalone SPA, but Track A design/system decisions optimize for embedded dashboard rendering first.
- **Navigation model**: dashboard-shell navigation owns top-level app switching; management UI owns in-surface local navigation.

## 2) Adaptation path to React+Vite+Tailwind compatibility strategy

Track A does not rewrite the current Vue production app. It defines a staged compatibility path:

1. **Contract-first UI inventory**
   - map current UI surfaces to reusable dashboard-facing feature contracts (navigation, plugin/device views, auth/session touchpoints).
2. **Design-token bridge**
   - define a framework-agnostic token layer (spacing, typography, color roles, elevation, state colors) consumable by current Vue styling and future React+Tailwind implementation.
3. **Component parity specification**
   - specify behavior-level contracts for key UI primitives so they can be implemented in either Vue/Vuetify or React/Tailwind without behavior drift.
4. **Incremental compatibility lane**
   - prioritize shared-shell compatibility requirements before any framework migration decision.
5. **Migration decision boundary**
   - React+Vite+Tailwind implementation remains a later execution choice after parity and UX validation pass this Track A contract.

## 3) Component/theming/navigation parity requirements

### Required component parity set

- Global app shell frame (header, side navigation, content region)
- Device list and detail panels
- Plugin management views
- Terminal/log views and status indicators
- Form controls and validation states
- Dialogs/modals, notifications, and destructive-action confirmations

### Theming parity requirements

- Support light/dark theme modes with equivalent contrast and state signaling
- Keep semantic role mapping consistent (`primary`, `success`, `warning`, `error`, `info`)
- Preserve spacing and typography scale invariants for embedded layout constraints

### Navigation parity requirements

- No loss of route-level discoverability for current management tasks
- Deep-link behavior must remain stable for embedded and standalone contexts
- Browser history behavior must remain predictable when hosted in dashboard shell

## 4) UX flow validation in dashboard context

Track A validation matrix (minimum required):

1. **Authentication entry and return flow**
2. **Device discovery to detail inspection flow**
3. **Plugin install/update workflow**
4. **Automation/configuration edit-save cycle**
5. **Realtime update/streaming surface behavior**
6. **Error-state and recovery flow**

Acceptance threshold:

- Each flow is validated in both:
  - embedded dashboard context, and
  - standalone app context
- Any divergence must be documented with explicit mitigation or approved exception.

## Track A completion statement

Track A checklist items are considered complete for this phase as **contract/spec completion** for the UI remaster lane. Implementation/migration work continues under subsequent Phase 2 execution PRs.
