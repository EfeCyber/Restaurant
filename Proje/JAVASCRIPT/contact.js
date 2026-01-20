// contact.js - Rüya Restoran Contact Animations
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

  // Hero entrance (title + text)
  const initHeroEntrance = () => {
    const title = qs(".contact-hero-section h1");
    const text = qs(".contact-hero-section p");

    if (title) title.classList.add("animated-title");

    if (prefersReducedMotion) return;

    if (text) {
      text.style.opacity = "0";
      text.style.transform = "translateY(12px)";
      text.style.transition = "opacity .8s ease, transform .8s ease";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          text.style.opacity = "1";
          text.style.transform = "translateY(0)";
        });
      });
    }
  };

  // Scroll reveal for sections/cards
  const initScrollReveal = () => {
    if (prefersReducedMotion) return;

    const targets = [
      ...qsa(".contact-info-block"),
      ...qsa(".contact-map-block"),
      ...qsa(".contact-form-section"),
      ...qsa(".site-footer .footer-section"),
    ].filter(Boolean);

    if (!targets.length) return;

    targets.forEach((el) => el.classList.add("js-reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;

          // footer stagger
          if (el.classList.contains("footer-section")) {
            const items = qsa(".site-footer .footer-section");
            const idx = items.indexOf(el);
            el.style.transitionDelay = `${Math.min(idx * 90, 360)}ms`;
          }

          el.classList.add("is-visible");
          io.unobserve(el);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el) => io.observe(el));
  };

  // Navbar blur on scroll
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

  const init = () => {
    injectCSS();
    initNavbarOnScroll();
    initHeroEntrance();
    initScrollReveal();
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