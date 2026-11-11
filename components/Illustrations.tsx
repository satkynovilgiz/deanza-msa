// Original flat illustrations in the site palette. Animated parts use classes from globals.css
// (tw = twinkle, sway, flicker, steam, beam, beat, float-up, shoot).

const HAIR = "#2a1d14";

type PersonProps = { x: number; y: number; s?: number; body: string; skin?: string; hijab?: string; back?: boolean; kufi?: boolean };

/** Simple faceless figure. `hijab` draws a headscarf; `back` shows the figure from behind. */
export function Person({ x, y, s = 1, body, skin = "#c68b59", hijab, back, kufi }: PersonProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-17 0 Q-18 -30 0 -33 Q18 -30 17 0 Z" fill={hijab ?? body} />
      {hijab ? (
        <>
          <path d="M-14 -40 Q-14 -61 0 -61 Q14 -61 14 -40 Q14 -27 0 -27 Q-14 -27 -14 -40Z" fill={hijab} />
          {!back && <ellipse cx="0" cy="-44" rx="7.5" ry="8.5" fill={skin} />}
        </>
      ) : (
        <>
          <circle cx="0" cy="-44" r="10" fill={back ? HAIR : skin} />
          {!back && <path d="M-10 -46 Q-9 -56 0 -56 Q9 -56 10 -46 Q5 -51 0 -51 Q-5 -51 -10 -46Z" fill={HAIR} />}
          {kufi && <path d="M-9.5 -48 Q-9 -57 0 -57 Q9 -57 9.5 -48Z" fill="#f4f1e8" />}
        </>
      )}
    </g>
  );
}

export function Crescent({ x, y, r = 16, fill = "#f3e3c2", glow = true }: { x: number; y: number; r?: number; fill?: string; glow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {glow && <circle r={r * 2.2} fill={fill} opacity=".12" className="flicker" />}
      <path d={`M${r * 0.5} ${-r * 0.866} A${r} ${r} 0 1 0 ${r * 0.5} ${r * 0.866} A${r * 0.92} ${r * 0.92} 0 0 1 ${r * 0.5} ${-r * 0.866}Z`} fill={fill} />
    </g>
  );
}

export function Lantern({ x, y, s = 1, len = 30, d = 0 }: { x: number; y: number; s?: number; len?: number; d?: number }) {
  return (
    <g transform={`translate(${x} ${y - len})`}>
      <g className="sway" style={{ animationDelay: `${d}s` }}>
        <line x1="0" y1="0" x2="0" y2={len} stroke="#b7832a" strokeWidth="1.5" />
        <g transform={`translate(0 ${len}) scale(${s})`}>
          <circle cy="22" r="24" fill="#ffd98a" opacity=".22" className="flicker" style={{ animationDelay: `${d}s` }} />
          <path d="M-6 0 H6 L11 8 H-11Z" fill="#b7832a" />
          <rect x="-10" y="8" width="20" height="27" rx="5" fill="#ffd98a" stroke="#b7832a" strokeWidth="2" />
          <path d="M-3.5 9 V34 M3.5 9 V34" stroke="#b7832a" strokeWidth="1.2" />
          <path d="M-10 35 H10 L0 45Z" fill="#b7832a" />
        </g>
      </g>
    </g>
  );
}

function Stars({ pts, fill = "#f3e3c2" }: { pts: [number, number, number][]; fill?: string }) {
  return (
    <g fill={fill}>
      {pts.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} className="tw" style={{ animationDelay: `${(i * 0.37) % 3}s` }} />
      ))}
    </g>
  );
}

const STARS: [number, number, number][] = [
  [24, 30, 1.4], [70, 18, 1], [110, 52, 1.6], [150, 22, 1.1], [196, 40, 1.4], [232, 14, 1], [268, 60, 1.2],
  [300, 26, 1.6], [352, 70, 1], [378, 30, 1.3], [44, 80, 1], [130, 92, 1.2], [214, 84, 1], [330, 100, 1.4], [90, 120, 1],
];

