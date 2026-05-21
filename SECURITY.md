# Security Policy

## Supported Surface

This repository is a portfolio demo. The supported public surface is the current `main` branch and the live Vercel deployment:

```text
https://turist-nikitka.vercel.app
```

## Reporting a Vulnerability

Do not open public issues for vulnerabilities, leaked secrets, API keys, or provider-token details.

Use GitHub private vulnerability reporting if it is enabled for this repository. If that option is unavailable, contact the maintainer through the GitHub profile and share only a minimal, non-public description until a safe reporting path is agreed.

## Secret Handling

- API keys must stay in Vercel Environment Variables or ignored local env files.
- The browser must never receive provider keys.
- Do not paste secrets into issues, discussions, pull requests, screenshots, or README examples.

## Demo Boundaries

The project uses fictional travel data and does not process real payments, real bookings, or real customer records.
