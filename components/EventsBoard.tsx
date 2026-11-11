"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { events as allEvents, INSTAGRAM, type Event } from "@/lib/data";
import { EventIcon } from "./Illustrations";

type Filter = "All" | "Weekly" | "Upcoming" | "Past";
const FILTERS: Filter[] = ["All", "Weekly", "Upcoming", "Past"];

/** Event with its tag recomputed from the clock: dated events flip to "Past" once they end. */
const withLiveTag = (e: Event, now: number | null): Event =>
  now !== null && e.end && e.tag !== "Weekly" && Date.parse(e.end) < now ? { ...e, tag: "Past", featured: false } : e;

const gcalLink = (e: Event) => {
  if (!e.start || !e.end) return null;
  const fmt = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: `${e.title} · De Anza MSA`,
    dates: `${fmt(e.start)}/${fmt(e.end)}`,
    details: `${e.blurb}\n\nUpdates: ${INSTAGRAM}`,
    location: e.where,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
};

function Countdown({ start, end, now }: { start: string; end?: string; now: number | null }) {
  if (now === null) return <div className="cd" aria-hidden="true">{["Days", "Hours", "Min", "Sec"].map((l) => <div key={l} className="cd-tile"><b>--</b><span>{l}</span></div>)}</div>;
  const s = Date.parse(start), e = end ? Date.parse(end) : s;
  if (now >= s && now < e) return <div className="cd-live"><span className="dot" />Happening now!</div>;
  const left = Math.max(0, s - now);
  const parts: [number, string][] = [
    [Math.floor(left / 86400000), "Days"],
    [Math.floor(left / 3600000) % 24, "Hours"],
    [Math.floor(left / 60000) % 60, "Min"],
    [Math.floor(left / 1000) % 60, "Sec"],
  ];
  return (
    <div className="cd" role="timer" aria-label={`Starts in ${parts[0][0]} days ${parts[1][0]} hours`}>
      {parts.map(([v, l]) => (
        <div key={l} className="cd-tile">
          <b key={v}>{String(v).padStart(2, "0")}</b>
          <span>{l}</span>
        </div>
      ))}
    </div>
  );
}

/** Floating game pieces behind the spotlight card. */
function GameArt() {
  const pip = (cx: number, cy: number) => <circle cx={cx} cy={cy} r="3.4" fill="#0c1f19" />;
  return (
    <svg className="game-art" viewBox="0 0 320 260" aria-hidden="true">
      <g className="ga ga1">
        <rect x="30" y="40" width="64" height="64" rx="14" fill="#f4fbf7" transform="rotate(-14 62 72)" />
        <g transform="rotate(-14 62 72)">{pip(48, 58)}{pip(62, 72)}{pip(76, 86)}</g>
      </g>
      <g className="ga ga2">
        <rect x="200" y="22" width="52" height="52" rx="12" fill="#f3d699" transform="rotate(18 226 48)" />
        <g transform="rotate(18 226 48)">{pip(214, 36)}{pip(238, 36)}{pip(214, 60)}{pip(238, 60)}</g>
      </g>
      <g className="ga ga3">
        <path d="M120 150 H200 a26 26 0 0 1 26 26 v14 a18 18 0 0 1 -32 11 l-12 -14 h-44 l-12 14 a18 18 0 0 1 -32 -11 v-14 a26 26 0 0 1 26 -26Z" fill="#6fd4b3" />
        <path d="M118 168 v18 M109 177 h18" stroke="#0c1f19" strokeWidth="5" strokeLinecap="round" />
        <circle cx="196" cy="170" r="5" fill="#0c1f19" /><circle cx="208" cy="182" r="5" fill="#0c1f19" />
      </g>
      <g className="ga ga4">
        <rect x="248" y="130" width="50" height="70" rx="8" fill="#f4fbf7" transform="rotate(12 273 165)" />
        <path transform="rotate(12 273 165)" d="M273 150 a14 14 0 1 0 8 26 a11 11 0 1 1 -8 -26Z" fill="#8f2b2f" />
      </g>
      <g className="ga ga5">
        <path d="M44 214 a14 14 0 1 1 22 0 l6 14 h-34Z" fill="#f3d699" />
        <rect x="34" y="226" width="42" height="9" rx="4" fill="#f3d699" />
      </g>
      {[[150, 40], [282, 96], [20, 150], [172, 236], [110, 100]].map(([x, y], i) => (
        <path key={i} className="tw" style={{ animationDelay: `${i * 0.6}s` }} transform={`translate(${x} ${y})`} d="M0 -6 L1.4 -1.4 L6 0 L1.4 1.4 L0 6 L-1.4 1.4 L-6 0 L-1.4 -1.4Z" fill="#f3d699" />
      ))}
    </svg>
  );
}

