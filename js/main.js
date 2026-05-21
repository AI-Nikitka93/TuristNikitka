/**
 * Nikitka AI Travel - Core Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header Logic
    const header = document.querySelector('.header');
    const handleScroll = () => {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    // 2. Mobile Menu Navigation Burger Toggle
    const burger = document.getElementById('navBurger');
    const navMenu = document.getElementById('navMenu');

    if (burger && navMenu) {
        const setMenuOpen = (open) => {
            burger.classList.toggle('active', open);
            navMenu.classList.toggle('active', open);
            burger.setAttribute('aria-expanded', String(open));
            burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
            document.body.classList.toggle('nav-open', open);
        };

        burger.addEventListener('click', () => {
            setMenuOpen(!navMenu.classList.contains('active'));
        });

        document.addEventListener('click', (event) => {
            if (!navMenu.classList.contains('active')) return;
            if (navMenu.contains(event.target) || burger.contains(event.target)) return;
            setMenuOpen(false);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                setMenuOpen(false);
                burger.focus();
            }
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                setMenuOpen(false);
            });
        });
    }

    // 3. Global Toast System
    window.showToast = (message) => {
        let toast = document.getElementById('toastNotification');
        if (!toast) {
            // Create toaster elements dynamically if they don't exist
            toast = document.createElement('div');
            toast.id = 'toastNotification';
            toast.className = 'toast';
            toast.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span class="toast-message"></span>
            `;
            document.body.appendChild(toast);
        }
        
        toast.querySelector('.toast-message').textContent = message;
        toast.classList.add('active');

        setTimeout(() => {
            toast.classList.remove('active');
        }, 4000);
    };

    // 4. Newsletter Subscription Handling
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '') {
                window.showToast('Вы успешно подписались на рассылку предложений!');
                emailInput.value = '';
            }
        });
    }

    // 5. Dynamic Booking Search Widget (Home Page Hero Widget)
    const tabs = document.querySelectorAll('.widget-tab');
    const fieldsWrapper = document.getElementById('searchFieldsWrapper');
    const submitBtn = document.getElementById('searchSubmitBtn');
    const searchForm = document.getElementById('heroSearchForm');
    const searchFormInput = document.getElementById('searchFormCategory');

    const formTemplates = {
        tours: `
            <div class="search-field">
                <label for="destinationSelect">Куда</label>
                <div class="input-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-gradient" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <select name="destination" id="destinationSelect">
                        <option value="all">Выберите направление</option>
                        <option value="bali">Бали, Индонезия</option>
                        <option value="phuket">Пхукет, Таиланд</option>
                        <option value="cappadocia">Каппадокия, Турция</option>
                        <option value="swiss">Швейцария</option>
                        <option value="santorini">Санторини, Греция</option>
                        <option value="maldives">Мальдивы</option>
                        <option value="dubai">Дубай, ОАЭ</option>
                    </select>
                </div>
            </div>
            <div class="search-field">
                <label for="searchDate">Когда</label>
                <div class="input-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-gradient" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <input type="date" id="searchDate" name="date">
                </div>
            </div>
            <div class="search-field">
                <label for="passengersCountSelect">Кто</label>
                <div class="input-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-gradient" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <select id="passengersCountSelect" name="passengers">
                        <option value="1">1 взрослый</option>
                        <option value="2" selected>2 взрослых</option>
                        <option value="3">3 взрослых</option>
                        <option value="4">4 взрослых</option>
                        <option value="family">Семья с детьми</option>
                    </select>
                </div>
            </div>
        `,
        hotels: `
            <div class="search-field">
                <label for="hotelSelect">Отель / Курорт</label>
                <div class="input-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-gradient" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    <select name="hotel" id="hotelSelect">
                        <option value="all">Выберите отель (все)</option>
                        <option value="ayana">Ayana Resort (Бали)</option>
                        <option value="ritz">The Ritz-Carlton (Дубай)</option>
                        <option value="aman">Amangiri Resort (США)</option>
                        <option value="badrutts">Badrutt's Palace (Швейцария)</option>
                        <option value="katikies">Katikies Hotel (Санторини)</option>
                        <option value="soneva">Soneva Jani (Мальдивы)</option>
                    </select>
                </div>
            </div>
            <div class="search-field">
                <label for="checkinDate">Заезд и выезд</label>
                <div class="input-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-gradient" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <input type="text" id="checkinDate" placeholder="Выберите даты проживания" onfocus="(this.type='date')" onblur="(this.type='text')">
                </div>
            </div>
            <div class="search-field">
                <label for="guestsSelect">Гости</label>
                <div class="input-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-gradient" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <select id="guestsSelect" name="guests">
                        <option value="1">1 гость</option>
                        <option value="2" selected>2 гостя</option>
                        <option value="3">3 гостя</option>
                        <option value="4">4 гостя</option>
                        <option value="suite">Семейный люкс</option>
                    </select>
                </div>
            </div>
        `,
        flights: `
            <div class="search-field">
                <label for="routeSelect">Маршрут полета</label>
                <div class="input-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-gradient" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                    <select name="route" id="routeSelect">
                        <option value="all">Выберите авиамаршрут</option>
                        <option value="dps">Минск (MSQ) → Денпасар (DPS)</option>
                        <option value="hkt">Минск (MSQ) → Пхукет (HKT)</option>
                        <option value="ist">Минск (MSQ) → Стамбул (IST)</option>
                        <option value="zrh">Минск (MSQ) → Цюрих (ZRH)</option>
                        <option value="dxb">Минск (MSQ) → Дубай (DXB)</option>
                        <option value="mle">Минск (MSQ) → Мале (MLE)</option>
                    </select>
                </div>
            </div>
            <div class="search-field">
                <label for="flightDate">Дата вылета</label>
                <div class="input-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-gradient" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <input type="date" id="flightDate">
                </div>
            </div>
            <div class="search-field">
                <label for="flightClassSelect">Класс кабины</label>
                <div class="input-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-gradient" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>
                    <select id="flightClassSelect" name="class">
                        <option value="economy" selected>Эконом</option>
                        <option value="premium">Премиум-эконом</option>
                        <option value="business">Бизнес-класс</option>
                        <option value="first">Первый класс</option>
                    </select>
                </div>
            </div>
        `
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const targetType = tab.getAttribute('data-tab');
            
            if (searchFormInput) {
                searchFormInput.value = targetType;
            }

            if (fieldsWrapper && formTemplates[targetType]) {
                fieldsWrapper.innerHTML = formTemplates[targetType];
            }

            if (submitBtn) {
                if (targetType === 'tours') {
                    submitBtn.innerHTML = `Найти туры <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px;"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
                } else if (targetType === 'hotels') {
                    submitBtn.innerHTML = `Найти отели <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px;"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
                } else {
                    submitBtn.innerHTML = `Найти билеты <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px;"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
                }
            }
        });
    });

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            const category = searchFormInput ? searchFormInput.value : 'tours';
            if (category !== 'tours') {
                e.preventDefault();
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Ищем... <span class="spinner"></span>';
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    if (category === 'hotels') {
                        window.showToast('В демо-режиме отели добавляются в заявку. Реальный поиск API не подключен.');
                    } else if (category === 'flights') {
                        window.showToast('В демо-режиме авиабилеты фиксируются как пожелание к маршруту.');
                    }
                }, 1200);
            }
        });
    }

    // 5b. Video Preview Modal
    const playBtn = document.getElementById('heroPlayVideoBtn');
    const videoModal = document.getElementById('videoModal');
    const closeVideoBtn = document.getElementById('videoModalClose');
    const focusableModalSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    let previousVideoFocus = null;

    if (playBtn && videoModal) {
        const openVideo = () => {
            previousVideoFocus = document.activeElement && document.activeElement !== document.body
                ? document.activeElement
                : playBtn;
            videoModal.classList.add('active');
            videoModal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
            closeVideoBtn?.focus();
        };

        const closeVideo = () => {
            videoModal.classList.remove('active');
            videoModal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
            if (previousVideoFocus && typeof previousVideoFocus.focus === 'function') {
                previousVideoFocus.focus();
            }
        };

        playBtn.addEventListener('click', openVideo);

        if (closeVideoBtn) {
            closeVideoBtn.addEventListener('click', closeVideo);
        }

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideo();
            }
        });

        videoModal.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeVideo();
                return;
            }

            if (event.key !== 'Tab') return;
            const focusable = Array.from(videoModal.querySelectorAll(focusableModalSelector))
                .filter((item) => !item.hasAttribute('disabled') && item.offsetParent !== null);
            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });
    }

    document.querySelectorAll('.dest-card[onclick], .offer-card[onclick], .offer-horizontal-card[onclick]').forEach(card => {
        card.setAttribute('role', 'link');
        if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                card.click();
            }
        });
    });

    // 6. Scroll Animation Trigger (Subtle fade-in-up class)
    const fadeElems = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElems.forEach(elem => {
        scrollObserver.observe(elem);
    });

    // 7. AI Chat Concierge Chatbot Widget (May 2026 Premium Feature)
    const initAIChatConcierge = () => {
        // Create elements
        const badge = document.createElement('div');
        badge.className = 'ai-chat-badge';
        badge.id = 'aiChatBadge';
        badge.innerHTML = `
            <div class="ai-chat-badge-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#00f2fe" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                <div class="ai-chat-badge-pulse"></div>
            </div>
            <div class="ai-chat-badge-text">Подобрать тур</div>
        `;

        const windowDiv = document.createElement('div');
        windowDiv.className = 'ai-chat-window';
        windowDiv.id = 'aiChatWindow';
        windowDiv.innerHTML = `
            <div class="ai-chat-header">
                <div class="ai-chat-profile">
                    <div class="ai-chat-avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#00f2fe" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>
                    </div>
                    <div class="ai-chat-name-container">
                        <h4>Nikitka AI Concierge</h4>
                        <div class="ai-chat-status">
                            <div class="ai-chat-status-dot"></div>
                            <div class="ai-chat-status-text" id="aiChatStatusText">ожидает API-ключ</div>
                        </div>
                    </div>
                </div>
                <button class="ai-chat-close-btn" id="aiChatClose" aria-label="Закрыть помощника">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div class="ai-chat-body" id="aiChatBody">
                <div class="ai-chat-message bot">
                    Привет! Я локальный помощник этого демо-сайта. Могу подобрать маршрут по каталогу, открыть заявку и объяснить, чем отличаются туры.
                </div>
            </div>
            <div class="ai-chat-chips" id="aiChatChips">
                <button class="ai-chat-chip" data-msg="Подобрать тур на Бали">Тур на Бали</button>
                <button class="ai-chat-chip" data-msg="Расскажи про Альпы в Швейцарии">Альпы в Швейцарии</button>
                <button class="ai-chat-chip" data-msg="Лучшие отели в Дубае">Дубай и отели</button>
                <button class="ai-chat-chip" data-msg="Рассчитать бюджет поездки">Расчет бюджета</button>
            </div>
            <div class="ai-chat-footer">
                <div class="ai-chat-input-wrapper">
                    <input type="text" class="ai-chat-input" id="aiChatInput" placeholder="Задайте вопрос Nikitka AI...">
                </div>
                <button class="ai-chat-send-btn" id="aiChatSend" aria-label="Отправить вопрос">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </div>
        `;

        document.body.appendChild(badge);
        document.body.appendChild(windowDiv);

        // Interaction logic
        const chatBody = document.getElementById('aiChatBody');
        const chatInput = document.getElementById('aiChatInput');
        const chatSend = document.getElementById('aiChatSend');
        const chatClose = document.getElementById('aiChatClose');
        const chatChips = document.getElementById('aiChatChips');
        const chatStatus = document.getElementById('aiChatStatusText');

        badge.addEventListener('click', () => {
            windowDiv.classList.add('active');
            badge.style.opacity = '0';
            badge.style.pointerEvents = 'none';
        });

        const closeChat = () => {
            windowDiv.classList.remove('active');
            badge.style.opacity = '1';
            badge.style.pointerEvents = 'auto';
        };

        chatClose.addEventListener('click', closeChat);

        const addMessage = (text, sender, btnData = null, allowHtml = false) => {
            const msg = document.createElement('div');
            msg.className = `ai-chat-message ${sender}`;
            if (sender === 'user') {
                msg.textContent = text;
            } else if (allowHtml) {
                msg.innerHTML = text;
            } else {
                msg.textContent = text;
            }
            if (btnData) {
                const btn = document.createElement('a');
                btn.href = btnData.url;
                btn.className = 'ai-chat-message-link-btn';
                btn.innerHTML = btnData.text;
                // Add click handler if it targets opening the modal on tours page
                if (btnData.action === 'book' && window.location.pathname.includes('tours.html')) {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (typeof window.openBookingModal === 'function') {
                            window.openBookingModal(btnData.tourId);
                        } else {
                            window.location.href = btnData.url;
                        }
                    });
                }
                msg.appendChild(btn);
            }
            chatBody.appendChild(msg);
            chatBody.scrollTop = chatBody.scrollHeight;
        };

        const showTyping = () => {
            const typing = document.createElement('div');
            typing.className = 'ai-chat-typing';
            typing.id = 'aiChatTypingIndicator';
            typing.innerHTML = '<span></span><span></span><span></span>';
            chatBody.appendChild(typing);
            chatBody.scrollTop = chatBody.scrollHeight;
        };

        const removeTyping = () => {
            const typing = document.getElementById('aiChatTypingIndicator');
            if (typing) typing.remove();
        };

        const getLocalBotResponse = (userMsg) => {
            const lower = userMsg.toLowerCase();
            let response = "По текущему каталогу могу предложить сравнить маршруты по бюджету, темпу и ключевым точкам. Для полного подбора откройте каталог туров.";
            let btnData = { text: "Открыть каталог туров", url: "tours.html" };

            if (lower.includes('бали')) {
                response = "Для Бали подойдет маршрут <strong>Бали: Храмы и Вулканы</strong>: Убуд, вулкан Батур и Нуса-Дуа. Это сбалансированный тур на 7 дней.";
                btnData = { text: "Открыть заявку на Бали", url: "tours.html?book=tour-bali", action: "book", tourId: "tour-bali" };
            } else if (lower.includes('альп') || lower.includes('швейцар')) {
                response = "Швейцарский маршрут строится вокруг Цюриха, Люцерна, Интерлакена и Церматта. Хороший выбор, если нужны горы, поезда и комфортный темп.";
                btnData = { text: "Открыть заявку в Альпы", url: "tours.html?book=tour-swiss", action: "book", tourId: "tour-swiss" };
            } else if (lower.includes('дуба') || lower.includes('оаэ')) {
                response = "Дубай подойдет для короткой насыщенной поездки: центр города, Марина, пустыня и пляжный день. Тур рассчитан на 5 дней.";
                btnData = { text: "Открыть заявку в Дубай", url: "tours.html?book=tour-dubai", action: "book", tourId: "tour-dubai" };
            } else if (lower.includes('бюджет') || lower.includes('стоимост') || lower.includes('сколько')) {
                response = "В каталоге цены указаны за человека. Быстрые ориентиры: Каппадокия от 1 800 BYN, Дубай от 2 850 BYN, Бали от 3 600 BYN, Швейцария от 3 900 BYN. В заявке сумма пересчитывается по числу путешественников и классу размещения.";
                btnData = { text: "Открыть каталог", url: "tours.html" };
            } else if (lower.includes('отел')) {
                response = "В этой демо-версии отели не ищутся через внешний сервис. Выберите тур и укажите пожелания к размещению в заявке: у моря, центр города, вилла, семейный формат или 5-звездочный комфорт.";
                btnData = { text: "Оставить пожелания", url: "tours.html" };
            }

            return { response, btnData };
        };

        const getChatHistory = () => {
            return Array.from(chatBody.querySelectorAll('.ai-chat-message'))
                .slice(-8)
                .map((item) => ({
                    role: item.classList.contains('user') ? 'user' : 'assistant',
                    content: item.textContent.replace(/\s+/g, ' ').trim()
                }))
                .filter((item) => item.content);
        };

        const setChatLoading = (isLoading) => {
            chatInput.disabled = isLoading;
            chatSend.disabled = isLoading;
            if (isLoading) {
                chatSend.setAttribute('aria-busy', 'true');
            } else {
                chatSend.removeAttribute('aria-busy');
                chatInput.focus();
            }
        };

        const tryRemoteAI = async (userMsg) => {
            const response = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    history: getChatHistory()
                })
            });

            const payload = await response.json().catch(() => ({}));
            if (!response.ok || !payload.ok || !payload.reply) {
                throw new Error(payload.error || 'AI endpoint unavailable');
            }
            return payload;
        };

        const handleBotResponse = async (userMsg) => {
            showTyping();
            setChatLoading(true);

            try {
                const payload = await tryRemoteAI(userMsg);
                removeTyping();
                if (chatStatus) {
                    chatStatus.textContent = `${payload.providerLabel || payload.provider}: ${payload.model}`;
                }
                addMessage(payload.reply, 'bot', { text: "Открыть каталог", url: "tours.html" });
            } catch (error) {
                const { response, btnData } = getLocalBotResponse(userMsg);
                setTimeout(() => {
                    removeTyping();
                    if (chatStatus) chatStatus.textContent = 'локальный fallback';
                    addMessage(response, 'bot', btnData, true);
                }, 450);
            } finally {
                setChatLoading(false);
            }
        };

        const sendMessage = () => {
            const text = chatInput.value.trim();
            if (!text) return;

            addMessage(text, 'user');
            chatInput.value = '';
            handleBotResponse(text);
        };

        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        // Chip clicks
        const chips = chatChips.querySelectorAll('.ai-chat-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                const msg = chip.getAttribute('data-msg');
                addMessage(msg, 'user');
                handleBotResponse(msg);
            });
        });
    };

    initAIChatConcierge();
});

