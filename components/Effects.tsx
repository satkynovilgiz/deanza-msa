"use client";

import { useEffect, useState } from "react";

/**
 * All page motion in one place:
 * - adds `.js` to <html> and reveals `.reveal` elements as they scroll into view
 * - scroll progress bar (--progress on <html>) and back-to-top visibility (.past-hero)
 * - 3D tilt + glare on `.tilt` cards
 * - mouse parallax in the hero (--hx/--hy on `.hero`)
 * - cursor spotlight on `.spot` sections (--mx/--my)
 * Tilt/parallax are skipped for reduced-motion and touch-only users.
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    // Reveal on scroll
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in");
      else io.observe(el);
    });
    cleanups.push(() => io.disconnect());

    // Scroll progress + back-to-top
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty("--progress", String(max > 0 ? window.scrollY / max : 0));
        root.classList.toggle("past-hero", window.scrollY > window.innerHeight * 0.8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    if (!reduce && finePointer) {
      // Tilt cards
      document.querySelectorAll<HTMLElement>(".tilt").forEach((card) => {
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          card.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
          card.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
          card.style.setProperty("--gx", `${x * 100}%`);
          card.style.setProperty("--gy", `${y * 100}%`);
        };
        const leave = () => { card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); });
      });

      // Hero parallax
      const hero = document.querySelector<HTMLElement>(".hero");
      if (hero) {
        const move = (e: PointerEvent) => {
          const r = hero.getBoundingClientRect();
          hero.style.setProperty("--hx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
          hero.style.setProperty("--hy", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
        };
        hero.addEventListener("pointermove", move);
        cleanups.push(() => hero.removeEventListener("pointermove", move));
      }

      // Spotlight
      document.querySelectorAll<HTMLElement>(".spot").forEach((sec) => {
        const move = (e: PointerEvent) => {
          const r = sec.getBoundingClientRect();
          sec.style.setProperty("--mx", `${e.clientX - r.left}px`);
          sec.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        sec.addEventListener("pointermove", move);
        cleanups.push(() => sec.removeEventListener("pointermove", move));
      });
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <a href="#top" className="to-top" aria-label="Back to top">
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M9 14V4M4 9l5-5 5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
    </>
  );
}

/** Today's date in the Hijri (Umm al-Qura) calendar, computed in the visitor's browser. */
export function HijriDate() {
  const [text, setText] = useState("Hijri date");
  useEffect(() => {
    try {
      const d = new Intl.DateTimeFormat("en-US-u-ca-islamic-umalqura", {
        day: "numeric", month: "long", year: "numeric",
      }).format(new Date());
      setText(d.replace(" AH", "") + " AH");
    } catch { /* keep fallback */ }
  }, []);
  return <span>Today is {text}</span>;
}

/**
 * Live Jumu'ah status in Pacific time: "happening now", "today at 1:00 PM" or a countdown.
 * Jumu'ah is every Friday 1:00–2:30 PM (see PRAYER_ROOM in lib/data.ts).
 */
export function NextJumuah({ room }: { room: string }) {
  const [text, setText] = useState<{ label: string; live: boolean } | null>(null);
  useEffect(() => {
    const compute = () => {
      const parts = Object.fromEntries(
        new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" })
          .formatToParts(new Date()).map((p) => [p.type, p.value])
      );
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dow = days.indexOf(parts.weekday);
      const mins = Number(parts.hour) * 60 + Number(parts.minute);
      const start = 13 * 60, end = 14 * 60 + 30;
      if (dow === 5 && mins >= start && mins < end) return { label: `Jumu'ah is happening now · ${room}`, live: true };
      if (dow === 5 && mins < start) {
        const left = start - mins;
        return { label: `Jumu'ah today at 1:00 PM · in ${left >= 60 ? `${Math.floor(left / 60)}h ` : ""}${left % 60}m`, live: false };
      }
      let d = (5 - dow + 7) % 7;
      if (d === 0) d = 7;
      return { label: d === 1 ? "Next Jumu'ah: tomorrow, 1:00 PM" : `Next Jumu'ah: Friday 1:00 PM · in ${d} days`, live: false };
    };
    setText(compute());
    const id = setInterval(() => setText(compute()), 30000);
    return () => clearInterval(id);
  }, [room]);
  return (
    <a href="#events" className={`jumuah-chip ${text?.live ? "is-live" : ""}`}>
      <span className="pulse" aria-hidden="true" />
      {text ? text.label : "Jumu'ah every Friday · 1:00 PM"}
    </a>
  );
}
