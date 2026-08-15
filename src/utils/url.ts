// Set by Vite from the `--base` flag passed in deploy.sh (e.g. "/" in dev,
// "/~avni/" in production). Always has a leading and trailing slash.
export const BASE_URL = import.meta.env.BASE_URL;

// Passed to wouter's <Router base>: no trailing slash, "" at the site root.
// wouter's <Link>/route matching then handles the base prefix for us, so app
// code only ever deals in base-relative paths ("/", "/content/:slug").
export const ROUTER_BASE = BASE_URL === "/" ? "" : BASE_URL.replace(/\/$/, "");

function escapeRegExp(value: string) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Matches the paths handled by the wouter <Router base={ROUTER_BASE}>: only
// links into these paths should stay in the same tab / use client routing.
export const inAppRoute = new RegExp(
	`^${escapeRegExp(ROUTER_BASE)}(/content/.*)?/?$`,
);
