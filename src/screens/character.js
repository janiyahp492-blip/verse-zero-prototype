import "./character.css";
import { FIGHTERS, portraitMarkup } from "../data/fighters.js";
import { getSelectedFighterId, selectFighter } from "../session.js";

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
          <p class="lockin__note">Chapter one is waiting. Deploy when you're ready.</p>
          <div class="lockin__actions">
            <button class="menu-item" type="submit" value="close">
              <span class="menu-item__mark" aria-hidden="true">◀</span>Change fighter
            </button>
            <a class="menu-item menu-item--primary" href="#/level" id="begin-chapter">
              <span class="menu-item__mark" aria-hidden="true">▶</span>Begin chapter one
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
  const storedIndex = FIGHTERS.findIndex((fighter) => fighter.id === getSelectedFighterId());
  let selected = storedIndex >= 0 ? storedIndex : 0;

  roster.innerHTML = FIGHTERS.map(
    (fighter, index) => `
      <button class="fighter-card" type="button" data-index="${index}" aria-pressed="false"
        style="--accent:${fighter.accent};--accent2:${fighter.accent2}">
        <span class="fighter-card__frame">
          ${portraitMarkup(fighter, "card")}
          <span class="fighter-card__num">${String(index + 1).padStart(2, "0")}</span>
          <span class="fighter-card__flag" aria-hidden="true">1P</span>
        </span>
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

  root.querySelector("#begin-chapter").addEventListener("click", () => {
    selectFighter(FIGHTERS[selected].id);
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
  select(selected);

  return () => document.removeEventListener("keydown", onKey);
}
