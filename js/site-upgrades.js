/**
 * Product-grade route tools for the static portfolio demo.
 * No paid API calls are used: matching and route rendering run in-browser.
 */

(function () {
    const routeProfiles = [
        {
            id: 'tour-bali',
            title: 'Бали: Храмы и Вулканы',
            destination: 'Бали',
            country: 'Индонезия',
            price: 120000,
            durationDays: 7,
            pace: 'balanced',
            region: 'asia',
            interests: ['wellness', 'nature', 'culture'],
            season: 'summer',
            bestFor: 'велнес, храмы и мягкие приключения',
            map: { x: 78, y: 64 },
            route: ['Денпасар', 'Убуд', 'Кинтамани', 'Нуса-Дуа'],
            coordinates: [
                { name: 'Денпасар', lat: -8.6500, lng: 115.2167 },
                { name: 'Убуд', lat: -8.5069, lng: 115.2625 },
                { name: 'Кинтамани', lat: -8.2420, lng: 115.3400 },
                { name: 'Нуса-Дуа', lat: -8.8069, lng: 115.2255 }
            ],
            highlights: ['рисовые террасы', 'рассвет у вулкана Батур', 'балийский спа-день']
        },
        {
            id: 'tour-phuket',
            title: 'Пхукет: Морская Одиссея',
            destination: 'Пхукет',
            country: 'Таиланд',
            price: 98000,
            durationDays: 8,
            pace: 'balanced',
            region: 'asia',
            interests: ['sea', 'nature', 'food'],
            season: 'winter',
            bestFor: 'море, острова и гастрономия',
            map: { x: 74, y: 57 },
            route: ['Пхукет', 'Пхи-Пхи', 'Панг Нга', 'Сурин'],
            coordinates: [
                { name: 'Пхукет', lat: 7.8804, lng: 98.3923 },
                { name: 'Пхи-Пхи', lat: 7.7407, lng: 98.7784 },
                { name: 'Панг Нга', lat: 8.4501, lng: 98.5255 },
                { name: 'Сурин', lat: 8.0248, lng: 98.2767 }
            ],
            highlights: ['день на катамаране', 'тайская кухня', 'снорклинг у островов']
        },
        {
            id: 'tour-cappadocia',
            title: 'Каппадокия: Полет мечты',
            destination: 'Каппадокия',
            country: 'Турция',
            price: 60000,
            durationDays: 4,
            pace: 'active',
            region: 'middle',
            interests: ['culture', 'photo', 'nature'],
            season: 'spring',
            bestFor: 'короткий вау-маршрут и рассветные фото',
            map: { x: 55, y: 42 },
            route: ['Кайсери', 'Гереме', 'Долина Любви', 'Учхисар'],
            coordinates: [
                { name: 'Кайсери', lat: 38.7205, lng: 35.4826 },
                { name: 'Гереме', lat: 38.6431, lng: 34.8289 },
                { name: 'Долина Любви', lat: 38.6670, lng: 34.8240 },
                { name: 'Учхисар', lat: 38.6306, lng: 34.8050 }
            ],
            highlights: ['рассветные шары', 'пещерный отель', 'маршрут по долинам']
        },
        {
            id: 'tour-swiss',
            title: 'Сказочная Швейцария',
            destination: 'Швейцария',
            country: 'Швейцария',
            focusName: 'Альпы',
            price: 130000,
            durationDays: 7,
            pace: 'balanced',
            region: 'europe',
            interests: ['mountains', 'comfort', 'photo'],
            season: 'summer',
            bestFor: 'альпы, поезда и премиальный комфорт',
            map: { x: 47, y: 36 },
            route: ['Цюрих', 'Люцерн', 'Интерлакен', 'Церматт'],
            coordinates: [
                { name: 'Цюрих', lat: 47.3769, lng: 8.5417 },
                { name: 'Люцерн', lat: 47.0502, lng: 8.3093 },
                { name: 'Интерлакен', lat: 46.6863, lng: 7.8632 },
                { name: 'Церматт', lat: 46.0207, lng: 7.7491 }
            ],
            highlights: ['панорамный поезд', 'Маттерхорн', 'озерный день']
        },
        {
            id: 'tour-santorini',
            title: 'Санторини: Греческая Сказка',
            destination: 'Санторини',
            country: 'Греция',
            price: 110000,
            durationDays: 6,
            pace: 'slow',
            region: 'europe',
            interests: ['sea', 'photo', 'romance'],
            season: 'summer',
            bestFor: 'закаты, море и спокойный темп',
            map: { x: 52, y: 43 },
            route: ['Фира', 'Ия', 'Акротири', 'Красный пляж'],
            coordinates: [
                { name: 'Фира', lat: 36.4167, lng: 25.4333 },
                { name: 'Ия', lat: 36.4618, lng: 25.3753 },
                { name: 'Акротири', lat: 36.3519, lng: 25.4037 },
                { name: 'Красный пляж', lat: 36.3483, lng: 25.3959 }
            ],
            highlights: ['закат в Ие', 'винодельни', 'кальдера на катере']
        },
        {
            id: 'tour-maldives',
            title: 'Райский отдых на Мальдивах',
            destination: 'Мальдивы',
            country: 'Мальдивы',
            focusName: 'Атоллы',
            price: 180000,
            durationDays: 6,
            pace: 'slow',
            region: 'islands',
            interests: ['sea', 'wellness', 'comfort'],
            season: 'winter',
            bestFor: 'полное восстановление и приватность',
            map: { x: 67, y: 63 },
            route: ['Мале', 'атолл Баа', 'домашний риф', 'спа-остров'],
            coordinates: [
                { name: 'Мале', lat: 4.1755, lng: 73.5093 },
                { name: 'атолл Баа', lat: 5.2543, lng: 73.0699 },
                { name: 'домашний риф', lat: 5.1310, lng: 73.0500 },
                { name: 'спа-остров', lat: 4.8330, lng: 73.4100 }
            ],
            highlights: ['вилла у воды', 'снорклинг', 'ужин на песчаной косе']
        },
        {
            id: 'tour-dubai',
            title: 'Дубай: Город будущего',
            destination: 'Дубай',
            country: 'ОАЭ',
            price: 95000,
            durationDays: 5,
            pace: 'active',
            region: 'middle',
            interests: ['city', 'comfort', 'food'],
            season: 'winter',
            bestFor: 'город, пустыня и сервис без длинного перелета',
            map: { x: 59, y: 48 },
            route: ['Даунтаун', 'Марина', 'пустыня', 'Пальма Джумейра'],
            coordinates: [
                { name: 'Даунтаун', lat: 25.1972, lng: 55.2744 },
                { name: 'Марина', lat: 25.0800, lng: 55.1400 },
                { name: 'пустыня', lat: 24.8200, lng: 55.3500 },
                { name: 'Пальма Джумейра', lat: 25.1124, lng: 55.1390 }
            ],
            highlights: ['ужин в пустыне', 'Burj Khalifa', 'пляжный день']
        },
        {
            id: 'tour-norway',
            title: 'Фьорды Норвегии и Северное Сияние',
            destination: 'Норвегия',
            country: 'Норвегия',
            focusName: 'Фьорды',
            price: 155000,
            durationDays: 9,
            pace: 'active',
            region: 'europe',
            interests: ['mountains', 'nature', 'photo'],
            season: 'winter',
            bestFor: 'север, фьорды и фото-экспедиция',
            map: { x: 48, y: 20 },
            route: ['Осло', 'Берген', 'Флом', 'Тромсе'],
            coordinates: [
                { name: 'Осло', lat: 59.9139, lng: 10.7522 },
                { name: 'Берген', lat: 60.3913, lng: 5.3221 },
                { name: 'Флом', lat: 60.8611, lng: 7.1144 },
                { name: 'Тромсе', lat: 69.6492, lng: 18.9553 }
            ],
            highlights: ['фьорд-круиз', 'северное сияние', 'поезд Флом']
        },
        {
            id: 'tour-japan',
            title: 'Токио и Киото: Традиции и Будущее',
            destination: 'Япония',
            country: 'Япония',
            focusName: 'Токио-Киото',
            price: 210000,
            durationDays: 10,
            pace: 'active',
            region: 'asia',
            interests: ['city', 'culture', 'food'],
            season: 'spring',
            bestFor: 'контраст мегаполиса, храмов и кухни',
            map: { x: 84, y: 39 },
            route: ['Токио', 'Хаконэ', 'Киото', 'Нара'],
            coordinates: [
                { name: 'Токио', lat: 35.6762, lng: 139.6503 },
                { name: 'Хаконэ', lat: 35.2324, lng: 139.1069 },
                { name: 'Киото', lat: 35.0116, lng: 135.7681 },
                { name: 'Нара', lat: 34.6851, lng: 135.8048 }
            ],
            highlights: ['ночной Токио', 'онсэн у Фудзи', 'храмы Киото']
        }
    ];

    const byId = new Map(routeProfiles.map((tour) => [tour.id, tour]));
    window.NikitkaTravel = {
        origin: { name: 'Москва', lat: 55.7558, lng: 37.6173 },
        routes: routeProfiles,
        getRoute: (id) => byId.get(id)
    };

    const formatPrice = (value) => `${Number(value).toLocaleString('ru-RU')} ₽`;
    const matcherOrigin = { name: 'Москва', lat: 55.7558, lng: 37.6173 };
    let matcherMapApi = { selectRoute() {} };
    const routeCountryLabel = (tour) => tour.country || tour.destination;
    const routePlaceLabel = (tour) => tour.focusName || tour.destination;
    const routeMapTitle = (tour) => {
        const country = routeCountryLabel(tour);
        const place = routePlaceLabel(tour);
        return country === place ? `Карта: ${country}` : `Карта: ${country} · ${place}`;
    };

    const paceLabels = {
        slow: 'спокойный',
        balanced: 'сбалансированный',
        active: 'активный'
    };

    const interestLabels = {
        nature: 'природа',
        sea: 'море',
        culture: 'культура',
        comfort: 'комфорт',
        food: 'гастрономия',
        photo: 'фото-маршрут',
        mountains: 'горы',
        wellness: 'велнес',
        city: 'город'
    };

    const seasonLabels = {
        summer: 'лето',
        winter: 'зима',
        spring: 'весна/осень'
    };

    const escapeHtml = (value) => String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    const describeDays = (start, end) => (start === end ? `День ${start}` : `Дни ${start}-${end}`);

    const syncCustomSelectBodyState = () => {
        document.body.classList.toggle('custom-select-open', Boolean(document.querySelector('.custom-select.is-open')));
    };

    const closeCustomSelects = (exceptControl) => {
        document.querySelectorAll('.custom-select.is-open').forEach((control) => {
            if (control === exceptControl) return;

            control.classList.remove('is-open');
            control.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', 'false');
            control.closest('.input-container')?.classList.remove('has-open-custom-select');
            control.closest('.search-field')?.classList.remove('select-is-open');
        });
        syncCustomSelectBodyState();
    };

    const setCustomSelectOpen = (control, open) => {
        closeCustomSelects(open ? control : null);
        control.classList.toggle('is-open', open);
        control.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', String(open));
        control.closest('.input-container')?.classList.toggle('has-open-custom-select', open);
        control.closest('.search-field')?.classList.toggle('select-is-open', open);
        syncCustomSelectBodyState();
    };

    const focusCustomOption = (control, direction) => {
        const options = Array.from(control.querySelectorAll('.custom-select-option:not(:disabled)'));
        if (!options.length) return;

        const activeIndex = options.findIndex((option) => option === document.activeElement);
        const selectedIndex = options.findIndex((option) => option.getAttribute('aria-selected') === 'true');
        const currentIndex = activeIndex >= 0 ? activeIndex : Math.max(selectedIndex, 0);
        const nextIndex = (currentIndex + direction + options.length) % options.length;
        options[nextIndex].focus();
    };

    const updateCustomSelect = (select) => {
        const control = select.nextElementSibling;
        if (!control?.classList?.contains('custom-select')) return;

        const selectedOption = select.options[select.selectedIndex] || select.options[0];
        control.querySelector('.custom-select-value').textContent = selectedOption?.textContent || '';

        control.querySelectorAll('.custom-select-option').forEach((option) => {
            const isSelected = option.dataset.value === select.value;
            option.classList.toggle('is-selected', isSelected);
            option.setAttribute('aria-selected', String(isSelected));
        });
    };

    const enhanceSelect = (select) => {
        if (!select || select.dataset.customSelectEnhanced === 'true') return;

        const container = select.closest('.input-container');
        if (!container) return;

        const controlId = `${select.id || select.name || 'custom-select'}-${Math.random().toString(36).slice(2, 8)}`;
        const control = document.createElement('div');
        control.className = 'custom-select';

        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'custom-select-trigger';
        trigger.setAttribute('aria-haspopup', 'listbox');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-controls', `${controlId}-list`);

        const value = document.createElement('span');
        value.className = 'custom-select-value';
        trigger.append(value);

        const list = document.createElement('div');
        list.className = 'custom-select-list';
        list.id = `${controlId}-list`;
        list.setAttribute('role', 'listbox');

        Array.from(select.options).forEach((nativeOption) => {
            const option = document.createElement('button');
            option.type = 'button';
            option.className = 'custom-select-option';
            option.dataset.value = nativeOption.value;
            option.textContent = nativeOption.textContent;
            option.disabled = nativeOption.disabled;
            option.setAttribute('role', 'option');

            option.addEventListener('click', () => {
                if (nativeOption.disabled) return;

                select.value = nativeOption.value;
                updateCustomSelect(select);
                setCustomSelectOpen(control, false);
                trigger.focus();
                select.dispatchEvent(new Event('input', { bubbles: true }));
                select.dispatchEvent(new Event('change', { bubbles: true }));
            });

            option.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    focusCustomOption(control, 1);
                } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    focusCustomOption(control, -1);
                } else if (event.key === 'Escape') {
                    event.preventDefault();
                    setCustomSelectOpen(control, false);
                    trigger.focus();
                }
            });

            list.append(option);
        });

        trigger.addEventListener('click', () => {
            const willOpen = !control.classList.contains('is-open');
            setCustomSelectOpen(control, willOpen);
        });

        trigger.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setCustomSelectOpen(control, true);
                focusCustomOption(control, 1);
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setCustomSelectOpen(control, true);
                focusCustomOption(control, -1);
            } else if (event.key === 'Escape') {
                setCustomSelectOpen(control, false);
            }
        });

        select.addEventListener('change', () => updateCustomSelect(select));

        control.append(trigger, list);
        select.classList.add('native-select-hidden');
        select.dataset.customSelectEnhanced = 'true';
        select.tabIndex = -1;
        select.setAttribute('aria-hidden', 'true');
        select.after(control);
        container.classList.add('has-custom-select');
        updateCustomSelect(select);
    };

    const initCustomSelects = () => {
        document.querySelectorAll('.input-container select:not([data-native-select-only])').forEach(enhanceSelect);

        if (window.__nikitkaCustomSelectObserver) return;

        document.addEventListener('click', (event) => {
            if (!event.target.closest('.custom-select')) closeCustomSelects();
        });

        window.addEventListener('resize', () => closeCustomSelects());

        window.__nikitkaCustomSelectObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (!(node instanceof HTMLElement)) return;
                    if (node.matches?.('.input-container select')) enhanceSelect(node);
                    node.querySelectorAll?.('.input-container select').forEach(enhanceSelect);
                });
            });
        });
        window.__nikitkaCustomSelectObserver.observe(document.body, { childList: true, subtree: true });
    };

    const scoreTour = (tour, preferences) => {
        let score = 42;
        if (tour.price <= preferences.budget) score += 20;
        if (tour.pace === preferences.pace) score += 18;
        if (tour.durationDays <= preferences.duration) score += 12;
        if (tour.interests.includes(preferences.interest)) score += 20;
        if (tour.season === preferences.season) score += 10;
        return Math.min(score, 100);
    };

    const buildMatchReasons = (tour, preferences) => {
        if (!preferences) {
            return [
                { label: 'Бюджет', value: `от ${formatPrice(tour.price)}`, status: 'готовая смета' },
                { label: 'Темп', value: paceLabels[tour.pace] || tour.pace, status: 'по сценарию' },
                { label: 'Фокус', value: tour.bestFor, status: 'ключ маршрута' }
            ];
        }

        const interestMatch = tour.interests.includes(preferences.interest);
        const overBudget = Math.max(0, tour.price - preferences.budget);

        return [
            {
                label: 'Бюджет',
                value: tour.price <= preferences.budget ? 'укладывается' : `выше на ${formatPrice(overBudget)}`,
                status: `${formatPrice(tour.price)} за человека`
            },
            {
                label: 'Темп',
                value: tour.pace === preferences.pace ? 'точное совпадение' : `${paceLabels[tour.pace] || tour.pace} темп`,
                status: `выбран ${paceLabels[preferences.pace] || preferences.pace}`
            },
            {
                label: 'Интерес',
                value: interestMatch ? interestLabels[preferences.interest] || preferences.interest : tour.bestFor,
                status: interestMatch ? 'есть в маршруте' : 'ближайший готовый сценарий'
            },
            {
                label: 'Сезон',
                value: tour.season === preferences.season ? 'попали в сезон' : `${seasonLabels[tour.season] || tour.season}`,
                status: `запрос: ${seasonLabels[preferences.season] || preferences.season}`
            }
        ];
    };

    const buildDayPlan = (tour) => {
        const stops = tour.coordinates?.length ? tour.coordinates.map((point) => point.name) : tour.route;
        const totalDays = Math.max(Number(tour.durationDays) || stops.length, stops.length);

        return stops.map((stop, index) => {
            const start = Math.floor((index * totalDays) / stops.length) + 1;
            const end = Math.max(start, Math.floor(((index + 1) * totalDays) / stops.length));
            return {
                days: describeDays(start, end),
                stop,
                note: tour.highlights[index % tour.highlights.length]
            };
        });
    };

    const renderRouteDetails = (target, tour, score, preferences) => {
        if (!target || !tour) return;

        const scoreLine = Number.isFinite(score)
            ? `<div class="route-score"><span>${score}% match</span><small>локальный скоринг</small></div>`
            : '';
        const reasons = buildMatchReasons(tour, preferences);
        const dayPlan = buildDayPlan(tour);
        const summary = [
            { label: 'Страна', value: routeCountryLabel(tour) },
            { label: 'Бюджет', value: `от ${formatPrice(tour.price)}` },
            { label: 'Длительность', value: `${tour.durationDays} дней` },
            { label: 'Темп', value: paceLabels[tour.pace] || tour.pace }
        ];

        target.innerHTML = `
            <div class="route-details-head">
                <div>
                    <span class="section-subtitle">${escapeHtml(routeCountryLabel(tour))} · ${escapeHtml(routePlaceLabel(tour))}</span>
                    <h3>${escapeHtml(tour.title)}</h3>
                </div>
                ${scoreLine}
            </div>
            <p>${escapeHtml(tour.bestFor)}. Маршрут собран как готовая заявка: перелет, точки, темп и ожидания менеджеру понятны сразу.</p>
            <div class="route-planner-actions">
                <a href="tours.html?book=${escapeHtml(tour.id)}" class="btn btn-primary">Оставить заявку</a>
                <a href="#routeAtlas" class="route-text-link">Смотреть 3D-карту</a>
            </div>
            <div class="route-day-plan" aria-label="План маршрута по дням">
                ${dayPlan.map((item, index) => `
                    <article class="route-day-item">
                        <span class="route-day-dot">${index + 1}</span>
                        <div class="route-day-copy">
                            <small>${escapeHtml(item.days)}</small>
                            <strong>${escapeHtml(item.stop)}</strong>
                            <p>${escapeHtml(item.note)}</p>
                        </div>
                    </article>
                `).join('')}
            </div>
            <div class="route-summary-strip">
                ${summary.map((item) => `
                    <span>
                        <small>${escapeHtml(item.label)}</small>
                        <strong>${escapeHtml(item.value)}</strong>
                    </span>
                `).join('')}
            </div>
            <div class="match-reason-grid">
                ${reasons.map((reason) => `
                    <article class="match-reason-card">
                        <span>${escapeHtml(reason.label)}</span>
                        <strong>${escapeHtml(reason.value)}</strong>
                        <small>${escapeHtml(reason.status)}</small>
                    </article>
                `).join('')}
            </div>
        `;
    };

    const initTripDesigner = () => {
        const form = document.getElementById('tripDesignerForm');
        const result = document.getElementById('tripDesignerResult') || document.getElementById('routeMapDetails');
        if (!form || !result) return;

        let currentRanked = [];
        let currentPreferences = null;

        const showMatch = (match) => {
            if (!match?.tour) return;
            renderRouteDetails(result, match.tour, match.score, currentPreferences);
            matcherMapApi.selectRoute(match.tour);
            setActiveMapMarker(match.tour.id);
        };

        const runMatch = () => {
            const formData = new FormData(form);
            const preferences = {
                budget: Number(formData.get('budget') || 130000),
                pace: formData.get('pace') || 'balanced',
                interest: formData.get('interest') || 'nature',
                season: formData.get('season') || 'summer',
                duration: Number(formData.get('duration') || 7)
            };

            currentPreferences = preferences;
            currentRanked = routeProfiles
                .map((tour) => ({ tour, score: scoreTour(tour, preferences) }))
                .sort((a, b) => b.score - a.score);

            showMatch(currentRanked[0]);
        };

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            runMatch();
        });

        form.addEventListener('change', runMatch);
        window.addEventListener('nikitka:route-country-selected', (event) => {
            const tour = byId.get(event.detail?.tourId);
            if (!tour) return;

            const score = currentPreferences ? scoreTour(tour, currentPreferences) : undefined;
            const match = currentRanked.find((item) => item.tour.id === tour.id) || { tour, score };
            showMatch(match);
        });
        runMatch();
    };

    const setActiveMapMarker = (tourId) => {
        document.querySelectorAll('[data-route-marker]').forEach((marker) => {
            marker.classList.toggle('active', marker.getAttribute('data-route-marker') === tourId);
        });
    };

    const setActiveCountryRoute = (tourId) => {
        document.querySelectorAll('[data-country-route]').forEach((button) => {
            button.classList.toggle('active', button.getAttribute('data-country-route') === tourId);
        });
    };

    const initRouteMap = () => {
        const mapEl = document.getElementById('matcherRouteMap');
        const details = document.getElementById('routeMapDetails');
        const title = document.getElementById('matcherMapTitle');
        const meta = document.getElementById('matcherRouteMeta');
        const routePicker = document.getElementById('matcherCountryRoutes');
        const countryCount = document.getElementById('matcherCountryCount');
        if (!mapEl || !details) return;

        const syncMapCopy = (tour) => {
            if (title) title.textContent = routeMapTitle(tour);
            if (meta) meta.textContent = `${tour.route.length} точки · ${tour.durationDays} дней`;
            mapEl.dataset.selectedRoute = tour.id;
            setActiveCountryRoute(tour.id);
        };

        if (countryCount) {
            const countries = new Set(routeProfiles.map((tour) => routeCountryLabel(tour)));
            countryCount.textContent = `${countries.size} стран`;
        }

        if (routePicker) {
            routePicker.innerHTML = routeProfiles.map((tour) => `
                <button class="route-country-button" type="button" data-country-route="${escapeHtml(tour.id)}" aria-label="${escapeHtml(routeCountryLabel(tour))}: ${escapeHtml(routePlaceLabel(tour))}">
                    <small>${escapeHtml(routeCountryLabel(tour))}</small>
                    <strong>${escapeHtml(routePlaceLabel(tour))}</strong>
                </button>
            `).join('');

            routePicker.querySelectorAll('[data-country-route]').forEach((button) => {
                button.addEventListener('click', () => {
                    window.dispatchEvent(new CustomEvent('nikitka:route-country-selected', {
                        detail: { tourId: button.getAttribute('data-country-route') }
                    }));
                });
            });
        }

        if (!window.L) {
            mapEl.innerHTML = '<div class="route-map-fallback">Карта не загрузилась, но маршрутный сценарий доступен.</div>';
            matcherMapApi = {
                selectRoute(tour) {
                    syncMapCopy(tour);
                    renderRouteDetails(details, tour);
                }
            };
            matcherMapApi.selectRoute(routeProfiles[0]);
            return;
        }

        const map = window.L.map(mapEl, {
            scrollWheelZoom: false,
            zoomControl: true,
            attributionControl: true
        }).setView([30, 25], 2);

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const layers = window.L.layerGroup().addTo(map);
        mapEl.dataset.mapReady = 'true';

        const makeMarker = (index) => window.L.divIcon({
            className: 'matcher-route-marker',
            html: `<span>${index + 1}</span>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17]
        });

        matcherMapApi = {
            selectRoute(tour) {
                if (!tour?.coordinates?.length) return;

                layers.clearLayers();
                syncMapCopy(tour);

                const latLngs = tour.coordinates.map((point) => [point.lat, point.lng]);

                window.L.polyline(latLngs, {
                    color: '#f2a93b',
                    weight: 5,
                    opacity: 0.94,
                    lineCap: 'round',
                    lineJoin: 'round'
                }).addTo(layers);

                window.L.polyline([
                    [matcherOrigin.lat, matcherOrigin.lng],
                    [tour.coordinates[0].lat, tour.coordinates[0].lng]
                ], {
                    color: '#00f2fe',
                    weight: 2,
                    opacity: 0.56,
                    dashArray: '7 9'
                }).addTo(layers);

                tour.coordinates.forEach((point, index) => {
                    window.L.marker([point.lat, point.lng], { icon: makeMarker(index) })
                        .bindTooltip(point.name, { direction: 'top', offset: [0, -12] })
                        .addTo(layers);
                });

                map.fitBounds(window.L.latLngBounds(latLngs), {
                    padding: [42, 42],
                    maxZoom: 10
                });

                window.setTimeout(() => map.invalidateSize(), 80);
            }
        };

        renderRouteDetails(details, routeProfiles[0]);
        matcherMapApi.selectRoute(routeProfiles[0]);
    };

    const initTourPagePanel = () => {
        const panel = document.getElementById('tourPageRoutePanel');
        if (!panel) return;

        panel.innerHTML = `
            <div class="catalog-ai-copy">
                <span class="section-subtitle">AI-free подбор</span>
                <h3>Выберите тур по сценарию поездки</h3>
                <p>Подбор работает локально в браузере: без платных API, ключей и передачи данных наружу.</p>
            </div>
            <div class="route-scenario-buttons">
                <button type="button" data-scenario="slow">Спокойный отдых</button>
                <button type="button" data-scenario="active">Активный маршрут</button>
                <button type="button" data-scenario="balanced">Баланс</button>
            </div>
        `;

        panel.querySelectorAll('[data-scenario]').forEach((button) => {
            button.addEventListener('click', () => {
                const pace = button.getAttribute('data-scenario');
                const firstMatch = routeProfiles.find((tour) => tour.pace === pace);
                if (firstMatch && typeof window.openBookingModal === 'function') {
                    window.openBookingModal(firstMatch.id);
                }
            });
        });
    };

    const initBookingRoutePreview = () => {
        const preview = document.getElementById('bookingRoutePreview');
        if (!preview || typeof window.openBookingModal !== 'function') return;

        const renderPreview = (tourId) => {
            const tour = byId.get(tourId);
            if (!tour) {
                preview.innerHTML = '';
                return;
            }

            preview.innerHTML = `
                <div class="booking-route-title">Маршрут заявки</div>
                <div class="booking-route-stops">${tour.route.map((stop) => `<span>${stop}</span>`).join('')}</div>
                <p>${tour.highlights.join(' • ')}</p>
            `;
        };

        const baseOpen = window.openBookingModal;
        window.openBookingModal = function (tourId) {
            baseOpen(tourId);
            renderPreview(tourId);
        };

        window.addEventListener('nikitka:booking-opened', (event) => {
            renderPreview(event.detail?.tourId);
        });

        const activeTourId = document.getElementById('bookingTourId')?.value;
        if (activeTourId) renderPreview(activeTourId);
    };

    document.addEventListener('DOMContentLoaded', () => {
        initCustomSelects();
        initRouteMap();
        initTripDesigner();
        initTourPagePanel();
        initBookingRoutePreview();
    });
})();