function Skyline({ fill, y = 210 }: { fill: string; y?: number }) {
  // Domes, minarets and campus blocks along one baseline.
  return (
    <g fill={fill} transform={`translate(0 ${y})`}>
      <rect x="0" y="20" width="400" height="200" />
      <rect x="10" y="-6" width="46" height="30" />
      <rect x="64" y="-60" width="10" height="84" /><path d="M62 -60 L69 -78 L76 -60Z" /><circle cx="69" cy="-80" r="2.5" />
      <rect x="84" y="-10" width="70" height="34" /><path d="M90 -10 A29 29 0 0 1 148 -10Z" /><rect x="117" y="-48" width="4" height="12" />
      <rect x="164" y="-24" width="36" height="48" /><rect x="206" y="4" width="54" height="20" />
      <rect x="268" y="-44" width="9" height="68" /><path d="M266 -44 L272.5 -60 L279 -44Z" />
      <rect x="286" y="-2" width="62" height="26" /><path d="M292 -2 A25 25 0 0 1 342 -2Z" />
      <circle cx="372" cy="0" r="16" /><rect x="368" y="8" width="8" height="16" />
      <circle cx="24" cy="-8" r="12" />
    </g>
  );
}

/* ---------------- Gallery scenes (viewBox 400x300) ---------------- */

export function NightScene() {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration: campus skyline at night under a crescent moon">
      <defs>
        <linearGradient id="sky-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#071310" /><stop offset=".6" stopColor="#0f4a3b" /><stop offset="1" stopColor="#17735c" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sky-night)" />
      <Stars pts={STARS} />
      <line x1="40" y1="40" x2="90" y2="62" stroke="#f3e3c2" strokeWidth="1.6" strokeLinecap="round" className="shoot" />
      <Crescent x={300} y={78} r={30} />
      <path d="M-10 40 Q100 110 200 70 T410 60" fill="none" stroke="#b7832a" strokeWidth="1.2" opacity=".7" />
      <Lantern x={60} y={92} s={0.7} len={20} />
      <Lantern x={150} y={86} s={0.8} len={26} d={0.6} />
      <Lantern x={240} y={72} s={0.7} len={18} d={1.1} />
      <Lantern x={355} y={66} s={0.7} len={18} d={0.3} />
      <Skyline fill="#0b2a22" y={222} />
      <g fill="#ffd98a">
        {[[30, 222], [44, 222], [100, 222], [132, 222], [176, 210], [188, 210], [176, 226], [222, 240], [300, 232], [326, 232]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="6" height="8" rx="1" className="tw" style={{ animationDelay: `${i * 0.5}s`, animationDuration: "5s" }} />
        ))}
      </g>
      <g fill="#071a14">
        <circle cx="20" cy="280" r="26" /><circle cx="48" cy="290" r="20" /><circle cx="370" cy="284" r="28" />
        <rect x="0" y="282" width="400" height="20" />
      </g>
    </svg>
  );
}

export function IftarScene() {
  const people: Omit<PersonProps, "y">[] = [
    { x: 58, body: "#17735c", skin: "#8d5524", hijab: "#b7832a" },
    { x: 116, body: "#f3e3c2", skin: "#e0ac69", kufi: true },
    { x: 174, body: "#0f4a3b", skin: "#c68b59", hijab: "#6fd4b3" },
    { x: 232, body: "#b7832a", skin: "#6b4226" },
    { x: 290, body: "#1f3b33", skin: "#f1c27d", hijab: "#dcefe6" },
    { x: 346, body: "#17735c", skin: "#c68b59", kufi: true },
  ];
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration: students sharing an iftar meal at sunset">
      <defs>
        <linearGradient id="sky-iftar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2440" /><stop offset=".45" stopColor="#c4604a" /><stop offset=".8" stopColor="#f0a25a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sky-iftar)" />
      <Stars pts={STARS.slice(0, 8).map(([x, y, r]) => [x, y * 0.7, r])} />
      <circle cx="200" cy="196" r="54" fill="#ffd28a" opacity=".9" className="sunset" />
      <Crescent x={334} y={46} r={14} />
      <Skyline fill="#3a2738" y={186} />
      <Lantern x={84} y={46} s={0.75} len={34} />
      <Lantern x={318} y={52} s={0.7} len={40} d={0.8} />
      {people.map((p, i) => <Person key={i} {...p} y={236} s={1.08} />)}
      <rect x="14" y="224" width="372" height="13" rx="4" fill="#f3e3c2" />
      <rect x="14" y="237" width="372" height="70" fill="#17735c" />
      <path d="M14 250 H386 M14 262 H386" stroke="#b7832a" strokeWidth="2" strokeDasharray="10 6" />
      {people.map((p, i) => (
        <g key={i}>
          <ellipse cx={p.x} cy={228} rx="15" ry="3.6" fill="#ffffff" />
          <ellipse cx={p.x - 3} cy={226} rx="3" ry="1.8" fill="#6b3b1f" /><ellipse cx={p.x + 4} cy={226.5} rx="3" ry="1.8" fill="#6b3b1f" />
          <rect x={p.x + 17} y={214} width="6" height="12" rx="1.5" fill="#dcefe6" opacity=".85" />
        </g>
      ))}
    </svg>
  );
}

