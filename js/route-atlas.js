import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const fmtPrice = (value) => `${Number(value).toLocaleString('ru-RU')} ₽`;
const origin = { name: 'Москва', lat: 55.7558, lng: 37.6173 };
const countryLabel = (route) => route.country || route.destination;
const placeLabel = (route) => route.focusName || route.destination;
const earthTextureUrl = 'assets/earth/earth-blue-marble-august.jpg';

const getRoutes = () => {
    const source = window.NikitkaTravel?.routes || [];
    return source.filter((route) => Array.isArray(route.coordinates) && route.coordinates.length >= 2);
};

const createAtlasControls = (routes, onSelect) => {
    const controls = document.getElementById('routeAtlasControls');
    if (!controls) return;

    controls.innerHTML = routes.map((route) => `
        <button class="route-atlas-chip" type="button" data-atlas-route="${route.id}" aria-label="${countryLabel(route)}: ${placeLabel(route)}">
            <strong>${placeLabel(route)}</strong>
            <small>${countryLabel(route)} · ${route.durationDays} дней</small>
        </button>
    `).join('');

    controls.querySelectorAll('[data-atlas-route]').forEach((button) => {
        button.addEventListener('click', () => onSelect(button.getAttribute('data-atlas-route')));
    });
};

const updateCopy = (route) => {
    const title = document.getElementById('routeAtlasTitle');
    const description = document.getElementById('routeAtlasDescription');
    const days = document.getElementById('routeAtlasDays');
    const stops = document.getElementById('routeAtlasStops');
    const budget = document.getElementById('routeAtlasBudget');
    const liveTitle = document.getElementById('routeMapLiveTitle');

    if (title) title.textContent = `${countryLabel(route)}: ${route.title}`;
    if (description) {
        description.textContent = `${route.bestFor}. 3D-глобус использует текстуру NASA Blue Marble, показывает перелет из Москвы и раскрывает точки маршрута.`;
    }
    if (days) days.textContent = route.durationDays;
    if (stops) stops.textContent = route.coordinates.length;
    if (budget) budget.textContent = fmtPrice(route.price);
    if (liveTitle) liveTitle.textContent = `Карта: ${countryLabel(route)} · ${placeLabel(route)}`;

    document.querySelectorAll('[data-atlas-route]').forEach((button) => {
        button.classList.toggle('active', button.getAttribute('data-atlas-route') === route.id);
    });
};

