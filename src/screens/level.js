import "./level.css";
import { FIGHTERS, getFighter, portraitMarkup } from "../data/fighters.js";
import { fighterFigureMarkup } from "../data/figure.js";
import { getSelectedFighterId } from "../session.js";
import { getPrefs } from "../preferences.js";

const ROUND_MS = 60000;
const INTRO_MS = 1700;
const MAX_HP = 100;
const MOVE_SPEED = 30;
const MIN_X = 12;
const MAX_X = 80;
const MIN_GAP = 11;

const MOVES = {
  punch: { range: 20, damage: 8, cooldown: 300, meter: 12, cls: "is-punch" },
  kick: { range: 26, damage: 13, cooldown: 560, meter: 15, cls: "is-kick" },
  super: { range: 32, damage: 30, cooldown: 1200, meter: 0, cls: "is-super" },
};

const RIVAL_MOVES = {
  punch: { range: 21, damage: 8, windup: 380 },
  kick: { range: 27, damage: 12, windup: 540 },
};

function pickRival(fighter) {
  const index = FIGHTERS.findIndex((entry) => entry.id === fighter.id);
  return FIGHTERS[(index + 2) % FIGHTERS.length];
}

function fighterCardMarkup(fighter) {
  return `
    <aside class="runner-card">
      <div class="runner-card__art">${portraitMarkup(fighter, "runner")}</div>
      <div class="runner-card__meta">
        <p class="runner-card__kicker">1P // locked in</p>
        <h2 class="runner-card__name">${fighter.name}</h2>
        <p class="runner-card__role">${fighter.role}</p>
        <a class="runner-card__swap" href="#/character">Swap fighter</a>
      </div>
    </aside>
  `;
}

function versusMarkup(fighter, rival) {
  return `
    <div class="versus">
      <div class="versus__slot">
        ${portraitMarkup(fighter, "vs-p1")}
        <span class="versus__tag">1P</span>
        <strong class="versus__name">${fighter.name}</strong>
      </div>
      <span class="versus__mark" aria-hidden="true">VS</span>
      <div class="versus__slot versus__slot--rival">
        ${portraitMarkup(rival, "vs-p2")}
        <span class="versus__tag">CPU</span>
        <strong class="versus__name">${rival.name}</strong>
      </div>
    </div>
  `;
}

function briefingMarkup(fighter, rival) {
  return `
    <section class="chapter" aria-labelledby="chapter-title">
      <header class="chapter__head">
        <a class="chapter__back" href="#/character">◀ Fighter select</a>
        <div class="chapter__intro">
          <p class="chapter__kicker"><span class="pulse" aria-hidden="true"></span>Chapter 01 // first bout</p>
          <h1 class="chapter__title" id="chapter-title">The last <em>route</em></h1>
          <p class="chapter__sub">Sector 07. The relay that went dark eleven years ago is broadcasting again — and someone already took the stage to answer it.</p>
        </div>
        <div class="chapter__num" aria-hidden="true">01</div>
      </header>

      <div class="chapter__grid">
        ${fighterCardMarkup(fighter)}
        <div class="brief">
          <p class="brief__kicker">Bout briefing</p>
          <h2 class="brief__title">Duel for the relay</h2>
          ${versusMarkup(fighter, rival)}
          <p class="brief__copy">${rival.name} reached the relay first and is holding the signal. Break their guard, empty the vitality bar, and the transmission is yours.</p>
          <ol class="brief__objectives">
            <li><span>01</span>Close the distance and land the first strike</li>
            <li><span>02</span>Break ${rival.name}'s guard before the clock runs out</li>
            <li><span>03</span>Finish the round standing</li>
          </ol>
          <dl class="brief__meta">
            <div><dt>Round</dt><dd>60 sec</dd></div>
            <div><dt>Rule</dt><dd>K.O.</dd></div>
            <div><dt>Stage</dt><dd>Sector 07</dd></div>
          </dl>
          <button class="deploy" id="deploy" type="button">Fight<span aria-hidden="true">→</span></button>
          <p class="brief__hint">Move with ← → / A D · J punch · K kick · hold L to block · Space for super.</p>
        </div>
      </div>
    </section>
  `;
}

