const INK = "#070a10";

export const FIGHTERS = [
  {
    id: "ruka",
    name: "Ruka",
    role: "Static courier",
    accent: "#5ff2ff",
    accent2: "#164a5e",
    skin: "#f1cdb0",
    skinShade: "#cf9f80",
    hair: "#33475f",
    hairDark: "#1b2634",
    eye: "#5ff2ff",
    jacket: "#122430",
    jacketDark: "#0a151d",
    bio: "Runs dead routes on foot. Has never lost a parcel, and never kept one.",
    stats: { power: 6, speed: 8, tech: 7 },
  },
  {
    id: "vex",
    name: "Vex",
    role: "Signal duelist",
    accent: "#ff4fa3",
    accent2: "#591034",
    skin: "#e3b090",
    skinShade: "#bf8563",
    hair: "#ff4fa3",
    hairDark: "#a02562",
    eye: "#ffd9ec",
    jacket: "#1c1124",
    jacketDark: "#0d0714",
    bio: "Fights in the gap between two heartbeats. Wins before the second one lands.",
    stats: { power: 6, speed: 10, tech: 9 },
  },
  {
    id: "talon",
    name: "Talon",
    role: "Breach specialist",
    accent: "#ffcf3f",
    accent2: "#5c3c05",
    skin: "#cf9166",
    skinShade: "#a56a45",
    hair: "#ffcf3f",
    hairDark: "#76540a",
    eye: "#ffb03a",
    jacket: "#2a2118",
    jacketDark: "#150f09",
    bio: "Opens sealed doors the loud way, then invoices the network for the damage.",
    stats: { power: 9, speed: 6, tech: 5 },
  },
  {
    id: "oracle",
    name: "Oracle",
    role: "Ghost protocol",
    accent: "#b98bff",
    accent2: "#321b5e",
    skin: "#cbb9e8",
    skinShade: "#a08cc4",
    hair: "#3a2a5e",
    hairDark: "#241a3d",
    eye: "#b98bff",
    jacket: "#1c1530",
    jacketDark: "#0d0a18",
    hood: "#2b2050",
    hoodDark: "#170f2e",
    bio: "Reads the wire like weather. Was deleted twice and came back both times.",
    stats: { power: 4, speed: 5, tech: 10 },
  },
  {
    id: "nix",
    name: "Nix",
    role: "Ash runner",
    accent: "#ff7a45",
    accent2: "#5c1f08",
    skin: "#e0a878",
    skinShade: "#b87e52",
    hair: "#ff7a45",
    hairDark: "#b34518",
    eye: "#ffd166",
    jacket: "#2b1710",
    jacketDark: "#150a06",
    scarf: "#c2491f",
    bio: "Burned out of three sectors and kept the scars as navigation.",
    stats: { power: 7, speed: 7, tech: 5 },
  },
  {
    id: "havoc",
    name: "Havoc-9",
    role: "Foundry unit",
    accent: "#8ff08a",
    accent2: "#1f4a1d",
    skin: "#4b5563",
    skinShade: "#2a3240",
    hair: "#5b6675",
    hairDark: "#2a3240",
    eye: "#8ff08a",
    jacket: "#323b47",
    jacketDark: "#1c222b",
    helmet: "#46515f",
    helmetDark: "#242c36",
    bio: "A loading dock that learned to walk. Still counts everything it breaks.",
    stats: { power: 10, speed: 3, tech: 4 },
  },
];

function bodyMarkup(f) {
  return `
    <g stroke="${INK}" stroke-width="3" stroke-linejoin="round">
      <path d="M4 200 L14 164 Q28 143 54 135 L106 135 Q132 143 146 164 L156 200 Z" fill="${f.jacket}" />
      <path d="M54 135 L80 154 L106 135 L114 151 L80 178 L46 151 Z" fill="${f.jacketDark}" />
    </g>
    <path d="M80 178 L80 200" stroke="${f.accent}" stroke-width="2" opacity=".7" />
    <path d="M22 164 L50 146" stroke="${f.accent}" stroke-width="3" opacity=".85" />
    <path d="M138 164 L110 146" stroke="${f.accent}" stroke-width="3" opacity=".85" />
    <path d="M60 164 L60 200 M100 164 L100 200" stroke="${INK}" stroke-width="1.5" opacity=".45" />
  `;
}

