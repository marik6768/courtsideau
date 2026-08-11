/**
 * COURTSIDE — Common UI utilities
 * Mobile menu · active nav · scroll reveal · side decor
 */
(function () {
  "use strict";

  function initMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const mobileNav = document.querySelector(".nav-mobile");
    if (!toggle || !mobileNav) return;

    const iconOpen = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="4" y1="6" x2="20" y2="6"></line>
        <line x1="4" y1="12" x2="20" y2="12"></line>
        <line x1="4" y1="18" x2="20" y2="18"></line>
      </svg>`;
    const iconClose = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>`;

    toggle.innerHTML = iconOpen;

    toggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      toggle.innerHTML = isOpen ? iconClose : iconOpen;
      toggle.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        toggle.innerHTML = iconOpen;
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  function setActiveNav() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-desktop a, .nav-mobile a").forEach((link) => {
      const href = link.getAttribute("href");
      if (href === path || (path === "" && href === "index.html")) {
        link.classList.add("active");
      }
    });
  }

  function showDemoBadges() {
    if (window.COURTSIDE_CONFIG && window.COURTSIDE_CONFIG.DEMO_MODE) {
      document.querySelectorAll("[data-demo]").forEach((el) => {
        el.style.display = "";
      });
    }
  }

  function initHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    els.forEach((el, i) => {
      if (!el.classList.contains("reveal-delay-1") &&
          !el.classList.contains("reveal-delay-2") &&
          !el.classList.contains("reveal-delay-3")) {
        const d = (i % 5) + 1;
        el.classList.add("reveal-delay-" + Math.min(d, 5));
      }
      io.observe(el);
    });
  }

  function injectSideDecor() {
    if (document.querySelector(".side-decor")) return;
    const left = document.createElement("div");
    left.className = "side-decor side-decor-left";
    left.setAttribute("aria-hidden", "true");
    left.innerHTML =
      '<div class="side-line"></div>' +
      '<div class="side-circle md"></div>' +
      '<div class="side-circle sm"></div>' +
      '<div class="side-circle filled"></div>' +
      '<div class="side-circle"></div>' +
      '<div class="side-label">COURTSIDE</div>' +
      '<div class="side-circle sm"></div>' +
      '<div class="side-line"></div>';
    const right = document.createElement("div");
    right.className = "side-decor side-decor-right";
    right.setAttribute("aria-hidden", "true");
    right.innerHTML =
      '<div class="side-line"></div>' +
      '<div class="side-circle"></div>' +
      '<div class="side-circle filled"></div>' +
      '<div class="side-circle md"></div>' +
      '<div class="side-label">NBA · GI</div>' +
      '<div class="side-circle sm"></div>' +
      '<div class="side-circle"></div>' +
      '<div class="side-line"></div>';
    document.body.appendChild(left);
    document.body.appendChild(right);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    setActiveNav();
    showDemoBadges();
    initHeaderScroll();
    initReveal();
    injectSideDecor();
  });

  window.COURTSIDE_UI = {
    initReveal: initReveal
  };
})();
