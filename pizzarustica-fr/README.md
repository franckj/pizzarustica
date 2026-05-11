# Pizza Rustica — pizzarustica.fr

Landing page locale SEO pour **Pizza Rustica** (24 rue Saint-André des Arts, 75006 Paris).
Stack : Astro 4 (static) · Tailwind CSS · TypeScript · Plausible · Cloudflare Pages.

Trafic cible : **90 % mobile** — design mobile-first absolu.

---

## Démarrage rapide

```bash
cd pizzarustica-fr
npm install
npm run dev          # http://localhost:4321
npm run build        # build statique dans dist/
npm run preview      # preview du build
```

## Déploiement Cloudflare Pages

Deux voies, configurées :

### 1. CI/CD automatique (recommandé)

Chaque push sur `main` déclenche `.github/workflows/deploy.yml`
qui builde puis déploie via `cloudflare/wrangler-action@v3`.

**Secrets GitHub requis** (à configurer une seule fois) :

```bash
gh secret set CLOUDFLARE_API_TOKEN      # token avec scope Pages:Edit
gh secret set CLOUDFLARE_ACCOUNT_ID     # depuis `wrangler whoami`
```

Le token API se crée ici : <https://dash.cloudflare.com/profile/api-tokens>.
Permissions minimum :
- Account → Cloudflare Pages → Edit
- Zone → DNS → Edit (si le domaine est sur Cloudflare)

### 2. Déploiement manuel d'urgence

```bash
# Auth (une seule fois)
npx wrangler login

# Créer le projet Pages (une seule fois)
npx wrangler pages project create pizzarustica-fr --production-branch main

# Déploiement
./scripts/deploy.sh

# Ou via npm
npm run deploy           # production
npm run deploy:preview   # preview branch
```

## Structure

```
pizzarustica-fr/
├── src/
│   ├── components/   # Header, Hero, Menu, Reviews, Location…
│   ├── data/         # config.ts (NAP), menu.ts (pizzas)
│   ├── layouts/      # Base.astro (HTML shell + SEO + Schema.org)
│   ├── pages/        # index, carte, mentions-legales, …
│   └── styles/       # global.css (Tailwind + tokens)
├── public/
│   ├── img/          # logo, hero, pizzas
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   └── robots.txt
├── scripts/
│   └── deploy.sh
└── astro.config.mjs
```

## TODO — placeholders à remplacer

Recherche `TODO` dans le repo pour la liste à jour. Points clés :

- [ ] `src/data/config.ts` — mentions légales (SIREN, capital, directeur de publication)
- [ ] `src/data/menu.ts` — prix officiels, allergènes, photos finales
- [ ] `public/img/hero-pizza.svg` → vraie photo `hero-pizza.webp` 1080×1920
- [ ] `public/img/pizzas/*.webp` — une photo par pizza
- [ ] `public/og-image.jpg` — 1200×630
- [ ] `public/apple-touch-icon.png` — 180×180
- [ ] `public/icon-192.png` / `icon-512.png` / `icon-maskable.png`
- [ ] URL Uber Eats / Deliveroo réelles dans `src/data/config.ts`
- [ ] 3 vrais avis clients dans `src/data/menu.ts`

## Plausible

Script chargé pour le domaine `pizzarustica.fr`. Tous les CTA critiques
sont instrumentés via `data-plausible-event-name`. Conformité CNIL : pas de cookie,
pas de consentement requis.

Liste des events trackés (voir composants) :
- `click_cta_appeler_hero` · `click_cta_appeler_header` · `click_cta_appeler_mobile_menu`
- `click_cta_appeler_sticky` · `click_cta_appeler_location`
- `click_cta_ubereats_sticky`
- `menu_filter_classique` · `menu_filter_maison` · `menu_filter_vegetarienne`
- `pizza_card_click`
- `social_click_facebook` · `social_click_instagram` · `social_click_tripadvisor` · `social_click_yelp`
- `map_click`

## SEO local

- Schema.org `Restaurant` injecté dans `<head>` via `Base.astro`
- Coordonnées geo (lat/long) dans meta `geo.position` + `ICBM`
- Sitemap auto via `@astrojs/sitemap` (`/sitemap-index.xml`)
- `robots.txt` à la racine `public/`
- NAP cohérent partout (`src/data/config.ts` source unique de vérité)

## Performance — Core Web Vitals

- Astro SSG → 0 JS par défaut sauf composants interactifs (burger, filtres)
- Hero image `fetchpriority="high"`, autres en `loading="lazy"`
- `astro-compress` minifie HTML/CSS/JS/SVG
- Cible Lighthouse mobile ≥ 90 (Perf + SEO + A11Y)

---

© Pizza Rustica · GRANO
