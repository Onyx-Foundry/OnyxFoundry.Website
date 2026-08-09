const form = document.querySelector("#project-form");
const statusEl = document.querySelector("#form-status");

function clearErrors() {
  form.querySelectorAll(".field-error").forEach((el) => el.remove());
  form.querySelectorAll(".invalid").forEach((el) =>
    el.classList.remove("invalid")
  );
}

function showFieldError(field, message) {
  field.classList.add("invalid");

  const error = document.createElement("span");
  error.className = "field-error";
  error.textContent = message;

  field.insertAdjacentElement("afterend", error);
}

function validate() {
  clearErrors();

  let valid = true;

  const requiredFields = [
    ...form.querySelectorAll("[required]")
  ];

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      showFieldError(field, "Please complete this field.");
      valid = false;
    }
  });

  const email = form.elements.email;

  if (
    email.value &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
  ) {
    showFieldError(
      email,
      "Please enter a valid email address."
    );

    valid = false;
  }

  const website = form.elements.website;

  if (website.value) {
    try {
      new URL(website.value);
    } catch {
      showFieldError(
        website,
        "Please include a full URL, for example https://example.com"
      );

      valid = false;
    }
  }

  return valid;
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    statusEl.className = "form-status";

    if (!validate()) {
      statusEl.textContent =
        "Please check the highlighted fields.";

      statusEl.classList.add("error");

      return;
    }

    const accessKey =
      form.querySelector('[name="access_key"]');

    if (
      !accessKey ||
      accessKey.value === "YOUR_WEB3FORMS_ACCESS_KEY"
    ) {
      statusEl.textContent =
        "Web3Forms access key has not been configured yet.";

      statusEl.classList.add("error");

      return;
    }

    const button =
      form.querySelector('button[type="submit"]');

    const originalText = button.textContent;

    button.disabled = true;
    button.textContent = "Sending…";

    try {
      const formData = new FormData(form);

      const object = Object.fromEntries(formData);

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(object)
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Submission failed"
        );
      }

      form.reset();

      statusEl.textContent =
        "Request received. Thanks for reaching out — we’ll review your project and reply within two business days.";

      statusEl.classList.add("success");

    } catch (error) {

      console.error(error);

      statusEl.textContent =
        "We couldn’t send your request. Please try again or email us directly.";

      statusEl.classList.add("error");

    } finally {

      button.disabled = false;
      button.textContent = originalText;
    }
  });
}