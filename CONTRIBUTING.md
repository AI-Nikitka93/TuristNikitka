# Contributing

Thanks for taking the time to look at `Nikitka AI Travel`.

This repository is a portfolio showcase, not an open-source template project. The source is public so reviewers can inspect the work, but reuse, rebranding, template extraction, and commercial forks are not permitted. See [LICENSE](LICENSE).

## What Contributions Are Useful

Accepted contribution types are intentionally narrow:

- broken link reports;
- browser or responsive layout bug reports;
- documentation corrections;
- security reports through the process in [SECURITY.md](SECURITY.md).

Feature PRs, clone/rebrand requests, and template extraction requests are out of scope.

## Local Setup

For the static site:

```bash
npx serve .
```

For the serverless AI endpoint:

```bash
vercel dev
```

Use `.env.example` as the local template. Never commit API keys or provider tokens.

## Checks Before a Pull Request

```powershell
node --check "js\main.js"
node --check "js\site-upgrades.js"
node --check "js\route-atlas.js"
node --check "api\ai-chat.js"
vercel build --prod
```

For visual changes, include a short before/after note and mention the viewport tested.

## Pull Request Scope

Keep PRs small and focused. Do not submit broad restyles, unrelated rewrites, or changes that turn the project into a reusable template.
