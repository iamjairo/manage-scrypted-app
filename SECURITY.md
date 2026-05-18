# Security Policy

## Supported Versions

This repository is a fork of [`koush/manage.scrypted.app`](https://github.com/koush/manage.scrypted.app)
plus additional infrastructure (`infra/`), a desktop launcher (`server-app/`,
`server-app-tauri/`), and CI tooling. Only the latest commit on `main` is
actively supported.

## Reporting a Vulnerability

**Please do not open public issues for security problems.**

Report vulnerabilities privately via GitHub:

1. Go to the [Security tab](https://github.com/iamjairo/manage.scrypted.app/security).
2. Click **Report a vulnerability** to open a private Security Advisory.

For issues affecting the **upstream Scrypted UI itself** (i.e. code that exists
in `koush/manage.scrypted.app` and isn't unique to this fork), also report to
[`koush/manage.scrypted.app`](https://github.com/koush/manage.scrypted.app/security)
and/or the [Scrypted project](https://github.com/koush/scrypted/security).

### What to include

- A clear description of the issue and impact.
- Steps to reproduce, ideally with a minimal proof of concept.
- The affected component (`src/`, `infra/`, `server-app/`, `server-app-tauri/`,
  `agent-harness/`, or CI workflows).
- Any suggested mitigation.

### What to expect

- Acknowledgement within a few days.
- A coordinated disclosure timeline agreed with the reporter.
- Credit in release notes if you'd like to be named.

## Scope

This policy covers code in this repository. It does **not** cover:

- The Scrypted server (`ghcr.io/koush/scrypted`) — see the upstream project.
- Third-party plugins installed into a Scrypted instance.
- Misconfiguration of operator-owned infrastructure (DNS, reverse proxy,
  firewall, exposing ports to the public internet without authentication, etc.).

## Hardening notes for operators

If you are deploying this project or the upstream Scrypted UI in your own
environment:

- Keep your reverse proxy, container images, and other deployment dependencies
  updated on a regular schedule.
- Do not expose Scrypted's `10080`/`10443` ports directly to the internet —
  place them behind a properly configured reverse proxy on `443` with TLS.
- For public domains, use a certificate configuration suitable for
  internet-facing services rather than a LAN-only setup.
- Rotate Scrypted admin credentials after migrations, restores, or other
  administrative recovery events.
