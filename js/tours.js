/**
 * Nikitka AI Travel - Tours Catalog & Booking Modal Module
 */

// Tour database (with premium photos, tags, categories, prices)
const TOURS_DATA = [
    {
        id: 'tour-bali',
        title: 'Бали: Храмы и Вулканы',
        destination: 'bali',
        destinationName: 'Бали, Индонезия',
        duration: '7 дней / 6 ночей',
        durationDays: 7,
        price: 3600,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
        badge: null,
        rating: 5,
        featured: true,
        category: 'tours'
    },
    {
        id: 'tour-phuket',
        title: 'Пхукет: Морская Одиссея',
        destination: 'phuket',
        destinationName: 'Пхукет, Таиланд',
        duration: '8 дней / 7 ночей',
        durationDays: 8,
        price: 2950,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
        badge: null,
        rating: 5,
        featured: true,
        category: 'tours'
    },
    {
        id: 'tour-cappadocia',
        title: 'Каппадокия: Полет мечты',
        destination: 'cappadocia',
        destinationName: 'Каппадокия, Турция',
        duration: '4 дня / 3 ночи',
        durationDays: 4,
        price: 1800,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80',
        badge: '-10%',
        rating: 5,
        featured: true,
        category: 'tours'
    },
    {
        id: 'tour-swiss',
        title: 'Сказочная Швейцария',
        destination: 'swiss',
        destinationName: 'Альпы, Швейцария',
        duration: '7 дней / 6 ночей',
        durationDays: 7,
        price: 3900,
        originalPrice: 4590,
        image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=600&q=80',
        badge: '-15%',
        rating: 5,
        featured: true,
        category: 'tours'
    },
    {
        id: 'tour-santorini',
        title: 'Санторини: Греческая Сказка',
        destination: 'santorini',
        destinationName: 'Санторини, Греция',
        duration: '6 дней / 5 ночей',
        durationDays: 6,
        price: 3300,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
        badge: null,
        rating: 5,
        featured: true,
        category: 'tours'
    },
    {
        id: 'tour-maldives',
        title: 'Райский отдых на Мальдивах',
        destination: 'maldives',
        destinationName: 'Мальдивы',
        duration: '6 дней / 5 ночей',
        durationDays: 6,
        price: 5400,
        originalPrice: 6000,
        image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80',
        badge: '-10%',
        rating: 5,
        featured: true,
        category: 'tours'
    },
    {
        id: 'tour-dubai',
        title: 'Дубай: Город будущего',
        destination: 'dubai',
        destinationName: 'Дубай, ОАЭ',
        duration: '5 дней / 4 ночи',
        durationDays: 5,
        price: 2850,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
        badge: null,
        rating: 5,
        featured: true,
        category: 'tours'
    },
    {
        id: 'tour-norway',
        title: 'Фьорды Норвегии и Северное Сияние',
        destination: 'norway',
        destinationName: 'Норвегия',
        duration: '9 дней / 8 ночей',
        durationDays: 9,
        price: 4650,
        originalPrice: 5250,
        image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=600&q=80',
        badge: '-12%',
        rating: 5,
        featured: false,
        category: 'tours'
    },
    {
        id: 'tour-japan',
        title: 'Токио и Киото: Традиции и Будущее',
        destination: 'japan',
        destinationName: 'Япония',
        duration: '10 дней / 9 ночей',
        durationDays: 10,
        price: 6300,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
        badge: 'Популярно',
        rating: 5,
        featured: false,
        category: 'tours'
    }
];

const TOUR_ROUTE_TAGS = {
    'tour-bali': ['Убуд', 'Батур', 'Нуса-Дуа'],
    'tour-phuket': ['Пхи-Пхи', 'Панг Нга', 'Сурин'],
    'tour-cappadocia': ['Гереме', 'Долины', 'Учхисар'],
    'tour-swiss': ['Цюрих', 'Интерлакен', 'Церматт'],
    'tour-santorini': ['Фира', 'Ия', 'Кальдера'],
    'tour-maldives': ['Мале', 'атолл Баа', 'домашний риф'],
    'tour-dubai': ['Даунтаун', 'Марина', 'пустыня'],
    'tour-norway': ['Осло', 'Берген', 'Тромсе'],
    'tour-japan': ['Токио', 'Хаконэ', 'Киото']
};

window.NikitkaToursData = TOURS_DATA;

