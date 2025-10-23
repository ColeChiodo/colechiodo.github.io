document.addEventListener('DOMContentLoaded', () => {

    // Initialize Lucide Icons
    lucide.createIcons();

    // --- SCROLL ANIMATION EFFECT ---
    const scrollElements = document.querySelectorAll('.scroll-fade');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe all scroll-fade elements
    scrollElements.forEach(el => observer.observe(el));

    // Also trigger initial "animate-in" elements in the hero for a staggered load effect
    document.querySelectorAll('.animate-in').forEach(el => {
        el.classList.add('is-visible');
    });


    // --- BROWSER DETECTION AND CTA LOGIC ---
    
    // Define all possible targets for clarity
    const chromeTarget = { link: 'https://chromewebstore.google.com/detail/gbeolmhljhgoidkalfbkagobfhpgkfbf', name: 'Chrome Web Store', icon: 'chrome' };
    const firefoxTarget = { link: 'https://addons.mozilla.org/en-US/firefox/addon/kuraji/', name: 'Firefox Add-ons', icon: 'firefox' };
    const githubTarget = { link: 'https://github.com/ColeChiodo/subtitle-autoloader/releases', name: 'Manual Install', icon: 'github' };


    function detectPrimaryBrowserTarget() {
        const userAgent = navigator.userAgent.toLowerCase();

        // Detect Chrome (excluding Opera 'opr' and Edge 'edg')
        if (userAgent.includes('chrome') && !userAgent.includes('opr') && !userAgent.includes('edg')) {
            return chromeTarget;
        } else if (userAgent.includes('firefox')) {
            return firefoxTarget;
        } else {
            // If neither primary browser (Chrome/Firefox/Edge) is detected, return null to trigger dual CTAs
            return null;
        }
    }

    const primaryTarget = detectPrimaryBrowserTarget();

    // Function to generate the HTML for a single CTA button
    const generateCtaHtml = (target, isPrimary = false) => {
        // Construct the CTA text: e.g., "Get Kuraji for Chrome"
        const browserPart = target.name.includes('Store') || target.name.includes('Add-ons') ? target.name.split(' ')[0] : 'Your Browser';
        const ctaText = `Get Kuraji for ${browserPart}`;
        const primaryClass = isPrimary ? ' primary' : '';

        return `
            <button class="cta-button${primaryClass}" onclick="window.open('${target.link}', '_blank')">
                <i data-lucide="${target.icon}"></i>
                <span>${ctaText}</span>
            </button>
        `;
    };

    // 1. Determine the single target for non-hero buttons (header/footer)
    // If a primary target is found, use it; otherwise, default to GitHub Manual Install.
    const detectedTarget = primaryTarget || githubTarget;
    
    // Generate text and icon for non-hero buttons
    const browserPart = detectedTarget.name.includes('Store') || detectedTarget.name.includes('Add-ons') ? detectedTarget.name.split(' ')[0] : 'Your Browser';
    const ctaText = `Get Kuraji for ${browserPart}`;
    const iconHtml = `<i data-lucide="${detectedTarget.icon}"></i>`;
    
    // Update all existing CTA buttons (except hero, which might be replaced)
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        // Only update buttons that still exist (i.e., not the cta-hero placeholder)
        if (button.id !== 'cta-hero') {
            button.innerHTML = `<span>${ctaText}</span>`;
            button.onclick = (e) => {
                e.preventDefault();
                window.open(detectedTarget.link, '_blank');
            };
        }
    });
    
    // 2. Handle the "show both buttons" logic for the Hero section.
    const ctaHero = document.getElementById('cta-hero');
    const heroCtasContainer = ctaHero ? ctaHero.parentElement : null;

    if (!primaryTarget && heroCtasContainer) {
        // Case: Neither primary browser detected (Unknown/Default browser).
        // Replace the single cta-hero button with two explicit install buttons.
        ctaHero.remove(); // Remove the placeholder button

        // Update the cta-link next to it for context
        const ctaLink = heroCtasContainer.querySelector('.cta-link');
        if (ctaLink) {
             ctaLink.href = githubTarget.link;
             // Ensure the HTML uses <b> tags
             ctaLink.innerHTML = `View Source Code<span aria-hidden="true">&rarr;</span>`;
        }

    } else if (ctaHero) {
        // Case: A primary browser was detected. Update the cta-hero with the detected target.
        ctaHero.classList.add('primary');
        ctaHero.innerHTML = `<span>${ctaText}</span>`;
        ctaHero.onclick = (e) => {
            e.preventDefault();
            window.open(detectedTarget.link, '_blank');
        };
    }


    // Re-create lucide icons after injecting HTML to render them correctly
    lucide.createIcons();

    // Update the footer install link
    const footerInstallLink = document.getElementById('footer-install-link');
    if (footerInstallLink) {
        footerInstallLink.textContent = `Install via ${detectedTarget.name}`;
        footerInstallLink.href = detectedTarget.link;
        footerInstallLink.target = '_blank';
    }
});
