# Nikitka AI Travel

Портфолио-концепт сайта тур-агентства: подбор тура, локальный travel matcher, OpenStreetMap-маршруты, 3D-атлас и заявка на поездку.

## Стек

- HTML, CSS, JavaScript
- Leaflet + OpenStreetMap для карт
- Three.js для 3D-глобуса
- Vercel static hosting + serverless endpoint `/api/ai-chat`

## AI

- `api/ai-chat.js` подключает OpenRouter, Groq и опционально xAI Grok через серверный endpoint.
- `AI_SETUP.md` объясняет, куда добавить API-ключи в Vercel и локально.
- Ключи нельзя хранить в фронтенд-файлах или коммитить в GitHub.

## Публикация

- Live site: https://turist-nikitka.vercel.app
- GitHub: https://github.com/AI-Nikitka93/TuristNikitka
- История проекта: `PROJECT_HISTORY.md`

## Запуск локально

Откройте `index.html` через статический сервер. Например:

```bash
npx serve .
```

Главная страница: `index.html`.

Для проверки `/api/ai-chat` локально используйте `vercel dev`, потому что обычный статический сервер не запускает serverless functions.