const initLiveMap = () => {
    const mapEl = document.getElementById('routeLeafletMap');
    const legend = document.getElementById('routeMapLiveLegend');
    if (!mapEl) return { selectRoute() {} };

    if (!window.L) {
        mapEl.innerHTML = '<div class="route-map-fallback">Карта не загрузилась. Проверьте подключение к CDN Leaflet/OpenStreetMap.</div>';
        return { selectRoute() {} };
    }

    const map = L.map(mapEl, {
        scrollWheelZoom: false,
        zoomControl: true,
        worldCopyJump: true,
        attributionControl: false
    }).setView([30, 25], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
    }).addTo(map);
    L.control.attribution({ prefix: false })
        .addAttribution('&copy; OpenStreetMap')
        .addTo(map);

    const layers = L.layerGroup().addTo(map);
    mapEl.dataset.mapReady = 'true';

    const makeMarker = (index) => L.divIcon({
        className: 'route-live-marker',
        html: `<span>${index + 1}</span>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });

    const selectRoute = (route) => {
        layers.clearLayers();

        const latLngs = route.coordinates.map((point) => [point.lat, point.lng]);
        L.polyline(latLngs, {
            color: '#f2a93b',
            weight: 4,
            opacity: 0.92,
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(layers);

        route.coordinates.forEach((point, index) => {
            L.marker([point.lat, point.lng], { icon: makeMarker(index) })
                .bindTooltip(point.name, { direction: 'top', offset: [0, -12] })
                .addTo(layers);
        });

        map.fitBounds(L.latLngBounds(latLngs), {
            padding: [34, 34],
            maxZoom: 10
        });

        if (legend) {
            legend.innerHTML = `
                <div class="route-map-country-pill">${countryLabel(route)}</div>
                <ol>
                    ${route.coordinates.map((point) => `<li>${point.name}</li>`).join('')}
                </ol>
                <a href="tours.html?book=${route.id}" class="btn btn-primary">Оставить заявку</a>
            `;
        }

        window.setTimeout(() => map.invalidateSize(), 80);
    };

    return { selectRoute };
};

const latLngToVector3 = (point, radius = 2.2) => {
    const phi = (90 - point.lat) * Math.PI / 180;
    const theta = (point.lng + 180) * Math.PI / 180;

    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
};

const makeArc = (startPoint, endPoint, radius, lift) => {
    const start = latLngToVector3(startPoint, radius);
    const end = latLngToVector3(endPoint, radius);
    const points = [];

    for (let i = 0; i <= 64; i += 1) {
        const t = i / 64;
        const point = start.clone().lerp(end, t).normalize();
        point.multiplyScalar(radius + Math.sin(Math.PI * t) * lift);
        points.push(point);
    }

    return new THREE.BufferGeometry().setFromPoints(points);
};

const makeGridLines = (globeGroup) => {
    const gridMaterial = new THREE.LineBasicMaterial({
        color: 0x77d8ff,
        transparent: true,
        opacity: 0.18
    });

    for (let lat = -60; lat <= 60; lat += 30) {
        const points = [];
        for (let lng = -180; lng <= 180; lng += 4) {
            points.push(latLngToVector3({ lat, lng }, 2.215));
        }
        globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), gridMaterial));
    }

    for (let lng = -150; lng <= 180; lng += 30) {
        const points = [];
        for (let lat = -85; lat <= 85; lat += 4) {
            points.push(latLngToVector3({ lat, lng }, 2.218));
        }
        globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), gridMaterial));
    }
};

const makeStarField = () => {
    const count = 720;
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
        const radius = 16 + Math.random() * 16;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[(index * 3) + 1] = radius * Math.cos(phi);
        positions[(index * 3) + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    return new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
            color: 0xb8e7ff,
            size: 0.032,
            transparent: true,
            opacity: 0.58,
            depthWrite: false
        })
    );
};

const initGlobe = () => {
    const canvas = document.getElementById('routeGlobeCanvas');
    const section = document.getElementById('routeAtlas');
    if (!canvas || !section) return { selectRoute() {} };

    const webglSupported = (() => {
        try {
            const probe = document.createElement('canvas');
            return Boolean(window.WebGLRenderingContext && (probe.getContext('webgl2') || probe.getContext('webgl')));
        } catch (_) {
            return false;
        }
    })();

    if (!webglSupported) {
        section.classList.add('route-atlas-no-webgl');
        canvas.dataset.webglReady = 'fallback';
        return {
            selectRoute(route) {
                const description = document.getElementById('routeAtlasDescription');
                if (description) {
                    description.textContent = `${route.bestFor}. 3D-глобус отключен в этом браузере, но OpenStreetMap-карта раскрывает реальные точки маршрута.`;
                }
            }
        };
    }

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'default',
            preserveDrawingBuffer: new URLSearchParams(window.location.search).has('earthGlobeQa')
        });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.18;
    } catch (error) {
        section.classList.add('route-atlas-no-webgl');
        section.insertAdjacentHTML('beforeend', '<div class="route-atlas-unavailable">WebGL недоступен, 3D-глобус отключен.</div>');
        return { selectRoute() {} };
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    const globeGroup = new THREE.Group();
    const routeGroup = new THREE.Group();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    camera.position.set(0, 0.16, 7);
    const applyGlobePlacement = () => {
        if (window.innerWidth >= 900) {
            globeGroup.position.set(-1.24, -0.03, 0);
        } else {
            globeGroup.position.set(0.05, -0.02, 0);
        }
    };
    applyGlobePlacement();
    scene.add(globeGroup);
    globeGroup.add(routeGroup);
    scene.add(makeStarField());

    scene.add(new THREE.AmbientLight(0x9fdcff, 0.46));
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLight.position.set(-3.8, 2.4, 5.4);
    scene.add(sunLight);
    const keyLight = new THREE.PointLight(0xf2a93b, 1.25, 16);
    keyLight.position.set(4.2, 2.5, 4.2);
    scene.add(keyLight);

    const globe = new THREE.Mesh(
        new THREE.SphereGeometry(2.22, 96, 96),
        new THREE.MeshStandardMaterial({
            color: 0x6f92a9,
            emissive: 0x02070d,
            metalness: 0.02,
            roughness: 0.86,
            transparent: true,
            opacity: 1
        })
    );
    globeGroup.add(globe);
    canvas.dataset.earthTexture = 'loading';
    canvas.dataset.earthTextureSource = 'NASA Blue Marble';

    new THREE.TextureLoader().load(
        earthTextureUrl,
        (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy?.() || 1, 8);
            globe.material.map = texture;
            globe.material.color.set(0xffffff);
            globe.material.needsUpdate = true;
            canvas.dataset.earthTexture = 'ready';
            renderer.render(scene, camera);
        },
        undefined,
        () => {
            canvas.dataset.earthTexture = 'fallback';
        }
    );

    const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(2.44, 96, 96),
        new THREE.MeshBasicMaterial({
            color: 0x00f2fe,
            transparent: true,
            opacity: 0.10,
            side: THREE.BackSide
        })
    );
    globeGroup.add(atmosphere);
    makeGridLines(globeGroup);

    const flightMaterial = new THREE.LineBasicMaterial({ color: 0xf2a93b, transparent: true, opacity: 0.95 });
    const routeMaterial = new THREE.LineBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.82 });
    const originMaterial = new THREE.MeshBasicMaterial({ color: 0xf2a93b });
    const stopMaterial = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
    const activeStopMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const addDot = (point, material, scale = 1) => {
        const dot = new THREE.Mesh(new THREE.SphereGeometry(0.045 * scale, 18, 18), material);
        dot.position.copy(latLngToVector3(point, 2.34));
        routeGroup.add(dot);
    };

    const selectRoute = (route) => {
        routeGroup.clear();
        canvas.dataset.selectedRoute = route.id;

        const firstPoint = route.coordinates[0];
        routeGroup.add(new THREE.Line(makeArc(origin, firstPoint, 2.31, 0.72), flightMaterial));
        addDot(origin, originMaterial, 1.25);

        route.coordinates.forEach((point, index) => {
            addDot(point, index === 0 ? activeStopMaterial : stopMaterial, index === 0 ? 1.25 : 1);
            if (index > 0) {
                routeGroup.add(new THREE.Line(makeArc(route.coordinates[index - 1], point, 2.32, 0.18), routeMaterial));
            }
        });

        globeGroup.rotation.x = THREE.MathUtils.degToRad(Math.max(-35, Math.min(35, firstPoint.lat * 0.38)));
        globeGroup.rotation.y = THREE.MathUtils.degToRad(-firstPoint.lng - 35);
    };

    const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(1, Math.floor(rect.width));
        const height = Math.max(1, Math.floor(rect.height));

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        applyGlobePlacement();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener('pointerdown', (event) => {
        dragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
        canvas.setPointerCapture(event.pointerId);
    });

    canvas.addEventListener('pointermove', (event) => {
        if (!dragging) return;
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        lastX = event.clientX;
        lastY = event.clientY;
        globeGroup.rotation.y += dx * 0.006;
        globeGroup.rotation.x = THREE.MathUtils.clamp(globeGroup.rotation.x + dy * 0.004, -0.85, 0.85);
    });

    const endDrag = (event) => {
        dragging = false;
        if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    };
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);

    const clock = new THREE.Clock();
    let frameId = null;
    let atlasVisible = true;

    const shouldRender = () => atlasVisible && document.visibilityState !== 'hidden';

    const render = () => {
        frameId = null;
        const delta = clock.getDelta();
        if (!dragging && !reducedMotion) globeGroup.rotation.y += delta * 0.045;
        routeGroup.rotation.z = Math.sin(clock.elapsedTime * 1.2) * 0.006;
        renderer.render(scene, camera);
        canvas.dataset.webglReady = 'true';

        if (shouldRender()) {
            frameId = requestAnimationFrame(render);
        }
    };

    const startRender = () => {
        if (frameId !== null) return;
        clock.getDelta();
        frameId = requestAnimationFrame(render);
    };

    const stopRender = () => {
        if (frameId === null) return;
        cancelAnimationFrame(frameId);
        frameId = null;
    };

    const syncRenderState = () => {
        if (shouldRender()) {
            startRender();
        } else {
            stopRender();
        }
    };

    const visibilityObserver = new IntersectionObserver((entries) => {
        atlasVisible = entries.some((entry) => entry.isIntersecting);
        syncRenderState();
    }, { threshold: 0.08 });
    visibilityObserver.observe(section);

    document.addEventListener('visibilitychange', syncRenderState);
    renderer.render(scene, camera);
    canvas.dataset.webglReady = 'true';
    syncRenderState();

    return { selectRoute };
};

document.addEventListener('DOMContentLoaded', () => {
    const atlas = document.getElementById('routeAtlas');
    const routes = getRoutes();
    if (!atlas || routes.length === 0) return;

    const mapApi = initLiveMap();
    const globeApi = initGlobe();

    const selectRoute = (routeId) => {
        const route = routes.find((item) => item.id === routeId) || routes[0];
        updateCopy(route);
        mapApi.selectRoute(route);
        globeApi.selectRoute(route);
        window.dispatchEvent(new CustomEvent('nikitka:atlas-route-selected', { detail: { tourId: route.id } }));
    };

    createAtlasControls(routes, selectRoute);
    selectRoute(routes[0].id);
});