function headMarkup(f) {
  return `
    <path d="M68 112 L68 136 Q80 144 92 136 L92 112 Z" fill="${f.skinShade}" stroke="${INK}" stroke-width="2.5" />
    <path d="M56 66 Q56 42 80 42 Q104 42 104 66 L104 92 Q104 114 80 122 Q56 114 56 92 Z" fill="${f.skin}" stroke="${INK}" stroke-width="3" />
    <path d="M80 44 Q104 44 104 66 L104 92 Q104 114 80 122 Z" fill="${f.skinShade}" opacity=".4" />
    <path d="M56 82 Q46 78 46 90 Q46 102 58 100" fill="${f.skin}" stroke="${INK}" stroke-width="2.5" />
    <path d="M104 82 Q114 78 114 90 Q114 102 102 100" fill="${f.skin}" stroke="${INK}" stroke-width="2.5" />
  `;
}

function faceMarkup(f) {
  return `
    <g stroke="${INK}" stroke-linecap="round">
      <path d="M62 74 Q70 69 79 73" stroke-width="2.6" fill="none" />
      <path d="M98 74 Q90 69 81 73" stroke-width="2.6" fill="none" />
      <path d="M63 86 Q70 79 78 86 Q70 92 63 86 Z" fill="#f7fbff" stroke-width="2" />
      <path d="M97 86 Q90 79 82 86 Q90 92 97 86 Z" fill="#f7fbff" stroke-width="2" />
      <circle cx="70.5" cy="85.5" r="3.2" fill="${f.eye}" stroke-width="1" />
      <circle cx="89.5" cy="85.5" r="3.2" fill="${f.eye}" stroke-width="1" />
      <circle cx="70.5" cy="85.5" r="1.2" fill="${INK}" stroke="none" />
      <circle cx="89.5" cy="85.5" r="1.2" fill="${INK}" stroke="none" />
      <path d="M80 92 L77 100 L83 100" fill="none" stroke-width="2" />
      <path d="M72 108 Q80 112 88 108" fill="none" stroke-width="2.2" />
    </g>
  `;
}

