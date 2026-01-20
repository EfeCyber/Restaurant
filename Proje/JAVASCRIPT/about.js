(() => {
  "use strict";

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const injectCSS = () => {
    const style = document.createElement("style");
    style.textContent = `
      
    `;
    document.head.appendChild(style);
  };

  // ============== Hero entrance ==============
  const initHeroAnimation = () => {
    const hero = qs(".about-hero-section .container");
    if (!hero) return;

    const heroTitle = qs(".about-hero-section h1");
    const heroText  = qs(".about-hero-section p");

    [heroTitle, heroText].forEach((el) => el && el.classList.add("hero-animate"));

    // small stagger
    const show = () => {
      if (heroTitle) heroTitle.classList.add("is-visible");
      if (heroText) {
        heroText.style.transitionDelay = "120ms";
        heroText.classList.add("is-visible");
      }
    };

    if (prefersReducedMotion) {
      // Show instantly
      [heroTitle, heroText].forEach((el) => el && el.classList.add("is-visible"));
      return;
    }

    // Wait for next frame for smoother paint
    requestAnimationFrame(() => requestAnimationFrame(show));
  };

  // ============== Scroll reveal (IntersectionObserver) ==============
  const initScrollReveal = () => {
    if (prefersReducedMotion) return;

    const targets = [
      ...qsa(".story-content-block"),
      ...qsa(".values-grid .value-item"),
      ...qsa(".chef-image-feature .chef-quote-overlay"),
      ...qsa(".final-cta .cta-container"),
      ...qsa(".site-footer .footer-section")
    ].filter(Boolean);

    if (!targets.length) return;

    targets.forEach((el) => el.classList.add("js-reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // stagger children inside grids
          const el = entry.target;
          el.classList.add("is-visible");

          // Optional: if it's a grid item, delay based on index
          if (el.classList.contains("value-item")) {
            const items = qsa(".values-grid .value-item");
            const idx = items.indexOf(el);
            el.style.transitionDelay = `${Math.min(idx * 90, 360)}ms`;
          }

          // Optional: if it's story blocks, stagger
          if (el.classList.contains("story-content-block")) {
            const items = qsa(".simple-story-flow .story-content-block");
            const idx = items.indexOf(el);
            el.style.transitionDelay = `${Math.min(idx * 90, 360)}ms`;
          }

          io.unobserve(el);
        });
      },
      {
        root: null,
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    targets.forEach((el) => io.observe(el));
  };

  // ============== Navbar scroll effect ==============
  const initNavbarOnScroll = () => {
    const header = qs(".site-header");
    if (!header) return;

    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      header.classList.toggle("is-scrolled", y > 16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  };

  // ============== Smooth anchor scrolling (if you add anchors later) ==============
  const initSmoothAnchors = () => {
    const links = qsa('a[href^="#"]');
    if (!links.length) return;

    links.forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        const target = id ? qs(id) : null;
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      });
    });
  };

  // ============== Run ==============
  const init = () => {
    injectCSS();
    initHeroAnimation();
    initNavbarOnScroll();
    initScrollReveal();
    initSmoothAnchors();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


// ===== Navbar Logo Animation =====
document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".logo a");
    if (logo) {
        logo.classList.add("animated-logo");
    }
});