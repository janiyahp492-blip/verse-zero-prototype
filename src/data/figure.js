const INK = "#070a10";

/* Per-fighter idle tempo (seconds per breath) and blink offset keep the roster from moving in lockstep. */
const TEMPO = {
  ruka: 2.55,
  vex: 2.15,
  talon: 2.95,
  oracle: 2.7,
  nix: 2.35,
  havoc: 3.4,
};

function faceMarkup(f, uid) {
  return `
    <g class="fig-face" stroke-linecap="round" stroke-linejoin="round">
      <g class="fig-brows">
        <path class="fig-brow" d="M57 33 Q62 29.5 68 31.6" fill="none" stroke="${INK}" stroke-width="2.8" />
        <path class="fig-brow" d="M70 31 Q76.5 25.6 85 29" fill="none" stroke="${INK}" stroke-width="3.1" />
      </g>

      <g class="fig-eye-open">
        <path d="M58 42 Q62 36 67 41 Q63 47 58 45 Z" fill="#fbfdff" stroke="${INK}" stroke-width="1.6" />
        <ellipse cx="63" cy="41.4" rx="2.7" ry="3.5" fill="url(#iris-f-${uid})" stroke="${INK}" stroke-width="1" />
        <ellipse cx="63" cy="41.8" rx="1.1" ry="1.5" fill="${INK}" />
        <circle cx="61.9" cy="39.7" r="1.15" fill="#ffffff" />
        <circle cx="64.2" cy="43" r="0.6" fill="#ffffff" opacity="0.9" />
        <path d="M57 40.2 Q61 34.6 68 38.6" fill="none" stroke="${INK}" stroke-width="2.3" />
        <path d="M67.2 38.2 L70.2 36.2" fill="none" stroke="${INK}" stroke-width="1.5" />

        <path d="M70 41 Q75 32 82 39 Q78 48 70 45 Z" fill="#fbfdff" stroke="${INK}" stroke-width="1.8" />
        <ellipse cx="76" cy="40" rx="3.6" ry="4.6" fill="url(#iris-f-${uid})" stroke="${INK}" stroke-width="1.1" />
        <ellipse cx="76" cy="40.4" rx="1.5" ry="2" fill="${INK}" />
        <circle cx="74.4" cy="37.4" r="1.6" fill="#ffffff" />
        <circle cx="77.6" cy="42.4" r="0.8" fill="#ffffff" opacity="0.85" />
        <path d="M69 39 Q74 30 83 37" fill="none" stroke="${INK}" stroke-width="3" />
        <path d="M81 36 L84 32" fill="none" stroke="${INK}" stroke-width="1.6" />
        <path d="M69.8 44.6 L67.6 46.6 M83.4 44.8 L85.4 46.6" fill="none" stroke="${INK}" stroke-width="1.3" opacity="0.75" />
      </g>

      <g class="fig-eye-shut">
        <path d="M58.6 40.4 Q63 45.2 67.4 40.2" fill="none" stroke="${INK}" stroke-width="2.4" />
        <path d="M70.6 39.6 Q76.6 45.4 83.2 38.8" fill="none" stroke="${INK}" stroke-width="2.6" />
      </g>

      <g class="fig-eye-happy">
        <path d="M58.6 43.4 Q63 37.8 67.4 43.2" fill="none" stroke="${INK}" stroke-width="2.6" />
        <path d="M70.6 42.6 Q76.6 36.4 83.2 42" fill="none" stroke="${INK}" stroke-width="2.8" />
      </g>

      <g class="fig-mouth fig-mouth--idle">
        <path d="M76 56 Q80 58.4 83.4 55" fill="none" stroke="${INK}" stroke-width="2.2" />
      </g>

      <g class="fig-mouth fig-mouth--open">
        <path d="M73.6 53.6 Q79 51.6 84.4 54.8 Q83.6 61.4 78 61.4 Q73.8 59.4 73.6 53.6 Z" fill="#2a0a14" stroke="${INK}" stroke-width="1.8" />
        <path d="M75 54.4 Q79 53 82.8 54.8" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.92" />
        <path d="M77 60.2 Q79.4 57.6 82 60" fill="#e2557a" stroke="none" opacity="0.9" />
      </g>

      <g class="fig-mouth fig-mouth--grit">
        <path d="M74 55.4 L84.2 54.4" stroke="${INK}" stroke-width="2.4" />
        <path d="M76 55.2 L76 57.2 M79 55 L79 57 M82 54.8 L82 56.8" stroke="#ffffff" stroke-width="1.4" opacity="0.9" />
      </g>

      <ellipse cx="71" cy="50.6" rx="5.4" ry="2" fill="${f.accent}" opacity="0.16" />
      <ellipse cx="83" cy="49.4" rx="3" ry="1.5" fill="${f.accent}" opacity="0.12" />
      <path d="M73 52 L77.4 50.4 M74 54.6 L78.4 53" stroke="${f.accent}" stroke-width="1.4" opacity="0.3" />
    </g>
  `;
}

