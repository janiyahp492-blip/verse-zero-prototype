import "./character.css";

const FIGHTERS = [
  {
    id: "ruka",
    name: "Ruka",
    role: "Static courier",
    accent: "#5ff2ff",
    accent2: "#164a5e",
    bio: "Runs dead routes on foot. Has never lost a parcel, and never kept one.",
    stats: { power: 6, speed: 8, tech: 7 },
  },
  {
    id: "vex",
    name: "Vex",
    role: "Signal duelist",
    accent: "#ff4fa3",
    accent2: "#591034",
    bio: "Fights in the gap between two heartbeats. Wins before the second one lands.",
    stats: { power: 6, speed: 10, tech: 9 },
  },
  {
    id: "talon",
    name: "Talon",
    role: "Breach specialist",
    accent: "#ffcf3f",
    accent2: "#5c3c05",
    bio: "Opens sealed doors the loud way, then invoices the network for the damage.",
    stats: { power: 9, speed: 6, tech: 5 },
  },
  {
    id: "oracle",
    name: "Oracle",
    role: "Ghost protocol",
    accent: "#b98bff",
    accent2: "#321b5e",
    bio: "Reads the wire like weather. Was deleted twice and came back both times.",
    stats: { power: 4, speed: 5, tech: 10 },
  },
  {
    id: "nix",
    name: "Nix",
    role: "Ash runner",
    accent: "#ff7a45",
    accent2: "#5c1f08",
    bio: "Burned out of three sectors and kept the scars as navigation.",
    stats: { power: 7, speed: 7, tech: 5 },
  },
  {
    id: "havoc",
    name: "Havoc-9",
    role: "Foundry unit",
    accent: "#8ff08a",
    accent2: "#1f4a1d",
    bio: "A loading dock that learned to walk. Still counts everything it breaks.",
    stats: { power: 10, speed: 3, tech: 4 },
  },
];

const DETAILS = {
  ruka: `<path d="M60 50 L60 34 L74 30" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.8"/>`,
  vex: `<circle cx="36" cy="78" r="4" fill="currentColor" opacity="0.8"/><circle cx="84" cy="78" r="4" fill="currentColor" opacity="0.8"/>`,
  talon: `<path d="M18 118 L2 96 L26 104 Z" fill="currentColor" opacity="0.55"/><path d="M102 118 L118 96 L94 104 Z" fill="currentColor" opacity="0.55"/>`,
  oracle: `<ellipse cx="60" cy="58" rx="30" ry="9" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.6"/>`,
  nix: `<path d="M20 112 Q42 100 60 108 Q78 116 100 104 L100 112 Q78 124 60 116 Q42 108 20 120 Z" fill="currentColor" opacity="0.45"/>`,
  havoc: `<path d="M26 118 L94 118 M22 126 L98 126" stroke="currentColor" stroke-width="2.5" opacity="0.5"/>`,
};

function portraitMarkup(fighter, variant) {
  const uid = `${fighter.id}-${variant}`;
  const detail = variant === "detail";
  return `
    <svg class="portrait" viewBox="0 0 120 150" preserveAspectRatio="${detail ? "xMidYMid slice" : "xMidYMid meet"}" role="presentation" focusable="false">
      <defs>
        <linearGradient id="sky-${uid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${fighter.accent}" stop-opacity="0.5" />
          <stop offset="0.55" stop-color="${fighter.accent2}" stop-opacity="0.35" />
          <stop offset="1" stop-color="#05070d" stop-opacity="0.95" />
        </linearGradient>
        <linearGradient id="suit-${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#2b3648" />
          <stop offset="1" stop-color="#06090f" />
        </linearGradient>
      </defs>
      <rect width="120" height="150" fill="url(#sky-${uid})" />
      <g opacity="0.16" fill="${fighter.accent}">
        <path d="M-6 40 L126 6 L126 14 L-6 48 Z" />
        <path d="M-6 96 L126 62 L126 67 L-6 101 Z" />
      </g>
      <g fill="url(#suit-${uid})" stroke="${fighter.accent}" stroke-opacity="0.7" stroke-width="1.4" stroke-linejoin="round">
        <path d="M8 150 L18 112 Q60 94 102 112 L112 150 Z" />
        <path d="M40 108 L38 76 Q38 50 60 50 Q82 50 82 76 L80 108 Q70 116 60 116 Q50 116 40 108 Z" />
      </g>
      <g color="${fighter.accent}">${DETAILS[fighter.id] || ""}</g>
      <rect x="44" y="72" width="32" height="9" fill="${fighter.accent}" opacity="0.95" />
      <rect x="44" y="72" width="32" height="9" fill="none" stroke="#05070d" stroke-width="1" />
      <path d="M18 122 L102 122" stroke="${fighter.accent2}" stroke-width="2" opacity="0.85" />
      <path d="M18 130 L102 130" stroke="${fighter.accent}" stroke-width="1" opacity="0.35" />
    </svg>
  `;
}