export default function EventsBoard() {
  const [now, setNow] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const tabsRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const list = useMemo(() => allEvents.map((e) => withLiveTag(e, now)), [now]);
  const spotlight = list.find((e) => e.featured && e.tag === "Upcoming" && e.start);
  const counts = useMemo(() => {
    const c: Record<Filter, number> = { All: list.length, Weekly: 0, Upcoming: 0, Past: 0 };
    list.forEach((e) => c[e.tag]++);
    return c;
  }, [list]);
  const order: Record<Event["tag"], number> = { Upcoming: 0, Weekly: 1, Past: 2 };
  const shown = list
    .filter((e) => filter === "All" || e.tag === filter)
    .sort((a, b) => order[a.tag] - order[b.tag]);

  // Slide the highlight pill under the active tab.
  useLayoutEffect(() => {
    const move = () => {
      const btn = tabsRef.current?.querySelector<HTMLButtonElement>(`[data-f="${filter}"]`);
      if (btn) setPill({ left: btn.offsetLeft, width: btn.offsetWidth });
    };
    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [filter]);

  const gcal = spotlight ? gcalLink(spotlight) : null;

  return (
    <div className="board">
      {spotlight && (
        <article className="spotlight reveal zoom">
          <GameArt />
          <div className="spot-body">
            <p className="spot-kicker"><span className="dot" />Next up · {spotlight.tile.join(" ")}</p>
            <h3 className="spot-title">{spotlight.title}</h3>
            {spotlight.collab && (
              <ul className="collab" aria-label="Hosted together by">
                {spotlight.collab.map((c, i) => (
                  <li key={c} style={{ animationDelay: `${0.3 + i * 0.12}s` }}>{c}{i < spotlight.collab!.length - 1 && <span aria-hidden="true">×</span>}</li>
                ))}
              </ul>
            )}
            <p className="spot-blurb">{spotlight.blurb}</p>
            <div className="spot-meta">
              <span><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="3" y="4" width="14" height="13" rx="3" /><path d="M3 8h14M7 2v4M13 2v4" /></svg>{spotlight.when}</span>
              <span><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 18s6-5.2 6-10a6 6 0 0 0-12 0c0 4.8 6 10 6 10Z" /><circle cx="10" cy="8" r="2.2" /></svg>{spotlight.where}</span>
            </div>
            <div className="spot-actions">
              {gcal && <a className="btn btn-gold btn-shine" href={gcal} target="_blank" rel="noreferrer">＋ Add to Google Calendar</a>}
              <a className="btn btn-glass" href={INSTAGRAM} target="_blank" rel="noreferrer">Details on Instagram ↗</a>
            </div>
          </div>
          <div className="spot-count">
            <p>{now !== null && Date.parse(spotlight.start!) <= now ? "Right now" : "Starts in"}</p>
            <Countdown start={spotlight.start!} end={spotlight.end} now={now} />
          </div>
        </article>
      )}

      <div className="board-bar reveal">
        <div className="tabs" ref={tabsRef} role="tablist" aria-label="Filter events">
          <span className="tabs-pill" style={{ transform: `translateX(${pill.left}px)`, width: pill.width }} aria-hidden="true" />
          {FILTERS.map((f) => (
            <button key={f} type="button" role="tab" data-f={f} aria-selected={filter === f} className={filter === f ? "is-active" : ""} onClick={() => setFilter(f)}>
              {f}<span className="count">{counts[f]}</span>
            </button>
          ))}
        </div>
      </div>

      <ol className="timeline" key={filter}>
        {shown.map((e, i) => (
          <li key={e.title} className={`tl-item tone-${e.tag} ${e === spotlight ? "is-spot" : ""}`} style={{ "--i": i } as React.CSSProperties}>
            <div className="tl-date" aria-hidden="true">
              <span>{e.tile[0]}</span>
              <b>{e.tile[1]}</b>
            </div>
            <div className="tl-card glow-border">
              <div className={`event-icon icon-${e.tag}`}><EventIcon kind={e.icon} /></div>
              <div className="tl-main">
                <div className="tl-tags">
                  <span className={`tag tag-${e.tag}`}>{e.tag}</span>
                  {e === spotlight && <span className="tag tag-next">✦ Next up</span>}
                  {e.collab && e.collab.length > 1 && <span className="tag tag-collab">Collab · {e.collab.length} MSAs</span>}
                </div>
                <h3>{e.title}</h3>
                <p>{e.blurb}</p>
              </div>
              <div className="event-meta"><strong>{e.when}</strong>{e.where}</div>
            </div>
          </li>
        ))}
        {shown.length === 0 && <li className="tl-empty">Nothing here yet. Follow @deanzamsa for what&apos;s next.</li>}
      </ol>
    </div>
  );
}
