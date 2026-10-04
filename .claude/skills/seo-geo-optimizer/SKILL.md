---
name: seo-geo-optimizer
description: Audit and rewrite a web page so it ranks on Google/Bing AND gets cited by AI assistants (ChatGPT, Perplexity, Claude, Gemini, Copilot) — data-driven with Plausible analytics, DataForSEO (Google + Bing SERPs, People Also Ask, ChatGPT answers, LLM mentions, competitor content) and entity enrichment ("query augmentation" via PAA questions + Google Images filter-chip entities). Travel/tourism pages get an extra playbook (day trips, itineraries, "things to do", destination guides, restaurants, hotels). Use this skill whenever the user wants to improve, audit, outrank, rewrite or "make the best page" on a topic, asks why a page gets AI/ChatGPT traffic but not Google traffic (or vice versa), mentions SEO, GEO, AEO, LLM visibility, AI Overviews, People Also Ask, entities, topical coverage, Search Console, Bing Webmaster, Plausible traffic sources, or pastes a page URL with a ranking goal — even if they don't say "SEO".
---

# SEO + GEO page optimizer

Goal: make one page the best answer on its topic for **both** classic search (Google, Bing) and AI answer engines (ChatGPT search, Perplexity, Copilot, Gemini, Claude). The two overlap heavily — ChatGPT search and Copilot lean on Bing's index, AI Overviews on Google's — so one well-built page serves both. Work from data, not vibes: every recommendation should trace back to something you measured.

Travel content? Also read `references/travel.md` before step 4. For the AI-search specifics read `references/geo.md`. Tool names and parameters are in `references/data-sources.md`.

## 0. Inputs

Pin down (ask only for what you can't infer): **page URL**, **primary query** (e.g. "day trips from barcelona"), **market + language** (default: United States / en, plus the destination's own market if relevant), and whether you can **edit the site** (a repo in the session, or a CMS) or should deliver a brief/rewrite.

## 1. Access check — say what you can and can't see, then keep going

Probe each source once, quickly, and report a one-line table to the user. Missing access is never a reason to stop; note the gap and use the fallback.

| Source | How to reach it | Fallback if missing |
|---|---|---|
| Plausible | Plausible connector, else `PLAUSIBLE_KEY` env var → `scripts/plausible.py` | ask for a screenshot of Sources for the page |
| DataForSEO | `mcp__DataForSEO__*` tools (ToolSearch "DataForSEO") | WebSearch / WebFetch |
| Google Search Console | GSC connector, else service-account JSON in env | DataForSEO ranked-keywords + `site:` SERP check |
| Bing Webmaster Tools | connector, else `BING_WMT_KEY` env | DataForSEO Bing SERP + `site:` check |

Never ask the user to paste keys into chat. If they're tired of per-surface setup, the uniform fix is adding each service as a claude.ai connector (claude.ai/customize/connectors) — connectors follow the account across Chat, Desktop and cloud sessions; env vars only exist in one environment.

## 2. Baseline — where does the page stand?

1. **Traffic by source** (Plausible, 28d and 12mo): visitors per `visit:source` for the page, and site-wide. Flag AI sources (ChatGPT, Perplexity, Claude, Gemini, Copilot, Bing Chat) vs search (Google, Bing, DuckDuckGo, Ecosia). Note when the page was first seen (`time:month`). Low numbers → say the trend is directional.
2. **Indexing**: `site:domain.com/path/` on Google and on Bing via DataForSEO SERP. Check `site:domain.com` too, to tell "page not indexed" from "domain not indexed". DataForSEO's Bing `site:` queries sometimes return error 40102 or junk; treat that as "probably not indexed, confirm in Bing Webmaster Tools", not as proof. Not indexed anywhere is the #1 problem; content work comes after (see `references/geo.md` → "Indexing first").
3. **Rankings**: DataForSEO Labs ranked keywords for the URL/domain; Google + Bing SERP top 20 for the primary query — record our position or "not in top 20".
4. **Authority**: `backlinks_summary` for the domain. Look at referring domains, spam score and the TLD mix. Hundreds of links from `.store/.space/.shop/.website` with a high spam score point to an expired domain's past or to negative SEO, a common reason a domain gets AI citations but no Google rankings. Recommend a disavow review.
5. **AI visibility**: run the primary query and 3–5 PAA-style variants through the ChatGPT scraper (and LLM-mentions search if available). Record: are we cited, which URLs are cited, what facts/structure the answer uses. That's what the model found quotable. Citations vary from run to run: one "not cited" result doesn't contradict Plausible showing ChatGPT referrals. Report both.

## 3. Competitive gap

1. Take the union of Google + Bing top 10 (+ URLs cited by ChatGPT).
2. For the top ~5, parse content (`on_page_content_parsing`): H2/H3 outline, word count, list of places/entities, tables, maps, prices, transport details, freshness date, author/first-hand signals, schema.
3. Build a **coverage matrix**: rows = subtopics/entities, columns = competitors + us. Gaps = covered by ≥2 competitors but not us. Opportunities = covered by nobody (often the practical details travellers actually need).

## 4. Query augmentation — the entity-rich outline

This is the core rewrite technique (James Dooley, "Query Augmentation", The Edward Show ep. 1171):

1. Collect **People Also Ask** questions for the primary query (SERP with `people_also_ask_click_depth: 2–4`), plus related searches and the ChatGPT variants from step 2.
2. Each strong question becomes an **H2** (or H3 under a grouping H2), phrased the way people ask it.
3. For each question, find the **entities Google associates with it**: search the question in Google **Images** and read the round filter chips at the top. DataForSEO doesn't return those chips, so either (a) ask the user for screenshots of the chips for the 3–5 most important questions, or (b) approximate: entities shared by the top results' sections answering that question + related searches + Knowledge-Graph-style names (places, landmarks, transport lines, operators, dishes, events). Label approximations as such.
4. Weave those entities into the answer under that H2 — naturally, with a fact about each, not as a keyword list. Being entity-rich in the exact section that answers the question is what lets one page rank for many long-tail queries and get quoted by LLMs.

Output an outline table: `H2 question | answer in 1–2 sentences | entities to include | source of entities (chips / approximated) | competitor gap it closes`.

## 5. Write / rewrite

Follow `references/geo.md` (answer-first blocks, quotable facts, tables, freshness) and, for travel, `references/travel.md` (the practical-details checklist). Keep the author's voice and first-hand experience — that's the moat no competitor or LLM can copy. Never invent prices, timetables, opening hours or personal experiences: verify with WebSearch/WebFetch from official sources and cite them, or mark `[VERIFY]` for the author.

If the site is in the session (repo), implement directly: content, title/meta, headings, internal links, schema JSON-LD, `dateModified`; build/lint; commit on the working branch. Otherwise deliver the rewrite as a doc.

## 6. Deliverable

Lead with the verdict, then evidence. Structure:

1. **Diagnosis** — 3–5 bullets: traffic by source, indexing status, ranking/citation status, the main reason it's not winning.
2. **Priority actions** — ordered by impact ÷ effort, each tied to a data point. Technical/indexing fixes first.
3. **Entity-rich outline** (step 4 table).
4. **Coverage gaps vs competitors** (top rows of the matrix).
5. **Measurement plan** — what to re-check and when (Plausible sources weekly; SERP + ChatGPT re-run in 2–4 weeks), with the exact queries so the next run is comparable. Save the baseline numbers in the report so a later session can diff against them.
