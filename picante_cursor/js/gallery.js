(function () {
  "use strict";

  var grid = document.getElementById("gallery-grid");
  if (!grid) return;

  var items = Array.prototype.slice.call(grid.querySelectorAll(".gallery-item"));
  var filters = document.querySelectorAll(".js-gallery-filter");
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightbox-img");
  var lbClose = document.querySelector(".lightbox__close");
  var lbPrev = document.querySelector(".lightbox__nav--prev");
  var lbNext = document.querySelector(".lightbox__nav--next");

  var visible = [];
  var index = 0;

  function updateVisible() {
    visible = items.filter(function (el) {
      return el.style.display !== "none";
    });
  }

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.getAttribute("data-filter") || "all";
      filters.forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      items.forEach(function (el) {
        var c = el.getAttribute("data-category") || "";
        var show = cat === "all" || c.split(" ").indexOf(cat) !== -1;
        el.style.display = show ? "" : "none";
      });
      updateVisible();
    });
  });

  function openAt(i) {
    if (!lightbox || !lbImg) return;
    updateVisible();
    if (!visible.length) return;
    index = ((i % visible.length) + visible.length) % visible.length;
    var img = visible[index].querySelector("img");
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
      updateVisible();
      var pos = visible.indexOf(el);
      openAt(pos >= 0 ? pos : 0);
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

  updateVisible();
})();
