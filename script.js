/* ============================================
   HUGO ACADEMIC STYLE - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Set current year in footer ---
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- Career card toggle (expand/collapse on click) ---
    document.querySelectorAll('.career-logo').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.career-card');
            const detail = card.querySelector('.career-detail');
            const isOpen = card.classList.contains('is-open');

            // Close all other cards in same row
            const row = card.closest('.career-row');
            if (row) {
                row.querySelectorAll('.career-card.is-open').forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('is-open');
                        otherCard.querySelector('.career-detail').hidden = true;
                        otherCard.querySelector('.career-logo').setAttribute('aria-expanded', 'false');
                    }
                });
            }

            // Toggle this card
            if (isOpen) {
                card.classList.remove('is-open');
                detail.hidden = true;
                btn.setAttribute('aria-expanded', 'false');
            } else {
                card.classList.add('is-open');
                detail.hidden = false;
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 70; // navbar height
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
            // Close mobile nav after click
            const navCollapse = document.getElementById('navbar-collapse-1');
            if (navCollapse) navCollapse.classList.remove('in');
        });
    });

    // --- Close mobile nav on outside click ---
    document.addEventListener('click', (e) => {
        const navbar = document.getElementById('navbar-main');
        const navCollapse = document.getElementById('navbar-collapse-1');
        if (navbar && navCollapse && !navbar.contains(e.target)) {
            navCollapse.classList.remove('in');
        }
    });

    // --- Active nav highlighting on scroll ---
    const sections = document.querySelectorAll('.home-section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        let currentId = '';

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                currentId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.style.fontWeight = '400';
            if (link.getAttribute('href') === '#' + currentId) {
                link.style.fontWeight = '700';
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

});