function stageMarkup(fighter, rival) {
  return `
    <section class="stage" aria-labelledby="stage-title">
      <h1 class="visually-hidden" id="stage-title">Chapter one — duel for the relay</h1>

      <div class="sf-hud">
        <div class="sf-side">
          <div class="sf-side__top">
            <span class="sf-side__tag">1P</span>
            <strong class="sf-side__name">${fighter.name}</strong>
          </div>
          <div class="hp" id="hp-p1" role="progressbar" aria-label="${fighter.name} vitality" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100"><i></i></div>
          <div class="meter" id="meter-p1" aria-hidden="true"><i></i></div>
        </div>
        <div class="sf-center">
          <span class="sf-center__label">Time</span>
          <span class="sf-center__timer" id="timer">99</span>
        </div>
        <div class="sf-side sf-side--rival">
          <div class="sf-side__top">
            <strong class="sf-side__name">${rival.name}</strong>
            <span class="sf-side__tag">CPU</span>
          </div>
          <div class="hp hp--rival" id="hp-p2" role="progressbar" aria-label="${rival.name} vitality" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100"><i></i></div>
          <div class="meter meter--ready" aria-hidden="true"><i></i></div>
        </div>
      </div>

      <div class="arena" id="arena" aria-label="Sector 07 duel arena">
        <div class="arena__sky" aria-hidden="true">
          <span class="arena__sun"></span>
          <span class="arena__lines"></span>
        </div>
        <div class="arena__city" aria-hidden="true"></div>
        <div class="arena__floor" aria-hidden="true"></div>
        <div class="arena__glow" aria-hidden="true"></div>

        <div class="duelist duelist--p1" id="p1" style="--x:32">
          ${fighterFigureMarkup(fighter)}
          <span class="duelist__tag">1P</span>
        </div>
        <div class="duelist duelist--p2" id="p2" style="--x:56">
          ${fighterFigureMarkup(rival)}
          <span class="duelist__tag">CPU</span>
        </div>

        <div class="combo" id="combo" aria-live="polite"></div>
        <div class="arena__announce" id="announce" aria-live="polite"></div>
      </div>

      <div class="fight-controls">
        <div class="fight-controls__move">
          <button class="pad-btn" data-move="back" type="button" aria-label="Step back">◀</button>
          <button class="pad-btn" data-move="forward" type="button" aria-label="Step forward">▶</button>
        </div>
        <div class="fight-controls__actions">
          <button class="act-btn" data-attack="punch" type="button">Punch<small>J</small></button>
          <button class="act-btn" data-attack="kick" type="button">Kick<small>K</small></button>
          <button class="act-btn" data-block type="button" aria-pressed="false">Block<small>L</small></button>
          <button class="act-btn act-btn--super" data-attack="super" id="super-btn" type="button">Super<small>Space</small></button>
        </div>
        <button class="stage__abort" id="abort" type="button">Abort</button>
      </div>

      <div class="result-host" id="result-host"></div>
    </section>
  `;
}

