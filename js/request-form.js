var form = document.querySelector("#project-form");
var statusEl = document.querySelector("#form-status");

function clearErrors() {
  form.querySelectorAll(".field-error").forEach(function (el) { el.remove(); });
  form.querySelectorAll(".invalid").forEach(function (el) {
    el.classList.remove("invalid");
    el.removeAttribute("aria-invalid");
    el.removeAttribute("aria-describedby");
  });
}

function showFieldError(field, message) {
  field.classList.add("invalid");
  field.setAttribute("aria-invalid", "true");

  var errorId = field.name + "-error";
  var error = document.createElement("span");
  error.className = "field-error";
  error.id = errorId;
  error.textContent = message;
  field.setAttribute("aria-describedby", errorId);
  field.insertAdjacentElement("afterend", error);
}

function validate() {
  clearErrors();

  var valid = true;
  var firstInvalid = null;

  var requiredFields = Array.from(form.querySelectorAll("[required]"));

  requiredFields.forEach(function (field) {
    if (!field.value.trim()) {
      showFieldError(field, "Please complete this field.");
      if (!firstInvalid) firstInvalid = field;
      valid = false;
    }
  });

  var email = form.elements.email;

  if (
    email.value &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
  ) {
    showFieldError(email, "Please enter a valid email address.");
    if (!firstInvalid) firstInvalid = email;
    valid = false;
  }

  var website = form.elements.website;

  if (website.value) {
    try {
      new URL(website.value);
    } catch (e) {
      showFieldError(
        website,
        "Please include a full URL, for example https://example.com"
      );
      if (!firstInvalid) firstInvalid = website;
      valid = false;
    }
  }

  if (firstInvalid) firstInvalid.focus();

  return valid;
}

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    statusEl.className = "form-status";
    statusEl.textContent = "";

    if (!validate()) {
      statusEl.textContent = "Please check the highlighted fields.";
      statusEl.classList.add("error");
      return;
    }

    var accessKey = form.querySelector('[name="access_key"]');

    if (
      !accessKey ||
      accessKey.value === "YOUR_WEB3FORMS_ACCESS_KEY"
    ) {
      statusEl.textContent =
        "Web3Forms access key has not been configured yet.";
      statusEl.classList.add("error");
      return;
    }

    var button = form.querySelector('button[type="submit"]');
    var originalText = button.textContent;

    button.disabled = true;
    button.textContent = "Sending…";

    var formData = new FormData(form);
    var object = {};
    formData.forEach(function (value, key) { object[key] = value; });

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(object)
    })
      .then(function (response) {
        return response.json().then(function (result) {
          if (!response.ok || !result.success) {
            throw new Error(result.message || "Submission failed");
          }
          return result;
        });
      })
      .then(function () {
        form.reset();
        statusEl.textContent =
          "Request received. Thanks for reaching out — we'll review your project and reply within two business days.";
        statusEl.classList.add("success");
      })
      .catch(function (error) {
        console.error(error);

        statusEl.textContent = "";
        statusEl.appendChild(
          document.createTextNode("We couldn't send your request. Please try again or ")
        );
        var mailLink = document.createElement("a");
        mailLink.href = "mailto:info@onyx-foundry.com";
        mailLink.textContent = "email us directly";
        mailLink.style.color = "var(--cyan)";
        statusEl.appendChild(mailLink);
        statusEl.appendChild(document.createTextNode("."));
        statusEl.classList.add("error");
      })
      .finally(function () {
        button.disabled = false;
        button.textContent = originalText;
      });
  });
}