const HAIR = {
  ruka: {
    back: (f) => `
      <path d="M50 40 Q44 22 66 18 Q90 20 88 44 L84 54 Q86 30 66 26 Q52 28 54 46 Z" fill="${f.hairDark}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" />
      <path d="M54 40 Q52 26 66 24" fill="none" stroke="#ffffff" stroke-width="1.6" opacity="0.14" stroke-linecap="round" />
    `,
    front: (f) => `
      <path d="M47 42 Q46 20 66 18 Q88 20 88 42 Q82 28 70 26 Q58 26 54 40 Q51 46 47 42 Z" fill="${f.hair}" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round" />
      <path d="M53 30 Q62 21 76 23" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.34" stroke-linecap="round" />
      <path d="M50 40 Q52 30 58 26" fill="none" stroke="${f.accent}" stroke-width="2" opacity="0.6" />
      <path d="M62 25 Q58 29 58 34" fill="none" stroke="${f.hairDark}" stroke-width="1.8" opacity="0.7" stroke-linecap="round" />
    `,
    gear: (f) => `
      <path d="M86 44 Q96 46 95 56" fill="none" stroke="#1b2430" stroke-width="4.5" stroke-linecap="round" />
      <rect x="92" y="54" width="8" height="10" rx="3" fill="${f.accent}" stroke="${INK}" stroke-width="2" />
      <path d="M92 58 Q86 62 82 58" fill="none" stroke="${f.accent}" stroke-width="1.8" />
      <circle cx="96" cy="57" r="1.2" fill="#ffffff" opacity="0.7" />
    `,
  },
  vex: {
    back: (f) => `
      <path d="M54 24 Q28 26 20 56 Q12 84 28 112 Q18 80 36 54 Q44 40 58 34 Z" fill="${f.hairDark}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" />
      <path d="M34 52 Q22 76 30 100" fill="none" stroke="${f.hair}" stroke-width="3" opacity="0.7" />
      <path d="M40 46 Q30 66 34 84" fill="none" stroke="#ffffff" stroke-width="1.8" opacity="0.2" />
    `,
    front: (f) => `
      <path d="M47 40 Q48 20 66 18 Q86 20 88 40 Q80 28 68 27 Q58 28 54 40 Q50 44 47 40 Z" fill="${f.hair}" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round" />
      <path d="M52 29 Q62 21 74 23" fill="none" stroke="#ffffff" stroke-width="3.2" opacity="0.32" stroke-linecap="round" />
      <path d="M82 28 Q88 34 88 42" fill="none" stroke="${f.hairDark}" stroke-width="3" />
      <path d="M60 24 Q56 28 56 33" fill="none" stroke="${f.hairDark}" stroke-width="1.8" opacity="0.65" stroke-linecap="round" />
    `,
    gear: (f) => `
      <path d="M62 52 Q72 60 83 52 L81 60 Q72 65 64 60 Z" fill="#121820" stroke="${INK}" stroke-width="2" stroke-linejoin="round" />
      <path d="M67 56 L76 56 M68 59 L75 59" stroke="${f.accent}" stroke-width="1.4" opacity="0.9" />
      <path d="M64 53.6 Q72 58 81 53.2" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.3" />
    `,
  },
  talon: {
    back: (f) => `
      <path d="M50 40 Q46 20 66 16 Q88 20 88 42 L84 50 Q84 28 66 24 Q54 26 54 44 Z" fill="${f.hairDark}" stroke="${INK}" stroke-width="2.5" />
    `,
    front: (f) => `
      <path d="M47 40 L50 18 L58 30 L64 12 L71 30 L79 16 L84 32 L88 26 L88 42 Q80 28 68 26 Q56 28 52 42 Z" fill="${f.hair}" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round" />
      <path d="M55 28 L58 36 M66 22 L68 32 M78 24 L80 34" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" opacity="0.3" />
      <path d="M61 30 Q58 34 59 38" fill="none" stroke="${f.hairDark}" stroke-width="1.8" opacity="0.6" stroke-linecap="round" />
    `,
    gear: (f) => `
      <g transform="rotate(-6 68 30)">
        <rect x="56" y="25" width="26" height="8" rx="4" fill="#161b22" stroke="${INK}" stroke-width="2" />
        <circle cx="62" cy="29" r="2.6" fill="${f.accent}" />
        <circle cx="76" cy="29" r="2.6" fill="${f.accent}" />
        <circle cx="61" cy="28" r="1" fill="#ffffff" opacity="0.8" />
        <circle cx="75" cy="28" r="1" fill="#ffffff" opacity="0.8" />
      </g>
    `,
  },
  oracle: {
    back: (f) => `
      <path d="M44 46 Q40 18 66 12 Q94 18 90 48 L84 40 Q86 22 66 20 Q48 22 50 42 Z" fill="${f.hoodDark}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" />
    `,
    front: (f) => `
      <path d="M42 52 Q40 18 66 14 Q94 18 92 54 L82 44 Q84 24 66 22 Q48 24 50 44 Z" fill="${f.hood}" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round" />
      <path d="M50 32 Q58 18 72 18" fill="none" stroke="#ffffff" stroke-width="2.6" opacity="0.16" stroke-linecap="round" />
      <path d="M56 26 Q52 32 52 38" fill="none" stroke="${f.hoodDark}" stroke-width="2.2" opacity="0.8" stroke-linecap="round" />
    `,
    gear: (f) => `
      <path d="M50 36 Q66 28 86 36 L84 52 Q66 60 52 52 Z" fill="#0b0714" stroke="${INK}" stroke-width="2" />
      <ellipse cx="62" cy="43" rx="4.4" ry="2.2" fill="${f.eye}" />
      <ellipse cx="77" cy="43" rx="4.8" ry="2.4" fill="${f.eye}" />
      <circle cx="62" cy="43" r="1.3" fill="#ffffff" />
      <circle cx="77" cy="43" r="1.4" fill="#ffffff" />
      <path d="M60 50 Q66 54 72 50" fill="none" stroke="${f.accent}" stroke-width="1.6" opacity="0.55" />
      <path d="M52 38 Q66 31 84 38" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.26" />
    `,
  },
  nix: {
    back: (f) => `
      <path d="M50 40 Q42 18 66 14 Q92 18 90 44 L86 52 Q86 28 66 24 Q54 26 54 44 Z" fill="${f.hairDark}" stroke="${INK}" stroke-width="2.5" />
    `,
    front: (f) => `
      <path d="M47 42 L52 20 L58 32 L64 14 L72 32 L79 18 L84 34 L88 28 L88 44 Q80 28 68 26 Q56 28 52 44 Z" fill="${f.hair}" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round" />
      <path d="M56 26 L58 38 M68 20 L70 34" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" opacity="0.3" />
      <path d="M50 40 Q52 30 58 26" fill="none" stroke="${f.accent}" stroke-width="1.8" opacity="0.55" />
      <path d="M62 28 Q59 33 60 37" fill="none" stroke="${f.hairDark}" stroke-width="1.8" opacity="0.6" stroke-linecap="round" />
    `,
    gear: (f) => `
      <rect x="55" y="27" width="25" height="7" rx="3.5" fill="#241a12" stroke="${INK}" stroke-width="2" />
      <circle cx="61" cy="30.5" r="2.4" fill="${f.accent}" />
      <circle cx="74" cy="30.5" r="2.4" fill="${f.accent}" />
      <circle cx="60" cy="29.6" r="0.9" fill="#ffffff" opacity="0.8" />
      <circle cx="73" cy="29.6" r="0.9" fill="#ffffff" opacity="0.8" />
      <path d="M56 58 Q66 54 76 58 L72 68 Q64 72 58 66 Z" fill="${f.scarf}" stroke="${INK}" stroke-width="2" stroke-linejoin="round" />
      <path d="M56 62 Q44 64 36 76 L46 80 Q52 70 58 68 Z" fill="${f.scarf}" stroke="${INK}" stroke-width="2" stroke-linejoin="round" />
      <path d="M59 60 Q66 57 73 60" fill="none" stroke="#ffffff" stroke-width="1.4" opacity="0.22" />
    `,
  },
  havoc: {
    back: (f) => `
      <path d="M48 40 Q46 16 66 14 Q88 16 88 42 L84 48 Q84 24 66 22 Q52 24 52 44 Z" fill="${f.helmetDark}" stroke="${INK}" stroke-width="2.5" />
    `,
    front: (f) => `
      <path d="M46 44 Q46 16 66 14 Q88 16 88 44 L88 54 Q66 62 46 54 Z" fill="${f.helmet}" stroke="${INK}" stroke-width="2.8" stroke-linejoin="round" />
      <path d="M52 26 Q62 18 76 21" fill="none" stroke="#ffffff" stroke-width="2.6" opacity="0.22" stroke-linecap="round" />
      <path d="M46 50 Q66 58 88 50" fill="none" stroke="${f.helmetDark}" stroke-width="3" />
      <path d="M79 22 Q86 30 86 42" fill="none" stroke="${f.helmetDark}" stroke-width="2.6" opacity="0.8" />
      <path d="M66 14 L66 6 L74 2" fill="none" stroke="${f.helmetDark}" stroke-width="3" />
      <circle cx="74" cy="2" r="2.2" fill="${f.accent}" />
    `,
    gear: (f) => `
      <rect x="52" y="38" width="33" height="9" rx="3" fill="${f.accent}" stroke="${INK}" stroke-width="2" opacity="0.95" />
      <rect x="56" y="40.5" width="12" height="4" rx="2" fill="#ffffff" opacity="0.6" />
      <path d="M46 58 L58 58 M76 58 L88 58" stroke="${INK}" stroke-width="2.5" />
      <path d="M54 32 L58 36 M60 30 L63 34" stroke="#ffffff" stroke-width="1.2" opacity="0.2" />
    `,
  },
};