document.addEventListener('DOMContentLoaded', () => {
    const toursGrid = document.getElementById('toursGrid');
    const filterForm = document.getElementById('toursFilterForm');
    const priceRangeInput = document.getElementById('priceRange');
    const priceRangeValue = document.getElementById('priceRangeValue');
    
    // Booking Modal Elements
    const bookingModal = document.getElementById('bookingModal');
    const bookingForm = document.getElementById('bookingForm');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    // 1. Initialize Price Range Display
    if (priceRangeInput && priceRangeValue) {
        priceRangeInput.addEventListener('input', () => {
            const formattedPrice = Number(priceRangeInput.value).toLocaleString('ru-RU');
            priceRangeValue.textContent = `до ${formattedPrice} BYN`;
        });
    }

    // 2. Render Tour Cards
    const renderTours = (tours) => {
        if (!toursGrid) return;
        
        if (tours.length === 0) {
            toursGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 60px 20px; font-family: var(--font-heading); color: var(--color-text-muted-light);">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 20px; opacity: 0.5;">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <h3 style="font-size: 1.5rem; margin-bottom: 8px; color: var(--color-text-light);">Ничего не найдено</h3>
                    <p>Попробуйте изменить параметры фильтрации или поисковый запрос</p>
                </div>
            `;
            return;
        }

        toursGrid.innerHTML = tours.map(tour => {
            const hasOldPrice = tour.originalPrice !== null;
            const priceHtml = hasOldPrice 
                ? `<div class="offer-price-row">
                     <span class="offer-price">${tour.price.toLocaleString('ru-RU')} BYN</span>
                     <span class="offer-old-price">${tour.originalPrice.toLocaleString('ru-RU')} BYN</span>
                   </div>`
                : `<span class="offer-price">${tour.price.toLocaleString('ru-RU')} BYN</span>`;
            
            let badgeHtml = '';
            if (tour.badge) {
                badgeHtml = `<span class="offer-badge">${tour.badge}</span>`;
            } else if (tour.featured) {
                badgeHtml = `<span class="offer-badge" style="background: var(--gradient-primary); color: #070b13; font-weight:800; box-shadow: 0 0 12px rgba(0, 242, 254, 0.4);">AI-match</span>`;
            }

            const routeTags = TOUR_ROUTE_TAGS[tour.id] || [];
            const routeTagsHtml = routeTags.length
                ? `<div class="tour-route-tags">${routeTags.map(tag => `<span>${tag}</span>`).join('')}</div>`
                : '';

            return `
                <div class="offer-card glow-card animate-on-scroll" data-tour-id="${tour.id}">
                    ${badgeHtml}
                    <img src="${tour.image}" alt="${tour.title}">
                    <div class="offer-content">
                        <div class="offer-meta">
                            <span class="meta-duration" style="display: flex; align-items: center; gap: 4px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" class="icon-gradient" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline; vertical-align:middle;">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                ${tour.duration}
                            </span>
                            <span class="meta-destination">${tour.destinationName}</span>
                        </div>
                        <h3>${tour.title}</h3>
                        ${routeTagsHtml}
                        <div class="offer-price-row" style="justify-content: space-between; align-items: center; margin-top: 15px;">
                            ${priceHtml}
                            <button class="btn btn-primary btn-sm book-btn" data-tour-id="${tour.id}" style="padding: 10px 20px; font-size: 0.9rem;">
                                Забронировать
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Re-attach booking event listeners to dynamic buttons
        attachBookingEvents();
    };

    // 3. Filter Action Logic
    const applyFilters = () => {
        if (!filterForm) return;

        const searchQuery = document.getElementById('searchQuery')?.value.toLowerCase() || '';
        const destination = document.getElementById('destinationSelect')?.value || 'all';
        const maxPrice = priceRangeInput ? Number(priceRangeInput.value) : Infinity;
        
        // Selected Durations
        const durationCheckboxes = document.querySelectorAll('input[name="duration"]:checked');
        const selectedDurations = Array.from(durationCheckboxes).map(cb => cb.value);

        const filtered = TOURS_DATA.filter(tour => {
            const matchesSearch = tour.title.toLowerCase().includes(searchQuery) || 
                                  tour.destinationName.toLowerCase().includes(searchQuery);
            
            const matchesDestination = destination === 'all' || tour.destination === destination;
            
            const matchesPrice = tour.price <= maxPrice;
            
            let matchesDuration = true;
            if (selectedDurations.length > 0) {
                matchesDuration = selectedDurations.some(range => {
                    if (range === 'short') return tour.durationDays <= 5;
                    if (range === 'medium') return tour.durationDays >= 6 && tour.durationDays <= 8;
                    if (range === 'long') return tour.durationDays >= 9;
                    return true;
                });
            }

            return matchesSearch && matchesDestination && matchesPrice && matchesDuration;
        });

        renderTours(filtered);
    };

    if (filterForm) {
        filterForm.addEventListener('input', applyFilters);
        filterForm.addEventListener('change', applyFilters);
        filterForm.addEventListener('submit', (e) => e.preventDefault());
    }

    // 4. Modal Booking Control
    const openBookingModal = (tourId) => {
        const tour = TOURS_DATA.find(t => t.id === tourId);
        if (!tour || !bookingModal) return;

        // Set inputs
        document.getElementById('bookingTourId').value = tour.id;
        document.getElementById('bookingTourTitle').textContent = tour.title;
        document.getElementById('bookingTourPrice').textContent = `${tour.price.toLocaleString('ru-RU')} BYN`;
        
        // Passengers recalculation helper
        const passengersInput = document.getElementById('passengersCount');
        const totalAmountText = document.getElementById('totalBookingAmount');
        const roomOptions = document.querySelectorAll('#roomTypeSelector .room-option');
        
        let currentMultiplier = 1;

        const recalculatePrice = () => {
            const count = Number(passengersInput.value) || 1;
            const total = Math.round(tour.price * count * currentMultiplier);
            totalAmountText.textContent = `${total.toLocaleString('ru-RU')} BYN`;
        };

        // Reset active room options back to standard on open
        roomOptions.forEach((opt, idx) => {
            if (idx === 0) {
                opt.classList.add('active');
                opt.style.background = 'rgba(0, 242, 254, 0.05)';
                opt.style.borderColor = 'var(--color-accent-teal)';
            } else {
                opt.classList.remove('active');
                opt.style.background = 'transparent';
                opt.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
        });
        currentMultiplier = 1;

        // Setup room click events
        roomOptions.forEach(opt => {
            // Remove previous event listener clones to prevent leak
            const newOpt = opt.cloneNode(true);
            opt.parentNode.replaceChild(newOpt, opt);
        });

        // Re-get the options after cloning
        const freshRoomOptions = document.querySelectorAll('#roomTypeSelector .room-option');
        freshRoomOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                freshRoomOptions.forEach(o => {
                    o.classList.remove('active');
                    o.style.background = 'transparent';
                    o.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                });
                opt.classList.add('active');
                currentMultiplier = parseFloat(opt.getAttribute('data-multiplier')) || 1;
                
                if (opt.getAttribute('data-type') === 'luxury') {
                    opt.style.background = 'rgba(0, 242, 254, 0.05)';
                    opt.style.borderColor = 'var(--color-accent-teal)';
                } else if (opt.getAttribute('data-type') === 'comfort') {
                    opt.style.background = 'rgba(242, 169, 59, 0.05)';
                    opt.style.borderColor = 'var(--color-accent-gold)';
                } else {
                    opt.style.background = 'rgba(0, 242, 254, 0.05)';
                    opt.style.borderColor = 'var(--color-accent-teal)';
                }
                recalculatePrice();
            });
        });

        if (passengersInput && totalAmountText) {
            passengersInput.oninput = recalculatePrice;
            recalculatePrice(); // Initial calc
        }

        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scrolling
        window.dispatchEvent(new CustomEvent('nikitka:booking-opened', { detail: { tourId } }));
    };

    window.openBookingModal = openBookingModal;

    const closeBookingModal = () => {
        if (!bookingModal) return;
        bookingModal.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scrolling
        bookingForm.reset();
    };

    window.closeBookingModal = closeBookingModal;

    const attachBookingEvents = () => {
        const bookBtns = document.querySelectorAll('.book-btn');
        bookBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const tourId = btn.getAttribute('data-tour-id');
                window.openBookingModal(tourId);
            });
        });

        // Click on offer-card directly opens booking modal
        const offerCards = document.querySelectorAll('.offer-card');
        offerCards.forEach(card => {
            card.addEventListener('click', () => {
                const tourId = card.getAttribute('data-tour-id');
                window.openBookingModal(tourId);
            });
        });
    };

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeBookingModal);
    }

    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                closeBookingModal();
            }
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('clientName').value;
            const tourId = document.getElementById('bookingTourId').value;
            const requestType = document.getElementById('requestType')?.value || 'call';
            const requestId = `NT-${Date.now().toString().slice(-6)}`;
            const lead = {
                requestId,
                tourId,
                requestType,
                name: fullName,
                createdAt: new Date().toISOString()
            };

            const savedLeads = JSON.parse(localStorage.getItem('nikitkaTravelLeads') || '[]');
            savedLeads.push(lead);
            localStorage.setItem('nikitkaTravelLeads', JSON.stringify(savedLeads.slice(-10)));
            
            closeBookingModal();
            window.showToast(`Спасибо, ${fullName}! Заявка ${requestId} сохранена в демо-режиме. Менеджер свяжется с вами для уточнения маршрута.`);
        });
    }

    // 5. Initial Render on Page Load (For Tours Page)
    if (toursGrid) {
        // Read URL query parameter for preset destination
        const urlParams = new URLSearchParams(window.location.search);
        const urlDest = urlParams.get('destination');
        const urlCategory = urlParams.get('category');
        
        if (urlDest && document.getElementById('destinationSelect')) {
            document.getElementById('destinationSelect').value = urlDest;
        }

        applyFilters(); // Initial render + dynamic filter application

        const urlBook = urlParams.get('book');
        if (urlBook) {
            setTimeout(() => {
                openBookingModal(urlBook);
            }, 300);
        }
    }
});

