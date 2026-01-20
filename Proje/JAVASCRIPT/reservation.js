// ===== Rüya Reservation Page Animations =====
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

  const initNavbarOnScroll = () => {
    const header = qs(".site-header");
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle("is-scrolled", (window.scrollY || 0) > 16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  };

  const initHeroTitle = () => {
    const title = qs(".reservation-hero-section h1");
    if (title) title.classList.add("animated-title");
  };

  const initReveal = () => {
    if (prefersReducedMotion) return;

    const targets = [
      ...qsa(".reservation-hero-section .container p"),
      ...qsa(".reservation-form-section .form-card"),
      ...qsa(".site-footer .footer-section")
    ].filter(Boolean);

    if (!targets.length) return;

    targets.forEach(el => el.classList.add("js-reveal"));

    const io = new IntersectionObserver((entries) => {
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
    }, { threshold: 0.14, rootMargin: "0px 0px -10% 0px" });

    targets.forEach(el => io.observe(el));
  };

  const init = () => {
    injectCSS();
    initNavbarOnScroll();
    initHeroTitle();
    initReveal();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

// ===== Testimonials Reveal Animation =====
document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".testimonial-card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${index * 120}ms`;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    cards.forEach(card => observer.observe(card));
});


// ===== Testimonial Auto Slider =====
document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".testimonial-slide");
    let currentIndex = 0;
    const intervalTime = 5000; // 5 saniye

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // İlk gösterim
    showSlide(currentIndex);

    // 5 saniyede bir değiştir
    setInterval(nextSlide, intervalTime);

});


// ===== Navbar Logo Animation =====
document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".logo a");
    if (logo) {
        logo.classList.add("animated-logo");
    }
});
