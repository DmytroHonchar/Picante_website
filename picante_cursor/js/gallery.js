(function () {
  "use strict";

  var grid = document.getElementById("gallery-grid");
  if (!grid) return;

  var items = Array.prototype.slice.call(grid.querySelectorAll(".gallery-item"));
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightbox-img");
  var lbClose = document.querySelector(".lightbox__close");
  var lbPrev = document.querySelector(".lightbox__nav--prev");
  var lbNext = document.querySelector(".lightbox__nav--next");

  var index = 0;

  function openAt(i) {
    if (!lightbox || !lbImg || !items.length) return;
    index = ((i % items.length) + items.length) % items.length;
    var img = items[index].querySelector("img");
    if (img) {
      lbImg.src = img.src;
      lbImg.alt = img.alt || "";
    }
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLb() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  items.forEach(function (el) {
    el.addEventListener("click", function () {
      openAt(items.indexOf(el));
    });
  });

  if (lbClose) lbClose.addEventListener("click", closeLb);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLb();
    });
  }

  if (lbPrev) {
    lbPrev.addEventListener("click", function (e) {
      e.stopPropagation();
      openAt(index - 1);
    });
  }
  if (lbNext) {
    lbNext.addEventListener("click", function (e) {
      e.stopPropagation();
      openAt(index + 1);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") openAt(index - 1);
    if (e.key === "ArrowRight") openAt(index + 1);
  });

  var touchStartX = 0;
  if (lightbox) {
    lightbox.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );
    lightbox.addEventListener(
      "touchend",
      function (e) {
        var dx = e.changedTouches[0].screenX - touchStartX;
        if (dx > 50) openAt(index - 1);
        if (dx < -50) openAt(index + 1);
      },
      { passive: true }
    );
  }

  grid.querySelectorAll("img[data-lazy]").forEach(function (img) {
    function done() {
      var parent = img.closest(".gallery-item");
      if (parent) parent.classList.remove("gallery-item--loading");
    }
    if (img.complete) done();
    else img.addEventListener("load", done);
  });
})();
