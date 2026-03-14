#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Westside Website v2 — Development Launcher
#
# Starts BrowserSync (live-reloading HTTPS server) and opens:
#   1. Edge — normal desktop view
#   2. Edge — phone-sized window for mobile preview
#
# Usage:  ./dev.sh        (from project root)
#         npm run dev     (from anywhere in project)
#
# Stop:   Ctrl+C
# ─────────────────────────────────────────────────────────────

cd "$(dirname "$0")"

# ── Check if port 3000 is already in use ──────────────────────
if command -v pwsh &>/dev/null; then
  PORT_IN_USE=$(pwsh -NoProfile -Command '
    $c = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
    if ($c) { "yes" } else { "no" }
  ' 2>/dev/null)
  if [ "$PORT_IN_USE" = "yes" ]; then
    echo "⚠  Port 3000 is already in use."
    echo "   BrowserSync may already be running — check your other terminals."
    echo "   If not, close whatever is using port 3000 and try again."
    echo ""
    echo "   Opening browsers anyway..."
    SKIP_BS=true
  fi
fi

# ── Start BrowserSync ─────────────────────────────────────────
if [ "$SKIP_BS" != "true" ]; then
  echo "Starting BrowserSync..."
  browser-sync start --config bs-config.js &
  BS_PID=$!

  # Wait for server to be ready
  echo "Waiting for server..."
  for i in {1..15}; do
    if curl -sk https://localhost:3000 &>/dev/null; then
      break
    fi
    sleep 0.5
  done
  echo ""
fi

# ── Open desktop view ─────────────────────────────────────────
echo "Opening desktop view in Edge..."
start msedge "https://localhost:3000"

# Small delay so Edge doesn't merge the windows
sleep 1

# ── Open mobile preview ───────────────────────────────────────
# Phone-sized window (390×844 = iPhone 14 / Pixel-class viewport)
# App mode (--app) removes browser chrome so the window IS the viewport
MOBILE_UA="Mozilla/5.0 (Linux; Android 15; Pixel 10 Pro XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36"

echo "Opening mobile preview (390×844)..."
start msedge \
  --app="https://localhost:3000" \
  --window-size=390,844 \
  --user-agent="$MOBILE_UA"

# ── Print status ──────────────────────────────────────────────
echo ""
echo "═══════════════════════════════════════════════════"
echo "  ✓ Desktop view   →  Edge (normal window)"
echo "  ✓ Mobile preview →  Edge (phone-sized, app mode)"
echo ""
echo "  Server:  https://localhost:3000"
echo "  UI:      http://localhost:3001"
echo "═══════════════════════════════════════════════════"
echo ""
echo "  Edit any HTML/CSS/JS file — all browsers"
echo "  update automatically."
echo ""
echo "  For full device emulation, press F12 in Edge"
echo "  then Ctrl+Shift+M to toggle the device toolbar."
echo ""
echo "  Press Ctrl+C to stop the server."
echo ""

# ── Wait for BrowserSync to exit ──────────────────────────────
if [ "$SKIP_BS" != "true" ] && [ -n "$BS_PID" ]; then
  wait $BS_PID 2>/dev/null
fi
