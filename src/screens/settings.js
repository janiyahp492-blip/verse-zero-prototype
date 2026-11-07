import "./settings.css";
import { getPrefs, resetPrefs, setPref } from "../preferences.js";

const GROUPS = [
  {
    key: "motion",
    label: "Motion",
    hint: "Starfield drift, glitch flicker and interface animation.",
    options: [
      ["full", "Full"],
      ["reduced", "Reduced"],
    ],
  },
  {
    key: "scanlines",
    label: "Scanlines",
    hint: "CRT line overlay across every screen.",
    options: [
      [true, "On"],
      [false, "Off"],
    ],
  },
  {
    key: "textSize",
    label: "Text size",
    hint: "Scales interface text across the whole game.",
    options: [
      ["compact", "Compact"],
      ["standard", "Standard"],
      ["large", "Large"],
    ],
  },
  {
    key: "contrast",
    label: "Contrast",
    hint: "Brightens text and lines for low-light readability.",
    options: [
      ["standard", "Standard"],
      ["high", "High"],
    ],
  },
];

function readToken(token) {
  if (token === "true") return true;
  if (token === "false") return false;
  return token;
}

function groupMarkup(group) {
  const prefs = getPrefs();
  return `
    <div class="setting">
      <div class="setting__copy">
        <p class="setting__label">${group.label}</p>
        <p class="setting__hint">${group.hint}</p>
      </div>
      <div class="segmented" role="group" aria-label="${group.label}">
        ${group.options
          .map(
            ([value, label]) => `
              <button
                type="button"
                data-pref="${group.key}"
                data-value="${String(value)}"
                aria-pressed="${String(prefs[group.key]) === String(value)}"
              >${label}</button>`,
          )
          .join("")}
      </div>
    </div>
  `;
}

export function renderSettings(root) {
  root.innerHTML = `
    <section class="settings" aria-labelledby="settings-title">
      <header class="settings__head">
        <p class="eyebrow"><span class="pulse" aria-hidden="true"></span>System // preferences</p>
        <h1 id="settings-title">Settings</h1>
        <p class="settings__lede">Tune the terminal to your rig. Changes apply immediately and are saved on this device.</p>
      </header>

      <div class="settings__panel" id="settings-panel">
        ${GROUPS.map(groupMarkup).join("")}
      </div>

      <div class="settings__actions">
        <p class="save-note" role="status" aria-live="polite" id="save-note"></p>
        <div class="settings__buttons">
          <button class="menu-item" type="button" id="reset-preferences">
            <span class="menu-item__mark" aria-hidden="true">↺</span>Reset to defaults
          </button>
          <a class="menu-item menu-item--primary" href="#/">
            <span class="menu-item__mark" aria-hidden="true">◀</span>Back to title
          </a>
        </div>
      </div>
    </section>
  `;

  const panel = root.querySelector("#settings-panel");
  const note = root.querySelector("#save-note");

  function syncButtons() {
    const prefs = getPrefs();
    panel.querySelectorAll("[data-pref]").forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(String(prefs[button.dataset.pref]) === button.dataset.value),
      );
    });
  }

  panel.addEventListener("click", (event) => {
    const button = event.target.closest("[data-pref]");
    if (!button) return;
    const key = button.dataset.pref;
    setPref(key, readToken(button.dataset.value));
    syncButtons();
    const group = GROUPS.find((item) => item.key === key);
    note.textContent = `${group ? group.label : key} saved.`;
  });

  root.querySelector("#reset-preferences").addEventListener("click", () => {
    resetPrefs();
    syncButtons();
    note.textContent = "Defaults restored.";
  });
}
