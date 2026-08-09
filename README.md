# Onyx Foundry v0.1

A lightweight static starter site for **Onyx Foundry**, designed to run on **GitHub Pages** with no framework or build step required.

The initial site includes four pages:

- `index.html` — Home
- `services.html` — Services
- `request.html` — Request a Project
- `about.html` — About

## Project structure

```text
/
├── index.html
├── services.html
├── request.html
├── about.html
│
├── assets/
│   ├── brand/
│   │   └── onyx-mark.svg
│   └── images/
│       ├── forge-hero.svg
│       └── unforged-onyx.svg
│
├── css/
│   └── styles.css
│
├── js/
│   ├── main.js
│   └── request-form.js
│
└── README.md
```

## Run locally

Because the site is static, you can either:

- open `index.html` directly in a browser, or
- serve the folder using any local HTTP server.

No package installation is required.

## GitHub Pages

If the repository is already configured for GitHub Pages:

1. Place these files in the configured publishing root.
2. Commit the changes.
3. Push to the branch used by GitHub Pages.
4. Confirm the site loads correctly on the configured domain.

No framework, build pipeline, or server-side runtime is required for the site itself.

---

# Request form

The **Request a Project** form uses **Web3Forms** for the initial launch.

Web3Forms is used because GitHub Pages is static and cannot process or send email directly from client-side JavaScript without an external endpoint.

The form submits asynchronously from `js/request-form.js` to:

```text
https://api.web3forms.com/submit
```

## Configure Web3Forms

### 1. Create an access key

Create a Web3Forms access key for the email address that should receive Onyx Foundry project requests.

### 2. Add the access key

Open:

```text
request.html
```

Find:

```html
<input
  type="hidden"
  name="access_key"
  value="YOUR_WEB3FORMS_ACCESS_KEY">
```

Replace:

```text
YOUR_WEB3FORMS_ACCESS_KEY
```

with the Web3Forms access key.

Example:

```html
<input
  type="hidden"
  name="access_key"
  value="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx">
```

The Web3Forms access key is intended for use in client-side forms and will therefore be visible in the page source.

Do **not** place SMTP passwords, private API tokens, mailbox credentials, or other secrets in the HTML or JavaScript.

## Form metadata

The form also includes:

```html
<input
  type="hidden"
  name="subject"
  value="New Onyx Foundry Project Request">

<input
  type="hidden"
  name="from_name"
  value="Onyx Foundry Website">
```

These control how incoming project requests are identified in email.

---

# Spam protection

The Web3Forms version uses a honeypot field named:

```text
botcheck
```

The field is hidden from normal visitors but may be interacted with by automated spam bots.

Current markup:

```html
<input
  type="checkbox"
  name="botcheck"
  class="honeypot"
  tabindex="-1"
  autocomplete="off"
  aria-hidden="true">
```

The previous Formspree-specific `_gotcha` field is no longer required.

Do not keep both `_gotcha` and `botcheck` unless there is a specific reason to do so.

---

# Form behaviour

`js/request-form.js` currently handles:

- required-field validation
- email format validation
- website URL validation
- Web3Forms AJAX submission
- loading state on the submit button
- success messaging
- error messaging
- form reset after successful submission

Successful submissions display:

> Request received. Thanks for reaching out — we’ll review your project and reply within two business days.

If the Web3Forms access key has not yet been configured, the form displays a configuration error rather than attempting to submit.

---

# Brand starter guide

The launch site uses the following core palette:

| Role | Name | Hex |
|---|---|---|
| Primary background | Onyx Navy | `#08121F` |
| Secondary surface | Deep Slate | `#0E1929` |
| Raised surface / border | Forged Steel | `#243244` |
| Primary text | Frost White | `#F5F7FA` |
| Secondary text | Steel Mist | `#9BA9BC` |
| Knowledge / systems accent | Arc Cyan | `#22D3EE` |
| Foundry / action accent | Ember Orange | `#FF7117` |
| Secondary warm accent | Molten Gold | `#F59E42` |

General usage principle:

- predominantly dark neutral surfaces
- cyan for knowledge, systems, structure, and information
- orange for action, creation, and the foundry
- restrained use of accents rather than heavy gradients or gaming-style effects

---

# Brand assets

The starter package currently includes lightweight SVG artwork so the site can render immediately:

```text
assets/brand/onyx-mark.svg
assets/images/forge-hero.svg
assets/images/unforged-onyx.svg
```

These should be treated as **starter web vectors**, not the final master brand artwork.

The intended final brand asset set should eventually include:

```text
logo-primary.svg
logo-horizontal.svg
logo-mark.svg
logo-monochrome.svg

favicon.svg
favicon-16.png
favicon-32.png
apple-touch-icon-180.png
icon-192.png
icon-512.png
```

The high-resolution forged crystal, pre-forged crystal, and anvil artwork can be added separately under:

```text
assets/images/
```

---

# Launch services

The v0.1 site presents four focused services:

1. **Documentation & Knowledge Audit**
2. **API & Developer Documentation**
3. **Documentation Systems & Docs-as-Code**
4. **UX & Knowledge Experience Review**

The launch approach is intentionally narrow and project-based.

The site should avoid presenting Onyx Foundry as a large full-service agency or advertising capabilities that are not yet part of a proven delivery model.

---

# Site philosophy

Onyx Foundry v0.1 should remain:

- lightweight
- fast
- accessible
- easy to maintain
- easy to deploy
- intentionally small in scope

Avoid adding a framework or backend unless there is a clear requirement that cannot be met cleanly with the current static architecture.

For the initial launch:

```text
GitHub Pages
      +
HTML / CSS / JavaScript
      +
Web3Forms
```

is the intended architecture.

---

# Before soft launch

Check the following:

- [ ] Web3Forms access key added
- [ ] Test submission received successfully
- [ ] Required-field validation tested
- [ ] Invalid email tested
- [ ] Invalid website URL tested
- [ ] Success message tested
- [ ] Mobile navigation tested
- [ ] All navigation links tested
- [ ] Domain and HTTPS working
- [ ] Logo and favicon displaying correctly
- [ ] Email destination confirmed
- [ ] Copy reviewed
- [ ] Site tested on desktop and mobile

Once the initial site is live and receiving real traffic, future changes should be driven by actual usage and project needs rather than adding complexity pre-emptively.
