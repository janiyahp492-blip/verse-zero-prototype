import { getPrefs } from "./preferences.js";

export function mountStarfield(canvas) {
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let stars = [];
  let frame = 0;

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
    paint();
  }

  function paint(time = performance.now()) {
    ctx.clearRect(0, 0, width, height);
    const pulse = 0.5 + Math.sin(time / 1600) * 0.12;
    for (const star of stars) {
      const alpha = (star.z * 0.55 + 0.15) * pulse;
      ctx.fillStyle = `rgba(190, 225, 255, ${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r * star.z, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function loop(time) {
    for (const star of stars) {
      star.y += star.z * 0.12;
      if (star.y > height + 2) {
        star.y = -2;
        star.x = Math.random() * width;
      }
    }
    paint(time);
    frame = requestAnimationFrame(loop);
  }

  function syncMotion() {
    cancelAnimationFrame(frame);
    frame = 0;
    if (getPrefs().motion === "full") {
      frame = requestAnimationFrame(loop);
    } else {
      paint();
    }
  }

  window.addEventListener("resize", resize);
  window.addEventListener("verses:prefs", syncMotion);
  resize();
  syncMotion();
}
