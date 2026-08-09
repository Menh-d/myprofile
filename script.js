/**
 * NFC Profile Card — Main Script
 * Glass Card Edition
 */

/* ── Brand icon SVG strings ─────────────────────────────────── */
const BRAND_SVGS = {
    whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
    telegram: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
    soundcloud: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.56 8.87V17h8.76c1.43 0 2.68-1.17 2.68-2.68 0-1.49-1.21-2.68-2.68-2.68-.29 0-.56.05-.82.14-.16-2.57-2.28-4.63-4.9-4.63-1.07 0-2.07.33-2.89.87zM0 15.32c0 .93.75 1.68 1.68 1.68s1.68-.75 1.68-1.68V9.69C3.36 8.76 2.61 8 1.68 8S0 8.76 0 9.69v5.63zm4.93.5c0 .93.75 1.68 1.68 1.68s1.68-.75 1.68-1.68V8.11a1.68 1.68 0 10-3.36 0v7.71zm3.77.25c0 .93.75 1.68 1.68 1.68s1.68-.75 1.68-1.68V7.5a1.68 1.68 0 10-3.36 0v8.57z"/></svg>`
};

/* Platform gradient maps */
const GRADIENTS = {
    facebook:   'linear-gradient(135deg, #1877F2, #0d5dbf)',
    instagram:  'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    youtube:    'linear-gradient(135deg, #FF0000, #cc0000)',
    linkedin:   'linear-gradient(135deg, #0A66C2, #004182)',
    whatsapp:   'linear-gradient(135deg, #25D366, #128C7E)',
    telegram:   'linear-gradient(135deg, #2AABEE, #0088CC)',
    soundcloud: 'linear-gradient(135deg, #FF5500, #FF2200)',
    tiktok:     'linear-gradient(135deg, #010101, #69C9D0)',
    twitter:    'linear-gradient(135deg, #1DA1F2, #0c85d0)',
    github:     'linear-gradient(135deg, #333, #111)',
};

/* ── Init ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof PROFILE_CONFIG === 'undefined') return;

    initAnimatedGradient();
    renderSocialList();
    renderSkills();
    renderInterests();
    setupModals();
    setupThemeToggle();
    lucide.createIcons();
});

/* ── Animated Gradient Background (Breathing Effect) ────────── */
function initAnimatedGradient() {
    const container = document.getElementById('animated-bg');
    if (!container) return;

    const startingGap = 125;
    const breathing = true;
    const animationSpeed = 0.025;
    const breathingRange = 6;
    const topOffset = 0;

    const darkColors = [
        "#080c14",
        "#2979FF",
        "#FF80AB",
        "#FF6D00",
        "#FFD600",
        "#00E676",
        "#3D5AFE"
    ];

    const lightColors = [
        "#f0f2f7",
        "#448AFF",
        "#FF80AB",
        "#FF6D00",
        "#FFD600",
        "#00E676",
        "#3D5AFE"
    ];

    const gradientStops = [35, 50, 60, 70, 80, 90, 100];

    let width = startingGap;
    let directionWidth = 1;

    function animate() {
        if (width >= startingGap + breathingRange) directionWidth = -1;
        if (width <= startingGap - breathingRange) directionWidth = 1;

        if (!breathing) directionWidth = 0;
        width += directionWidth * animationSpeed;

        const isLight = document.body.getAttribute('data-theme') === 'light';
        const colors = isLight ? lightColors : darkColors;

        const stopsString = gradientStops
            .map((stop, index) => `${colors[index]} ${stop}%`)
            .join(", ");

        container.style.background = `radial-gradient(${width.toFixed(2)}% ${(width + topOffset).toFixed(2)}% at 50% 20%, ${stopsString})`;

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

/* ── Social List ─────────────────────────────────────────────── */
function renderSocialList() {
    const container = document.getElementById('social-list');
    if (!container || !PROFILE_CONFIG.socials) return;

    container.innerHTML = PROFILE_CONFIG.socials.map(soc => {
        const platformKey = soc.platform.toLowerCase();
        const gradient = soc.gradient && soc.gradient !== 'transparent'
            ? soc.gradient
            : (GRADIENTS[platformKey] || 'linear-gradient(135deg, #555, #333)');

        let iconHtml;
        if (soc.imageIcon) {
            iconHtml = `<img src="${soc.imageIcon}" alt="${soc.platform}">`;
        } else if (BRAND_SVGS[platformKey]) {
            iconHtml = BRAND_SVGS[platformKey];
        } else {
            iconHtml = `<i data-lucide="${soc.icon || 'link'}"></i>`;
        }

        const iconStyle = soc.imageIcon
            ? 'background: rgba(255,255,255,0.1); border-radius: 14px;'
            : `background: ${gradient};`;

        return `
            <a href="${soc.url}" target="_blank" rel="noopener noreferrer" class="social-item">
                <div class="social-icon" style="${iconStyle}">
                    ${iconHtml}
                </div>
                <div class="social-info">
                    <span class="social-name">${soc.platform}</span>
                    <span class="social-handle">${soc.handle}</span>
                </div>
                <div class="social-arrow">
                    <i data-lucide="chevron-right"></i>
                </div>
            </a>
        `;
    }).join('');

    lucide.createIcons();
}

/* ── Skills ──────────────────────────────────────────────────── */
function renderSkills() {
    const container = document.getElementById('skills-wrap');
    if (!container || !PROFILE_CONFIG.skills) return;

    const label = document.createElement('p');
    label.className = 'skills-section-label';
    label.textContent = 'Expertise & Focus';
    container.parentNode.insertBefore(label, container);

    container.innerHTML = PROFILE_CONFIG.skills.map(s => `
        <span class="skill-tag">
            <i data-lucide="${s.icon || 'star'}"></i>
            ${s.name}
        </span>
    `).join('');

    lucide.createIcons();
}

/* ── Interests ───────────────────────────────────────────────── */
function renderInterests() {
    const container = document.getElementById('interests-wrap');
    if (!container || !PROFILE_CONFIG.interests) return;

    const label = document.createElement('p');
    label.className = 'skills-section-label';
    label.textContent = 'Tags & Interests';
    container.parentNode.insertBefore(label, container);

    container.innerHTML = PROFILE_CONFIG.interests.map(i => `
        <span class="interest-tag">${i}</span>
    `).join('');
}

/* ── Modals ──────────────────────────────────────────────────── */
function setupModals() {
    const qrModal = document.getElementById('qr-modal');
    const nfcModal = document.getElementById('nfc-modal');

    // Button bindings
    document.getElementById('btn-vcard')?.addEventListener('click', downloadVCard);
    document.getElementById('btn-qr')?.addEventListener('click', () => openModal(qrModal));
    document.getElementById('btn-share')?.addEventListener('click', copyLink);

    document.getElementById('dock-vcard')?.addEventListener('click', downloadVCard);
    document.getElementById('dock-qr')?.addEventListener('click', () => openModal(qrModal));
    document.getElementById('dock-share')?.addEventListener('click', copyLink);

    // Close triggers
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', e => {
            if (e.target === overlay) closeAllModals();
        });
    });
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
}

