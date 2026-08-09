# Onyx Foundry v0.1

A lightweight static starter site designed for GitHub Pages.

## Pages

- `index.html` — Home
- `services.html` — Services
- `request.html` — Request a Project
- `about.html` — About

## Run locally

Open `index.html` directly in a browser, or serve the folder with any local HTTP server.

## Configure the request form

1. Create a Formspree form.
2. Copy the form endpoint, which will look similar to:
   `https://formspree.io/f/xxxxxxxx`
3. Open `request.html`.
4. Replace:
   `YOUR_FORMSPREE_ENDPOINT_HERE`
   with the endpoint.
5. Commit and push.

The form JavaScript:
- validates required fields
- validates email and website format
- includes a honeypot field
- submits asynchronously
- displays success/error feedback

## Branding

Core colors:

- Onyx Navy: `#08121F`
- Deep Slate: `#0E1929`
- Forged Steel: `#243244`
- Frost White: `#F5F7FA`
- Steel Mist: `#9BA9BC`
- Arc Cyan: `#22D3EE`
- Ember Orange: `#FF7117`
- Molten Gold: `#F59E42`

Temporary vector assets are included so the project renders immediately:
- `assets/brand/onyx-mark.svg`
- `assets/images/forge-hero.svg`
- `assets/images/unforged-onyx.svg`

These are lightweight starter vectors, not intended to replace the final high-resolution brand artwork.

## GitHub Pages

If the repo is already configured for GitHub Pages, commit these files at the publishing root (or adjust the Pages source to the folder containing them).

No framework or build step is required.
