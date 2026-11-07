const STORAGE_KEY = "verse-zero:preferences";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const DEFAULTS = Object.freeze({
  motion: prefersReducedMotion ? "reduced" : "full",
  scanlines: true,
  textSize: "standard",
  contrast: "standard",
});

let prefs = load();

function load() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    return { ...DEFAULTS, ...stored };
  } catch {
    return { ...DEFAULTS };
  }
}

export function getPrefs() {
  return prefs;
}

export function applyPrefs() {
  const root = document.documentElement;
  root.dataset.motion = prefs.motion;
  root.dataset.scanlines = prefs.scanlines ? "on" : "off";
  root.dataset.textSize = prefs.textSize;
  root.dataset.contrast = prefs.contrast;
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Preferences still apply for this session when storage is unavailable.
  }
  applyPrefs();
  window.dispatchEvent(new CustomEvent("verses:prefs", { detail: { ...prefs } }));
}

export function setPref(key, value) {
  if (!(key in DEFAULTS) || prefs[key] === value) return;
  prefs = { ...prefs, [key]: value };
  persist();
}

export function resetPrefs() {
  prefs = { ...DEFAULTS };
  persist();
}
