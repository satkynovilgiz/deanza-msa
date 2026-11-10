import Nav from "@/components/Nav";
import { HeroRosette, StarTile } from "@/components/Star";
import { HijriDate, RevealOnScroll } from "@/components/Effects";
import { events, officers, pillars, INSTAGRAM } from "@/lib/data";

const initials = (name: string) =>
  name.includes("TBA") ? "?" : name.split(" ").map((p) => p[0]).join("").slice(0, 2);

export default function Home() {
  const marquee = ["Jumu'ah", "Halaqa", "Iftar", "Service", "Sisterhood", "Brotherhood", "Study nights", "Community"];

  return (
    <div id="top">
      <RevealOnScroll />
      <Nav />

      {/* Hero */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="arabic bismillah rise d1">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
            <p className="eyebrow rise d2">Muslim Student Association · De Anza College</p>
            <h1 className="rise d3" style={{ marginTop: 14 }}>
              A home on campus, <em>for everyone.</em>
            </h1>
            <p className="hero-lede rise d4">
              We&apos;re De Anza&apos;s Muslim students and friends. Come pray, learn, eat and serve
              together. You don&apos;t have to be Muslim to belong here.
            </p>
            <div className="hero-cta rise d5">
              <a href="#events" className="btn btn-primary">See what&apos;s on</a>
              <a href="#officers" className="btn btn-ghost">Meet the officers</a>
            </div>
            <p className="hijri rise d5"><span className="hijri-dot" /><HijriDate /></p>
          </div>
          <div className="star-stage rise d2"><HeroRosette /></div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((w, i) => <span key={i}>{w}</span>)}
        </div>
      </div>

      {/* About */}
      <section id="about" className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">What we&apos;re about</p>
              <h2>Faith, friends and showing up for each other.</h2>
            </div>
            <p>MSA is a student-run club at De Anza. We plan prayer, study circles, socials and service, and we welcome students of every background.</p>
          </div>
          <div className="pillars">
            {pillars.map((p) => (
              <article key={p.title} className="pillar reveal">
                <p className="arabic">{p.arabic}</p>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Events</p>
              <h2>What&apos;s happening</h2>
            </div>
            <p>Exact times and rooms go up on Instagram first. Follow <a href={INSTAGRAM} target="_blank" rel="noreferrer" style={{ color: "var(--jade)", fontWeight: 600 }}>@deanzamsa</a> so you don&apos;t miss one.</p>
          </div>
          <div className="events">
            {events.map((e) => (
              <article key={e.title} className="event reveal">
                <span className={`tag tag-${e.tag}`}>{e.tag}</span>
                <div style={{ minWidth: 0 }}>
                  <h3>{e.title}</h3>
                  <p>{e.blurb}</p>
                </div>
                <div className="event-meta"><strong>{e.when}</strong>{e.where}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Officers */}
      <section id="officers" className="section band-dark">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">2026–27 Board</p>
              <h2>Meet the officers</h2>
            </div>
            <p>The students who keep MSA running. Have an idea for an event? Any of us would love to hear it.</p>
          </div>
          <div className="officers">
            {officers.map((o, i) => (
              <article key={o.role} className="officer reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <div className="avatar"><StarTile /><span>{initials(o.name)}</span></div>
                <p className="role">{o.role}</p>
                <h3 className={o.placeholder ? "tba" : ""}>{o.name}</h3>
                <p>{o.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Join */}
      <section id="join" className="section">
        <div className="wrap">
          <div className="join reveal">
            <div>
              <h2>Come to one event. That&apos;s all it takes.</h2>
              <p>No sign-up fee, no commitment. Message us on Instagram or just walk in. Bring a friend.</p>
              <div className="hero-cta"><a href={INSTAGRAM} target="_blank" rel="noreferrer" className="btn">Follow @deanzamsa</a></div>
            </div>
            <ol className="join-list">
              <li><b>1</b> Follow @deanzamsa for times and rooms</li>
              <li><b>2</b> Show up to Jumu&apos;ah, a halaqa or a social</li>
              <li><b>3</b> Say salaam to an officer and get involved</li>
            </ol>
          </div>
        </div>
      </section>

      <footer className="wrap footer">
        <span>© 2026 De Anza College Muslim Student Association · Cupertino, CA</span>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram ↗</a>
      </footer>
    </div>
  );
}