export function HalaqaScene() {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration: a study circle sitting together on a rug with tea">
      <rect width="400" height="300" fill="#1f3b33" />
      <rect y="196" width="400" height="104" fill="#2a4a40" />
      {/* arched window */}
      <path d="M150 170 V80 A50 50 0 0 1 250 80 V170Z" fill="#0c1f19" stroke="#b7832a" strokeWidth="4" />
      <Stars pts={[[170, 90, 1.3], [200, 70, 1.6], [228, 100, 1.1], [186, 130, 1], [220, 140, 1.3]]} />
      <Crescent x={214} y={92} r={10} glow={false} />
      {/* shelf */}
      <rect x="28" y="70" width="88" height="110" fill="#0f2a23" />
      {[[34, 78, "#b7832a"], [44, 82, "#6fd4b3"], [54, 76, "#f3e3c2"], [66, 80, "#c4604a"], [78, 76, "#17735c"], [90, 84, "#dcefe6"]].map(([x, y, c], i) => (
        <rect key={i} x={x as number} y={y as number} width="9" height={(110 - (y as number)) / 1} fill={c as string} />
      ))}
      <rect x="28" y="110" width="88" height="4" fill="#b7832a" />
      {[[34, 120, "#dcefe6"], [46, 124, "#b7832a"], [58, 118, "#17735c"], [70, 122, "#f3e3c2"]].map(([x, y, c], i) => (
        <rect key={i} x={x as number} y={y as number} width="10" height={176 - (y as number)} fill={c as string} />
      ))}
      {/* lamp */}
      <path d="M318 190 V110" stroke="#b7832a" strokeWidth="3" />
      <path d="M300 112 H336 L326 88 H310Z" fill="#ffd98a" className="flicker" />
      <ellipse cx="318" cy="150" rx="60" ry="70" fill="#ffd98a" opacity=".07" />
      {/* rug + people */}
      <ellipse cx="200" cy="252" rx="176" ry="44" fill="#8a3b2e" />
      <ellipse cx="200" cy="252" rx="156" ry="34" fill="none" stroke="#f3d699" strokeWidth="2" strokeDasharray="6 5" />
      <Person x={120} y={238} s={0.82} body="#17735c" skin="#e0ac69" hijab="#dcefe6" />
      <Person x={200} y={232} s={0.82} body="#f3e3c2" skin="#8d5524" kufi />
      <Person x={280} y={238} s={0.82} body="#b7832a" skin="#c68b59" hijab="#0f4a3b" />
      <ellipse cx="200" cy="254" rx="34" ry="8" fill="#b7832a" />
      <path d="M190 250 q-2 -14 10 -14 q12 0 10 14Z" fill="#dcefe6" />
      <rect x="168" y="246" width="8" height="7" rx="2" fill="#f3e3c2" /><rect x="224" y="246" width="8" height="7" rx="2" fill="#f3e3c2" />
      <path className="steam" d="M200 232 q-5 -8 0 -16 q5 -8 0 -16" stroke="#f3e3c2" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Person x={70} y={300} s={1.15} body="#0f4a3b" skin="#6b4226" back />
      <Person x={330} y={300} s={1.15} body="#c4604a" hijab="#f3e3c2" back />
    </svg>
  );
}

