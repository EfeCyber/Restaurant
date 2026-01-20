// home.js - Rüya Restoran Home Animations
(() => {
  "use strict";

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ===== Animasyon CSS'ini ekle (istersen sonra home.css'e taşıyabilirsin) =====
  const injectCSS = () => {
    const style = document.createElement("style");
    style.textContent = `
     
    `;
    document.head.appendChild(style);
  };

  // Navbar scroll effect
  const initNavbarOnScroll = () => {
    const header = qs(".site-header");
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle("is-scrolled", (window.scrollY || 0) > 16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  };

  // Hero title color animation + entrance
  const initHero = () => {
    const hero = qs(".hero-section");
    if (!hero) return;

    const h1 = qs(".hero-section h1");
    const p = qs(".hero-section p");
    const btn = qs(".hero-section .cta-button");

    // animated gradient title
    if (h1) h1.classList.add("animated-title");

    // entrance helpers
    if (h1) h1.classList.add("hero-animate");
    if (p) { p.classList.add("hero-animate", "delay-1"); }
    if (btn) { btn.classList.add("hero-animate", "delay-2"); }

    if (prefersReducedMotion) {
      hero.classList.add("is-visible");
      return;
    }

    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add("is-visible")));
  };

  // CTA "Menümüzü Keşfet" yönlendirme (şu an href="#" idi)
  const initMenuCTA = () => {
    const btn = qs(".hero-section .cta-button");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      // Eğer gerçekten # olarak bırakmak istemiyorsan menüye yönlendiriyoruz:
      e.preventDefault();
      window.location.href = "Proje/HTML/menu.html";
    });
  };

  // Scroll reveal sections
  const initReveal = () => {
    if (prefersReducedMotion) return;

    const targets = [
      ...qsa(".featured-dishes .card"),
      ...qsa(".testimonials-section .testimonial-card"),
      ...qsa(".gallery-section .gallery-grid img"),
      ...qsa(".reservation-cta .container"),
      ...qsa(".site-footer .footer-section"),
    ].filter(Boolean);

    if (!targets.length) return;

    targets.forEach((el) => el.classList.add("js-reveal"));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        // stagger by group
        const group =
          el.closest(".dish-cards") ||
          el.closest(".testimonial-cards") ||
          el.closest(".gallery-grid") ||
          el.closest(".footer-container");

        if (group) {
          const siblings = qsa(".js-reveal", group);
          const idx = siblings.indexOf(el);
          el.style.transitionDelay = `${Math.min(idx * 90, 540)}ms`;
        }

        el.classList.add("is-visible");
        io.unobserve(el);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -10% 0px" });

    targets.forEach((el) => io.observe(el));
  };

  const init = () => {
    injectCSS();
    initNavbarOnScroll();
    initHero();
    initMenuCTA();
    initReveal();
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