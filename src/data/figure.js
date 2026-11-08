const INK = "#070a10";

function eyesMarkup(f, uid) {
  return `
    <g stroke-linecap="round" stroke-linejoin="round">
      <path d="M58 42 Q62 36 67 41 Q63 47 58 45 Z" fill="#fbfdff" stroke="${INK}" stroke-width="1.6" />
      <ellipse cx="63" cy="41.5" rx="2.6" ry="3.4" fill="url(#iris-f-${uid})" stroke="${INK}" stroke-width="1" />
      <circle cx="63" cy="41.8" r="1" fill="${INK}" stroke="none" />
      <circle cx="62" cy="39.8" r="1.1" fill="#ffffff" stroke="none" />
      <path d="M57 40 Q61 34 68 38" fill="none" stroke="${INK}" stroke-width="2.4" />
      <path d="M57 33 Q62 30 67 32" fill="none" stroke="${INK}" stroke-width="2.8" />
      <path d="M70 41 Q75 32 82 39 Q78 48 70 45 Z" fill="#fbfdff" stroke="${INK}" stroke-width="1.8" />
      <ellipse cx="76" cy="40" rx="3.6" ry="4.6" fill="url(#iris-f-${uid})" stroke="${INK}" stroke-width="1.1" />
      <circle cx="76" cy="40.4" r="1.3" fill="${INK}" stroke="none" />
      <circle cx="74.4" cy="37.4" r="1.6" fill="#ffffff" stroke="none" />
      <circle cx="77.6" cy="42.4" r="0.8" fill="#ffffff" stroke="none" opacity=".85" />
      <path d="M69 39 Q74 30 83 37" fill="none" stroke="${INK}" stroke-width="3" />
      <path d="M81 36 L84 32" fill="none" stroke="${INK}" stroke-width="1.6" />
      <path d="M68 31 Q75 26 83 30" fill="none" stroke="${INK}" stroke-width="3.2" />
    </g>
    <path d="M84 47 L87 50 L84 51" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round" />
    <path d="M76 56 Q80 58 83 55" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round" />
    <path d="M72 50 L77 48 M73 53 L78 51" stroke="${f.accent}" stroke-width="1.4" opacity=".35" stroke-linecap="round" />
  `;
}