function legsMarkup(f) {
  return `
    <g class="fig-leg fig-leg--back" style="transform-origin: 52px 108px">
      <path d="M52 108 L44 138 L38 164" fill="none" stroke="${f.jacketDark}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M48 110 L41 138 L35 162" fill="none" stroke="#000000" stroke-width="5" stroke-linecap="round" opacity="0.32" />
      <path d="M55 110 L48 138 L43 161" fill="none" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" opacity="0.12" />
      <path d="M50 118 L46 132" fill="none" stroke="${INK}" stroke-width="1.4" opacity="0.3" />
      <ellipse cx="43.5" cy="138" rx="6.4" ry="7.4" fill="${f.jacketDark}" stroke="${INK}" stroke-width="2" transform="rotate(12 43.5 138)" />
      <path d="M40 135 Q43.5 132.6 47 135.4" fill="none" stroke="${f.accent}" stroke-width="1.4" opacity="0.65" />
      <path d="M27 161 H50 Q53 161 53 165 V169 Q53 172 50 172 H27 Q24 172 24 168.6 V164.4 Q24 161 27 161 Z" fill="${f.jacketDark}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" />
      <path d="M26 167.6 H52" stroke="${f.accent}" stroke-width="1.7" opacity="0.55" />
      <path d="M26 170.4 H51" stroke="#000000" stroke-width="2.2" opacity="0.5" />
      <path d="M29 163.4 H47" stroke="#ffffff" stroke-width="1.2" opacity="0.14" />
    </g>

    <g class="fig-arm fig-arm--back" style="transform-origin: 46px 72px">
      <path d="M46 72 Q36 86 42 100" fill="none" stroke="${f.jacketDark}" stroke-width="12" stroke-linecap="round" />
      <path d="M44 76 Q37.6 86 40.6 96" fill="none" stroke="#000000" stroke-width="4" stroke-linecap="round" opacity="0.3" />
      <path d="M46 72 Q38 84 42 94" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.1" stroke-linecap="round" />
      <path d="M40.4 91.6 Q37.4 95 38.6 99" fill="none" stroke="${f.accent}" stroke-width="2.2" opacity="0.6" />
      <circle cx="43" cy="103" r="7.5" fill="${f.skinShade}" stroke="${INK}" stroke-width="2.5" />
      <path d="M39.4 100.4 Q43 98.8 46.6 100.8" fill="none" stroke="${INK}" stroke-width="1.4" opacity="0.45" />
      <path d="M38.6 105.2 Q43 107.4 47.6 105.2" fill="none" stroke="${INK}" stroke-width="1.4" opacity="0.3" />
    </g>
  `;
}

