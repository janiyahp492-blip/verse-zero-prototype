const statusEl = document.querySelector(".status");
const panel = document.querySelector("#panel");
const panelKicker = document.querySelector("#panel-kicker");
const panelTitle = document.querySelector("#panel-title");
const panelBody = document.querySelector("#panel-body");
const enterButton = document.querySelector('[data-action="enter"]');

const PANELS = {
  how: {
    kicker: "Briefing",
    title: "How to Play",
    body: `
      <p>You are a courier running the last live route through the dead network.</p>
      <dl class="controls">
        <div><dt>Move</dt><dd>W A S D / arrow keys</dd></div>
        <div><dt>Boost</dt><dd>Shift</dd></div>
        <div><dt>Interact</dt><dd>E</dd></div>
        <div><dt>Pause</dt><dd>Esc</dd></div>
      </dl>
      <p class="panel__note">Flight systems are not wired up yet — this build is the title screen.</p>
    `,
  },
  credits: {
    kicker: "Transmission log",
    title: "Credits",
    body: `
      <dl class="controls">
        <div><dt>Design &amp; code</dt><dd>VERSE//ZERO team</dd></div>
        <div><dt>Starfield</dt><dd>Generated at runtime</dd></div>
        <div><dt>Engine</dt><dd>Vite + vanilla JavaScript</dd></div>
      </dl>
      <p class="panel__note">Prototype build 0.1 — everything here is subject to change.</p>
    `,
  },
};

function setStatus(text, tone = "idle") {
  statusEl.dataset.tone = tone;
  statusEl.innerHTML = `<span class="status__prompt">${text}</span>`;
}

function openPanel(key) {
  const content = PANELS[key];
  if (!content) return;
  panelKicker.textContent = content.kicker;
  panelTitle.textContent = content.title;
  panelBody.innerHTML = content.body;
  panel.showModal();
}

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    if (action === "enter") {
      enterVerse();
    } else {
      openPanel(action);
    }
  });
});

let entering = false;
function enterVerse() {
  if (entering) return;
  entering = true;
  enterButton.disabled = true;
  enterButton.classList.add("is-loading");

  const steps = [
    "Resolving entry vector…",
    "Handshake accepted…",
    "Opening the last route…",
  ];
  steps.forEach((step, index) => {
    window.setTimeout(() => setStatus(step, "active"), index * 700);
  });

  window.setTimeout(() => {
    setStatus("No flight systems yet — chapter one is next.", "halted");
    enterButton.disabled = false;
    enterButton.classList.remove("is-loading");
    entering = false;
  }, steps.length * 700);
}

/* Starfield: slow drifting motes plus a distant pulse. */
const canvas = document.querySelector("#starfield");
const ctx = canvas.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let stars = [];
let width = 0;
let height = 0;

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.round((width * height) / 9000);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random() * 0.8 + 0.2,
    r: Math.random() * 1.3 + 0.3,
  }));
}

function draw(time = 0) {
  ctx.clearRect(0, 0, width, height);

  const pulse = 0.5 + Math.sin(time / 1600) * 0.12;
  for (const star of stars) {
    const alpha = (star.z * 0.55 + 0.15) * pulse;
    ctx.fillStyle = `rgba(190, 225, 255, ${alpha.toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r * star.z, 0, Math.PI * 2);
    ctx.fill();
  }

  if (!reduceMotion) {
    for (const star of stars) {
      star.y += star.z * 0.12;
      if (star.y > height + 2) {
        star.y = -2;
        star.x = Math.random() * width;
      }
    }
    requestAnimationFrame(draw);
  }
}

resize();
draw();
window.addEventListener("resize", resize);
