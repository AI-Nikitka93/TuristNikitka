# AI setup for Nikitka AI Travel

This site has a Vercel serverless endpoint:

```text
/api/ai-chat
```

The browser never receives real API keys. The frontend calls `/api/ai-chat`, and the function chooses an available provider in this order:

1. OpenRouter
2. Groq
3. xAI Grok, optional

If no provider key is configured or a free limit is exhausted, the chat falls back to the local scripted assistant.

## Where to put keys

### Vercel production

Open:

```text
Vercel -> turist-nikitka -> Settings -> Environment Variables
```

Add the variables for `Production`, `Preview`, and `Development` if needed:

```text
AI_PROVIDER=auto
SITE_URL=https://turist-nikitka.vercel.app
OPENROUTER_API_KEY=your_openrouter_key
OPENROUTER_MODEL=openrouter/free
GROQ_API_KEY=your_groq_key
GROQ_MODEL=openai/gpt-oss-120b
```

Do not paste API keys into chat or commit them to GitHub.

After changing Vercel env vars, redeploy:

```powershell
vercel deploy . --prod -y
```

### Local development

Create a local file:

```text
M:\Projects\sites\TuristNikitka\.env.local
```

Use `.env.example` as the template. `.env.local` is ignored by Git.

For local API testing, run the site through Vercel:

```powershell
vercel dev
```

A plain static server can render the HTML/CSS/JS, but it will not run `/api/ai-chat`.

## Provider notes

### OpenRouter

Use:

```text
OPENROUTER_API_KEY
OPENROUTER_MODEL=openrouter/free
```

`openrouter/free` routes to available free models. You can also set a concrete model ID from the OpenRouter `/models` endpoint, for example an ID ending with `:free`.

Live check on 2026-05-21 found 24 OpenRouter free model IDs. Availability and limits are volatile, so keep `openrouter/free` unless a concrete model has been tested with your key.

### Groq

Use:

```text
GROQ_API_KEY
GROQ_MODEL=openai/gpt-oss-120b
```

This is Groq API, not xAI Grok. Groq has free-tier limits per model and organization. If the default model is rate-limited, change `GROQ_MODEL` to another model shown in your Groq console/docs.

### xAI Grok

Optional:

```text
XAI_API_KEY
XAI_MODEL=grok-4-fast
```

Official xAI API access is credit/paid-account based. Do not treat it as a permanent free API unless xAI's own current docs or account console explicitly show free credits for your account.

## Current fallback behavior

If the API function cannot call any provider, the chat still answers using local catalog rules. The UI status changes to:

```text
локальный fallback
```