function torsoMarkup(f) {
  return `
    <g class="fig-torso" style="transform-origin: 58px 110px">
      <path d="M38 70 Q42 58 56 56 L78 56 Q90 60 86 76 L80 112 L48 112 Q38 94 38 70 Z" fill="${f.jacket}" stroke="${INK}" stroke-width="3" stroke-linejoin="round" />
      <path d="M38 70 Q42 58 56 56 L62 56 L56 112 L48 112 Q38 94 38 70 Z" fill="#000000" opacity="0.26" />
      <path d="M74 60 Q82 66 80 80 L77 100 L71 101 L75 74 Z" fill="${f.jacketDark}" opacity="0.6" />
      <path d="M70 62 Q80 66 79 80" fill="none" stroke="#ffffff" stroke-width="4" opacity="0.12" stroke-linecap="round" />
      <path d="M45 66 Q47 76 45 88" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.07" />

      <path d="M56 56 L66 74 L78 56 L84 64 L68 86 L52 64 Z" fill="${f.jacketDark}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" />
      <path d="M60 60 L66 74 L72 60" fill="none" stroke="${f.accent}" stroke-width="1.4" opacity="0.45" />
      <path d="M56 56 L52 64 L58 70" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.16" />

      <circle cx="45.5" cy="79" r="4.6" fill="${f.jacketDark}" stroke="${INK}" stroke-width="1.8" />
      <path d="M43.2 79 H47.8 M45.5 76.7 V81.3" stroke="${f.accent}" stroke-width="1.3" opacity="0.9" />

      <path d="M66 88 L62 110" stroke="${f.accent}" stroke-width="1.2" opacity="0.4" />
      <path d="M80 88 L85 74" fill="none" stroke="${f.accent}" stroke-width="2.5" opacity="0.8" />
      <path d="M44 92 L48 80" fill="none" stroke="${f.accent}" stroke-width="1.6" opacity="0.35" />

      <rect x="47" y="105" width="35" height="8" rx="2" fill="${f.jacketDark}" stroke="${INK}" stroke-width="2" />
      <rect x="61" y="106.5" width="7" height="5" fill="${f.accent}" />
      <path d="M50 106.4 H58" stroke="#ffffff" stroke-width="1.2" opacity="0.24" />
      <path d="M72 108.6 H79" stroke="#ffffff" stroke-width="1.2" opacity="0.14" />
    </g>
  `;
}

