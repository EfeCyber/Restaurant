// menu.js - Rüya Restoran Menu Animations
(() => {
  "use strict";

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Inject small CSS for animations so you don't need to edit menu.css
  const injectCSS = () => {
    const style = document.createElement("style");
    style.textContent = `
     
    `;
    document.head.appendChild(style);
  };

  // Header entrance animation
  const initHeaderEntrance = () => {
    const header = qs(".menu-header");
    if (!header) return;

    if (prefersReducedMotion) {
      header.classList.add("is-visible");
      return;
    }

    requestAnimationFrame(() => requestAnimationFrame(() => header.classList.add("is-visible")));
  };

  // Scroll reveal for categories and cards
  const initScrollReveal = () => {
    if (prefersReducedMotion) {
      // show everything
      qsa(".menu-category, .menu-card").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const categories = qsa(".menu-category");
    const cards = qsa(".menu-card");

    // Make revealable
    categories.forEach((el) => el.classList.add("js-reveal"));
    cards.forEach((el) => el.classList.add("js-reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;

          // Stagger cards within the same grid
          if (el.classList.contains("menu-card")) {
            const grid = el.closest(".menu-items-grid");
            if (grid) {
              const gridCards = qsa(".menu-card", grid);
              const idx = gridCards.indexOf(el);
              el.style.transitionDelay = `${Math.min(idx * 90, 540)}ms`;
            }
          }

          // Slight delay for category sections
          if (el.classList.contains("menu-category")) {
            const idx = categories.indexOf(el);
            el.style.transitionDelay = `${Math.min(idx * 80, 360)}ms`;
          }

          el.classList.add("is-visible");
          io.unobserve(el);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    [...categories, ...cards].forEach((el) => io.observe(el));
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

  // Smooth scroll for tabs + active state
  const initTabsSmoothScroll = () => {
    const tabs = qsa(".menu-nav-tabs a");
    if (!tabs.length) return;

    const getTargetFromHref = (a) => {
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("#")) return null;
      return qs(href);
    };

    const setActive = (id) => {
      tabs.forEach((t) => t.classList.toggle("is-active", t.getAttribute("href") === `#${id}`));
    };

    // click -> smooth scroll
    tabs.forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = getTargetFromHref(a);
        if (!target) return;

        e.preventDefault();

        // header height compensation
        const header = qs(".site-header");
        const headerH = header ? header.offsetHeight : 0;

        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;

        window.scrollTo({
          top,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });

        const id = target.id;
        if (id) setActive(id);

        // keep URL hash cleanly
        history.replaceState(null, "", `#${target.id}`);
      });
    });

    // Active tab updates while scrolling (spy)
    const sections = qsa(".menu-category").filter((s) => s.id);

    if (!sections.length) return;

    const spy = () => {
      const header = qs(".site-header");
      const headerH = header ? header.offsetHeight : 0;

      const y = window.scrollY + headerH + 30;

      // find last section whose top <= y
      let current = sections[0].id;
      for (const s of sections) {
        const top = s.offsetTop;
        if (top <= y) current = s.id;
      }
      setActive(current);
    };

    spy();
    window.addEventListener("scroll", spy, { passive: true });
  };

  const init = () => {
    injectCSS();
    initHeaderEntrance();
    initNavbarOnScroll();
    initScrollReveal();
    initTabsSmoothScroll();
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