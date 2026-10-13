# Data sources cookbook

Load DataForSEO tools with ToolSearch (`select:mcp__DataForSEO__<name>` or the keyword "DataForSEO"). Default `location_name: "United States"`, `language_code: "en"`. Also run the destination's own market when relevant (for example "Spain"/"es", or "United Kingdom"/"en" for European travel).

| Need | Tool | Notes |
|---|---|---|
| Google / Bing / Yahoo SERP | `serp_organic_live_advanced` | `search_engine: "bing"` for Bing; `depth: 20`; `people_also_ask_click_depth: 2–4` to expand PAA |
| Indexing check | same, with keyword `site:domain.com/path/` | empty result means not indexed (on that engine) |
| What ChatGPT answers and cites | `ai_optimization_chat_gpt_scraper` | run the primary query plus PAA variants; keep the prompts identical between runs |
| Raw LLM response | `ai_optimization_llm_response` | other models (check `ai_optimization_llm_models`) |
| Which domains/pages AIs mention | `ai_opt_llm_ment_search`, `_top_domains`, `_top_pages` | finds the sources to get mentioned on |
| AI search volume | `ai_optimization_keyword_data_search_volume` | prioritise questions |
| Keywords a URL/domain ranks for | `dataforseo_labs_google_ranked_keywords` | Google only |
| Keyword ideas / volumes | `dataforseo_labs_google_keyword_ideas`, `_related_keywords`, `kw_data_google_ads_search_volume` | |
| Competitor content | `on_page_content_parsing` (URL) | headings, text, links |
| Page tech / speed | `on_page_instant_pages`, `on_page_lighthouse` | |
| Backlinks / authority | `backlinks_summary`, `backlinks_referring_domains` | explains "AI yes, Google no" on new domains |
| YouTube transcript | `serp_youtube_video_subtitles_live_advanced` | video id from the URL; `_video_info_` for title/description |

Not available through DataForSEO: Google Images filter chips (ask the user for screenshots), GSC/Bing Webmaster first-party data (connector or API key).

## Plausible
Use the Plausible connector if one is loaded. Otherwise run `scripts/plausible.py` (needs `PLAUSIBLE_KEY`; it retries the intermittent connection resets):

```bash
python3 scripts/plausible.py --site example.com --page /some-page/ --range 28d --dim visit:source
python3 scripts/plausible.py --site example.com --page /some-page/ --range 12mo --dim time:month
python3 scripts/plausible.py --site example.com --range 28d --dim visit:source   # whole site
python3 scripts/plausible.py --site example.com --range 28d --dim event:page --source ChatGPT  # pages AI sends traffic to
```

AI source names as Plausible reports them: `ChatGPT`, `Perplexity`, `Claude`, `Gemini`, `Copilot`, `Bing Chat`(older), `You.com`, `Phind`.

## Google Search Console / Bing Webmaster (when keys are present)
- GSC: service-account JSON in `GSC_SERVICE_ACCOUNT_JSON`. Add the service account as a user on the property. Use the `searchanalytics.query` API with dimensions `query,page`.
- Bing: `BING_WMT_KEY` → `https://ssl.bing.com/webmaster/api.svc/json/GetPageQueryStats?siteUrl=...&page=...&apikey=$BING_WMT_KEY` and `GetQueryStats`. Also `SubmitUrl` for indexing.