function statMarkup(fighter) {
  const labels = { power: "Power", speed: "Speed", tech: "Tech" };
  return Object.entries(fighter.stats)
    .map(
      ([key, value]) => `
        <div class="stat">
          <span class="stat__label">${labels[key]}</span>
          <span class="stat__bars" aria-hidden="true">${Array.from(
            { length: 10 },
            (_, index) => `<i class="${index < value ? "on" : ""}"></i>`,
          ).join("")}</span>
          <span class="stat__value">${value}</span>
        </div>`,
    )
    .join("");
}

export function renderCharacter(root) {
  root.innerHTML = `
    <section class="select" aria-labelledby="select-title">
      <header class="select__top">
        <div class="select__brand">
          <span class="select__brand-mark">V//Z</span>
          <span>Player select</span>
        </div>
        <h1 class="select__title" id="select-title">Choose your fighter</h1>
        <div class="select__meta">
          <span class="select__badge">1P</span>
          <div class="select__timer" aria-hidden="true">
            <span>99</span>
            <small>time</small>
          </div>
        </div>
      </header>

      <div class="select__body">
        <div class="roster" id="roster" role="group" aria-label="Fighter roster"></div>
        <aside class="fighter-detail" id="detail"></aside>
      </div>

      <footer class="select__foot">
        <p class="select__hint"><kbd>←</kbd><kbd>→</kbd> select <kbd>Enter</kbd> lock in <kbd>Esc</kbd> back</p>
        <a class="select__back" href="#/">Back to title</a>
      </footer>

      <dialog class="panel lockin-panel" id="lockin" aria-labelledby="lockin-title">
        <form method="dialog" class="panel__form">
          <p class="panel__kicker">Entry confirmed</p>
          <h2 class="lockin__name" id="lockin-title">Ruka</h2>
          <p class="lockin__note">Flight systems are offline in this build. Chapter one picks up from here.</p>
          <div class="lockin__actions">
            <button class="menu-item" type="submit" value="close">
              <span class="menu-item__mark" aria-hidden="true">◀</span>Change fighter
            </button>
            <a class="menu-item menu-item--primary" href="#/">
              <span class="menu-item__mark" aria-hidden="true">▶</span>Return to title
            </a>
          </div>
        </form>
      </dialog>
    </section>
  `;

  const roster = root.querySelector("#roster");
  const detail = root.querySelector("#detail");
  const lockin = root.querySelector("#lockin");
  const lockinName = root.querySelector("#lockin-title");
  let selected = 0;

  roster.innerHTML = FIGHTERS.map(
    (fighter, index) => `
      <button class="fighter-card" type="button" data-index="${index}" aria-pressed="false"
        style="--accent:${fighter.accent};--accent2:${fighter.accent2}">
        <span class="fighter-card__frame">${portraitMarkup(fighter, "card")}</span>
        <span class="fighter-card__num">${String(index + 1).padStart(2, "0")}</span>
        <span class="fighter-card__flag" aria-hidden="true">1P</span>
        <span class="fighter-card__name">${fighter.name}</span>
        <span class="fighter-card__role">${fighter.role}</span>
      </button>`,
  ).join("");

  function openLockin() {
    const fighter = FIGHTERS[selected];
    lockinName.textContent = fighter.name;
    lockin.style.setProperty("--accent", fighter.accent);
    lockin.showModal();
  }

  function select(index) {
    selected = (index + FIGHTERS.length) % FIGHTERS.length;
    const fighter = FIGHTERS[selected];

    roster.querySelectorAll(".fighter-card").forEach((card, cardIndex) => {
      const isSelected = cardIndex === selected;
      card.classList.toggle("is-selected", isSelected);
      card.setAttribute("aria-pressed", String(isSelected));
    });

    detail.style.setProperty("--accent", fighter.accent);
    detail.style.setProperty("--accent2", fighter.accent2);
    detail.innerHTML = `
      <div class="detail__portrait">${portraitMarkup(fighter, "detail")}</div>
      <div class="detail__info">
        <p class="detail__index">Fighter <b>${String(selected + 1).padStart(2, "0")}</b> / 0${FIGHTERS.length}</p>
        <h2 class="detail__name">${fighter.name}</h2>
        <p class="detail__role">${fighter.role}</p>
        <p class="detail__bio">${fighter.bio}</p>
        <div class="stats">${statMarkup(fighter)}</div>
        <button class="lockin" type="button" data-lock>Lock in // ${fighter.name}</button>
      </div>
    `;
    detail.querySelector("[data-lock]").addEventListener("click", openLockin);
  }

  roster.addEventListener("click", (event) => {
    const card = event.target.closest("[data-index]");
    if (card) select(Number(card.dataset.index));
  });

  function onKey(event) {
    if (lockin.open) return;
    if (event.target.closest?.("input, textarea, select")) return;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      select(selected + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      select(selected - 1);
    } else if (event.key === "Enter") {
      if (event.target.closest("a")) return;
      event.preventDefault();
      openLockin();
    } else if (event.key === "Escape") {
      window.location.hash = "#/";
    }
  }

  document.addEventListener("keydown", onKey);
  select(0);

  return () => document.removeEventListener("keydown", onKey);
}
