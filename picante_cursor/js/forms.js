(function () {
  "use strict";

  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function handleForm(form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        field.classList.remove("form-field--error");
        if (!field.value.trim()) {
          field.classList.add("form-field--error");
          ok = false;
        }
        if (field.type === "email" && field.value && !validateEmail(field.value)) {
          field.classList.add("form-field--error");
          ok = false;
        }
      });

      var status = form.querySelector(".form-status");
      if (!ok) {
        if (status) {
          status.textContent = "Please fill in the required fields.";
          status.style.color = "var(--chilli-red)";
        }
        return;
      }

      if (status) {
        status.textContent = "Thanks — we’ll be in touch.";
        status.style.color = "var(--lime-green)";
      }
      form.reset();
    });
  }

  document.querySelectorAll("form.js-validate").forEach(handleForm);
})();
