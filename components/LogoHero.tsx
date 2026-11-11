// Animated hero art inspired by the De Anza MSA logo: a maroon crescent with gold lattice,
// a gold mosque, a ring of lettering, hanging stars and a soft domed skyline.
// Layers use --hx/--hy (set on .hero by <Motion />) for mouse parallax. All motion classes live in globals.css.

const MAROON = "#8f2b2f";

function Star5({ x, y, r, className, style }: { x: number; y: number; r: number; className?: string; style?: React.CSSProperties }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 ? r * 0.45 : r;
    return `${(x + rr * Math.cos(a)).toFixed(1)},${(y + rr * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return <polygon points={pts} className={className} style={style} />;
}

const HANGING: [number, number, number, number][] = [
  // x, string length, star radius, delay
  [330, 70, 11, 0], [362, 120, 9, 0.4], [394, 52, 12, 0.9], [424, 150, 10, 0.2], [452, 92, 8, 1.2], [132, 46, 8, 0.7], [104, 96, 9, 1.5],
];

const SPARKS: [number, number, number][] = [[250, 18, 0], [482, 250, 0.8], [250, 482, 1.6], [18, 250, 2.4], [414, 86, 1.2], [86, 414, 2]];

export default function LogoHero() {
  return (
    <svg className="logo-hero" viewBox="0 0 500 500" role="img" aria-label="Animated De Anza MSA emblem: a crescent moon with a golden mosque">
      <defs>
        <radialGradient id="lh-disc" cx="50%" cy="42%" r="60%">
          <stop offset="0" stopColor="#e3f3ed" />
          <stop offset=".7" stopColor="#b9ddd1" />
          <stop offset="1" stopColor="#9fcdbf" />
        </radialGradient>
        <radialGradient id="lh-glow">
          <stop offset="0" stopColor="#f3d699" stopOpacity=".55" />
          <stop offset="1" stopColor="#f3d699" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lh-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e2ae" />
          <stop offset=".45" stopColor="#d7ad5e" />
          <stop offset=".55" stopColor="#fff3cf">
            <animate attributeName="offset" values="-.2;1.2" dur="4.5s" repeatCount="indefinite" />
          </stop>
          <stop offset=".65" stopColor="#c9963f" />
          <stop offset="1" stopColor="#a8772a" />
        </linearGradient>
        <pattern id="lh-lattice" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
          <g fill="none" stroke="#e2bd72" strokeWidth="1.3" opacity=".75">
            <rect x="6" y="6" width="14" height="14" />
            <rect x="6" y="6" width="14" height="14" transform="rotate(45 13 13)" />
            <path d="M0 13H6M20 13H26M13 0V6M13 20V26" />
          </g>
        </pattern>
        <mask id="lh-crescent">
          <circle cx="232" cy="258" r="132" fill="#fff" />
          <circle cx="290" cy="226" r="112" fill="#000" />
        </mask>
        <mask id="lh-outer"><circle cx="232" cy="258" r="132" fill="#fff" /></mask>
        <clipPath id="lh-disc-clip"><circle cx="250" cy="250" r="214" /></clipPath>
        <path id="lh-text-arc" d="M250 250 m-196 0 a196 196 0 1 1 392 0 a196 196 0 1 1 -392 0" />
      </defs>

      {/* Disc */}
      <g className="lh-pop">
        <circle cx="250" cy="250" r="214" fill="url(#lh-disc)" />
        <g clipPath="url(#lh-disc-clip)">
          {/* Skyline */}
          <g className="lh-layer lh-l1" fill="#fff" opacity=".55">
            <path d="M30 470 V430 h22 v-26 a16 16 0 0 1 32 0 v26 h16 v-50 l7 -14 7 14 v50 h20 V410 a34 34 0 0 1 68 0 v20 h18 v-30 l6 -12 6 12 v30 h40 v-24 a26 26 0 0 1 52 0 v24 h22 v-56 l7 -14 7 14 v56 h18 v-22 a30 30 0 0 1 60 0 v22 h26 v40Z" />
          </g>
          <g fill="#fff" opacity=".35" className="lh-layer lh-l1">
            <circle cx="96" cy="380" r="2" /><circle cx="404" cy="372" r="2" /><circle cx="250" cy="352" r="1.6" />
          </g>
        </g>
      </g>

      {/* Ring + rotating lettering */}
      <circle className="lh-ring" cx="250" cy="250" r="228" fill="none" stroke="#fff" strokeWidth="2.4" pathLength={1} />
      <g className="lh-orbit">
        <text className="lh-letters" fontSize="14.5" letterSpacing="5.2" fill="var(--jade)">
          <textPath href="#lh-text-arc">DE ANZA MSA ✦ MUSLIM STUDENT ASSOCIATION ✦ DE ANZA COLLEGE ✦ CUPERTINO ✦</textPath>
        </text>
      </g>

      {/* Glow behind crescent */}
      <circle cx="240" cy="250" r="170" fill="url(#lh-glow)" className="lh-breathe" />

      {/* Crescent */}
      <g className="lh-layer lh-l2">
        <g className="lh-crescent">
          <g mask="url(#lh-crescent)">
            <circle cx="232" cy="258" r="132" fill={MAROON} />
            <rect x="90" y="120" width="290" height="290" fill="url(#lh-lattice)" />
            <circle cx="232" cy="258" r="132" fill="none" stroke="url(#lh-gold)" strokeWidth="12" />
          </g>
          <g mask="url(#lh-outer)">
            <circle cx="290" cy="226" r="112" fill="none" stroke="url(#lh-gold)" strokeWidth="7" />
          </g>
        </g>
      </g>

      {/* Mosque */}
      <g className="lh-layer lh-l3">
        <g className="lh-mosque" fill="url(#lh-gold)">
          <rect x="226" y="246" width="9" height="104" rx="2" />
          <path d="M224 248 L230.5 228 L237 248Z" /><circle cx="230.5" cy="224" r="3" />
          <rect x="365" y="246" width="9" height="104" rx="2" />
          <path d="M363 248 L369.5 228 L376 248Z" /><circle cx="369.5" cy="224" r="3" />
          <path d="M244 350 V312 a14 14 0 0 1 28 0 V350Z" />
          <path d="M328 350 V312 a14 14 0 0 1 28 0 V350Z" />
          <path d="M262 350 V292 Q262 246 300 232 Q338 246 338 292 V350Z" />
          <path d="M300 232 V212" stroke="url(#lh-gold)" strokeWidth="3" />
          <path d="M305 206 a7 7 0 1 1 -2 -9 a5.4 5.4 0 1 0 2 9Z" />
          <rect x="220" y="346" width="160" height="10" rx="2" />
          <g fill={MAROON} opacity=".55">
            <path d="M290 350 V326 a10 10 0 0 1 20 0 V350Z" />
            <path d="M252 334 a6 6 0 0 1 12 0 v8 h-12Z" /><path d="M336 334 a6 6 0 0 1 12 0 v8 h-12Z" />
          </g>
        </g>
      </g>

      {/* MSA lettering */}
      <text className="lh-msa" x="250" y="292" textAnchor="middle" fontSize="118" letterSpacing="4" fill="#fff" stroke="#fff" strokeWidth="1.2">
        <tspan className="lh-ch" style={{ animationDelay: "1.5s" }}>M</tspan>
        <tspan className="lh-ch" style={{ animationDelay: "1.7s" }}>S</tspan>
        <tspan className="lh-ch" style={{ animationDelay: "1.9s" }}>A</tspan>
      </text>

      {/* Hanging stars */}
      <g className="lh-layer lh-l4">
        {HANGING.map(([x, len, r, d], i) => (
          <g key={i} className="lh-hang" style={{ animationDelay: `${0.9 + i * 0.12}s` }}>
            <g className="sway" style={{ animationDelay: `${d}s`, animationDuration: `${3.6 + (i % 3)}s` }}>
              <line x1={x} y1={-4} x2={x} y2={len} stroke="#fff" strokeWidth="1.2" opacity=".85" />
              <Star5 x={x} y={len + r * 0.8} r={r} className="lh-star" style={{ animationDelay: `${d * 2}s` }} />
            </g>
          </g>
        ))}
      </g>

      {/* Orbiting sparkles */}
      <g className="lh-sparkles">
        {SPARKS.map(([x, y, d], i) => (
          <path key={i} transform={`translate(${x} ${y})`} d="M0 -7 L1.6 -1.6 L7 0 L1.6 1.6 L0 7 L-1.6 1.6 L-7 0 L-1.6 -1.6Z" fill="var(--brass)" className="tw" style={{ animationDelay: `${d}s` }} />
        ))}
      </g>
    </svg>
  );
}
