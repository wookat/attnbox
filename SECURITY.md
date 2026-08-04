# Security Policy

## Design guarantees

- The daemon binds to `127.0.0.1` only; nothing is exposed to the network by default.
- Local collectors open agent session files **read-only** and never execute their contents.
- Cloud API keys are read from environment variables, kept in memory, and sent only to their own vendor endpoint over HTTPS. attnbox has no telemetry and calls no first-party servers.

## Reporting a vulnerability

Please open a private security advisory on GitHub (`Security → Advisories → Report a vulnerability`) rather than a public issue. We aim to acknowledge reports within 72 hours.

## Supported versions

Only the latest published minor release receives security fixes.
