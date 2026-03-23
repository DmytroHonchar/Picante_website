(function () {
  "use strict";

  document.body.classList.add("page-fade-in");

  var loader = document.getElementById("page-loader");
  if (loader) {
    window.addEventListener("load", function () {
      loader.classList.add("is-done");
      setTimeout(function () {
        loader.setAttribute("aria-hidden", "true");
      }, 450);
    });
  }

  var toggle = document.querySelector(".nav-toggle");
  var overlay = document.getElementById("nav-overlay");
  var closeBtn = document.querySelector(".nav-overlay__close");

  function openNav() {
    if (!overlay) return;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (toggle) toggle.setAttribute("aria-expanded", "true");
  }

  function closeNav() {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      if (overlay && overlay.classList.contains("is-open")) closeNav();
      else openNav();
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeNav);

  if (overlay) {
    overlay.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }

  var chevron = document.querySelector(".hero-scroll-hint");
  if (chevron) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 40) chevron.classList.add("is-hidden");
        else chevron.classList.remove("is-hidden");
      },
      { passive: true }
    );
  }
})();
