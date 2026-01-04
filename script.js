import { validateContact } from "./moduls/validation.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const phoneFields = document.getElementById("phoneFields");
  const addPhoneBtn = document.getElementById("addPhoneBtn");
  const birthDateInput = document.getElementById("birthDate");
  const phoneTemplate = document.getElementById("phoneTemplate");
  const countrySelect = document.getElementById("countrySelect");
  const radios = document.querySelectorAll('input[name="country"]');

  let currentTarget = null;

  const selectedStatus = document.getElementById("selectedStatus");
  if (selectedStatus) {
    document
      .querySelectorAll('input[name="marital_status"]')
      .forEach((radio) => {
        radio.addEventListener("change", function () {
          const label = document.querySelector(`label[for="${this.id}"]`);
          if (label) {
            selectedStatus.textContent = label.textContent;
            selectedStatus.style.color = "white";
          }
        });
      });
  }

  birthDateInput.addEventListener("focus", () => {
    birthDateInput.type = "date";
    birthDateInput.showPicker?.();
  });
  birthDateInput.addEventListener("blur", () => {
    if (!birthDateInput.value) {
      birthDateInput.type = "text";
    }
  });

  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter") e.preventDefault();
  });

  emailInput.addEventListener("input", () =>
    validateContact(emailInput, phoneFields)
  );
  phoneFields.addEventListener("input", () =>
    validateContact(emailInput, phoneFields)
  );

  addPhoneBtn.addEventListener("click", () => {
    const currentFields = phoneFields.querySelectorAll(".phone-circle").length;
    if (currentFields < 5) {
      const clone = phoneTemplate.content.cloneNode(true);
      phoneFields.appendChild(clone);
      const newPhoneField = phoneFields.lastElementChild;
      const phoneInput = newPhoneField.querySelector("[data-phone]");
      const flagToggle = newPhoneField.querySelector("[data-flag-toggle]");

      flagToggle.addEventListener("click", () => {
        currentTarget = newPhoneField;
        countrySelect.classList.remove("d-none");
        phoneInput.disabled = true;
      });
    } else {
      alert("Можно добавить максимум 5 номеров");
    }
  });

  phoneFields.addEventListener("click", (e) => {
    const flagCircle = e.target.closest("[data-flag-toggle]");
    if (flagCircle) {
      currentTarget = flagCircle.closest(".phone-circle");
      countrySelect.classList.remove("d-none");
      const input = currentTarget.querySelector("[data-phone]");
      input.disabled = true;
    }
  });

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const selectedCode = radio.value;
      const selectedFlag = radio.id;

      if (!currentTarget) return;

      const flagIcon = currentTarget.querySelector("[data-flag-icon]");
      const phoneInput = currentTarget.querySelector("[data-phone]");

      if (selectedFlag === "by") {
        flagIcon.src = "./src/images/flags/belarus.png";
      } else if (selectedFlag === "ru") {
        flagIcon.src = "./src/images/flags/russia.png";
      }

      phoneInput.placeholder = `${selectedCode} (__) ___ - __ - __`;
      countrySelect.classList.add("d-none");
      phoneInput.disabled = false;
      phoneInput.focus();
    });
  });

  form.addEventListener("submit", (e) => {
    if (!validateContact(emailInput, phoneFields)) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
});
