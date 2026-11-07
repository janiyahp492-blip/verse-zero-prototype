import "./level.css";
import { FIGHTERS, getFighter, portraitMarkup } from "../data/fighters.js";
import { getSelectedFighterId } from "../session.js";
import { getPrefs } from "../preferences.js";

const RUN_MS = 20000;
const SCROLL_SPEED = 42;
const HIT_X = 16;
const SPAWN_MS = 1000;
const START_INTEGRITY = 3;
const LANE_TOP = [24, 48, 72];

function runnerCardMarkup(fighter) {
  return `
    <aside class="runner-card">
      <div class="runner-card__art">${portraitMarkup(fighter, "runner")}</div>
      <div class="runner-card__meta">
        <p class="runner-card__kicker">Runner locked</p>
        <h2 class="runner-card__name">${fighter.name}</h2>
        <p class="runner-card__role">${fighter.role}</p>
        <a class="runner-card__swap" href="#/character">Swap fighter</a>
      </div>
    </aside>
  `;
}

function briefingMarkup(fighter) {
  return `
    <section class="chapter" aria-labelledby="chapter-title">
      <header class="chapter__head">
        <a class="chapter__back" href="#/character">◀ Fighter select</a>
        <div class="chapter__intro">
          <p class="chapter__kicker"><span class="pulse" aria-hidden="true"></span>Chapter 01 // dead signal</p>
          <h1 class="chapter__title" id="chapter-title">The last <em>route</em></h1>
          <p class="chapter__sub">Sector 07. A relay that went dark eleven years ago is still broadcasting — and it is using your name.</p>
        </div>
        <div class="chapter__num" aria-hidden="true">01</div>
      </header>

      <div class="chapter__grid">
        ${runnerCardMarkup(fighter)}
        <div class="brief">
          <p class="brief__kicker">Mission briefing</p>
          <h2 class="brief__title">Reach the relay</h2>
          <p class="brief__copy">Cross the dead corridor before the firewall seals it. Every signal node you scoop up is another piece of the transmission.</p>
          <ol class="brief__objectives">
            <li><span>01</span>Survive the firewall corridor</li>
            <li><span>02</span>Collect signal nodes for score</li>
            <li><span>03</span>Reach the relay beacon</li>
          </ol>
          <dl class="brief__meta">
            <div><dt>Threat</dt><dd>Elevated</dd></div>
            <div><dt>Distance</dt><dd>2.4 km</dd></div>
            <div><dt>Run</dt><dd>20 sec</dd></div>
          </dl>
          <button class="deploy" id="deploy" type="button">Deploy<span aria-hidden="true">→</span></button>
          <p class="brief__hint">Arrow keys or W / S switch lanes. Tap the lane buttons on touch screens.</p>
        </div>
      </div>
    </section>
  `;
}

function stageMarkup(fighter) {
  return `
    <section class="stage" aria-labelledby="stage-title">
      <h1 class="visually-hidden" id="stage-title">Chapter one — the last route</h1>

      <header class="stage__hud">
        <div class="hud__block">
          <span class="hud__label">Runner</span>
          <strong class="hud__value">${fighter.name}</strong>
        </div>
        <div class="hud__block">
          <span class="hud__label">Integrity</span>
          <div class="hearts" id="hearts" aria-label="Integrity 3 of 3"></div>
        </div>
        <div class="hud__block hud__block--progress">
          <span class="hud__label">Route progress</span>
          <div class="progress" role="progressbar" aria-label="Route progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="progress"></i></div>
        </div>
        <div class="hud__block hud__block--signals">
          <span class="hud__label">Signals</span>
          <strong class="hud__value" id="signals">0</strong>
        </div>
        <button class="stage__abort" id="abort" type="button">Abort</button>
      </header>

      <div class="track" id="track">
        <div class="track__sky" aria-hidden="true"></div>
        <div class="track__speed" aria-hidden="true"></div>
        <div class="track__floor" aria-hidden="true"></div>
        <div class="track__beacon" aria-hidden="true"><span>Relay</span></div>
        <div class="runner-token" id="player" style="--lane:1">
          <div class="runner-token__art">${portraitMarkup(fighter, "token")}</div>
          <span class="runner-token__tag">${fighter.name}</span>
        </div>
      </div>

      <div class="lane-controls">
        <button class="lane-btn" data-direction="up" type="button"><span aria-hidden="true">▲</span>Lane</button>
        <button class="lane-btn" data-direction="down" type="button"><span aria-hidden="true">▼</span>Lane</button>
      </div>

      <div class="result-host" id="result-host"></div>
    </section>
  `;
}

