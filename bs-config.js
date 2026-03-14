/**
 * BrowserSync Configuration — Westside Website v2
 *
 * Usage:
 *   browser-sync start --config bs-config.js
 *
 * This serves the site with:
 *   - HTTPS (trusted local certs via mkcert)
 *   - Live reload on HTML/CSS/JS changes
 *   - External URL for phone testing (same WiFi network)
 *   - Synced scrolling, clicks, and form input across all connected devices
 *   - No browser auto-open (set open: "local" to change)
 */
module.exports = {
  // Serve static files from project root
  server: {
    baseDir: ".",
    // Clean URLs: /about serves about.html
    serveStaticOptions: {
      extensions: ["html"]
    }
  },

  // HTTPS with mkcert certs (trusted in Chrome/Edge)
  https: {
    key:  ".certs/localhost-key.pem",
    cert: ".certs/localhost.pem"
  },

  // Watch these files for live reload
  files: [
    "*.html",
    "css/**/*.css",
    "js/**/*.js",
    "images/**/*"
  ],

  // Don't auto-open browser (use the URL it prints instead)
  open: false,

  // Port (HTTPS)
  port: 3000,

  // Enable UI dashboard (config, history, sync options)
  ui: {
    port: 3001
  },

  // Log connections (useful for seeing when phone connects)
  logConnections: true,

  // Sync these interactions across all connected devices
  ghostMode: {
    clicks: true,
    forms: true,
    scroll: true
  },

  // Inject CSS changes without full reload (faster feedback)
  injectChanges: true,

  // Don't notify on reload (less visual noise)
  notify: false,

  // Reload delay (ms) — small buffer to catch multi-file saves
  reloadDelay: 100,

  // Ignore these directories
  ignore: [
    "node_modules",
    ".git",
    ".certs",
    ".wrangler",
    "screenshots",
    "temp-*"
  ],

  // Middleware: redirect /foo/ (trailing slash) to /foo.html
  middleware: [
    function(req, res, next) {
      // Strip trailing slash (except root)
      if (req.url !== "/" && req.url.endsWith("/")) {
        req.url = req.url.slice(0, -1);
      }
      next();
    }
  ]
};