function openModal(el, cb) {
    if (!el) return;
    el.classList.add('active');
    if (cb) cb();
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}

/* ── QR Code ─────────────────────────────────────────────────── */
let qrGenerated = false;
function generateQR() {
    if (qrGenerated) return;
    const container = document.getElementById('qr-code-container');
    if (!container) return;
    try {
        new QRCode(container, {
            text: window.location.href,
            width: 200,
            height: 200,
            colorDark: '#0a0c14',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
        qrGenerated = true;
    } catch(e) {
        // Fallback: canvas-drawn QR placeholder
        container.innerHTML = `<canvas id="qr-canvas" width="200" height="200"></canvas>`;
        drawFallbackQR();
    }
}

function drawFallbackQR() {
    const canvas = document.getElementById('qr-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = 200, grid = 21, cell = size / grid;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#0a0c14';

    // Finder patterns
    [[0,0],[0,14],[14,0]].forEach(([r,c]) => {
        ctx.fillRect(c*cell, r*cell, 7*cell, 7*cell);
        ctx.fillStyle = '#fff';
        ctx.fillRect((c+1)*cell, (r+1)*cell, 5*cell, 5*cell);
        ctx.fillStyle = '#0a0c14';
        ctx.fillRect((c+2)*cell, (r+2)*cell, 3*cell, 3*cell);
    });

    // Random data dots
    let s = window.location.href.length * 42;
    for (let r = 0; r < grid; r++) {
        for (let c = 0; c < grid; c++) {
            if ((r<7&&c<7)||(r<7&&c>13)||(r>13&&c<7)) continue;
            s = (s * 1664525 + 1013904223) & 0x7fffffff;
            if (s % 3 > 0) {
                ctx.fillStyle = '#0a0c14';
                ctx.fillRect(c*cell+0.5, r*cell+0.5, cell-1, cell-1);
            }
        }
    }
}

/* ── vCard ───────────────────────────────────────────────────── */
function downloadVCard() {
    const v = PROFILE_CONFIG.vcard;
    const vc = [
        'BEGIN:VCARD', 'VERSION:3.0',
        `N:${v.lastName};${v.firstName};;;`,
        `FN:${PROFILE_CONFIG.name}`,
        `ORG:${v.organization}`,
        `TITLE:${v.title}`,
        `TEL;TYPE=CELL:${v.phone}`,
        v.email ? `EMAIL;TYPE=INTERNET:${v.email}` : '',
        `URL:${v.website || window.location.href}`,
        `ADR;TYPE=WORK:;;${v.address};;;`,
        `NOTE:${v.note}`,
        'END:VCARD'
    ].filter(Boolean).join('\r\n');

    const blob = new Blob([vc], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Sisamane_Dimak.vcf';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Contact saved! 🎴');
}

/* ── Copy Link ───────────────────────────────────────────────── */
function copyLink() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => showToast('Link copied! 🔗'))
        .catch(() => showToast('Profile URL: ' + window.location.href));
}

/* ── Toast ───────────────────────────────────────────────────── */
function showToast(msg) {
    const t = document.getElementById('toast');
    const m = document.getElementById('toast-msg');
    if (!t || !m) return;
    m.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

/* ── Theme Toggle ─────────────────────────────────────────────── */
function setupThemeToggle() {
    const btn = document.getElementById('theme-btn');
    if (!btn) return;
    let dark = true;
    btn.addEventListener('click', () => {
        dark = !dark;
        document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
        btn.innerHTML = dark
            ? '<i data-lucide="sun"></i>'
            : '<i data-lucide="moon"></i>';
        lucide.createIcons();
    });
}
