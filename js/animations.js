(function () {
  "use strict";

  var nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  if (!("IntersectionObserver" in window)) {
    nodes.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
        setTimeout(function () {
          el.classList.add("is-visible");
        }, delay);
        observer.unobserve(el);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  nodes.forEach(function (el) {
    observer.observe(el);
  });
})();