function frontLegMarkup(f) {
  return `
    <g class="fig-leg fig-leg--front" style="transform-origin: 64px 108px">
      <path d="M64 108 L78 134 L86 162" fill="none" stroke="${f.jacket}" stroke-width="17" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M72 112 L82 132 L88 154" fill="none" stroke="#ffffff" stroke-width="4.4" stroke-linecap="round" opacity="0.14" />
      <path d="M66 116 L76 134 L82 152" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" opacity="0.14" />
      <path d="M77 132 L85 158" fill="none" stroke="${INK}" stroke-width="1.6" opacity="0.3" />
      <ellipse cx="78.5" cy="134" rx="7" ry="8" fill="${f.jacket}" stroke="${INK}" stroke-width="2" transform="rotate(-16 78.5 134)" />
      <path d="M74.4 131 Q78 128.4 82 131.4" fill="none" stroke="${f.accent}" stroke-width="1.5" opacity="0.75" />
      <path d="M74 158 H101 Q104 158 104 162 V166.6 Q104 170 101 170 H74 Q71 170 71 166.6 V162 Q71 158 74 158 Z" fill="${f.accent2}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" />
      <path d="M75 164.4 H102" stroke="${f.accent}" stroke-width="2" opacity="0.85" />
      <path d="M74 167.6 H102" stroke="#000000" stroke-width="2.4" opacity="0.5" />
      <path d="M77 160.6 H98" stroke="#ffffff" stroke-width="1.4" opacity="0.2" />
    </g>
  `;
}