export function JumuahScene() {
  const row = (y: number, s: number, xs: number[], start: number) =>
    xs.map((x, i) => {
      const k = (i + start) % 4;
      return k === 1
        ? <Person key={`${y}-${x}`} x={x} y={y} s={s} body="#f3e3c2" back kufi />
        : k === 3
          ? <Person key={`${y}-${x}`} x={x} y={y} s={s} body="#1f3b33" back />
          : <Person key={`${y}-${x}`} x={x} y={y} s={s} body={k === 0 ? "#dcefe6" : "#b7832a"} back />;
    });
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration: rows of worshippers at Friday prayer under arched windows">
      <rect width="400" height="300" fill="#0f4a3b" />
      {[60, 340].map((x) => (
        <g key={x}>
          <path d={`M${x - 26} 150 V70 A26 26 0 0 1 ${x + 26} 70 V150Z`} fill="#f3d699" opacity=".9" />
          <polygon points={`${x - 26},150 ${x + 26},150 ${x + (x < 200 ? 90 : -10)},300 ${x - (x < 200 ? 10 : 90)},300`} fill="#f3d699" className="beam" />
        </g>
      ))}
      <path d="M160 170 V90 A40 40 0 0 1 240 90 V170Z" fill="#0c1f19" stroke="#b7832a" strokeWidth="5" />
      <path d="M176 170 V100 A24 24 0 0 1 224 100 V170Z" fill="none" stroke="#b7832a" strokeWidth="2" />
      <g transform="translate(200 116) scale(.32)"><g fill="none" stroke="#f3d699" strokeWidth="6"><rect x="-28" y="-28" width="56" height="56" /><rect x="-28" y="-28" width="56" height="56" transform="rotate(45)" /></g></g>
      <rect y="170" width="400" height="130" fill="#17735c" />
      {[186, 222, 262].map((y) => <rect key={y} y={y} width="400" height="3" fill="#b7832a" opacity=".6" />)}
      {row(214, 0.75, [52, 100, 148, 196, 244, 292, 340], 0)}
      {row(256, 0.95, [40, 100, 160, 220, 280, 340], 1)}
      {row(304, 1.15, [70, 145, 220, 295, 370], 2)}
    </svg>
  );
}

export function StudyScene() {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration: friends studying late with laptops and tea">
      <rect width="400" height="300" fill="#10261f" />
      <rect x="250" y="34" width="120" height="110" rx="6" fill="#071310" stroke="#2a4a40" strokeWidth="6" />
      <path d="M310 34 V144 M250 89 H370" stroke="#2a4a40" strokeWidth="4" />
      <Stars pts={[[266, 50, 1.2], [292, 74, 1], [334, 54, 1.4], [356, 110, 1], [276, 120, 1.2], [340, 128, 1]]} />
      <Crescent x={344} y={74} r={11} glow={false} />
      <path d="M60 60 L90 130" stroke="#b7832a" strokeWidth="4" /><path d="M44 54 L82 48 L70 70Z" fill="#b7832a" />
      <polygon points="58,64 74,60 160,214 10,214" fill="#ffd98a" opacity=".1" className="flicker" />
      <Person x={110} y={214} s={1.15} body="#17735c" skin="#c68b59" hijab="#b7832a" />
      <Person x={200} y={206} s={1.15} body="#f3e3c2" skin="#8d5524" />
      <Person x={292} y={214} s={1.15} body="#b7832a" skin="#f1c27d" hijab="#dcefe6" />
      <rect x="0" y="206" width="400" height="16" fill="#8a5a2b" />
      <rect x="0" y="222" width="400" height="80" fill="#5c3a1c" />
      {[110, 200, 292].map((x, i) => (
        <g key={x}>
          <path d={`M${x - 26} 206 L${x - 22} 176 H${x + 22} L${x + 26} 206Z`} fill="#2a4a40" />
          <path d={`M${x - 19} 202 L${x - 16} 180 H${x + 16} L${x + 19} 202Z`} fill="#6fd4b3" className="tw" style={{ animationDuration: "6s", animationDelay: `${i}s` }} />
          <rect x={x - 32} y={204} width="64" height="4" rx="2" fill="#2a4a40" />
        </g>
      ))}
      <rect x="150" y="190" width="14" height="16" rx="3" fill="#f3e3c2" />
      <path className="steam" d="M157 186 q-4 -7 0 -14 q4 -7 0 -14" stroke="#f3e3c2" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="340" y="190" width="14" height="16" rx="3" fill="#dcefe6" />
      <path className="steam" style={{ animationDelay: "1.2s" }} d="M347 186 q-4 -7 0 -14 q4 -7 0 -14" stroke="#f3e3c2" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="20" y="186" width="44" height="8" fill="#c4604a" /><rect x="24" y="194" width="40" height="7" fill="#17735c" /><rect x="18" y="201" width="46" height="6" fill="#f3e3c2" />
    </svg>
  );
}

