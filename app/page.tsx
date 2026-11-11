import { Fragment } from "react";
import Image from "next/image";
import Nav from "@/components/Nav";
import { StarTile } from "@/components/Star";
import { HijriDate, Motion, NextJumuah } from "@/components/Effects";
import LogoHero from "@/components/LogoHero";
import { JoinSkyline, PillarArt, scenes } from "@/components/Illustrations";
import InternForm from "@/components/InternForm";
import EventsBoard from "@/components/EventsBoard";
import { officers, pillars, moments, INSTAGRAM, WHATSAPP, DISCORD, INTERN_OPEN, PRAYER_ROOM } from "@/lib/data";

const initials = (name: string) =>
  name.includes("TBA") ? "?" : name.split(" ").map((p) => p[0]).join("").slice(0, 2);

/** Splits text into words that animate in one after another. */
function Words({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          <span className="word" style={{ "--i": start + i } as React.CSSProperties}>{w}</span>{" "}
        </Fragment>
      ))}
    </>
  );
}

/** Thin divider with an eight-pointed star in the middle. */
function Ornament() {
  return (
    <div className="wrap ornament reveal" aria-hidden="true">
      <span />
      <svg viewBox="0 0 100 100"><g fill="none" stroke="currentColor" strokeWidth="6"><rect x="22" y="22" width="56" height="56" /><rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" /></g><circle cx="50" cy="50" r="8" fill="currentColor" /></svg>
      <span />
    </div>
  );
}

const SPARKS = [
  [8, 18, 0], [22, 70, 1.2], [46, 10, 2.1], [62, 84, 0.6], [78, 30, 1.7], [90, 64, 2.6], [35, 44, 3.1], [70, 52, 0.9], [14, 90, 2.3], [94, 12, 1.4],
];

