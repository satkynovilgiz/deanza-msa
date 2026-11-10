// Eight-pointed star (Rub el Hizb) built from two overlapping squares.
export function StarMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="round">
        <rect x="22" y="22" width="56" height="56" />
        <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" />
      </g>
      <circle cx="50" cy="50" r="9" fill="currentColor" />
    </svg>
  );
}

/** Repeating girih-style tile used behind officer avatars. */
export function StarTile() {
  return (
    <svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="tile" width="40" height="40" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#f3e3c2" strokeWidth="1.2">
            <rect x="10" y="10" width="20" height="20" />
            <rect x="10" y="10" width="20" height="20" transform="rotate(45 20 20)" />
          </g>
        </pattern>
      </defs>
      <rect width="120" height="120" fill="url(#tile)" />
    </svg>
  );
}

/** Large layered star rosette for the hero. */
export function HeroRosette() {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true">
      <g className="spin-slow" style={{ transformBox: "fill-box" }}>
        {petals.map((a) => (
          <ellipse key={a} cx="200" cy="95" rx="22" ry="80" transform={`rotate(${a} 200 200)`}
            fill="none" stroke="var(--jade)" strokeOpacity=".35" strokeWidth="1.2" />
        ))}
      </g>
      <g className="spin-rev" style={{ transformBox: "fill-box" }}>
        <rect x="95" y="95" width="210" height="210" fill="var(--jade-soft)" stroke="var(--jade)" strokeWidth="2" />
        <rect x="95" y="95" width="210" height="210" transform="rotate(45 200 200)" fill="var(--jade-soft)" stroke="var(--jade)" strokeWidth="2" />
      </g>
      <g className="spin-slow" style={{ transformBox: "fill-box" }}>
        <rect x="145" y="145" width="110" height="110" fill="var(--jade)" />
        <rect x="145" y="145" width="110" height="110" transform="rotate(45 200 200)" fill="var(--jade)" />
      </g>
      <circle cx="200" cy="200" r="34" fill="var(--paper)" stroke="var(--brass)" strokeWidth="3" />
      <path d="M212 184a20 20 0 1 0 0 32a16 16 0 1 1 0-32z" fill="var(--brass)" />
    </svg>
  );
}