function headMarkup(f, uid, art) {
  return `
    <g class="fig-head" style="transform-origin: 66px 60px">
      ${art.back ? art.back(f) : ""}

      <path d="M58 50 L58 64 Q66 69.4 74 64 L74 50 Z" fill="${f.skinShade}" stroke="${INK}" stroke-width="2" stroke-linejoin="round" />
      <path d="M58 50 L58 64 Q61.4 66.4 65.4 66.6 L65.4 50 Z" fill="#000000" opacity="0.18" />

      <path d="M48 42 Q49 24 66 24 Q84 25 85 43 Q85 58 72 63 Q55 62 48 42 Z" fill="${f.skin}" stroke="${INK}" stroke-width="3" stroke-linejoin="round" />
      <path d="M48 42 Q49 24 66 24 L66 63 Q55 62 48 42 Z" fill="${f.skinShade}" opacity="0.34" />
      <path d="M63 55.4 Q69 63 79.4 60.6 L74 64 Q66 64 59.6 59 Z" fill="${f.skinShade}" opacity="0.42" />
      <path d="M57 31 Q62 26 68 25.4" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.2" stroke-linecap="round" />
      <path d="M84 44 Q85 55 76 61" fill="none" stroke="url(#rim-f-${uid})" stroke-width="2.2" stroke-linecap="round" />

      <path d="M50 44 Q46 44 46 50 Q47 55 52 54" fill="${f.skin}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round" />
      <path d="M49 48 Q51 50 50 53" fill="none" stroke="${f.skinShade}" stroke-width="1.6" />
      <path d="M84 47 L87 50 L84 51" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round" />
      <path d="M72 58 Q78 60 82 56" fill="none" stroke="${INK}" stroke-width="1.2" opacity="0.3" />

      ${faceMarkup(f, uid)}

      <g class="fig-hair">
        ${art.front ? art.front(f) : ""}
      </g>
      ${art.gear ? art.gear(f) : ""}

      <path d="M50 39 Q57 33 67 32 Q78 31 84 37" fill="none" stroke="#000000" stroke-width="3.4" opacity="0.2" stroke-linecap="round" />

      <path class="fig-shine fig-shine--a" d="M53 33 Q61 24 74 23.5" fill="none" stroke="url(#shine-f-${uid})" stroke-width="6" stroke-linecap="round" />
      <path class="fig-shine fig-shine--b" d="M50 41 Q52 30 60 25" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />

      <g class="fig-sweat">
        <path d="M54 27.4 Q50 33.4 53.6 36.4 Q57.6 33.8 56.8 29.4 Z" fill="#bff0ff" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round" />
        <circle cx="54" cy="32" r="1" fill="#ffffff" opacity="0.85" />
      </g>

      <path d="M50 30 Q56 20 64 19" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.22" stroke-linecap="round" />
    </g>
  `;
}