export default function Home() {
  const marquee = ["Jumu'ah", "Halaqa", "Iftar", "Service", "Sisterhood", "Brotherhood", "Study nights", "Community"];
  const marqueeAr = ["جمعة", "حلقة", "إفطار", "خدمة", "أخوة", "علم", "سلام", "رحمة"];

  return (
    <div id="top">
      <Motion />
      <Nav />

      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="sparks" aria-hidden="true">
          {SPARKS.map(([x, y, d], i) => (
            <span key={i} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }}>✦</span>
          ))}
        </div>
        <div className="wrap hero-grid">
          <div>
            <p className="arabic bismillah rise d1">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
            <p className="eyebrow rise d2">Muslim Student Association · De Anza College</p>
            <h1 style={{ marginTop: 14 }}>
              <Words text="A home on campus," />
              <em><Words text="for everyone." start={4} /></em>
            </h1>
            <p className="hero-lede rise d4">
              We&apos;re De Anza&apos;s Muslim students and friends. Come <mark>pray</mark>, <mark>learn</mark>, <mark>eat</mark> and <mark>serve</mark>{" "}
              together. You don&apos;t have to be Muslim to belong here.
            </p>
            <div className="hero-cta rise d5">
              <a href="#events" className="btn btn-primary btn-shine">See what&apos;s on</a>
              {INTERN_OPEN
                ? <a href="#apply" className="btn btn-ghost">Become an intern →</a>
                : <a href="#moments" className="btn btn-ghost">See the vibe ↓</a>}
            </div>
            <div className="hero-meta rise d5">
              <NextJumuah room={`${PRAYER_ROOM.building} ${PRAYER_ROOM.room}`} />
              <p className="hijri"><span className="hijri-dot" /><HijriDate /></p>
            </div>
          </div>
          <div className="star-stage">
            <LogoHero />
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((w, i) => <span key={i}>{w}</span>)}
        </div>
        <div className="marquee-track rev arabic-row">
          {[...marqueeAr, ...marqueeAr, ...marqueeAr, ...marqueeAr].map((w, i) => <span key={i} className="arabic">{w}</span>)}
        </div>
      </div>

      {/* About */}
      <section id="about" className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">What we&apos;re about</p>
              <h2>Faith, friends and <em>showing up</em> for each other.</h2>
            </div>
            <p>MSA is a student-run club at De Anza. We plan prayer, study circles, socials and service, and we welcome students of every background.</p>
          </div>
          <div className="pillars">
            {pillars.map((p, i) => (
              <article key={p.title} className="pillar tilt glow-border reveal zoom" style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="pillar-top">
                  <div className="pillar-art"><PillarArt kind={p.art} /></div>
                  <p className="arabic">{p.arabic}</p>
                </div>
                <h3><span className="pillar-num">0{i + 1}</span>{p.title}</h3>
                <p>{p.text}</p>
                <span className="pillar-watermark arabic" aria-hidden="true">{p.arabic}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Ornament />

      {/* Events */}
      <section id="events" className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Events</p>
              <h2>What&apos;s <em>happening</em></h2>
            </div>
            <p>Exact times and rooms go up on Instagram first. Follow <a href={INSTAGRAM} target="_blank" rel="noreferrer" style={{ color: "var(--jade)", fontWeight: 600 }}>@deanzamsa</a> so you don&apos;t miss one.</p>
          </div>
          <EventsBoard />
          <div className="prayer-room reveal zoom" style={{ marginTop: 28, marginBottom: 0 }}>
            <div className="prayer-art" aria-hidden="true">
              <svg viewBox="0 0 120 140">
                <path d="M14 136 V58 A46 46 0 0 1 106 58 V136Z" fill="var(--jade)" />
                <path d="M30 136 V64 A30 30 0 0 1 90 64 V136Z" fill="var(--jade-soft)" />
                <g transform="translate(60 74) scale(.3)"><g fill="none" stroke="var(--brass)" strokeWidth="8"><rect x="-28" y="-28" width="56" height="56" /><rect x="-28" y="-28" width="56" height="56" transform="rotate(45)" /></g></g>
                <rect x="40" y="112" width="40" height="24" rx="3" fill="var(--brass)" opacity=".85" />
                <path d="M40 118 H80 M40 130 H80" stroke="var(--paper)" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="60" cy="74" r="40" fill="#ffd98a" opacity=".12" className="flicker" />
              </svg>
            </div>
            <div className="prayer-info">
              <p className="eyebrow">Prayer room</p>
              <h3>{PRAYER_ROOM.room} <span>· {PRAYER_ROOM.name}</span></h3>
              <p>Inside the {PRAYER_ROOM.building}, {PRAYER_ROOM.landmark}. A quiet space on campus to pray between classes.</p>
            </div>
            <div className="prayer-jumuah">
              <span>Jumu&apos;ah</span>
              <strong>{PRAYER_ROOM.jumuah}</strong>
              <em>{PRAYER_ROOM.building}, {PRAYER_ROOM.room}</em>
            </div>
          </div>
        </div>
      </section>

      <Ornament />

      {/* Moments gallery */}
      <section id="moments" className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Moments</p>
              <h2>What MSA <em>feels like</em></h2>
            </div>
            <p>Iftars, study nights, Friday prayer and everything in between. Tag @deanzamsa in your photos and we may feature them here.</p>
          </div>
          <div className="gallery">
            {moments.map((m, i) => {
              const Scene = scenes[m.scene];
              return (
                <figure key={m.title} className="shot reveal zoom" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
                  {m.photo
                    ? <Image src={m.photo} alt={m.caption} fill sizes="(max-width: 760px) 100vw, 50vw" />
                    : <Scene />}
                  <figcaption>
                    <strong>{m.title}</strong>
                    <span>{m.caption}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* Officers */}
      <section id="officers" className="section band-dark spot">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">2026–27 Board</p>
              <h2>Meet the <em>officers</em></h2>
            </div>
            <p>The students who keep MSA running. Have an idea for an event? Any of us would love to hear it.</p>
          </div>
          <div className="officers">
            {officers.map((o, i) => (
              <article key={o.role} className="officer tilt glow-border reveal" style={{ transitionDelay: `${(i % 4) * 90}ms` }}>
                <div className={`avatar ${o.photo || o.defaultPhoto ? "has-photo" : ""} ${o.defaultPhoto ? "default-pfp" : ""}`}>
                  {o.photo
                    ? <Image src={o.photo} alt={`${o.name}, ${o.role}`} fill sizes="(max-width: 480px) 90vw, (max-width: 760px) 45vw, 260px" style={{ objectPosition: o.photoPos ?? "50% 30%" }} />
                    : o.defaultPhoto
                      ? <svg viewBox="0 0 100 125" role="img" aria-label={`${o.name}, ${o.role}`}><circle cx="50" cy="48" r="20" /><path d="M10 125 Q10 80 50 80 Q90 80 90 125Z" /></svg>
                      : <><StarTile id={`tile-${i}`} /><span>{initials(o.name)}</span></>}
                </div>
                <p className="role">{o.role}</p>
                <h3 className={o.placeholder ? "tba" : ""}>{o.name}</h3>
                {o.major && <p className="major">{o.major}</p>}
                <p>{o.blurb}</p>
                {o.surah && (
                  <p className="surah"><span className="surah-label">Favorite surah</span><span className="surah-name">{o.surah.en} <span className="arabic">{o.surah.ar}</span></span></p>
                )}
              </article>
            ))}
          </div>
          {INTERN_OPEN && (
            <div className="intern reveal zoom">
              <div>
                <p className="eyebrow">Now accepting</p>
                <h3>Become an MSA intern</h3>
                <p>Help plan Muslim Heritage Month and our other events, work alongside the board, and see if an officer role is for you. Interns join the weekly MSA meetings.</p>
              </div>
              <a href="#apply" className="btn btn-primary btn-shine">Apply to be an intern ↓</a>
            </div>
          )}
        </div>
      </section>

      {/* Intern application */}
      {INTERN_OPEN && (
        <section id="apply" className="section apply">
          <div className="wrap apply-grid">
            <div className="apply-intro reveal">
              <p className="eyebrow">Intern application</p>
              <h2>Help build <em>MSA</em> this year.</h2>
              <p>We&apos;re looking for interns to help with Muslim Heritage Month and our other events. You&apos;ll work alongside the board, learn how events come together and see if an officer role is right for you.</p>
              <ul className="apply-perks">
                <li>Takes about 5 minutes</li>
                <li>A quick 15-minute chat with an officer after you apply</li>
                <li>Weekly MSA meetings are part of the role</li>
              </ul>
            </div>
            <div className="reveal zoom"><InternForm /></div>
          </div>
        </section>
      )}

      {/* Join */}
      <section id="join" className="section">
        <div className="wrap">
          <div className="join reveal zoom">
            <div className="join-art"><JoinSkyline /></div>
            <div style={{ position: "relative" }}>
              <h2>Come to one event. <em>That&apos;s all it takes.</em></h2>
              <p>No sign-up fee, no commitment. Hop in the group chat, follow along on Instagram, or just walk in. Bring a friend.</p>
              <div className="hero-cta join-links">
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn btn-shine">WhatsApp community</a>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="btn btn-outline">Instagram</a>
                <a href={DISCORD} target="_blank" rel="noreferrer" className="btn btn-outline">Discord</a>
              </div>
            </div>
            <ol className="join-list">
              <li className="reveal from-right" style={{ transitionDelay: "150ms" }}><b>1</b> Join the WhatsApp community and follow @deanzamsa</li>
              <li className="reveal from-right" style={{ transitionDelay: "280ms" }}><b>2</b> Show up to Jumu&apos;ah, a halaqa or a social</li>
              <li className="reveal from-right" style={{ transitionDelay: "410ms" }}><b>3</b> Say salaam to an officer and get involved</li>
            </ol>
          </div>
        </div>
      </section>

      <footer className="wrap footer">
        <span className="footer-brand">
          <Image src="/logo.png" alt="" width={44} height={44} className="brand-logo" />
          © 2026 De Anza College Muslim Student Association · Cupertino, CA
        </span>
        <span className="footer-links">
          <a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram ↗</a>
          <a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp ↗</a>
          <a href={DISCORD} target="_blank" rel="noreferrer">Discord ↗</a>
        </span>
      </footer>
    </div>
  );
}
