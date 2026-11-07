import "./styles.css";
import { applyPrefs } from "./preferences.js";
import { mountStarfield } from "./starfield.js";
import { renderTitle } from "./screens/title.js";
import { renderSettings } from "./screens/settings.js";
import { renderCharacter } from "./screens/character.js";

applyPrefs();
mountStarfield(document.querySelector("#starfield"));

const app = document.querySelector("#app");

const routes = {
  "/": { render: renderTitle, title: "VERSE//ZERO" },
  "/settings": { render: renderSettings, title: "Settings // VERSE//ZERO" },
  "/character": { render: renderCharacter, title: "Choose your fighter // VERSE//ZERO" },
};

let cleanup = null;

function currentPath() {
  const raw = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  return raw.startsWith("/") ? raw : "/";
}

function renderNotFound(root) {
  root.innerHTML = `
    <section class="not-found">
      <p class="eyebrow"><span class="pulse" aria-hidden="true"></span>Signal lost</p>
      <h1>Route not found</h1>
      <p>That transmission does not map to a screen in this build.</p>
      <a class="menu-item menu-item--primary" href="#/">Back to title</a>
    </section>
  `;
}

function renderRoute() {
  const path = currentPath();
  const route = routes[path] || { render: renderNotFound, title: "Route not found // VERSE//ZERO" };

  if (cleanup) {
    cleanup();
    cleanup = null;
  }

  document.title = route.title;
  app.innerHTML = "";
  cleanup = route.render(app) || null;

  window.scrollTo(0, 0);
  const heading = app.querySelector("h1");
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}

window.addEventListener("hashchange", renderRoute);
renderRoute();
