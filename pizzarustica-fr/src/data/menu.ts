export type PizzaCategory = 'classique' | 'maison' | 'vegetarienne';
export type PizzaTag = 'bestseller' | 'spicy' | 'vegan' | 'nouveau';

export interface Pizza {
  id: string;
  name: string;
  tagline: string;
  ingredients: string[];
  origin: string;
  /** Prix entière TTC. TODO: confirmer la carte officielle. */
  price?: number;
  /** Prix à la part TTC, si applicable. */
  priceSlice?: number;
  category: PizzaCategory;
  tag?: PizzaTag;
}

// TODO: remplacer prix et libellés par la carte officielle de Pizza Rustica
export const pizzas: Pizza[] = [
  {
    id: 'margherita',
    name: 'Margherita',
    tagline: "L'icône napolitaine aux couleurs de l'Italie",
    ingredients: ['Tomate San Marzano', 'Mozzarella fior di latte', 'Basilic frais', "Huile d'olive"],
    origin: 'Naples, Italie — XIXᵉ siècle',
    category: 'classique',
    price: 12,
  },
  {
    id: 'bufala',
    name: 'Bufala',
    tagline: 'La reine campanienne, mozzarella crue ajoutée après cuisson',
    ingredients: ['Tomate San Marzano', 'Mozzarella di Bufala Campana DOP', 'Basilic', "Huile d'olive"],
    origin: 'Campanie, Italie',
    category: 'classique',
    price: 15,
    tag: 'bestseller',
  },
  {
    id: 'diavola',
    name: 'Diavola',
    tagline: 'Pour les amateurs de sensations fortes',
    ingredients: ['Tomate', 'Mozzarella', 'Salame piccante calabraise', 'Piment', "Huile d'olive pimentée"],
    origin: 'Calabre, Italie du Sud',
    category: 'classique',
    tag: 'spicy',
    price: 14,
  },
  {
    id: 'quattro-formaggi',
    name: '4 Fromages',
    tagline: 'Un voyage dans les fromages italiens',
    ingredients: ['Mozzarella', 'Gorgonzola', 'Parmesan', 'Fontina'],
    origin: 'Italie',
    category: 'classique',
    price: 15,
  },
  {
    id: 'napolitaine',
    name: 'Napolitaine',
    tagline: 'Anchois, câpres et olives — le trio méditerranéen',
    ingredients: ['Tomate', 'Mozzarella', 'Anchois', 'Câpres', 'Olives noires', 'Origan'],
    origin: 'Naples, Italie',
    category: 'classique',
    price: 13,
  },
  {
    id: 'rustica',
    name: 'Rustica',
    tagline: 'Notre signature maison, pâte épaisse façon al taglio',
    ingredients: ['Tomate maison', 'Mozzarella', 'Légumes rôtis de saison', 'Herbes fraîches', "Huile d'olive"],
    origin: 'Maison',
    category: 'maison',
    tag: 'bestseller',
    price: 14,
  },
  {
    id: 'reine',
    name: 'Reine',
    tagline: 'La préférée des Français — indémodable',
    ingredients: ['Tomate', 'Mozzarella', 'Jambon cuit', 'Champignons'],
    origin: 'Création française, XIXᵉ siècle',
    category: 'classique',
    price: 13,
  },
  {
    id: 'vegetarienne',
    name: 'Végétarienne',
    tagline: 'La généreuse du jardin',
    ingredients: ['Tomate', 'Mozzarella', 'Poivrons', 'Courgettes', 'Aubergines', 'Champignons', 'Olives'],
    origin: 'Création maison',
    category: 'vegetarienne',
    tag: 'vegan',
    price: 13,
  },
  {
    id: 'calzone',
    name: 'Calzone',
    tagline: 'Le chausson plié des pizzaïolos napolitains',
    ingredients: ['Ricotta', 'Mozzarella', 'Jambon', 'Œuf', 'Tomate (sauce intérieure)'],
    origin: 'Naples, Italie',
    category: 'classique',
    price: 14,
  },
];

export const categories: { value: PizzaCategory | 'all'; label: string; event: string }[] = [
  { value: 'all', label: 'Toutes', event: 'menu_filter_all' },
  { value: 'classique', label: 'Classiques', event: 'menu_filter_classique' },
  { value: 'maison', label: 'Maison', event: 'menu_filter_maison' },
  { value: 'vegetarienne', label: 'Végétariennes', event: 'menu_filter_vegetarienne' },
];

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source: 'Google' | 'TripAdvisor' | 'Yelp';
  date: string; // ISO yyyy-mm-dd
}

// TODO: remplacer par 3 vrais avis sélectionnés avec accord ou citation publique
export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Camille L.',
    text:
      "La meilleure part de pizza du quartier, sans hésiter. Pâte fine, ingrédients généreux, service rapide même tard le soir.",
    rating: 5,
    source: 'Google',
    date: '2025-09-12',
  },
  {
    id: 'r2',
    author: 'Marco T.',
    text:
      "Authentique pizza napolitaine au cœur de Saint-Michel. La Bufala est exceptionnelle. On revient.",
    rating: 5,
    source: 'TripAdvisor',
    date: '2025-07-04',
  },
  {
    id: 'r3',
    author: 'Sarah B.',
    text:
      "Ouvert tard, parfait après une soirée. Personnel sympa, pizzas chaudes, parts énormes. Adresse à retenir.",
    rating: 4,
    source: 'Yelp',
    date: '2025-05-22',
  },
];