const ART = {
  ruka: {
    front: (f) => `
      <path d="M52 74 Q46 44 80 40 Q114 44 108 74 Q100 54 86 50 Q72 46 66 60 Q62 68 62 80 Q56 76 52 74 Z" fill="${f.hair}" stroke="${INK}" stroke-width="3" stroke-linejoin="round" />
      <path d="M52 64 Q46 86 52 108 L64 102 Q57 84 60 64 Z" fill="${f.hairDark}" stroke="${INK}" stroke-width="2.5" />
      <path d="M98 46 Q110 54 108 76" stroke="${f.accent}" stroke-width="3" fill="none" opacity=".9" />
    `,
    extras: (f) => `
      <path d="M110 78 Q122 82 120 100" fill="none" stroke="#1b2430" stroke-width="6" stroke-linecap="round" />
      <rect x="112" y="96" width="11" height="15" rx="4" fill="${f.accent}" stroke="${INK}" stroke-width="2" />
      <path d="M112 104 Q102 110 96 104" fill="none" stroke="${f.accent}" stroke-width="2" />
      <path d="M56 150 L68 160" stroke="${f.accent}" stroke-width="2.5" />
    `,
  },
  vex: {
    back: (f) => `
      <path d="M94 48 Q126 40 140 70 Q150 96 136 124 Q140 92 122 80 Q112 64 96 60 Z" fill="${f.hairDark}" stroke="${INK}" stroke-width="3" stroke-linejoin="round" />
      <path d="M104 54 Q130 62 134 88" stroke="${f.hair}" stroke-width="4" fill="none" opacity=".85" />
    `,
    front: (f) => `
      <path d="M52 72 Q48 42 80 40 Q112 42 108 72 Q98 54 86 52 Q72 52 66 66 Q60 62 52 72 Z" fill="${f.hair}" stroke="${INK}" stroke-width="3" />
      <path d="M58 58 Q72 46 92 50" stroke="${f.hair}" stroke-width="4" fill="none" opacity=".55" />
      <path d="M86 52 Q102 60 106 80" stroke="${f.hairDark}" stroke-width="3" fill="none" opacity=".8" />
    `,
    extras: (f) => `
      <path d="M60 97 Q80 92 100 97 L96 116 Q80 123 64 116 Z" fill="#121820" stroke="${INK}" stroke-width="2.5" />
      <path d="M68 104 L92 104 M70 111 L90 111" stroke="${f.accent}" stroke-width="1.8" opacity=".9" />
      <path d="M104 136 L118 148 L104 160" fill="none" stroke="${f.accent}" stroke-width="2.5" />
      <path d="M50 150 L42 162" stroke="${INK}" stroke-width="3" />
    `,
  },
  talon: {
    front: (f) => `
      <path d="M66 50 L70 16 L78 42 L84 10 L92 42 L102 18 L104 52 Q86 38 66 50 Z" fill="${f.hair}" stroke="${INK}" stroke-width="3" stroke-linejoin="round" />
      <path d="M66 50 Q58 58 58 76" fill="none" stroke="${f.hairDark}" stroke-width="5" opacity=".8" />
      <path d="M94 58 Q104 66 104 80" fill="none" stroke="${f.hairDark}" stroke-width="5" opacity=".8" />
    `,
    extras: (f) => `
      <g transform="rotate(-4 80 62)">
        <rect x="54" y="55" width="52" height="13" rx="6" fill="#161b22" stroke="${INK}" stroke-width="2.5" />
        <circle cx="67" cy="61.5" r="4.2" fill="${f.accent}" stroke="${INK}" stroke-width="1.5" />
        <circle cx="93" cy="61.5" r="4.2" fill="${f.accent}" stroke="${INK}" stroke-width="1.5" />
      </g>
      <path d="M96 80 L103 98" stroke="#7a2f2f" stroke-width="2.2" />
      <path d="M62 110 Q80 122 98 110 L96 120 Q80 128 64 120 Z" fill="${f.hairDark}" opacity=".85" />
      <path d="M104 138 L138 148 L148 178 L110 168 Z" fill="#22282f" stroke="${INK}" stroke-width="3" stroke-linejoin="round" />
      <circle cx="120" cy="152" r="2.6" fill="${f.accent}" />
      <circle cx="132" cy="160" r="2.6" fill="${f.accent}" />
    `,
  },
  oracle: {
    front: (f) => `
      <path d="M40 134 Q28 72 60 42 Q80 26 100 42 Q134 74 120 134 L106 122 Q114 74 88 56 Q62 62 56 106 L56 124 Z" fill="${f.hood}" stroke="${INK}" stroke-width="3" stroke-linejoin="round" />
      <path d="M58 74 Q80 62 102 74 L100 100 Q80 110 60 100 Z" fill="#0b0714" />
      <ellipse cx="70" cy="86" rx="5.5" ry="2.8" fill="${f.eye}" />
      <ellipse cx="90" cy="86" rx="5.5" ry="2.8" fill="${f.eye}" />
      <path d="M62 100 Q80 108 98 100 L94 118 Q80 124 66 118 Z" fill="${f.hoodDark}" stroke="${INK}" stroke-width="2.5" />
      <path d="M44 128 Q80 144 116 128" fill="none" stroke="${f.accent}" stroke-width="2" opacity=".7" />
    `,
  },
  nix: {
    front: (f) => `
      <path d="M50 76 Q44 52 58 40 L64 24 L72 40 L80 22 L88 40 L96 28 L98 42 Q112 50 110 76 Q100 58 84 54 Q66 56 56 76 Z" fill="${f.hair}" stroke="${INK}" stroke-width="3" stroke-linejoin="round" />
      <path d="M56 54 Q46 48 44 38" stroke="${f.hair}" stroke-width="5" fill="none" />
      <path d="M96 46 Q110 40 114 30" stroke="${f.hair}" stroke-width="5" fill="none" />
    `,
    extras: (f) => `
      <rect x="52" y="56" width="56" height="13" rx="6" fill="#241a12" stroke="${INK}" stroke-width="2.5" />
      <circle cx="68" cy="62.5" r="4.4" fill="${f.accent}" stroke="${INK}" stroke-width="1.5" />
      <circle cx="92" cy="62.5" r="4.4" fill="${f.accent}" stroke="${INK}" stroke-width="1.5" />
      <path d="M52 100 Q80 94 108 100 L110 114 Q80 126 50 114 Z" fill="${f.scarf}" stroke="${INK}" stroke-width="2.5" />
      <path d="M102 108 Q124 110 132 128 L118 132 Q110 118 98 116 Z" fill="${f.scarf}" stroke="${INK}" stroke-width="2.5" />
      <path d="M24 168 L42 160" stroke="${f.accent}" stroke-width="2.5" />
    `,
  },
  havoc: {
    front: (f) => `
      <g stroke="${INK}" stroke-width="3" stroke-linejoin="round">
        <path d="M52 68 Q52 36 80 36 Q108 36 108 68 L108 98 Q108 120 80 126 Q52 120 52 98 Z" fill="${f.helmet}" />
        <path d="M54 94 L106 94 L100 118 L60 118 Z" fill="${f.helmetDark}" />
        <path d="M4 200 L16 164 L52 148 L62 170 L34 184 L30 200 Z" fill="${f.helmet}" />
        <path d="M156 200 L144 164 L108 148 L98 170 L126 184 L130 200 Z" fill="${f.helmet}" />
      </g>
      <rect x="58" y="74" width="44" height="11" rx="3" fill="${f.accent}" stroke="${INK}" stroke-width="2" />
      <path d="M62 104 L72 104 M77 104 L87 104 M92 104 L99 104" stroke="${INK}" stroke-width="3" />
      <path d="M80 36 L80 22 L90 16" fill="none" stroke="${f.helmetDark}" stroke-width="4" />
      <circle cx="90" cy="16" r="3" fill="${f.accent}" />
      <circle cx="46" cy="128" r="3" fill="${f.accent}" opacity=".8" />
      <circle cx="114" cy="128" r="3" fill="${f.accent}" opacity=".8" />
    `,
  },
};

