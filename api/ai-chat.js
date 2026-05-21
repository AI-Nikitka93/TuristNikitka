const PROVIDERS = {
    openrouter: {
        keyEnv: 'OPENROUTER_API_KEY',
        modelEnv: 'OPENROUTER_MODEL',
        defaultModel: 'openrouter/free',
        endpoint: 'https://openrouter.ai/api/v1/chat/completions',
        label: 'OpenRouter'
    },
    groq: {
        keyEnv: 'GROQ_API_KEY',
        modelEnv: 'GROQ_MODEL',
        defaultModel: 'openai/gpt-oss-120b',
        endpoint: 'https://api.groq.com/openai/v1/chat/completions',
        label: 'Groq'
    },
    xai: {
        keyEnv: 'XAI_API_KEY',
        modelEnv: 'XAI_MODEL',
        defaultModel: 'grok-4-fast',
        endpoint: 'https://api.x.ai/v1/chat/completions',
        label: 'xAI Grok'
    }
};

const SYSTEM_PROMPT = [
    'Ты Nikitka AI Concierge на демо-сайте портфолио туристического агентства.',
    'Отвечай по-русски, коротко и практично: 2-5 предложений.',
    'Все цены, телефоны, адреса, наличие туров и заявки вымышлены; не выдавай их за реальные услуги.',
    'Используй валюту BYN, демо-адрес в Минске и маршруты каталога: Бали, Пхукет, Каппадокия, Альпы, Санторини, Атоллы, Дубай, Фьорды, Токио-Киото.',
    'Если пользователь хочет бронирование, предложи открыть каталог или форму заявки, но не обещай реальную бронь.',
    'Не проси API-ключи, пароли, карты, паспортные данные и другие секреты.'
].join(' ');

const FALLBACK_REPLY = 'AI-провайдер еще не подключен или временно недоступен. Я могу локально подсказать маршрут по демо-каталогу, а после добавления ключа OpenRouter/Groq отвечать будет внешняя модель.';

const sanitizeMessage = (value) => String(value || '').replace(/\s+/g, ' ').trim().slice(0, 900);

const getProviderOrder = (requestedProvider) => {
    if (requestedProvider && PROVIDERS[requestedProvider]) {
        return [requestedProvider];
    }

    const configured = String(process.env.AI_PROVIDER || 'auto').toLowerCase().trim();
    if (configured && configured !== 'auto' && PROVIDERS[configured]) {
        return [configured];
    }
    return ['openrouter', 'groq', 'xai'];
};

const buildMessages = (body) => {
    const messages = [{ role: 'system', content: SYSTEM_PROMPT }];
    const history = Array.isArray(body.history) ? body.history.slice(-6) : [];

    history.forEach((item) => {
        const role = item && item.role === 'assistant' ? 'assistant' : 'user';
        const content = sanitizeMessage(item && item.content);
        if (content) messages.push({ role, content });
    });

    const userText = sanitizeMessage(body.message);
    if (userText) messages.push({ role: 'user', content: userText });
    return messages;
};

const callProvider = async (providerId, messages) => {
    const provider = PROVIDERS[providerId];
    const apiKey = process.env[provider.keyEnv];
    const model = process.env[provider.modelEnv] || provider.defaultModel;

    if (!apiKey) {
        throw new Error(`${provider.keyEnv} is not configured`);
    }

    const headers = {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    if (providerId === 'openrouter') {
        headers['HTTP-Referer'] = process.env.SITE_URL || 'https://turist-nikitka.vercel.app';
        headers['X-OpenRouter-Title'] = 'Nikitka AI Travel';
        headers['X-Title'] = 'Nikitka AI Travel';
    }

    const upstreamResponse = await fetch(provider.endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            model,
            messages,
            temperature: 0.55,
            max_tokens: 420
        })
    });

    const payload = await upstreamResponse.json().catch(() => ({}));

    if (!upstreamResponse.ok) {
        const detail = payload.error?.message || payload.message || upstreamResponse.statusText;
        throw new Error(`${provider.label} returned ${upstreamResponse.status}: ${detail}`);
    }

    const reply = payload.choices?.[0]?.message?.content;
    if (!reply) {
        throw new Error(`${provider.label} returned an empty response`);
    }

    return {
        provider: providerId,
        providerLabel: provider.label,
        model,
        reply: String(reply).trim()
    };
};

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');

    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ ok: false, error: 'Method not allowed' });
        return;
    }

    const body = typeof req.body === 'object' && req.body ? req.body : {};
    const messages = buildMessages(body);
    const lastUserMessage = messages[messages.length - 1];

    if (!lastUserMessage || lastUserMessage.role !== 'user' || !lastUserMessage.content) {
        res.status(400).json({ ok: false, error: 'Message is required' });
        return;
    }

    const errors = [];
    const requestedProvider = String(body.provider || '').toLowerCase().trim();

    for (const providerId of getProviderOrder(requestedProvider)) {
        try {
            const result = await callProvider(providerId, messages);
            res.status(200).json({ ok: true, ...result });
            return;
        } catch (error) {
            errors.push({
                provider: providerId,
                message: error.message
            });
        }
    }

    res.status(503).json({
        ok: false,
        reply: FALLBACK_REPLY,
        error: 'No configured AI provider answered',
        providersTried: errors.map((item) => item.provider)
    });
}
