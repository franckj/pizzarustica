#!/usr/bin/env python3
"""Query the Plausible Stats API v2 with retries. Needs PLAUSIBLE_KEY in the environment.

Examples:
  plausible.py --site example.com --page /foo/ --range 28d --dim visit:source
  plausible.py --site example.com --range 12mo --dim time:month
  plausible.py --site example.com --range 28d --dim event:page --source ChatGPT
"""
import argparse, json, os, sys, time, urllib.request, urllib.error

p = argparse.ArgumentParser()
p.add_argument("--site", required=True)
p.add_argument("--page", help="filter on exact page path, e.g. /day-trips/")
p.add_argument("--source", help="filter on visit:source, e.g. ChatGPT")
p.add_argument("--range", default="28d", help="day, 7d, 28d, 30d, 6mo, 12mo, all, or YYYY-MM-DD,YYYY-MM-DD")
p.add_argument("--dim", action="append", default=[], help="dimension, repeatable (visit:source, event:page, time:month...)")
p.add_argument("--metrics", default="visitors,pageviews")
p.add_argument("--limit", type=int, default=50)
p.add_argument("--host", default=os.environ.get("PLAUSIBLE_HOST", "https://plausible.io"))
a = p.parse_args()

key = os.environ.get("PLAUSIBLE_KEY")
if not key:
    sys.exit("PLAUSIBLE_KEY is not set (use the Plausible connector, or add the key to the environment)")

filters = []
if a.page:
    filters.append(["is", "event:page", [a.page]])
if a.source:
    filters.append(["is", "visit:source", [a.source]])
date_range = a.range.split(",") if "," in a.range else a.range
metrics = a.metrics.split(",")
body = {"site_id": a.site, "metrics": metrics, "date_range": date_range,
        "dimensions": a.dim, "filters": filters, "pagination": {"limit": a.limit}}
if a.dim and not any(d.startswith("time") for d in a.dim):
    body["order_by"] = [[metrics[0], "desc"]]

req = urllib.request.Request(f"{a.host}/api/v2/query", data=json.dumps(body).encode(),
                             headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"})
for attempt in range(5):
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            data = json.load(r)
        break
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code}: {e.read().decode()[:500]}")
    except (urllib.error.URLError, ConnectionError, TimeoutError) as e:
        if attempt == 4:
            sys.exit(f"failed after retries: {e}")
        time.sleep(2 ** attempt)

print("\t".join(a.dim + metrics))
for row in data["results"]:
    print("\t".join([str(x) for x in row["dimensions"]] + [str(x) for x in row["metrics"]]))
print(f"# range: {data['query']['date_range']}", file=sys.stderr)
