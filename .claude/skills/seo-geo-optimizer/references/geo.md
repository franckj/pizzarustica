# GEO — getting cited by AI answer engines

## Indexing first
AI assistants that browse retrieve from search indexes: ChatGPT search and Microsoft Copilot mostly from **Bing**, Gemini/AI Overviews from **Google**, Perplexity from its own crawler plus others. A page missing from those indexes can't be cited reliably, however good it is.

Checklist:
- `site:` the URL on Google and Bing (DataForSEO SERP). Not there → check status code, canonical, `noindex`, robots.txt, sitemap inclusion, internal links pointing to it.
- Submit to Bing Webmaster Tools and enable **IndexNow** (instant Bing/Yandex/Seznam notification on publish/update). Request indexing in GSC.
- robots.txt must not block: `Googlebot`, `Bingbot`, `OAI-SearchBot` (ChatGPT search), `ChatGPT-User`, `PerplexityBot`, `Claude-SearchBot`/`Claude-User`. Blocking training bots (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`) is a separate choice and doesn't remove you from search-time retrieval.
- Content must be in server-rendered HTML, not only injected by JavaScript.
- A brand-new domain with no backlinks may get AI citations (via Bing) before it gets Google traffic. That's the classic "ChatGPT yes, Google no" pattern. The fix is authority (links, mentions) plus time, not more words.

## Make passages quotable
LLMs pull **passages**, not pages. Each H2 section should stand alone:
- **Answer first.** Give a 1–2 sentence direct answer right under the question H2, then the detail.
- **Concrete, checkable facts**: distances, travel times, prices with currency and year, opening days, named operators/lines. "Montserrat: 1h by R5 train from Plaça Espanya + rack railway, ~€25 return combined ticket (2026)" beats "Montserrat is easy to reach".
- **Comparison tables** (destination × time × cost × best for) get lifted almost verbatim.
- **Consistent entity naming.** Use the official name once with the local variant ("Girona (Gerona)"), then stay consistent.
- **Short TL;DR / "Best for" summary** near the top: the list answer an assistant can paraphrase.
- **Visible freshness**: "Updated October 2026" plus a real `dateModified` in schema, and actually refresh prices/times.

## Trust signals (E-E-A-T, and what LLMs echo)
- Named author with a bio and first-hand evidence: own photos, "when I went in March…", local tips.
- Cite official sources (transport operator, monument site) for volatile facts.
- Organization/Person schema, an About page, consistent NAP for local businesses.

## Off-page: get mentioned where LLMs read
Assistants weigh consensus across sources. Mentions on Reddit threads, Tripadvisor forums, travel roundups, local press, Wikipedia/Wikivoyage external links, and YouTube descriptions raise the chance of being cited. Check `ai_opt_llm_ment_*` / LLM-mentions tools for which domains AIs cite on the topic, and target those.

## Schema
- Article/BlogPosting with `author`, `datePublished`, `dateModified`, `image`.
- `ItemList` for listicles (each item → `TouristAttraction`/`Place`/`Restaurant` with `name`, `geo`, `url`).
- `TouristTrip` for itineraries. `FAQPage` only for genuine Q&A (Google rarely shows the rich result now, but it's harmless and machine-readable).
- `BreadcrumbList`.

## Measuring AI visibility
- Plausible sources: ChatGPT, Perplexity, Claude, Gemini, Copilot. Utm-tagged `utm_source=chatgpt.com` also shows up.
- Re-run the same ChatGPT-scraper prompts on a schedule and log cited/not cited plus the cited URLs. Same prompts every time, or it's not comparable.
