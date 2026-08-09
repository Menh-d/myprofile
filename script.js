/**
 * NFC Profile Card - Main Script
 * Handles 3D Tilt, vCard Generation, QR Code Modal, iOS Segment Tabs, and Theme Toggle
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Profile Information from PROFILE_CONFIG
    initProfileContent();

    // 2. Setup 3D Holographic Card Parallax & Glare
    setup3DCardTilt();

    // 3. Setup iOS Segmented Control Tabs
    setupSegmentedTabs();

    // 4. Setup Modals (QR Code & NFC Guide)
    setupModals();

    // 5. Setup Theme Toggle
    setupThemeToggle();
});

// Custom Brand Icon SVGs for platforms not in standard Lucide
const BRAND_ICONS = {
    whatsapp: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>`,
    telegram: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    soundcloud: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M1.175 12.225a.862.862 0 0 0-.862.863v4.612c0 .477.385.863.862.863h.05c.477 0 .863-.386.863-.863v-4.612a.863.863 0 0 0-.913-.863zm2.14-1.892a.862.862 0 0 0-.863.863v7.367c0 .476.386.862.863.862h.05a.863.863 0 0 0 .862-.862V11.196a.863.863 0 0 0-.912-.863zm2.14-1.282a.862.862 0 0 0-.862.863v9.512c0 .476.385.862.862.862h.05a.863.863 0 0 0 .863-.862V9.914a.863.863 0 0 0-.913-.863zm2.14-1.428a.862.862 0 0 0-.862.863v12.225c0 .476.385.863.862.863h.05a.863.863 0 0 0 .863-.863V8.486a.863.863 0 0 0-.913-.863zm2.14.737a.862.862 0 0 0-.862.863v10.625c0 .477.385.863.862.863h.05a.863.863 0 0 0 .863-.863V9.186a.863.863 0 0 0-.913-.863zm10.742 2.802a4.417 4.417 0 0 0-4.045 2.65 3.328 3.328 0 0 0-2.477-1.127.863.863 0 0 0-.863.863v7.87c0 .476.386.862.863.862h10.457A3.94 3.94 0 0 0 24 16.035c0-2.176-1.764-3.94-3.94-3.94z"/></svg>`
};

/* --------------------------------------------------------------------------
   1. Populate Content from Configuration
   -------------------------------------------------------------------------- */
function initProfileContent() {
    if (typeof PROFILE_CONFIG === 'undefined') return;

    // Header Details
    document.getElementById('profile-title').textContent = PROFILE_CONFIG.title;
    document.getElementById('profile-bio').textContent = PROFILE_CONFIG.bio;
    document.getElementById('profile-avatar').src = PROFILE_CONFIG.avatar;

    // Populate Skills
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer && PROFILE_CONFIG.skills) {
        skillsContainer.innerHTML = PROFILE_CONFIG.skills.map(s => `
            <div class="skill-pill">
                <i data-lucide="${s.icon || 'star'}"></i>
                <span>${s.name}</span>
            </div>
        `).join('');
    }

    // Populate Interests
    const interestsContainer = document.getElementById('interests-container');
    if (interestsContainer && PROFILE_CONFIG.interests) {
        interestsContainer.innerHTML = PROFILE_CONFIG.interests.map(i => `
            <span class="tag-item">${i}</span>
        `).join('');
    }

    // Populate Social Hub Grid
    const socialGrid = document.getElementById('social-grid');
    if (socialGrid && PROFILE_CONFIG.socials) {
        socialGrid.innerHTML = PROFILE_CONFIG.socials.map(soc => {
            let iconHTML = '';
            let boxStyle = `background: ${soc.gradient};`;

            if (soc.imageIcon) {
                iconHTML = `<img src="${soc.imageIcon}" alt="${soc.platform}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px;">`;
                boxStyle = `background: transparent; padding: 0; width: 40px; height: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);`;
            } else {
                const platformKey = (soc.icon || soc.platform).toLowerCase();
                iconHTML = BRAND_ICONS[platformKey] || `<i data-lucide="${soc.icon}"></i>`;
            }

            return `
                <a href="${soc.url}" target="_blank" rel="noopener noreferrer" class="social-item">
                    <div class="social-icon-box" style="${boxStyle}">
                        ${iconHTML}
                    </div>
                    <div class="social-info">
                        <span class="social-platform">${soc.platform}</span>
                        <span class="social-handle">${soc.handle}</span>
                    </div>
                </a>
            `;
        }).join('');
    }

    // Re-initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }
}

/* --------------------------------------------------------------------------
   2. 3D Holographic Parallax Card Tilt
   -------------------------------------------------------------------------- */
function setup3DCardTilt() {
    const card = document.getElementById('profile-card');
    const wrapper = document.querySelector('.profile-card-wrapper');
    if (!card || !wrapper) return;

    let bounds;

    function rotateToMouse(e) {
        bounds = card.getBoundingClientRect();
        const mouseX = e.clientX || (e.touches && e.touches[0].clientX);
        const mouseY = e.clientY || (e.touches && e.touches[0].clientY);

        if (!mouseX || !mouseY) return;

        const leftX = mouseX - bounds.left;
        const topY = mouseY - bounds.top;

        const center = {
            x: leftX - bounds.width / 2,
            y: topY - bounds.height / 2
        };

        const rotateX = (center.y / (bounds.height / 2)) * -18;
        const rotateY = (center.x / (bounds.width / 2)) * 18;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
        card.style.setProperty('--mouse-x', `${(leftX / bounds.width) * 100}%`);
        card.style.setProperty('--mouse-y', `${(topY / bounds.height) * 100}%`);
    }

    function resetRotation() {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }

    wrapper.addEventListener('mousemove', rotateToMouse);
    wrapper.addEventListener('mouseleave', resetRotation);
    wrapper.addEventListener('touchmove', rotateToMouse);
    wrapper.addEventListener('touchend', resetRotation);
}

