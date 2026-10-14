(() => {
    const header = document.querySelector('.site-header, .navbar');
    const peekButton = document.querySelector('.header-peek');

    if (!header || !peekButton) return;
    let lastScrollY = window.scrollY;

    function revealHeader() {
        if (window.scrollY <= 100) return;
        header.classList.remove('is-condensed');
        header.classList.add('is-revealed');
        document.body.classList.add('header-visible');
        peekButton.setAttribute('aria-expanded', 'true');
    }

    function hideHeader() {
        if (window.scrollY <= 100 || header.querySelector('.is-open')) return;
        header.classList.remove('is-revealed');
        header.classList.add('is-condensed');
        document.body.classList.remove('header-visible');
        peekButton.setAttribute('aria-expanded', 'false');
    }

    function updateScrollState() {
        const currentScrollY = window.scrollY;
        const isScrolled = currentScrollY > 100;
        document.body.classList.toggle('has-scrolled', isScrolled);

        if (!isScrolled) {
            header.classList.remove('is-condensed', 'is-revealed');
            document.body.classList.remove('header-visible');
            peekButton.setAttribute('aria-expanded', 'false');
        } else if (currentScrollY < lastScrollY - 2) {
            revealHeader();
        } else if (currentScrollY > lastScrollY + 2) {
            hideHeader();
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', updateScrollState, { passive: true });

    peekButton.addEventListener('click', () => {
        if (header.classList.contains('is-revealed')) hideHeader();
        else revealHeader();
    });

    updateScrollState();
})();