export function ServiceScene() {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration: volunteers packing boxes for a community drive">
      <defs>
        <linearGradient id="sky-service" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe3d4" /><stop offset="1" stopColor="#f3f6f2" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sky-service)" />
      <g transform="translate(330 64)">
        <g className="spin-slow">{Array.from({ length: 12 }, (_, i) => <rect key={i} x="-2" y="-46" width="4" height="12" rx="2" fill="#b7832a" transform={`rotate(${i * 30})`} />)}</g>
        <circle r="26" fill="#f3d699" />
      </g>
      <g fill="#17735c"><circle cx="50" cy="170" r="34" /><circle cx="84" cy="182" r="26" /><rect x="58" y="190" width="8" height="40" fill="#5c3a1c" /></g>
      <rect y="226" width="400" height="74" fill="#9fcfb8" />
      <rect x="150" y="196" width="220" height="12" rx="3" fill="#0f4a3b" />
      <rect x="160" y="208" width="8" height="40" fill="#0f4a3b" /><rect x="352" y="208" width="8" height="40" fill="#0f4a3b" />
      {[[178, 166], [222, 166], [266, 166], [200, 134], [244, 134], [310, 166]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <rect width="40" height="30" rx="2" fill="#c99a5b" stroke="#8a5a2b" strokeWidth="1.5" />
          <path d="M0 8 H40" stroke="#8a5a2b" strokeWidth="1.5" />
          <path d="M20 23 l-5 -5 a3.2 3.2 0 0 1 5 -4 a3.2 3.2 0 0 1 5 4z" fill="#c4604a" />
        </g>
      ))}
      <Person x={120} y={262} s={1.2} body="#17735c" skin="#8d5524" hijab="#b7832a" />
      <g transform="translate(120 222)"><rect x="-18" y="-6" width="36" height="26" rx="2" fill="#c99a5b" stroke="#8a5a2b" strokeWidth="1.5" /></g>
      <Person x={260} y={290} s={1.25} body="#f3e3c2" skin="#c68b59" kufi />
      <Person x={350} y={292} s={1.2} body="#b7832a" skin="#e0ac69" hijab="#0f4a3b" />
      {[[210, 120, 0], [240, 110, 1.3], [290, 124, 2.4]].map(([x, y, d], i) => (
        <path key={i} className="float-up" style={{ animationDelay: `${d}s` }} transform={`translate(${x} ${y})`} d="M0 6 l-6 -6 a4 4 0 0 1 6 -5 a4 4 0 0 1 6 5z" fill="#c4604a" />
      ))}
    </svg>
  );
}

/** Skyline + stars used as decoration behind the Join card. */
export function JoinSkyline() {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
      <Stars pts={STARS.slice(0, 11)} fill="#f3d699" />
      <Crescent x={330} y={70} r={22} fill="#f3d699" />
      <Skyline fill="#0f4a3b" y={236} />
    </svg>
  );
}

/** Lanterns that hang from the top of the hero. */
export function HeroLanterns() {
  return (
    <svg viewBox="0 0 300 200" aria-hidden="true">
      <path d="M0 4 Q150 34 300 4" fill="none" stroke="#b7832a" strokeWidth="1.2" opacity=".6" />
      <Lantern x={22} y={70} s={0.75} len={62} />
      <Lantern x={58} y={44} s={0.6} len={30} d={0.7} />
      <Lantern x={244} y={44} s={0.6} len={30} d={1.3} />
      <Lantern x={280} y={74} s={0.75} len={66} d={0.4} />
    </svg>
  );
}

/* ---------------- Pillar illustrations (viewBox 120x120) ---------------- */

