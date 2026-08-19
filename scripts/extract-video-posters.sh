#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../public/images"

for webm in *.webm; do
  poster="${webm%.webm}.jpg"
  ffmpeg -y -loglevel error -i "$webm" \
    -vf "scale='min(800,iw)':-2" -frames:v 1 -q:v 4 "$poster"
  pct=$(awk "BEGIN {printf \"%.1f\", $(stat -c%s "$poster") / $(stat -c%s "$webm") * 100}")
  printf "%-24s %8d bytes  (%.1f%% of webm)\n" "$poster" "$(stat -c%s "$poster")" "$pct"
done