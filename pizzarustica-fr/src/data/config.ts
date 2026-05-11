export const site = {
  url: 'https://www.pizzarustica.fr',
  name: 'Pizza Rustica',
  legalName: 'GRANO', // TODO: confirmer raison sociale exacte + SIREN
  founded: 2007,
  description:
    "Pizzeria italienne artisanale dans le Quartier Latin depuis 2007. Pizzas napolitaines au feu de bois, vente à la part et pizza entière.",
};

export const nap = {
  street: '24 rue Saint-André des Arts',
  postalCode: '75006',
  city: 'Paris',
  district: 'Paris 6e — Quartier Latin',
  country: 'FR',
  phone: '+33146334807',
  phoneDisplay: '01 46 33 48 07',
  email: 'marketing.social@pizzarustica.fr',
  // Coordonnées indicatives — affiner avec un fix GPS exact si besoin
  latitude: 48.8530,
  longitude: 2.3416,
  metro: 'Saint-Michel (4) · Odéon (4/10)',
};

export const hours = [
  { label: 'Lun – Jeu', open: '10h30', close: '00h00', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'] },
  { label: 'Vendredi', open: '10h30', close: '02h00', days: ['Friday'] },
  { label: 'Samedi', open: '10h30', close: '02h00', days: ['Saturday'] },
  { label: 'Dimanche', open: '10h30', close: '00h00', days: ['Sunday'] },
] as const;

export const social = {
  facebook: 'https://www.facebook.com/pizzarustica.fr',
  instagram: 'https://www.instagram.com/rusticaparis',
  instagramSecondary: 'https://www.instagram.com/pizzarustica75',
  tripadvisor:
    'https://www.tripadvisor.com/Restaurant_Review-g187147-d5955044-Reviews-Pizza_Rustica-Paris_Ile_de_France.html',
  yelp: 'https://www.yelp.com/biz/pizza-rustica-paris-4',
  // TODO: remplacer par la vraie URL boutique
  ubereats: 'https://www.ubereats.com',
  // TODO: ajouter Deliveroo / TheFork / Just Eat si applicable
};

export const aggregate = {
  // TODO: brancher sur de vrais chiffres une fois validés
  rating: 4.4,
  reviewCount: 1200,
};

export type LegalEntity = {
  legalName: string;
  legalForm: string;
  capital: string;
  siren: string;
  rcs: string;
  headquarters: string;
  publicationDirector: string;
  hostName: string;
  hostAddress: string;
  hostUrl: string;
};

export const legal: LegalEntity = {
  // TODO: à compléter avec les vraies informations légales
  legalName: 'GRANO',
  legalForm: 'SAS', // À confirmer
  capital: 'TODO €',
  siren: 'TODO',
  rcs: 'Paris',
  headquarters: '24 rue Saint-André des Arts, 75006 Paris',
  publicationDirector: 'TODO',
  hostName: 'Cloudflare, Inc.',
  hostAddress: '101 Townsend Street, San Francisco, CA 94107, États-Unis',
  hostUrl: 'https://www.cloudflare.com',
};
