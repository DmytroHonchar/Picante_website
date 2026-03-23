(function () {
  "use strict";

  var food = document.getElementById("food-menu");
  var drinks = document.getElementById("drinks-menu");
  var tabs = document.querySelectorAll(".js-menu-tab");

  function setActive(id) {
    tabs.forEach(function (btn) {
      var target = btn.getAttribute("data-target");
      btn.classList.toggle("is-active", target === id);
    });
  }

  tabs.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var id = btn.getAttribute("data-target");
      var section = id === "drinks" ? drinks : food;
      if (section) {
        var top = section.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: top, behavior: "smooth" });
        setActive(id);
      }
    });
  });

  if (!food || !drinks) return;

  window.addEventListener(
    "scroll",
    function () {
      var dRect = drinks.getBoundingClientRect();
      if (dRect.top <= 120) setActive("drinks");
      else setActive("food");
    },
    { passive: true }
  );
})();
