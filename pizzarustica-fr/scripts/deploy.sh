#!/usr/bin/env bash
# Deploy pizzarustica-fr to Cloudflare Pages
# Usage:
#   ./scripts/deploy.sh                # deploy production (branch main)
#   ./scripts/deploy.sh preview        # deploy to preview branch
#
# Prerequisites (one-time):
#   1. npx wrangler login
#   2. npx wrangler pages project create pizzarustica-fr --production-branch main

set -euo pipefail

PROJECT_NAME="pizzarustica-fr"
MODE="${1:-production}"

cd "$(dirname "$0")/.."

echo "→ Building Astro site…"
npm run build

if [[ "$MODE" == "preview" ]]; then
  BRANCH="${BRANCH:-preview}"
  echo "→ Deploying to Cloudflare Pages (preview branch: $BRANCH)…"
  npx wrangler pages deploy dist \
    --project-name="$PROJECT_NAME" \
    --branch="$BRANCH" \
    --commit-message="manual preview deploy"
else
  COMMIT_MSG="${COMMIT_MSG:-manual deploy from $(git rev-parse --short HEAD 2>/dev/null || echo 'local')}"
  echo "→ Deploying to Cloudflare Pages (production)…"
  npx wrangler pages deploy dist \
    --project-name="$PROJECT_NAME" \
    --branch=main \
    --commit-message="$COMMIT_MSG"
fi

echo "✓ Deploy complete."
