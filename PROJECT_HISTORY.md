# История проекта

### 2026-05-21 22:56:45 +03:00 — GitHub portfolio packaging
- Changed: оформлен публичный GitHub surface как portfolio-only showcase: README.md, README.ru.md, restrictive LICENSE, community/trust files, issue/PR templates, CODEOWNERS, changelog, architecture docs, packaging audit и README screenshot.
- Files: `README.md`, `README.ru.md`, `LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`, `docs/architecture.md`, `docs/GITHUB_PACKAGING_AUDIT.md`, `docs/assets/github-home-preview.png`, `.github/ISSUE_TEMPLATE/bug_report.yml`, `.github/ISSUE_TEMPLATE/config.yml`, `.github/PULL_REQUEST_TEMPLATE.md`, `.github/CODEOWNERS`, `PROJECT_HISTORY.md`.
- Verification: Playwright screenshot captured from local static server at `127.0.0.1:4173` with `1440x950` viewport; `node --check` passed for `js/main.js`, `js/site-upgrades.js`, `js/route-atlas.js`, `api/ai-chat.js`; issue-template YAML parsed successfully; `vercel build --prod` passed.
- Status: DONE.

## 2026-05-21

Проект: `Nikitka AI Travel`

Локальная папка: `M:\Projects\sites\TuristNikitka`

Публичные площадки:

- GitHub repository: `AI-Nikitka93/TuristNikitka`
- GitHub URL: https://github.com/AI-Nikitka93/TuristNikitka
- Vercel project: `turist-nikitka`
- Production URL: https://turist-nikitka.vercel.app

Что зафиксировано:

- портфолио-концепт сайта тур-агентства;
- локальный travel matcher без платных AI/API ключей;
- маршруты по странам на OpenStreetMap;
- 3D-атлас маршрутов с fallback для браузеров без WebGL;
- 3D-атлас отделен от точной OSM-карты: на главной больше нет двух карт маршрута подряд;
- публикация в GitHub и production deployment на Vercel.

Примечание:

- Vercel CLI deployment работает.
- Автоматический GitHub -> Vercel deploy требует подключить GitHub Login Connection в аккаунте Vercel.
