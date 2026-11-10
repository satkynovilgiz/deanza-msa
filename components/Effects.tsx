"use client";

import { useEffect, useState } from "react";

/** Adds `.js` to <html> and reveals `.reveal` elements as they scroll into view. */
export function RevealOnScroll() {
  useEffect(() => {
    document.documentElement.classList.add("js");
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
    return () => io.disconnect();
  }, []);
  return null;
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
