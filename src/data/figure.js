const INK = "#070a10";

/* Per-fighter idle tempo (seconds per breath) keeps the roster from moving in lockstep. */
const TEMPO = {
  ruka: 2.55,
  vex: 2.15,
  talon: 2.95,
  oracle: 2.7,
  nix: 2.35,
  havoc: 3.4,
};

/* Chunky crown built from whole pixel blocks, tinted per fighter. */
function hairMarkup(f) {
  return `
    <g class="fig-hair">
      <rect x="46" y="18" width="40" height="9" fill="${f.hair}" stroke="${INK}" stroke-width="2.5" />
      <rect x="49" y="12" width="11" height="8" fill="${f.hair}" stroke="${INK}" stroke-width="2.5" />
      <rect x="63" y="9" width="9" height="10" fill="${f.hair}" stroke="${INK}" stroke-width="2.5" />
      <rect x="75" y="14" width="9" height="6" fill="${f.hair}" stroke="${INK}" stroke-width="2.5" />
      <rect x="51" y="20" width="8" height="4" fill="${f.hairDark}" />
      <rect x="66" y="20" width="6" height="3" fill="${f.hairDark}" />
      <rect x="79" y="20" width="6" height="4" fill="${f.hairDark}" />
    </g>
  `;
}

function faceMarkup(f) {
  return `
    <g class="fig-face">
      <g class="fig-brows">
        <rect class="fig-brow" x="54" y="28" width="9" height="3" fill="${INK}" />
        <rect class="fig-brow" x="67" y="27.4" width="10" height="3" fill="${INK}" />
      </g>

      <g class="fig-eye-open">
        <rect x="55" y="33" width="8" height="7" fill="#fbfdff" stroke="${INK}" stroke-width="1.8" />
        <rect x="58" y="35" width="3" height="3" fill="${f.eye}" />
        <rect x="57.6" y="34.4" width="1.6" height="1.6" fill="#ffffff" />
        <rect x="68" y="33" width="9" height="7" fill="#fbfdff" stroke="${INK}" stroke-width="1.8" />
        <rect x="72" y="35" width="3.4" height="3.4" fill="${f.eye}" />
        <rect x="71.6" y="34.4" width="1.6" height="1.6" fill="#ffffff" />
      </g>

      <g class="fig-eye-shut">
        <rect x="55" y="36" width="8" height="2.4" fill="${INK}" />
        <rect x="68" y="36" width="9" height="2.4" fill="${INK}" />
      </g>

      <g class="fig-eye-happy">
        <path d="M55 38 L57.6 34.8 L60 38" fill="none" stroke="${INK}" stroke-width="2.4" />
        <path d="M68 38 L71 34.4 L74 38" fill="none" stroke="${INK}" stroke-width="2.4" />
      </g>

      <g class="fig-mouth fig-mouth--idle">
        <rect x="62" y="47" width="11" height="2.4" fill="${INK}" />
      </g>

      <g class="fig-mouth fig-mouth--open">
        <rect x="60" y="44" width="15" height="9" fill="#2a0a14" stroke="${INK}" stroke-width="2" />
        <rect x="62" y="45.6" width="11" height="2" fill="#ffffff" opacity="0.92" />
      </g>

      <g class="fig-mouth fig-mouth--grit">
        <rect x="60" y="46" width="15" height="5" fill="#2a0a14" />
        <rect x="63" y="47" width="2" height="3" fill="#ffffff" opacity="0.9" />
        <rect x="69" y="47" width="2" height="3" fill="#ffffff" opacity="0.9" />
      </g>

      <rect x="73" y="43" width="6" height="3" fill="${f.accent}" opacity="0.35" />

      <g class="fig-sweat">
        <rect x="50" y="28" width="5" height="6" fill="#bff0ff" stroke="${INK}" stroke-width="1.6" />
        <rect x="51" y="34" width="3" height="3" fill="#bff0ff" stroke="${INK}" stroke-width="1.4" />
      </g>
    </g>
  `;
}

function backLimbsMarkup(f) {
  return `
    <g class="fig-leg fig-leg--back" style="transform-origin: 52px 108px">
      <path d="M52 106 L44 138 L38 161" fill="none" stroke="${INK}" stroke-width="15" stroke-linecap="square" stroke-linejoin="miter" />
      <path d="M52 106 L44 138 L38 161" fill="none" stroke="${f.jacketDark}" stroke-width="10" />
      <rect x="49" y="112" width="6" height="4" fill="${f.accent}" opacity="0.55" />
      <rect x="34" y="158" width="25" height="11" fill="${f.jacketDark}" stroke="${INK}" stroke-width="2.5" />
      <rect x="34" y="162" width="25" height="3" fill="${f.accent}" opacity="0.7" />
    </g>

    <g class="fig-arm fig-arm--back" style="transform-origin: 46px 72px">
      <path d="M46 72 L38 86 L41 99" fill="none" stroke="${INK}" stroke-width="14" stroke-linecap="square" stroke-linejoin="miter" />
      <path d="M46 72 L38 86 L41 99" fill="none" stroke="${f.jacketDark}" stroke-width="9" />
      <rect x="35" y="93" width="13" height="12" fill="${f.jacketDark}" stroke="${INK}" stroke-width="2.5" />
      <rect x="37" y="96" width="7" height="3" fill="${f.accent}" opacity="0.8" />
    </g>
  `;
}