export function PillarArt({ kind }: { kind: "faith" | "community" | "service" }) {
  if (kind === "faith")
    return (
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="64" r="44" fill="var(--jade-soft)" />
        <Lantern x={60} y={40} s={1.3} len={30} />
        <g fill="var(--brass)"><circle cx="22" cy="30" r="2" className="tw" /><circle cx="98" cy="42" r="2.4" className="tw" style={{ animationDelay: "1s" }} /><circle cx="94" cy="96" r="1.8" className="tw" style={{ animationDelay: "2s" }} /></g>
      </svg>
    );
  if (kind === "community")
    return (
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="64" r="44" fill="var(--jade-soft)" />
        <ellipse cx="60" cy="96" rx="40" ry="7" fill="var(--brass)" opacity=".35" />
        {[[34, 0], [78, 1.4]].map(([x, d]) => (
          <g key={x}>
            <path d={`M${x - 14} 66 H${x + 14} L${x + 10} 92 H${x - 10}Z`} fill="var(--jade)" />
            <path d={`M${x + 13} 72 a7 7 0 0 1 0 12`} fill="none" stroke="var(--jade)" strokeWidth="3" />
            <path className="steam" style={{ animationDelay: `${d}s` }} d={`M${x} 60 q-5 -8 0 -16 q5 -8 0 -16`} stroke="var(--brass)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </g>
        ))}
        <g fill="#6b3b1f"><ellipse cx="56" cy="92" rx="4" ry="2.6" /><ellipse cx="64" cy="94" rx="4" ry="2.6" /></g>
      </svg>
    );
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="64" r="44" fill="var(--jade-soft)" />
      <path className="beat" d="M60 64 l-18 -18 a11 11 0 0 1 18 -14 a11 11 0 0 1 18 14z" fill="#c4604a" />
      <path d="M18 84 Q30 70 46 76 L60 84 L74 76 Q90 70 102 84 L92 100 H28Z" fill="var(--jade)" />
      <path d="M46 76 Q52 86 60 84 Q68 86 74 76" fill="none" stroke="var(--paper)" strokeWidth="2" />
    </svg>
  );
}

/* ---------------- Event icons (viewBox 48x48, currentColor) ---------------- */

export function EventIcon({ kind }: { kind: "jumuah" | "halaqa" | "iftar" | "heritage" | "bingo" | "games" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      {kind === "jumuah" && <g {...common}><path d="M10 40 V26 A14 12 0 0 1 38 26 V40Z" /><path d="M24 8 V13" /><path d="M6 40 H42" /><path d="M20 40 V32 a4 4 0 0 1 8 0 V40" /></g>}
      {kind === "halaqa" && <g {...common}><path d="M24 14 Q16 9 7 11 V36 Q16 34 24 39 Q32 34 41 36 V11 Q32 9 24 14Z" /><path d="M24 14 V39" /></g>}
      {kind === "iftar" && <g {...common}><path d="M30 8 A14 14 0 1 0 40 30 A11 11 0 0 1 30 8Z" /><path d="M8 40 H26" /><ellipse cx="17" cy="35" rx="6" ry="3.5" /></g>}
      {kind === "heritage" && <g {...common}><rect x="12" y="12" width="24" height="24" /><rect x="12" y="12" width="24" height="24" transform="rotate(45 24 24)" /><circle cx="24" cy="24" r="3" fill="currentColor" /></g>}
      {kind === "games" && <g {...common}><path d="M14 16 H34 a8 8 0 0 1 8 8 v6 a6 6 0 0 1 -10.5 4 L28 30 H20 l-3.5 4 A6 6 0 0 1 6 30 v-6 a8 8 0 0 1 8 -8Z" /><path d="M15 20 v6 M12 23 h6" /><circle cx="31" cy="21.5" r="1.6" fill="currentColor" /><circle cx="35" cy="25.5" r="1.6" fill="currentColor" /></g>}
      {kind === "bingo" && <g {...common}><rect x="8" y="8" width="32" height="32" rx="4" /><path d="M8 18.7 H40 M8 29.3 H40 M18.7 8 V40 M29.3 8 V40" /><circle cx="24" cy="24" r="3" fill="currentColor" /><circle cx="13.4" cy="13.4" r="2.4" fill="currentColor" /><circle cx="34.6" cy="34.6" r="2.4" fill="currentColor" /></g>}
    </svg>
  );
}

export const scenes = {
  night: NightScene,
  iftar: IftarScene,
  halaqa: HalaqaScene,
  jumuah: JumuahScene,
  study: StudyScene,
  service: ServiceScene,
};
export type SceneKey = keyof typeof scenes;