const HAIR = {
  ruka: {
    back: (f) => `
      <path d="M50 40 Q44 22 66 18 Q90 20 88 44 L84 54 Q86 30 66 26 Q52 28 54 46 Z" fill="${f.hairDark}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" />
    `,
    front: (f) => `
      <path d="M47 42 Q46 20 66 18 Q88 20 88 42 Q82 28 70 26 Q58 26 54 40 Q51 46 47 42 Z" fill="${f.hair}" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round" />
      <path d="M53 30 Q62 21 76 23" fill="none" stroke="#ffffff" stroke-width="3" opacity=".34" stroke-linecap="round" />
      <path d="M50 40 Q52 30 58 26" fill="none" stroke="${f.accent}" stroke-width="2" opacity=".6" />
    `,
    gear: (f) => `
      <path d="M86 44 Q96 46 95 56" fill="none" stroke="#1b2430" stroke-width="4.5" stroke-linecap="round" />
      <rect x="92" y="54" width="8" height="10" rx="3" fill="${f.accent}" stroke="${INK}" stroke-width="2" />
      <path d="M92 58 Q86 62 82 58" fill="none" stroke="${f.accent}" stroke-width="1.8" />
    `,
  },
  vex: {
    back: (f) => `
      <path d="M54 24 Q28 26 20 56 Q12 84 28 112 Q18 80 36 54 Q44 40 58 34 Z" fill="${f.hairDark}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" />
      <path d="M34 52 Q22 76 30 100" fill="none" stroke="${f.hair}" stroke-width="3" opacity=".7" />
      <path d="M40 46 Q30 66 34 84" fill="none" stroke="#ffffff" stroke-width="1.8" opacity=".2" />
    `,
    front: (f) => `
      <path d="M47 40 Q48 20 66 18 Q86 20 88 40 Q80 28 68 27 Q58 28 54 40 Q50 44 47 40 Z" fill="${f.hair}" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round" />
      <path d="M52 29 Q62 21 74 23" fill="none" stroke="#ffffff" stroke-width="3.2" opacity=".32" stroke-linecap="round" />
      <path d="M82 28 Q88 34 88 42" fill="none" stroke="${f.hairDark}" stroke-width="3" />
    `,
    gear: (f) => `
      <path d="M62 52 Q72 60 83 52 L81 60 Q72 65 64 60 Z" fill="#121820" stroke="${INK}" stroke-width="2" stroke-linejoin="round" />
      <path d="M67 56 L76 56 M68 59 L75 59" stroke="${f.accent}" stroke-width="1.4" opacity=".9" />
    `,
  },
  talon: {
    back: (f) => `
      <path d="M50 40 Q46 20 66 16 Q88 20 88 42 L84 50 Q84 28 66 24 Q54 26 54 44 Z" fill="${f.hairDark}" stroke="${INK}" stroke-width="2.5" />
    `,
    front: (f) => `
      <path d="M47 40 L50 18 L58 30 L64 12 L71 30 L79 16 L84 32 L88 26 L88 42 Q80 28 68 26 Q56 28 52 42 Z" fill="${f.hair}" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round" />
      <path d="M55 28 L58 36 M66 22 L68 32 M78 24 L80 34" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" opacity=".3" />
    `,
    gear: (f) => `
      <g transform="rotate(-6 68 30)">
        <rect x="56" y="25" width="26" height="8" rx="4" fill="#161b22" stroke="${INK}" stroke-width="2" />
        <circle cx="62" cy="29" r="2.6" fill="${f.accent}" />
        <circle cx="76" cy="29" r="2.6" fill="${f.accent}" />
      </g>
    `,
  },
  oracle: {
    back: (f) => `
      <path d="M44 46 Q40 18 66 12 Q94 18 90 48 L84 40 Q86 22 66 20 Q48 22 50 42 Z" fill="${f.hoodDark}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" />
    `,
    front: (f) => `
      <path d="M42 52 Q40 18 66 14 Q94 18 92 54 L82 44 Q84 24 66 22 Q48 24 50 44 Z" fill="${f.hood}" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round" />
      <path d="M50 32 Q58 18 72 18" fill="none" stroke="#ffffff" stroke-width="2.6" opacity=".16" stroke-linecap="round" />
    `,
    gear: (f) => `
      <path d="M50 36 Q66 28 86 36 L84 52 Q66 60 52 52 Z" fill="#0b0714" stroke="${INK}" stroke-width="2" />
      <ellipse cx="62" cy="43" rx="4.4" ry="2.2" fill="${f.eye}" />
      <ellipse cx="77" cy="43" rx="4.8" ry="2.4" fill="${f.eye}" />
      <circle cx="62" cy="43" r="1.3" fill="#ffffff" />
      <circle cx="77" cy="43" r="1.4" fill="#ffffff" />
      <path d="M60 50 Q66 54 72 50" fill="none" stroke="${f.accent}" stroke-width="1.6" opacity=".55" />
    `,
  },
  nix: {
    back: (f) => `
      <path d="M50 40 Q42 18 66 14 Q92 18 90 44 L86 52 Q86 28 66 24 Q54 26 54 44 Z" fill="${f.hairDark}" stroke="${INK}" stroke-width="2.5" />
    `,
    front: (f) => `
      <path d="M47 42 L52 20 L58 32 L64 14 L72 32 L79 18 L84 34 L88 28 L88 44 Q80 28 68 26 Q56 28 52 44 Z" fill="${f.hair}" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round" />
      <path d="M56 26 L58 38 M68 20 L70 34" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" opacity=".3" />
      <path d="M50 40 Q52 30 58 26" fill="none" stroke="${f.accent}" stroke-width="1.8" opacity=".55" />
    `,
    gear: (f) => `
      <rect x="55" y="27" width="25" height="7" rx="3.5" fill="#241a12" stroke="${INK}" stroke-width="2" />
      <circle cx="61" cy="30.5" r="2.4" fill="${f.accent}" />
      <circle cx="74" cy="30.5" r="2.4" fill="${f.accent}" />
      <path d="M56 58 Q66 54 76 58 L72 68 Q64 72 58 66 Z" fill="${f.scarf}" stroke="${INK}" stroke-width="2" stroke-linejoin="round" />
      <path d="M56 62 Q44 64 36 76 L46 80 Q52 70 58 68 Z" fill="${f.scarf}" stroke="${INK}" stroke-width="2" stroke-linejoin="round" />
    `,
  },
  havoc: {
    back: (f) => `
      <path d="M48 40 Q46 16 66 14 Q88 16 88 42 L84 48 Q84 24 66 22 Q52 24 52 44 Z" fill="${f.helmetDark}" stroke="${INK}" stroke-width="2.5" />
    `,
    front: (f) => `
      <path d="M46 44 Q46 16 66 14 Q88 16 88 44 L88 54 Q66 62 46 54 Z" fill="${f.helmet}" stroke="${INK}" stroke-width="2.8" stroke-linejoin="round" />
      <path d="M52 26 Q62 18 76 21" fill="none" stroke="#ffffff" stroke-width="2.6" opacity=".22" stroke-linecap="round" />
      <path d="M46 50 Q66 58 88 50" fill="none" stroke="${f.helmetDark}" stroke-width="3" />
      <path d="M66 14 L66 6 L74 2" fill="none" stroke="${f.helmetDark}" stroke-width="3" />
      <circle cx="74" cy="2" r="2.2" fill="${f.accent}" />
    `,
    gear: (f) => `
      <rect x="52" y="38" width="33" height="9" rx="3" fill="${f.accent}" stroke="${INK}" stroke-width="2" opacity=".95" />
      <rect x="56" y="40.5" width="12" height="4" rx="2" fill="#ffffff" opacity=".6" />
      <path d="M46 58 L58 58 M76 58 L88 58" stroke="${INK}" stroke-width="2.5" />
    `,
  },
};

