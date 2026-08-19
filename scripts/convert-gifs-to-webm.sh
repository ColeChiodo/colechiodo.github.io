#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../public/images"

for gif in *.gif; do
  webm="${gif%.gif}.webm"
  [ -e "$webm" ] && rm -f "$webm"

  old_bytes=$(stat -c%s "$gif")

  crf=30
  while [ "$crf" -le 48 ]; do
    ffmpeg -y -loglevel error -i "$gif" \
      -c:v libvpx-vp9 -crf "$crf" -b:v 0 -pix_fmt yuv420p -an \
      -deadline good -cpu-used 4 -row-mt 1 "$webm"
    new_bytes=$(stat -c%s "$webm")
    if [ "$new_bytes" -lt "$old_bytes" ]; then
      break
    fi
    crf=$((crf + 4))
  done

  pct=$(awk "BEGIN {printf \"%.1f\", (1 - $new_bytes/$old_bytes) * 100}")
  printf "%-24s %8d -> %8d bytes  (-%s%%)  crf=%s\n" "$gif" "$old_bytes" "$new_bytes" "$pct" "$crf"
done