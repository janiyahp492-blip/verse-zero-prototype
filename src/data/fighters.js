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
      <path d="M2 202 L10 166 Q24 142 54 133 L106 133 Q136 142 150 166 L158 202 Z" fill="${f.jacket}" />
      <path d="M54 133 L80 158 L106 133 L115 149 L80 180 L45 149 Z" fill="${f.jacketDark}" />
      <path d="M54 133 L45 149 L66 170" fill="none" stroke-width="2.4" />
      <path d="M106 133 L115 149 L94 170" fill="none" stroke-width="2.4" />
    </g>
    <path d="M106 133 Q136 142 150 166 L158 202 L112 202 Z" fill="#000" opacity=".26" />
    <path d="M80 180 L80 202" stroke="${f.accent}" stroke-width="2" opacity=".55" />
    <path d="M14 168 Q30 146 52 138" fill="none" stroke="#ffffff" stroke-width="3" opacity=".14" />
    <path d="M148 168 Q132 146 110 138" fill="none" stroke="#ffffff" stroke-width="2" opacity=".08" />
    <path d="M64 166 L64 202 M96 166 L96 202" stroke="${INK}" stroke-width="1.3" opacity=".32" />
  `;
}

function headMarkup(f) {
  return `
    <path d="M68 112 L68 139 Q80 147 92 139 L92 112 Z" fill="${f.skinShade}" stroke="${INK}" stroke-width="2.5" />
    <path d="M80 117 L80 141" stroke="${INK}" stroke-width="1.2" opacity=".28" />
    <path d="M56 80 Q46 76 45 88 Q45 101 57 100" fill="${f.skin}" stroke="${INK}" stroke-width="2.6" />
    <path d="M104 80 Q114 76 115 88 Q115 101 103 100" fill="${f.skin}" stroke="${INK}" stroke-width="2.6" />
    <path d="M50 88 Q53 92 51 96" fill="none" stroke="${f.skinShade}" stroke-width="2" />
    <path d="M110 88 Q107 92 109 96" fill="none" stroke="${f.skinShade}" stroke-width="2" />
    <path d="M56 66 Q56 42 80 42 Q104 42 104 66 L104 92 Q104 113 80 122 Q56 113 56 92 Z" fill="${f.skin}" stroke="${INK}" stroke-width="3" stroke-linejoin="round" />
    <path d="M80 44 Q104 44 104 66 L104 92 Q104 113 80 122 Z" fill="${f.skinShade}" opacity=".36" />
    <path d="M56 66 Q56 42 80 42 Q91 42 98 49 Q84 52 74 66 Q65 79 64 93 Q56 85 56 66 Z" fill="#ffffff" opacity=".12" />
    <path d="M64 106 Q72 116 80 118 Q88 116 96 106" fill="none" stroke="${f.skinShade}" stroke-width="1.8" opacity=".5" />
  `;
}

function faceMarkup(f, uid) {
  return `
    <g stroke-linecap="round" stroke-linejoin="round">
      <path d="M61 72 Q70 65 79 70" fill="none" stroke="${INK}" stroke-width="3.6" />
      <path d="M99 72 Q90 65 81 70" fill="none" stroke="${INK}" stroke-width="3.6" />
      <path d="M61 88 Q68 77 78 85 Q70 95 61 88 Z" fill="#fbfdff" stroke="${INK}" stroke-width="2" />
      <path d="M99 88 Q92 77 82 85 Q90 95 99 88 Z" fill="#fbfdff" stroke="${INK}" stroke-width="2" />
      <ellipse cx="70" cy="87" rx="4.4" ry="5" fill="url(#iris-${uid})" stroke="${INK}" stroke-width="1.2" />
      <ellipse cx="90" cy="87" rx="4.4" ry="5" fill="url(#iris-${uid})" stroke="${INK}" stroke-width="1.2" />
      <circle cx="70" cy="88" r="1.5" fill="${INK}" stroke="none" />
      <circle cx="90" cy="88" r="1.5" fill="${INK}" stroke="none" />
      <circle cx="68" cy="84.4" r="1.9" fill="#ffffff" stroke="none" />
      <circle cx="88" cy="84.4" r="1.9" fill="#ffffff" stroke="none" />
      <circle cx="72.4" cy="90" r="0.9" fill="#ffffff" stroke="none" opacity=".85" />
      <circle cx="92.4" cy="90" r="0.9" fill="#ffffff" stroke="none" opacity=".85" />
      <path d="M60 87 Q67 74 79 84" fill="none" stroke="${INK}" stroke-width="3.2" />
      <path d="M100 87 Q93 74 81 84" fill="none" stroke="${INK}" stroke-width="3.2" />
      <path d="M77 83 L74 78 M83 83 L86 78" fill="none" stroke="${INK}" stroke-width="1.8" />
      <path d="M80 92 Q78 98 81 100" fill="none" stroke="${INK}" stroke-width="2" />
      <path d="M70 108 Q80 114 90 107" fill="none" stroke="${INK}" stroke-width="2.4" />
      <path d="M73 108 Q80 111 87 107" fill="none" stroke="${f.skinShade}" stroke-width="1.4" opacity=".8" />
    </g>
    <path d="M60 97 L67 95 M61 101 L68 99" stroke="${f.accent}" stroke-width="1.6" opacity=".32" />
    <path d="M100 97 L93 95 M99 101 L92 99" stroke="${f.accent}" stroke-width="1.6" opacity=".32" />
  `;
}

const ART = {
  ruka: {
    front: (f) => `
      <path d="M52 74 Q46 44 80 40 Q114 44 108 74 Q100 54 86 50 Q72 46 66 60 Q62 68 62 80 Q56 76 52 74 Z" fill="${f.hair}" stroke="${INK}" stroke-width="3" stroke-linejoin="round" />
      <path d="M52 64 Q46 86 52 108 L64 102 Q57 84 60 64 Z" fill="${f.hairDark}" stroke="${INK}" stroke-width="2.5" />
      <path d="M65 49 Q76 44 88 50" fill="none" stroke="#ffffff" stroke-width="3" opacity=".22" />
      <path d="M56 58 Q50 76 54 92" fill="none" stroke="${f.accent}" stroke-width="2.2" opacity=".55" />
      <path d="M98 46 Q110 54 108 76" stroke="${f.accent}" stroke-width="3" fill="none" opacity=".9" />
      <path d="M93 52 Q102 58 102 70" fill="none" stroke="#ffffff" stroke-width="2" opacity=".18" />
    `,
    extras: (f) => `
      <path d="M110 78 Q122 82 120 100" fill="none" stroke="#1b2430" stroke-width="6" stroke-linecap="round" />
      <rect x="112" y="96" width="11" height="15" rx="4" fill="${f.accent}" stroke="${INK}" stroke-width="2" />
      <path d="M112 104 Q102 110 96 104" fill="none" stroke="${f.accent}" stroke-width="2" />
      <path d="M56 150 L68 160" stroke="${f.accent}" stroke-width="2.5" />
      <path d="M118 126 L128 132" stroke="${f.accent}" stroke-width="2" opacity=".7" />
      <circle cx="124" cy="118" r="2" fill="${f.accent}" opacity=".8" />
    `,
  },
  vex: {
    back: (f) => `
      <path d="M94 48 Q126 40 140 70 Q150 96 136 124 Q140 92 122 80 Q112 64 96 60 Z" fill="${f.hairDark}" stroke="${INK}" stroke-width="3" stroke-linejoin="round" />
      <path d="M104 54 Q130 62 134 88" stroke="${f.hair}" stroke-width="4" fill="none" opacity=".85" />
      <path d="M112 74 Q128 84 130 104" stroke="#ffffff" stroke-width="2" fill="none" opacity=".18" />
    `,
    front: (f) => `
      <path d="M52 72 Q48 42 80 40 Q112 42 108 72 Q98 54 86 52 Q72 52 66 66 Q60 62 52 72 Z" fill="${f.hair}" stroke="${INK}" stroke-width="3" />
      <path d="M58 58 Q72 46 92 50" stroke="${f.hair}" stroke-width="4" fill="none" opacity=".55" />
      <path d="M62 52 Q74 45 88 47" stroke="#ffffff" stroke-width="2.6" fill="none" opacity=".26" />
      <path d="M86 52 Q102 60 106 80" stroke="${f.hairDark}" stroke-width="3" fill="none" opacity=".8" />
      <path d="M56 68 Q50 80 54 92" fill="none" stroke="${f.accent}" stroke-width="2" opacity=".5" />
      <path d="M104 62 Q110 76 106 92" fill="none" stroke="${f.accent}" stroke-width="2" opacity=".6" />
    `,
    extras: (f) => `
      <path d="M60 97 Q80 92 100 97 L96 116 Q80 123 64 116 Z" fill="#121820" stroke="${INK}" stroke-width="2.5" />
      <path d="M68 104 L92 104 M70 111 L90 111" stroke="${f.accent}" stroke-width="1.8" opacity=".9" />
      <path d="M104 136 L118 148 L104 160" fill="none" stroke="${f.accent}" stroke-width="2.5" />
      <path d="M50 150 L42 162" stroke="${INK}" stroke-width="3" />
      <path d="M42 152 L34 160" stroke="${f.accent}" stroke-width="2" opacity=".75" />
      <circle cx="126" cy="132" r="2.4" fill="${f.accent}" opacity=".85" />
    `,
  },
  talon: {
    front: (f) => `
      <path d="M66 50 L70 16 L78 42 L84 10 L92 42 L102 18 L104 52 Q86 38 66 50 Z" fill="${f.hair}" stroke="${INK}" stroke-width="3" stroke-linejoin="round" />
      <path d="M66 50 Q58 58 58 76" fill="none" stroke="${f.hairDark}" stroke-width="5" opacity=".8" />
      <path d="M94 58 Q104 66 104 80" fill="none" stroke="${f.hairDark}" stroke-width="5" opacity=".8" />
      <path d="M72 30 L76 46 M86 26 L88 44" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" opacity=".3" />
      <path d="M62 54 Q56 66 58 78" fill="none" stroke="${f.accent}" stroke-width="2" opacity=".5" />
    `,
    extras: (f) => `
      <g transform="rotate(-4 80 62)">
        <rect x="54" y="55" width="52" height="13" rx="6" fill="#161b22" stroke="${INK}" stroke-width="2.5" />
        <circle cx="67" cy="61.5" r="4.2" fill="${f.accent}" stroke="${INK}" stroke-width="1.5" />
        <circle cx="93" cy="61.5" r="4.2" fill="${f.accent}" stroke="${INK}" stroke-width="1.5" />
        <circle cx="65.4" cy="60" r="1.3" fill="#ffffff" opacity=".85" />
        <circle cx="91.4" cy="60" r="1.3" fill="#ffffff" opacity=".85" />
      </g>
      <path d="M96 80 L103 98" stroke="#7a2f2f" stroke-width="2.2" />
      <path d="M62 110 Q80 122 98 110 L96 120 Q80 128 64 120 Z" fill="${f.hairDark}" opacity=".85" />
      <path d="M104 138 L138 148 L148 178 L110 168 Z" fill="#22282f" stroke="${INK}" stroke-width="3" stroke-linejoin="round" />
      <path d="M112 146 L142 154" stroke="#ffffff" stroke-width="2" opacity=".16" />
      <circle cx="120" cy="152" r="2.6" fill="${f.accent}" />
      <circle cx="132" cy="160" r="2.6" fill="${f.accent}" />
      <path d="M46 154 L36 168" stroke="${f.accent}" stroke-width="2.4" opacity=".7" />
    `,
  },
  oracle: {
    front: (f) => `
      <path d="M40 134 Q28 72 60 42 Q80 26 100 42 Q134 74 120 134 L106 122 Q114 74 88 56 Q62 62 56 106 L56 124 Z" fill="${f.hood}" stroke="${INK}" stroke-width="3" stroke-linejoin="round" />
      <path d="M52 70 Q58 46 80 34 Q62 54 58 84 Z" fill="${f.hoodDark}" opacity=".8" />
      <path d="M58 74 Q80 62 102 74 L100 100 Q80 110 60 100 Z" fill="#0b0714" />
      <ellipse cx="70" cy="86" rx="5.5" ry="2.8" fill="${f.eye}" />
      <ellipse cx="90" cy="86" rx="5.5" ry="2.8" fill="${f.eye}" />
      <ellipse cx="70" cy="86" rx="2" ry="1.6" fill="#ffffff" />
      <ellipse cx="90" cy="86" rx="2" ry="1.6" fill="#ffffff" />
      <path d="M62 100 Q80 108 98 100 L94 118 Q80 124 66 118 Z" fill="${f.hoodDark}" stroke="${INK}" stroke-width="2.5" />
      <path d="M44 128 Q80 144 116 128" fill="none" stroke="${f.accent}" stroke-width="2" opacity=".7" />
      <path d="M62 108 L74 108 M86 108 L98 108" stroke="${f.accent}" stroke-width="1.6" opacity=".55" />
      <path d="M46 96 Q40 106 42 116" fill="none" stroke="${f.accent}" stroke-width="1.8" opacity=".5" />
      <path d="M116 92 Q124 102 122 114" fill="none" stroke="${f.accent}" stroke-width="1.8" opacity=".5" />
      <circle cx="124" cy="70" r="2.4" fill="${f.accent}" opacity=".7" />
      <circle cx="36" cy="84" r="1.8" fill="${f.accent}" opacity=".6" />
    `,
  },
  nix: {
    front: (f) => `
      <path d="M50 76 Q44 52 58 40 L64 24 L72 40 L80 22 L88 40 L96 28 L98 42 Q112 50 110 76 Q100 58 84 54 Q66 56 56 76 Z" fill="${f.hair}" stroke="${INK}" stroke-width="3" stroke-linejoin="round" />
      <path d="M56 54 Q46 48 44 38" stroke="${f.hair}" stroke-width="5" fill="none" />
      <path d="M96 46 Q110 40 114 30" stroke="${f.hair}" stroke-width="5" fill="none" />
      <path d="M62 42 L66 54 M78 32 L80 50" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" opacity=".28" />
      <path d="M56 62 Q50 74 52 88" fill="none" stroke="${f.accent}" stroke-width="2" opacity=".55" />
    `,
    extras: (f) => `
      <rect x="52" y="56" width="56" height="13" rx="6" fill="#241a12" stroke="${INK}" stroke-width="2.5" />
      <circle cx="68" cy="62.5" r="4.4" fill="${f.accent}" stroke="${INK}" stroke-width="1.5" />
      <circle cx="92" cy="62.5" r="4.4" fill="${f.accent}" stroke="${INK}" stroke-width="1.5" />
      <circle cx="66.4" cy="61" r="1.4" fill="#ffffff" opacity=".85" />
      <circle cx="90.4" cy="61" r="1.4" fill="#ffffff" opacity=".85" />
      <path d="M52 100 Q80 94 108 100 L110 114 Q80 126 50 114 Z" fill="${f.scarf}" stroke="${INK}" stroke-width="2.5" />
      <path d="M102 108 Q124 110 132 128 L118 132 Q110 118 98 116 Z" fill="${f.scarf}" stroke="${INK}" stroke-width="2.5" />
      <path d="M60 103 Q80 99 100 103" fill="none" stroke="#ffffff" stroke-width="1.8" opacity=".22" />
      <path d="M24 168 L42 160" stroke="${f.accent}" stroke-width="2.5" />
      <path d="M30 156 Q36 152 42 154" fill="none" stroke="${f.accent}" stroke-width="2" opacity=".6" />
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
      <path d="M58 42 Q80 34 102 42" fill="none" stroke="#ffffff" stroke-width="2.4" opacity=".22" />
      <rect x="58" y="74" width="44" height="11" rx="3" fill="${f.accent}" stroke="${INK}" stroke-width="2" opacity=".92" />
      <rect x="62" y="76.5" width="16" height="5" rx="2" fill="#ffffff" opacity=".55" />
      <path d="M62 104 L72 104 M77 104 L87 104 M92 104 L99 104" stroke="${INK}" stroke-width="3" />
      <path d="M80 36 L80 22 L90 16" fill="none" stroke="${f.helmetDark}" stroke-width="4" />
      <circle cx="90" cy="16" r="3" fill="${f.accent}" />
      <circle cx="46" cy="128" r="3" fill="${f.accent}" opacity=".8" />
      <circle cx="114" cy="128" r="3" fill="${f.accent}" opacity=".8" />
      <path d="M56 152 L72 164" stroke="#ffffff" stroke-width="2" opacity=".14" />
      <path d="M108 60 L114 70 L108 80" fill="none" stroke="${f.accent}" stroke-width="2" opacity=".6" />
    `,
  },
};

export function portraitMarkup(fighter, variant = "card") {
  const uid = `${fighter.id}-${variant}`;
  const art = ART[fighter.id] || {};
  const backdrop =
    variant === "duel"
      ? ""
      : `
        <rect width="160" height="200" fill="url(#sky-${uid})" />
        <g stroke="${fighter.accent}" stroke-width="1.2" opacity="0.22">
          <path d="M-12 34 L172 4" />
          <path d="M-12 54 L172 24" />
          <path d="M-12 74 L172 44" />
          <path d="M-12 150 L172 120" />
          <path d="M-12 172 L172 142" />
        </g>
        <rect width="160" height="200" fill="url(#dots-${uid})" opacity="0.12" />
      `;
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
        <radialGradient id="iris-${uid}" cx="50%" cy="34%" r="62%">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0.9" />
          <stop offset="0.38" stop-color="${fighter.eye}" />
          <stop offset="1" stop-color="${fighter.accent2}" />
        </radialGradient>
        <linearGradient id="rim-${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${fighter.accent}" stop-opacity="0" />
          <stop offset="0.5" stop-color="${fighter.accent}" stop-opacity="0.9" />
          <stop offset="1" stop-color="${fighter.accent}" stop-opacity="0" />
        </linearGradient>
        <pattern id="dots-${uid}" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="${fighter.accent}" opacity="0.5" />
        </pattern>
        <clipPath id="clip-${uid}"><rect width="160" height="200" /></clipPath>
      </defs>
      <g clip-path="url(#clip-${uid})">
        ${backdrop}
        ${variant === "duel" ? "" : `<circle cx="80" cy="68" r="88" fill="url(#halo-${uid})" />`}
        <g fill="${fighter.accent}" opacity="0.5">
          <circle cx="24" cy="30" r="1.5" />
          <circle cx="136" cy="46" r="1.1" />
          <circle cx="128" cy="152" r="1.2" />
          <circle cx="30" cy="128" r="1" />
          <circle cx="140" cy="100" r="1.4" />
        </g>
        ${art.back ? art.back(fighter) : ""}
        ${bodyMarkup(fighter)}
        ${headMarkup(fighter)}
        ${faceMarkup(fighter, uid)}
        ${art.front ? art.front(fighter) : ""}
        ${art.extras ? art.extras(fighter) : ""}
        <path d="M56 54 Q50 82 58 106" stroke="url(#rim-${uid})" stroke-width="3" fill="none" opacity="0.7" />
        <path d="M108 148 Q120 156 124 172" stroke="url(#rim-${uid})" stroke-width="2.5" fill="none" opacity="0.45" />
      </g>
    </svg>
  `;
}

export function getFighter(id) {
  return FIGHTERS.find((fighter) => fighter.id === id) || null;
}