function runGame(root, fighter, { onBriefing, onRestart }) {
  const track = root.querySelector("#track");
  const player = root.querySelector("#player");
  const progressEl = root.querySelector("#progress");
  const signalsEl = root.querySelector("#signals");
  const heartsEl = root.querySelector("#hearts");
  const resultHost = root.querySelector("#result-host");
  const reduceMotion = getPrefs().motion === "reduced";

  let lane = 1;
  let progress = 0;
  let integrity = START_INTEGRITY;
  let signals = 0;
  let spawnIn = 700;
  let last = performance.now();
  let ended = false;
  let raf = 0;
  const items = [];

  function drawLane() {
    player.style.setProperty("--lane", String(lane));
    if (reduceMotion) player.style.transition = "none";
  }

  function drawHearts() {
    heartsEl.innerHTML = Array.from(
      { length: START_INTEGRITY },
      (_, index) => `<span class="${index < integrity ? "on" : ""}" aria-hidden="true">◆</span>`,
    ).join("");
    heartsEl.setAttribute("aria-label", `Integrity ${integrity} of ${START_INTEGRITY}`);
  }

  function moveLane(direction) {
    if (ended) return;
    const next = Math.min(2, Math.max(0, lane + direction));
    if (next === lane) return;
    lane = next;
    drawLane();
  }

  function spawn() {
    spawnIn = SPAWN_MS + Math.random() * 320;
    const type = Math.random() < 0.34 ? "signal" : "hazard";
    const busy = new Set(
      items.filter((item) => !item.resolved && item.x > 26).map((item) => item.lane),
    );
    const open = [0, 1, 2].filter((laneIndex) => !busy.has(laneIndex));
    if (open.length === 0) return;
    const itemLane = open[Math.floor(Math.random() * open.length)];
    const el = document.createElement("div");
    el.className = `track-item track-item--${type} lane-${itemLane}`;
    el.dataset.lane = String(itemLane);
    el.innerHTML = `<span aria-hidden="true">${type === "signal" ? "◆" : "▲"}</span>`;
    el.style.left = "114%";
    track.appendChild(el);
    items.push({ el, lane: itemLane, x: 114, type, resolved: false });
  }

  function hit(item) {
    integrity -= 1;
    drawHearts();
    item.el.classList.add("is-hit");
    window.setTimeout(() => item.el.remove(), 220);
    if (!reduceMotion) {
      track.classList.remove("is-hit");
      void track.offsetWidth;
      track.classList.add("is-hit");
    }
    if (integrity <= 0) end(false);
  }

  function collect(item) {
    signals += 1;
    signalsEl.textContent = String(signals);
    item.el.classList.add("is-collected");
    window.setTimeout(() => item.el.remove(), 220);
  }

  function end(won) {
    if (ended) return;
    ended = true;
    cancelAnimationFrame(raf);
    document.removeEventListener("keydown", onKey);
    const result = document.createElement("div");
    result.className = "result";
    result.setAttribute("role", "dialog");
    result.setAttribute("aria-modal", "true");
    result.setAttribute("aria-labelledby", "result-title");
    result.innerHTML = `
      <div class="result__panel" tabindex="-1">
        <p class="result__kicker">${won ? "Route cleared" : "Signal lost"}</p>
        <h2 class="result__title" id="result-title">${won ? "Chapter one complete" : "Connection severed"}</h2>
        <p class="result__copy">
          ${
            won
              ? `${fighter.name} reached the relay with ${integrity} integrity left. The transmission is waiting in chapter two.`
              : "The firewall took the last of your signal. Re-route and try again."
          }
        </p>
        <dl class="result__stats">
          <div><dt>Signals</dt><dd>${signals}</dd></div>
          <div><dt>Integrity</dt><dd>${integrity}/${START_INTEGRITY}</dd></div>
          <div><dt>Route</dt><dd>${Math.round(progress)}%</dd></div>
        </dl>
        <div class="result__actions">
          <button class="deploy" id="retry" type="button">Run again</button>
          <button class="menu-item" id="briefing" type="button">
            <span class="menu-item__mark" aria-hidden="true">◀</span>Back to briefing
          </button>
        </div>
      </div>
    `;
    resultHost.innerHTML = "";
    resultHost.appendChild(result);
    result.querySelector(".result__panel").focus();

    result.querySelector("#retry").addEventListener("click", () => {
      stop();
      onRestart();
    });
    result.querySelector("#briefing").addEventListener("click", () => {
      stop();
      onBriefing();
    });
  }

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.06);
    last = now;

    progress = Math.min(100, progress + (dt * 1000 * 100) / RUN_MS);
    progressEl.style.width = `${progress}%`;
    progressEl.parentElement.setAttribute("aria-valuenow", String(Math.round(progress)));

    spawnIn -= dt * 1000;
    if (spawnIn <= 0) spawn();

    for (const item of items) {
      item.x -= SCROLL_SPEED * dt;
      item.el.style.left = `${item.x}%`;

      if (item.resolved) continue;
      const near = Math.abs(item.x - HIT_X) < 5.5;
      if (!near || item.lane !== lane) continue;
      item.resolved = true;
      if (item.type === "hazard") hit(item);
      else collect(item);
      if (ended) return;
    }

    for (let index = items.length - 1; index >= 0; index -= 1) {
      if (items[index].x < -14) {
        items[index].el.remove();
        items.splice(index, 1);
      }
    }

    if (progress >= 100) {
      end(true);
      return;
    }
    raf = requestAnimationFrame(frame);
  }

  function onKey(event) {
    if (ended) return;
    if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
      event.preventDefault();
      moveLane(-1);
    } else if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
      event.preventDefault();
      moveLane(1);
    } else if (event.key === "Escape") {
      stop();
      onBriefing();
    }
  }

  root.querySelectorAll(".lane-btn").forEach((button) => {
    button.addEventListener("click", () => moveLane(button.dataset.direction === "up" ? -1 : 1));
  });

  function stop() {
    ended = true;
    cancelAnimationFrame(raf);
    document.removeEventListener("keydown", onKey);
  }

  document.addEventListener("keydown", onKey);
  drawLane();
  drawHearts();
  raf = requestAnimationFrame((now) => {
    last = now;
    frame(now);
  });

  return { stop };
}

export function renderLevel(root) {
  const fighter = getFighter(getSelectedFighterId()) || FIGHTERS[0];
  let run = null;

  function showBriefing() {
    run?.stop();
    run = null;
    root.innerHTML = briefingMarkup(fighter);
    root.querySelector("#deploy").addEventListener("click", startRun);
  }

  function startRun() {
    root.innerHTML = stageMarkup(fighter);
    root.querySelector("#abort").addEventListener("click", () => {
      run?.stop();
      run = null;
      showBriefing();
    });
    run = runGame(root, fighter, { onBriefing: showBriefing, onRestart: startRun });
  }

  showBriefing();

  return () => {
    run?.stop();
    run = null;
  };
}