export function portraitMarkup(fighter, variant = "card") {
  const uid = `${fighter.id}-${variant}`;
  const art = ART[fighter.id] || {};
  return `
    <svg class="portrait" viewBox="0 0 160 200" preserveAspectRatio="xMidYMid slice" role="presentation" focusable="false">
      <defs>
        <linearGradient id="sky-${uid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${fighter.accent}" stop-opacity="0.55" />
          <stop offset="0.55" stop-color="${fighter.accent2}" stop-opacity="0.4" />
          <stop offset="1" stop-color="#05070d" stop-opacity="0.98" />
        </linearGradient>
        <radialGradient id="halo-${uid}" cx="50%" cy="34%" r="62%">
          <stop offset="0" stop-color="${fighter.accent}" stop-opacity="0.4" />
          <stop offset="1" stop-color="${fighter.accent}" stop-opacity="0" />
        </radialGradient>
        <clipPath id="clip-${uid}"><rect width="160" height="200" /></clipPath>
      </defs>
      <g clip-path="url(#clip-${uid})">
        <rect width="160" height="200" fill="url(#sky-${uid})" />
        <g stroke="${fighter.accent}" stroke-width="1.2" opacity="0.22">
          <path d="M-12 34 L172 4" />
          <path d="M-12 54 L172 24" />
          <path d="M-12 74 L172 44" />
          <path d="M-12 150 L172 120" />
          <path d="M-12 172 L172 142" />
        </g>
        <circle cx="80" cy="68" r="88" fill="url(#halo-${uid})" />
        ${art.back ? art.back(fighter) : ""}
        ${bodyMarkup(fighter)}
        ${headMarkup(fighter)}
        ${faceMarkup(fighter)}
        ${art.front ? art.front(fighter) : ""}
        ${art.extras ? art.extras(fighter) : ""}
        <path d="M112 62 Q118 80 111 98" stroke="${fighter.accent}" stroke-width="2.5" fill="none" opacity=".75" />
      </g>
    </svg>
  `;
}

export function getFighter(id) {
  return FIGHTERS.find((fighter) => fighter.id === id) || null;
}