/* --------------------------------------------------------------------------
   3. iOS Segmented Control Tabs
   -------------------------------------------------------------------------- */
function setupSegmentedTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const indicator = document.querySelector('.tab-indicator');
    const panels = document.querySelectorAll('.tab-content-panel');

    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (indicator) {
                indicator.style.transform = `translateX(${index * 100}%)`;
            }

            const targetPanel = btn.getAttribute('data-tab');
            panels.forEach(panel => {
                if (panel.id === `tab-${targetPanel}`) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   4. Modals & vCard Actions
   -------------------------------------------------------------------------- */
function setupModals() {
    const qrModal = document.getElementById('qr-modal');
    const nfcModal = document.getElementById('nfc-modal');

    // Hero Action Buttons
    document.getElementById('btn-vcard')?.addEventListener('click', downloadvCard);
    document.getElementById('btn-qr')?.addEventListener('click', () => openModal(qrModal, generateQRCode));

    // Dock Buttons
    document.getElementById('dock-vcard')?.addEventListener('click', downloadvCard);
    document.getElementById('dock-qr')?.addEventListener('click', () => openModal(qrModal, generateQRCode));
    document.getElementById('dock-share')?.addEventListener('click', copyProfileURL);
    document.getElementById('dock-nfc')?.addEventListener('click', () => openModal(nfcModal));

    // Modal Close Triggers
    document.querySelectorAll('.modal-close-btn, .modal-overlay').forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target === el || e.target.closest('.modal-close-btn')) {
                closeAllModals();
            }
        });
    });
}

function openModal(modalEl, onOpen) {
    if (!modalEl) return;
    modalEl.classList.add('active');
    if (onOpen) onOpen();
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}

/* --------------------------------------------------------------------------
   5. vCard (.vcf) Generator
   -------------------------------------------------------------------------- */
function downloadvCard() {
    const v = PROFILE_CONFIG.vcard;
    const vcardString = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${v.lastName};${v.firstName};;;`,
        `FN:${PROFILE_CONFIG.name}`,
        `ORG:${v.organization}`,
        `TITLE:${v.title}`,
        `TEL;TYPE=CELL:${v.phone || PROFILE_CONFIG.phone}`,
        `EMAIL;TYPE=INTERNET:${v.email}`,
        `URL:${v.website || window.location.href}`,
        `ADR;TYPE=WORK:;;${v.address};;;`,
        `NOTE:${v.note}`,
        'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vcardString], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sisamane_Dimak_Contact.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('🎴 vCard downloaded! Contact added.');
}

/* --------------------------------------------------------------------------
   6. Copy Profile Link & Toast
   -------------------------------------------------------------------------- */
function copyProfileURL() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showToast('🔗 Profile URL copied! Ready to write to NFC tag.');
    }).catch(() => {
        showToast('Profile URL copied to clipboard.');
    });
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.querySelector('.toast-text').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

/* --------------------------------------------------------------------------
   7. QR Code Canvas Generator
   -------------------------------------------------------------------------- */
function generateQRCode() {
    const canvas = document.getElementById('qr-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const size = 200;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = '#070913';
    const grid = 20;
    const cellSize = size / grid;

    const url = window.location.href;
    let seed = url.length * 42;

    for (let r = 0; r < grid; r++) {
        for (let c = 0; c < grid; c++) {
            if ((r < 6 && c < 6) || (r < 6 && c >= grid - 6) || (r >= grid - 6 && c < 6)) {
                if ((r === 0 || r === 5 || c === 0 || c === 5) ||
                    (r >= grid - 6 && (r === grid - 6 || r === grid - 1)) ||
                    (c >= grid - 6 && (c === grid - 6 || c === grid - 1)) ||
                    (r >= 2 && r <= 3 && c >= 2 && c <= 3) ||
                    (r >= 2 && r <= 3 && c >= grid - 4 && c >= grid - 3) ||
                    (r >= grid - 4 && c >= 2 && c <= 3)) {
                    ctx.fillStyle = (r < 6 && c < 6) ? '#FF7A00' : '#070913';
                    ctx.fillRect(c * cellSize, r * cellSize, cellSize - 1, cellSize - 1);
                }
                continue;
            }

            seed = (seed * 9301 + 49297) % 233280;
            if (seed / 233280 > 0.45) {
                ctx.fillStyle = '#070913';
                ctx.fillRect(c * cellSize, r * cellSize, cellSize - 1, cellSize - 1);
            }
        }
    }
}

/* --------------------------------------------------------------------------
   8. Theme Switcher (Dark/Light)
   -------------------------------------------------------------------------- */
function setupThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    let isDark = true;
    themeBtn.addEventListener('click', () => {
        isDark = !isDark;
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeBtn.innerHTML = isDark ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
        if (window.lucide) lucide.createIcons();
    });
}