function frontArmMarkup(f) {
  return `
    <g class="fig-arm fig-arm--front" style="transform-origin: 78px 74px">
      <path d="M78 74 Q90 84 86 96" fill="none" stroke="${f.jacket}" stroke-width="13" stroke-linecap="round" />
      <path d="M79 76 Q89 86 86 94" fill="none" stroke="#ffffff" stroke-width="3.5" opacity="0.14" stroke-linecap="round" />
      <path d="M84 78 Q89 86 87 93" fill="none" stroke="#000000" stroke-width="2.4" opacity="0.2" stroke-linecap="round" />
      <path d="M86.4 90.4 Q89.6 93 89.4 96.8" fill="none" stroke="${f.accent}" stroke-width="2.4" opacity="0.7" />
      <circle cx="86" cy="100" r="8.5" fill="${f.skin}" stroke="${INK}" stroke-width="2.6" />
      <path d="M82 96.6 H91 M82 99.6 H91 M83.4 102.6 H90" stroke="${INK}" stroke-width="1.5" opacity="0.4" />
      <path d="M80 104 Q86 107.4 92 104" fill="none" stroke="${f.accent}" stroke-width="1.8" opacity="0.6" />
      <path d="M82 93.6 Q86 92 90.4 94" fill="none" stroke="#ffffff" stroke-width="1.6" opacity="0.3" />
    </g>
  `;
}

export function fighterFigureMarkup(fighter) {
  const uid = fighter.id;
  const art = HAIR[fighter.id] || HAIR.ruka;
  const tempo = TEMPO[fighter.id] || 2.6;
  const blink = (uid.length * 0.63 + 0.8).toFixed(2);

  return `
    <svg class="fighter-figure" viewBox="0 0 120 180" role="presentation" focusable="false" style="--idle-dur: ${tempo}s; --blink-delay: ${blink}s">
      <defs>
        <radialGradient id="iris-f-${uid}" cx="50%" cy="32%" r="64%">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0.95" />
          <stop offset="0.4" stop-color="${fighter.eye}" />
          <stop offset="1" stop-color="${fighter.accent2}" />
        </radialGradient>
        <radialGradient id="aura-f-${uid}" cx="50%" cy="45%" r="55%">
          <stop offset="0" stop-color="${fighter.accent}" stop-opacity="0.3" />
          <stop offset="1" stop-color="${fighter.accent}" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="shine-f-${uid}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0" />
          <stop offset="0.5" stop-color="#ffffff" stop-opacity="0.95" />
          <stop offset="1" stop-color="#ffffff" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="rim-f-${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${fighter.accent}" stop-opacity="0" />
          <stop offset="0.45" stop-color="${fighter.accent}" stop-opacity="0.85" />
          <stop offset="1" stop-color="${fighter.accent}" stop-opacity="0" />
        </linearGradient>
      </defs>

      <ellipse class="fig-ground" cx="60" cy="168" rx="46" ry="14" fill="url(#aura-f-${uid})" />
      <circle class="fig-aura" cx="60" cy="104" r="50" fill="none" stroke="${fighter.accent}" stroke-width="2" stroke-dasharray="6 12" opacity="0" />

      <g class="fig-body" style="transform-origin: 60px 172px">
        ${legsMarkup(fighter)}
        ${torsoMarkup(fighter)}
        ${frontLegMarkup(fighter)}
        ${headMarkup(fighter, uid, art)}
        ${frontArmMarkup(fighter)}

        <circle class="fig-guard" cx="82" cy="84" r="32" fill="none" stroke="${fighter.accent}" stroke-width="2" stroke-dasharray="8 6" opacity="0" />
      </g>
    </svg>
  `;
}
