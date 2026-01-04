export function showError(input, message) {
  let error = input.parentNode.querySelector(".error-message");
  if (!error) {
    error = document.createElement("div");
    error.className = "error-message text-danger mt-1";
    input.parentNode.appendChild(error);
  }
  error.textContent = message;
  input.classList.add("is-invalid");
}

export function clearError(input) {
  const error = input.parentNode.querySelector(".error-message");
  if (error) error.remove();
  input.classList.remove("is-invalid");
}

export function validateContact(emailInput, phoneFields) {
  const phones = phoneFields.querySelectorAll("[data-phone]");
  const hasPhone = Array.from(phones).some((p) => p.value.trim() !== "");
  const hasEmail = emailInput.value.trim() !== "";

  if (!hasPhone && !hasEmail) {
    showError(emailInput, "Заполните email или хотя бы один телефон");
    phones.forEach((p) =>
      showError(p, "Заполните email или хотя бы один телефон")
    );
    return false;
  } else {
    clearError(emailInput);
    phones.forEach((p) => clearError(p));
    return true;
  }
}