function runFight(root, fighter, rival, { onBriefing, onRestart }) {
  const arena = root.querySelector("#arena");
  const p1 = root.querySelector("#p1");
  const p2 = root.querySelector("#p2");
  const hpP1 = root.querySelector("#hp-p1");
  const hpP2 = root.querySelector("#hp-p2");
  const hpP1Fill = hpP1.querySelector("i");
  const hpP2Fill = hpP2.querySelector("i");
  const meterFill = root.querySelector("#meter-p1 i");
  const timerEl = root.querySelector("#timer");
  const comboEl = root.querySelector("#combo");
  const announceEl = root.querySelector("#announce");
  const resultHost = root.querySelector("#result-host");
  const blockBtn = root.querySelector("[data-block]");
  const superBtn = root.querySelector("#super-btn");
  const reduceMotion = getPrefs().motion === "reduced";

  let playerX = 32;
  let rivalX = 32 + 24;
  let hp = MAX_HP;
  let rivalHp = MAX_HP;
  let meter = 0;
  let hits = 0;
  let bestCombo = 0;
  let combo = 0;
  let comboTimer = 0;
  let elapsed = 0;
  let phase = "intro";
  let ended = false;
  let moveDir = 0;
  let blocking = false;
  let attackCooldown = 0;
  let rivalTimer = 700;
  let rivalWindup = 0;
  let rivalRecover = 0;
  let rivalMove = null;
  let last = performance.now();
  let raf = 0;
  const timers = new Set();

  function later(fn, ms) {
    const id = window.setTimeout(() => {
      timers.delete(id);
      fn();
    }, ms);
    timers.add(id);
    return id;
  }

  function place() {
    p1.style.setProperty("--x", playerX.toFixed(2));
    p2.style.setProperty("--x", rivalX.toFixed(2));
  }

  function drawBars() {
    hpP1Fill.style.width = `${(hp / MAX_HP) * 100}%`;
    hpP2Fill.style.width = `${(rivalHp / MAX_HP) * 100}%`;
    hpP1.setAttribute("aria-valuenow", String(Math.round(hp)));
    hpP2.setAttribute("aria-valuenow", String(Math.round(rivalHp)));
    meterFill.style.width = `${meter}%`;
    superBtn.classList.toggle("is-ready", meter >= 100);
  }

  function announce(text, extra = "") {
    announceEl.textContent = text;
    announceEl.className = `arena__announce is-on ${extra}`;
    later(() => {
      announceEl.className = "arena__announce";
    }, 900);
  }

  function shake() {
    if (reduceMotion) return;
    arena.classList.remove("is-shaking");
    void arena.offsetWidth;
    arena.classList.add("is-shaking");
  }

  function spark(x, kind) {
    const el = document.createElement("span");
    el.className = `fx__spark fx__spark--${kind}`;
    el.style.left = `${x}%`;
    el.style.bottom = "32%";
    arena.appendChild(el);
    later(() => el.remove(), 460);
  }

  function floatDamage(x, amount, tone) {
    const el = document.createElement("span");
    el.className = `fx__damage fx__damage--${tone}`;
    el.textContent = `-${amount}`;
    el.style.left = `${x}%`;
    arena.appendChild(el);
    later(() => el.remove(), 720);
  }

  function showCombo() {
    comboEl.textContent = `${combo} HIT COMBO`;
    comboEl.classList.add("is-on");
    later(() => comboEl.classList.remove("is-on"), 750);
  }

  function damageRival(amount, gain) {
    rivalHp = Math.max(0, rivalHp - amount);
    hits += 1;
    combo = comboTimer > 0 ? combo + 1 : 1;
    bestCombo = Math.max(bestCombo, combo);
    comboTimer = 1300;
    meter = Math.min(100, meter + gain);
    drawBars();
    floatDamage(rivalX, amount, "player");
    spark(rivalX, "hit");
    shake();
    p2.classList.add("is-hurt");
    later(() => p2.classList.remove("is-hurt"), 220);
    if (combo >= 2) showCombo();
    if (rivalHp <= 0) finish("win");
  }

  function damagePlayer(amount) {
    const dealt = blocking ? Math.max(1, Math.round(amount * 0.15)) : amount;
    hp = Math.max(0, hp - dealt);
    meter = Math.min(100, meter + Math.max(3, Math.round(dealt * 0.9)));
    combo = 0;
    drawBars();
    floatDamage(playerX, dealt, blocking ? "block" : "rival");
    spark(playerX, blocking ? "block" : "hit");
    if (!blocking) {
      shake();
      p1.classList.add("is-hurt");
      later(() => p1.classList.remove("is-hurt"), 220);
    }
    if (hp <= 0) finish("lose");
  }

  function playerAttack(kind) {
    if (phase !== "fight" || ended) return;
    const move = MOVES[kind];
    if (kind === "super" && meter < 100) {
      superBtn.classList.remove("is-empty");
      void superBtn.offsetWidth;
      superBtn.classList.add("is-empty");
      return;
    }
    if (attackCooldown > 0) return;
    attackCooldown = move.cooldown;
    p1.classList.add(move.cls);
    later(() => p1.classList.remove(move.cls), 260);

    if (kind === "super") {
      meter = 0;
      arena.classList.add("is-super");
      later(() => arena.classList.remove("is-super"), 900);
      p1.classList.add("is-super");
      later(() => p1.classList.remove("is-super"), 460);
      announce("SUPER FLASH!", "is-super");
    }

    const distance = Math.abs(rivalX - playerX);
    if (distance > move.range) return;
    damageRival(move.damage, move.meter);
  }

  function startRivalAttack(kind) {
    rivalMove = RIVAL_MOVES[kind];
    rivalWindup = rivalMove.windup;
    p2.classList.add("is-windup");
  }

  function resolveRivalAttack() {
    p2.classList.remove("is-windup");
    const distance = Math.abs(rivalX - playerX);
    if (rivalMove && distance <= rivalMove.range) {
      p2.classList.add("is-strike");
      later(() => p2.classList.remove("is-strike"), 220);
      damagePlayer(rivalMove.damage);
    }
    rivalMove = null;
    rivalRecover = 420;
    rivalTimer = 800 + Math.random() * 700;
  }

  function rivalTick(dt) {
    const distance = Math.abs(rivalX - playerX);

    if (rivalRecover > 0) {
      rivalRecover -= dt * 1000;
      return;
    }

    if (rivalWindup > 0) {
      rivalWindup -= dt * 1000;
      if (rivalWindup <= 0) resolveRivalAttack();
      return;
    }

    if (distance > 18) {
      rivalX -= Math.sign(rivalX - playerX) * 20 * dt;
    } else if (distance < 12) {
      rivalX += Math.sign(rivalX - playerX) * 16 * dt;
    }

    rivalTimer -= dt * 1000;
    if (rivalTimer <= 0) {
      if (distance <= 27) startRivalAttack(distance <= 21 ? "punch" : "kick");
      else rivalTimer = 180;
    }

    rivalX = Math.min(88, Math.max(16, rivalX));
  }

  function finish(outcome) {
    if (ended) return;
    ended = true;
    phase = "over";
    cancelAnimationFrame(raf);
    detach();
    p1.classList.remove("is-hurt", "is-blocking", "is-punch", "is-kick", "is-super");
    p2.classList.remove("is-hurt", "is-windup", "is-strike");
    blocking = false;
    announce(outcome === "draw" ? "TIME UP" : "K.O.", outcome === "win" ? "is-fight" : "");
    later(() => showResult(outcome), 750);
  }

  function showResult(outcome) {
    const won = outcome === "win";
    const draw = outcome === "draw";
    const result = document.createElement("div");
    result.className = "result";
    result.setAttribute("role", "dialog");
    result.setAttribute("aria-modal", "true");
    result.setAttribute("aria-labelledby", "result-title");
    result.innerHTML = `
      <div class="result__panel" tabindex="-1">
        <p class="result__kicker">${won ? "Round cleared" : draw ? "Time up" : "Round lost"}</p>
        <h2 class="result__title" id="result-title">
          ${won ? `K.O. — ${fighter.name} wins` : draw ? "Dead even" : `K.O. — ${rival.name} wins`}
        </h2>
        <p class="result__copy">
          ${
            won
              ? `${rival.name} is down. The relay answers to your signal, and chapter two is already broadcasting.`
              : draw
                ? "The clock beat you both. The relay stayed dark and the rematch is yours to call."
                : `${rival.name} held the relay. Watch the wind-up, block the kick, and take the rematch.`
          }
        </p>
        <dl class="result__stats">
          <div><dt>Hits</dt><dd>${hits}</dd></div>
          <div><dt>Best combo</dt><dd>${bestCombo}</dd></div>
          <div><dt>Vitals</dt><dd>${Math.max(0, Math.round(hp))}</dd></div>
        </dl>
        <div class="result__actions">
          <button class="deploy" id="retry" type="button">Rematch</button>
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

    if (phase === "fight") {
      elapsed += dt * 1000;

      if (attackCooldown > 0) attackCooldown -= dt * 1000;
      if (comboTimer > 0) comboTimer -= dt * 1000;
      else combo = 0;

      playerX = Math.min(MAX_X, Math.max(MIN_X, playerX + moveDir * MOVE_SPEED * dt));
      rivalTick(dt);

      if (Math.abs(rivalX - playerX) < MIN_GAP) {
        const dir = rivalX >= playerX ? 1 : -1;
        rivalX = Math.min(88, Math.max(16, playerX + dir * MIN_GAP));
      }

      place();

      const seconds = Math.max(0, Math.ceil((1 - elapsed / ROUND_MS) * 99));
      if (timerEl.textContent !== String(seconds)) timerEl.textContent = String(seconds);

      if (elapsed >= ROUND_MS) {
        finish(rivalHp === hp ? "draw" : rivalHp > hp ? "lose" : "win");
        return;
      }
    }

    if (!ended) raf = requestAnimationFrame(frame);
  }

  function setBlocking(on) {
    if (on && phase !== "fight") on = false;
    blocking = on;
    p1.classList.toggle("is-blocking", on);
    blockBtn.setAttribute("aria-pressed", String(on));
  }

  function onKeyDown(event) {
    const key = event.key.toLowerCase();
    if (["arrowleft", "arrowright", "a", "d", "j", "k", "l", "z", "x", "c", " "].includes(key)) {
      event.preventDefault();
    }
    if (phase === "over" || event.repeat) return;

    if (key === "arrowleft" || key === "a") moveDir = -1;
    else if (key === "arrowright" || key === "d") moveDir = 1;
    else if (key === "j" || key === "z") playerAttack("punch");
    else if (key === "k" || key === "x") playerAttack("kick");
    else if (key === "l" || key === "c" || key === "shift") setBlocking(true);
    else if (key === " ") playerAttack("super");
    else if (key === "escape") {
      stop();
      onBriefing();
    }
  }

  function onKeyUp(event) {
    const key = event.key.toLowerCase();
    if (key === "arrowleft" || key === "a" || key === "arrowright" || key === "d") moveDir = 0;
    if (key === "l" || key === "c" || key === "shift") setBlocking(false);
  }

  const moveButtons = Array.from(root.querySelectorAll("[data-move]"));
  const cleanupMove = [];

  moveButtons.forEach((button) => {
    const dir = button.dataset.move === "forward" ? 1 : -1;
    const press = (event) => {
      event.preventDefault();
      if (phase !== "fight") return;
      moveDir = dir;
    };
    const release = () => {
      if (moveDir === dir) moveDir = 0;
    };
    button.addEventListener("pointerdown", press);
    button.addEventListener("pointerup", release);
    button.addEventListener("pointerleave", release);
    button.addEventListener("pointercancel", release);
    cleanupMove.push(() => {
      button.removeEventListener("pointerdown", press);
      button.removeEventListener("pointerup", release);
      button.removeEventListener("pointerleave", release);
      button.removeEventListener("pointercancel", release);
    });
  });

  const blockDown = (event) => {
    event.preventDefault();
    setBlocking(true);
  };
  const blockUp = () => setBlocking(false);
  blockBtn.addEventListener("pointerdown", blockDown);
  blockBtn.addEventListener("pointerup", blockUp);
  blockBtn.addEventListener("pointerleave", blockUp);
  blockBtn.addEventListener("pointercancel", blockUp);

  const attackButtons = Array.from(root.querySelectorAll("[data-attack]"));
  const attackHandlers = attackButtons.map((button) => {
    const handler = () => playerAttack(button.dataset.attack);
    button.addEventListener("click", handler);
    return [button, handler];
  });

  function stop() {
    ended = true;
    phase = "over";
    cancelAnimationFrame(raf);
    detach();
  }

  function detach() {
    document.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("keyup", onKeyUp);
    timers.forEach((id) => window.clearTimeout(id));
    timers.clear();
    cleanupMove.forEach((fn) => fn());
    blockBtn.removeEventListener("pointerdown", blockDown);
    blockBtn.removeEventListener("pointerup", blockUp);
    blockBtn.removeEventListener("pointerleave", blockUp);
    blockBtn.removeEventListener("pointercancel", blockUp);
    attackHandlers.forEach(([button, handler]) => button.removeEventListener("click", handler));
  }

  root.querySelector("#abort").addEventListener("click", () => {
    stop();
    onBriefing();
  });

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  place();
  drawBars();
  announce("ROUND 1");
  later(() => announce("FIGHT!", "is-fight"), 850);
  later(() => {
    if (!ended) phase = "fight";
  }, INTRO_MS);

  raf = requestAnimationFrame((now) => {
    last = now;
    frame(now);
  });

  return { stop };
}

export function renderLevel(root) {
  const fighter = getFighter(getSelectedFighterId()) || FIGHTERS[0];
  const rival = pickRival(fighter);
  let fight = null;

  function showBriefing() {
    fight?.stop();
    fight = null;
    root.innerHTML = briefingMarkup(fighter, rival);
    root.querySelector("#deploy").addEventListener("click", startFight);
  }

  function startFight() {
    root.innerHTML = stageMarkup(fighter, rival);
    fight = runFight(root, fighter, rival, { onBriefing: showBriefing, onRestart: startFight });
  }

  showBriefing();

  return () => {
    fight?.stop();
    fight = null;
  };
}