function torsoMarkup(f) {
  return `
    <g class="fig-torso" style="transform-origin: 58px 110px">
      <path d="M60 58 L56 108" fill="none" stroke="${INK}" stroke-width="24" stroke-linecap="square" />
      <path d="M60 58 L56 108" fill="none" stroke="${f.jacket}" stroke-width="17" stroke-linecap="square" />
      <rect x="42" y="66" width="15" height="10" fill="${f.jacketDark}" stroke="${INK}" stroke-width="2.5" />
      <rect x="74" y="68" width="15" height="10" fill="${f.jacket}" stroke="${INK}" stroke-width="2.5" />
      <rect x="50" y="70" width="14" height="5" fill="${f.accent2}" stroke="${INK}" stroke-width="2" />
      <rect x="52" y="79" width="9" height="3" fill="${f.accent}" opacity="0.8" />
      <rect x="46" y="100" width="23" height="8" fill="${f.jacketDark}" stroke="${INK}" stroke-width="2.5" />
      <rect x="55" y="101.5" width="7" height="5" fill="${f.accent}" />
    </g>
  `;
}

function frontLegMarkup(f) {
  return `
    <g class="fig-leg fig-leg--front" style="transform-origin: 64px 108px">
      <path d="M64 106 L78 134 L87 159" fill="none" stroke="${INK}" stroke-width="17" stroke-linecap="square" stroke-linejoin="miter" />
      <path d="M64 106 L78 134 L87 159" fill="none" stroke="${f.jacket}" stroke-width="12" />
      <rect x="72" y="126" width="13" height="8" fill="${f.accent}" stroke="${INK}" stroke-width="2" />
      <rect x="74" y="154" width="28" height="12" fill="${f.accent2}" stroke="${INK}" stroke-width="2.5" />
      <rect x="75" y="160" width="26" height="4" fill="${f.accent}" />
    </g>
  `;
}

function headMarkup(f) {
  return `
    <g class="fig-head" style="transform-origin: 66px 60px">
      <rect x="60" y="49" width="14" height="12" fill="${f.skinShade}" stroke="${INK}" stroke-width="2.5" />
      <rect x="82" y="37" width="5" height="9" fill="${f.skin}" stroke="${INK}" stroke-width="2.5" />
      <rect x="48" y="21" width="36" height="34" fill="${f.skin}" stroke="${INK}" stroke-width="3.5" />
      <rect x="48" y="21" width="10" height="34" fill="${f.skinShade}" opacity="0.5" />
      <rect x="50" y="23" width="17" height="3" fill="#ffffff" opacity="0.22" />

      ${faceMarkup(f)}
      ${hairMarkup(f)}

      <rect class="fig-shine fig-shine--a" x="55" y="15" width="12" height="3" fill="#ffffff" opacity="0.55" />
      <rect class="fig-shine fig-shine--b" x="68" y="11" width="4" height="6" fill="#ffffff" opacity="0.35" />
    </g>
  `;
}

function frontArmMarkup(f) {
  return `
    <g class="fig-arm fig-arm--front" style="transform-origin: 78px 74px">
      <path d="M78 74 L90 87 L86 101" fill="none" stroke="${INK}" stroke-width="15" stroke-linecap="square" stroke-linejoin="miter" />
      <path d="M78 74 L90 87 L86 101" fill="none" stroke="${f.jacket}" stroke-width="10" />
      <rect x="82" y="88" width="11" height="5" fill="${f.accent}" stroke="${INK}" stroke-width="2" />
      <rect x="79" y="96" width="14" height="13" fill="${f.accent}" stroke="${INK}" stroke-width="2.5" />
      <rect x="82" y="99" width="6" height="3" fill="#ffffff" opacity="0.4" />
    </g>
  `;
}

export function fighterFigureMarkup(fighter) {
  const uid = fighter.id;
  const tempo = TEMPO[fighter.id] || 2.6;
  const blink = (uid.length * 0.63 + 0.8).toFixed(2);

  return `
    <svg class="fighter-figure" viewBox="0 0 120 180" role="presentation" focusable="false" style="--idle-dur: ${tempo}s; --blink-delay: ${blink}s">
      <defs>
        <radialGradient id="aura-f-${uid}" cx="50%" cy="45%" r="55%">
          <stop offset="0" stop-color="${fighter.accent}" stop-opacity="0.3" />
          <stop offset="1" stop-color="${fighter.accent}" stop-opacity="0" />
        </radialGradient>
      </defs>

      <ellipse class="fig-ground" cx="60" cy="170" rx="44" ry="12" fill="url(#aura-f-${uid})" />
      <circle class="fig-aura" cx="60" cy="102" r="52" fill="none" stroke="${fighter.accent}" stroke-width="3" stroke-dasharray="8 10" opacity="0" />

      <g class="fig-body" style="transform-origin: 60px 172px">
        ${backLimbsMarkup(fighter)}
        ${torsoMarkup(fighter)}
        ${frontLegMarkup(fighter)}
        ${headMarkup(fighter)}
        ${frontArmMarkup(fighter)}

        <g class="fig-guard" opacity="0">
          <rect x="93" y="56" width="11" height="38" fill="${fighter.accent}" opacity="0.22" />
          <rect x="93" y="56" width="11" height="38" fill="none" stroke="${fighter.accent}" stroke-width="3" />
          <rect x="97" y="63" width="4" height="24" fill="${fighter.accent}" opacity="0.7" />
        </g>
      </g>
    </svg>
  `;
}
