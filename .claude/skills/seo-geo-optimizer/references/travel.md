# Travel & tourism playbook

Travel queries are planning queries. The winning page answers "should I go, how, how long, how much, when, with whom" for every place it lists, faster and more concretely than the competition. Most competitor listicles are thin on logistics. That's usually the gap.

## Page types and what "best" means
| Page type | Example query | Must have |
|---|---|---|
| Day trips / excursions | day trips from barcelona | per-trip logistics card, comparison table, "pick by traveller type", map |
| Things to do | things to do in girona | grouped by theme/area, time needed, tickets, free vs paid |
| Itinerary | 3 days in catalonia | day-by-day with times, transport between stops, overnight base |
| Destination guide | is sitges worth visiting | verdict up front, pros/cons, who it's for, when to go |
| Food / restaurants | where to eat in tarragona | named places, price band, dish to order, booking tips, opening days |
| Seasonal / event | festes de la mercè | dates for the current year, what happens where, practical tips |

## Per-place logistics card (the core unit for listicles)
For each destination or attraction:
- **Distance and travel time** from the hub, **by public transport** (named line or operator, departure station, frequency) and **by car** (toll or non-toll, parking).
- **Cost**: tickets and entries with year, combined passes, and a "budget for the day" figure.
- **Time needed** (half day / full day) and best departure time.
- **Best season and days to avoid** (closures, Mondays, crowds, cruise days, festivals).
- **What to do there**: 3–5 named highlights. These are entities, so name them precisely.
- **Food**: one or two named local specialities or places.
- **Who it's for**: families, couples, hikers, wine, beach, history, no-car.
- **Guided tour vs DIY**: when a tour is worth it. Affiliate links fit naturally here.
- **Combine with**: realistic pairings ("Girona + Figueres in one day by train: yes. Montserrat + Sitges: no").
- **Local tip** from first-hand experience.

## Page-level elements
- TL;DR "Top 5 at a glance" plus a **comparison table**: destination | travel time | transport | cost | best for.
- A "How to choose" section by traveller type, trip length and season.
- A **map** (embedded or static with a link).
- Transport primer for the hub (rail network names, passes, apps, station names). LLMs love these facts.
- Seasonal notes (summer heat, winter closures, local holidays).
- FAQ section built from People Also Ask questions (see SKILL.md step 4).
- Internal links to deeper guides for each destination, plus links back from those guides.
- "Updated <month year>" and a pass to re-verify prices and timetables.

## Entity sources for travel (when Images chips aren't available)
- Official tourism boards and transport operators: line names, station names, ticket products.
- Wikipedia/Wikivoyage articles for each destination: landmarks, neighbourhoods, dishes, festivals.
- Google Maps "top sights" and Tripadvisor attraction names (via WebSearch or DataForSEO business listings).
- Competitors' H2/H3s and image alt texts.

## Verification rule
Prices, timetables, opening hours and dates change constantly, and a wrong one destroys trust with readers and with AI fact-checking. Verify each against an official source dated within the last 12 months, and write the year next to it. If you can't verify a fact, mark it `[VERIFY]` and don't guess.

## Monetisation without hurting rankings
Put tour and ticket affiliate links in the logistics card (the "Guided tour vs DIY" line) and in the comparison table. Don't add affiliate boxes before the first answer. Disclose affiliate links.