export function fighterFigureMarkup(fighter) {
  const uid = fighter.id;
  const art = HAIR[fighter.id] || HAIR.ruka;

  return `
    <svg class="fighter-figure" viewBox="0 0 120 180" role="presentation" focusable="false">
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
      </defs>

      <ellipse cx="60" cy="168" rx="46" ry="14" fill="url(#aura-f-${uid})" />

      <g class="fig-body" style="transform-origin: 60px 172px">
        <g class="fig-leg fig-leg--back" style="transform-origin: 52px 108px">
          <path d="M52 108 L44 138 L38 164" fill="none" stroke="${fighter.jacketDark}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M52 108 L44 138" fill="none" stroke="#ffffff" stroke-width="4" opacity=".1" stroke-linecap="round" />
          <path d="M51 112 L45 136" fill="none" stroke="${INK}" stroke-width="1.4" opacity=".35" />
          <rect x="26" y="160" width="24" height="13" rx="5" fill="${fighter.jacketDark}" stroke="${INK}" stroke-width="2.5" />
          <path d="M28 166 H48" stroke="${fighter.accent}" stroke-width="2" opacity=".55" />
        </g>

        <g class="fig-arm fig-arm--back" style="transform-origin: 46px 72px">
          <path d="M46 72 Q36 86 42 100" fill="none" stroke="${fighter.jacketDark}" stroke-width="12" stroke-linecap="round" />
          <path d="M46 72 Q38 84 42 94" fill="none" stroke="#ffffff" stroke-width="3" opacity=".1" stroke-linecap="round" />
          <circle cx="43" cy="103" r="7.5" fill="${fighter.skinShade}" stroke="${INK}" stroke-width="2.5" />
          <path d="M39 100 L48 100" stroke="${INK}" stroke-width="1.6" opacity=".45" />
        </g>

        <g class="fig-torso" style="transform-origin: 58px 110px">
          <path d="M38 70 Q42 58 56 56 L78 56 Q90 60 86 76 L80 112 L48 112 Q38 94 38 70 Z" fill="${fighter.jacket}" stroke="${INK}" stroke-width="3" stroke-linejoin="round" />
          <path d="M38 70 Q42 58 56 56 L62 56 L56 112 L48 112 Q38 94 38 70 Z" fill="#000000" opacity=".24" />
          <path d="M70 62 Q80 66 79 80" fill="none" stroke="#ffffff" stroke-width="4" opacity=".12" stroke-linecap="round" />
          <path d="M56 56 L66 74 L78 56 L84 64 L68 86 L52 64 Z" fill="${fighter.jacketDark}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" />
          <path d="M80 88 L85 74" fill="none" stroke="${fighter.accent}" stroke-width="2.5" opacity=".8" />
          <path d="M44 92 L48 80" fill="none" stroke="${fighter.accent}" stroke-width="1.6" opacity=".35" />
          <rect x="47" y="105" width="35" height="8" rx="2" fill="${fighter.jacketDark}" stroke="${INK}" stroke-width="2" />
          <rect x="61" y="106.5" width="7" height="5" fill="${fighter.accent}" />
        </g>

        <g class="fig-leg fig-leg--front" style="transform-origin: 64px 108px">
          <path d="M64 108 L78 134 L86 162" fill="none" stroke="${fighter.jacket}" stroke-width="17" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M64 108 L78 134" fill="none" stroke="#ffffff" stroke-width="4" opacity=".14" stroke-linecap="round" />
          <path d="M77 132 L85 158" fill="none" stroke="${INK}" stroke-width="1.6" opacity=".3" />
          <rect x="74" y="158" width="28" height="13" rx="5" fill="${fighter.accent2}" stroke="${INK}" stroke-width="2.5" />
          <path d="M78 164 H99" stroke="${fighter.accent}" stroke-width="2" opacity=".8" />
        </g>

        <rect x="58" y="52" width="14" height="12" fill="${fighter.skinShade}" stroke="${INK}" stroke-width="2" />

        <g class="fig-head" style="transform-origin: 66px 60px">
          ${art.back ? art.back(fighter) : ""}
          <path d="M48 42 Q49 24 66 24 Q84 25 85 43 Q85 58 72 63 Q55 62 48 42 Z" fill="${fighter.skin}" stroke="${INK}" stroke-width="3" stroke-linejoin="round" />
          <path d="M48 42 Q49 24 66 24 L66 63 Q55 62 48 42 Z" fill="${fighter.skinShade}" opacity=".32" />
          <path d="M50 44 Q46 44 46 50 Q47 55 52 54" fill="${fighter.skin}" stroke="${INK}" stroke-width="2.2" />
          <path d="M49 48 Q51 50 50 53" fill="none" stroke="${fighter.skinShade}" stroke-width="1.6" />
          <path d="M72 58 Q78 60 82 56" fill="none" stroke="${INK}" stroke-width="1.2" opacity=".3" />
          ${eyesMarkup(fighter, uid)}
          ${art.front ? art.front(fighter) : ""}
          ${art.gear ? art.gear(fighter) : ""}
          <path d="M50 30 Q56 20 64 19" fill="none" stroke="#ffffff" stroke-width="2" opacity=".22" stroke-linecap="round" />
        </g>

        <g class="fig-arm fig-arm--front" style="transform-origin: 78px 74px">
          <path d="M78 74 Q90 84 86 96" fill="none" stroke="${fighter.jacket}" stroke-width="13" stroke-linecap="round" />
          <path d="M79 76 Q89 86 86 94" fill="none" stroke="#ffffff" stroke-width="3.5" opacity=".14" stroke-linecap="round" />
          <circle cx="86" cy="100" r="8.5" fill="${fighter.skin}" stroke="${INK}" stroke-width="2.6" />
          <path d="M82 97 H91 M82 100 H91" stroke="${INK}" stroke-width="1.5" opacity=".4" />
          <path d="M80 104 Q86 107 92 104" fill="none" stroke="${fighter.accent}" stroke-width="1.8" opacity=".6" />
        </g>

        <circle class="fig-guard" cx="82" cy="84" r="32" fill="none" stroke="${fighter.accent}" stroke-width="2" stroke-dasharray="8 6" opacity="0" />
      </g>
    </svg>
  `;
}
