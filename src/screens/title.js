import "./title.css";

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
      <p class="panel__note">Flight systems are not wired up yet — this build has the title, settings and fighter select.</p>
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
      <p class="panel__note">Prototype build 0.2 — everything here is subject to change.</p>
    `,
  },
};

export function renderTitle(root) {
  root.innerHTML = `
    <section class="title-screen" aria-labelledby="title-heading">
      <p class="eyebrow"><span class="pulse" aria-hidden="true"></span>Signal intercepted // origin unknown</p>

      <h1 class="wordmark" id="title-heading">
        <span class="wordmark__verse">VERSE</span><span class="wordmark__slash" aria-hidden="true">//</span><span class="wordmark__zero">ZERO</span>
      </h1>

      <p class="tagline">
        The network ends here. Something on the other side is still transmitting.
      </p>

      <nav class="menu" aria-label="Main menu">
        <a class="menu-item menu-item--primary" href="#/character">
          <span class="menu-item__mark" aria-hidden="true">▶</span>Enter the Verse
        </a>
        <button class="menu-item" type="button" data-action="how">
          <span class="menu-item__mark" aria-hidden="true">▸</span>How to Play
        </button>
        <a class="menu-item" href="#/settings">
          <span class="menu-item__mark" aria-hidden="true">▸</span>Settings
        </a>
        <button class="menu-item" type="button" data-action="credits">
          <span class="menu-item__mark" aria-hidden="true">▸</span>Credits
        </button>
      </nav>

      <p class="status" role="status" aria-live="polite">
        <span class="status__prompt">Awaiting input</span>
      </p>

      <footer class="meta">
        <span>Build 0.2 // title screen</span>
        <span>No save data</span>
      </footer>
    </section>

    <dialog class="panel" id="panel" aria-labelledby="panel-title">
      <form method="dialog" class="panel__form">
        <p class="panel__kicker" id="panel-kicker">Briefing</p>
        <h2 class="panel__title" id="panel-title">How to Play</h2>
        <div class="panel__body" id="panel-body"></div>
        <button class="menu-item menu-item--primary panel__close" type="submit" value="close">
          <span class="menu-item__mark" aria-hidden="true">◀</span>Back to title
        </button>
      </form>
    </dialog>
  `;

  const panel = root.querySelector("#panel");
  const panelKicker = root.querySelector("#panel-kicker");
  const panelTitle = root.querySelector("#panel-title");
  const panelBody = root.querySelector("#panel-body");

  function openPanel(key) {
    const content = PANELS[key];
    if (!content) return;
    panelKicker.textContent = content.kicker;
    panelTitle.textContent = content.title;
    panelBody.innerHTML = content.body;
    panel.showModal();
  }

  root.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => openPanel(button.dataset.action));
  });
}
