<div align="center">

# 479 CODE — Official Website

**Build · Track · Automate**

A hand-coded, multi-page website for **479 CODE** — software & operational systems, Lagos, Nigeria.

</div>

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Animated barcode hero, services teaser, flagship systems, stats, process |
| Services | `services.html` | All six service lines with detailed engagement breakdowns |
| Systems | `systems.html` | Fuel TrackPro · Smart Attendance · Fleet Operations Suite |
| Projects | `projects.html` | Filterable project archive |
| Contact | `contact.html` | Direct contacts + WhatsApp-prefilled enquiry form |

## Features

- 🌗 **Dark / Light theme** — dark by default, toggle in the nav, remembered across visits
- 📱 **Fully responsive** — hamburger menu, fluid type, touch-safe interactions
- 🔴 **Barcode design system** — live barcode hero, scanner-laser accents, custom scanner cursor
- ⌨️ **Live typing terminal**, animated counters, scroll reveals, 3D-tilt dashboards
- ♿ **Respects `prefers-reduced-motion`**, keyboard-focus friendly
- ⚡ **Zero frameworks, zero build step** — plain HTML/CSS/JS, loads instantly

## Configuration

Open `assets/main.js` and update the two constants at the top:

```js
const WA_NUMBER = '234XXXXXXXXXX';   // your WhatsApp number, international format, no +
const EMAIL     = 'you@yourdomain.com';
```

Every WhatsApp link and the contact form update automatically.

## Local preview

Just open `index.html` in a browser — no server required.

## Deploy (GitHub Pages)

1. Push to the `main` branch
2. Repo → **Settings → Pages**
3. Source: **Deploy from a branch** → Branch: `main` / `/ (root)` → Save
4. Site goes live at `https://<username>.github.io/<repo>/`

---

<sub>Designed & engineered in-house by 479 CODE — this website is Exhibit 01 of our portfolio.</sub>
