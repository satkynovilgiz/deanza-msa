"use client";

import { useEffect, useState } from "react";
import { StarMark } from "./Star";
import { INSTAGRAM } from "@/lib/data";

const links = [
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#officers", label: "Officers" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <StarMark className="brand-mark" />
          De Anza MSA
        </a>
        <button id="menu-btn" className="menu-btn" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d={open ? "M3 3l12 12M15 3L3 15" : "M2 5h14M2 9h14M2 13h14"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="btn btn-primary">Join us</a>
        </nav>
      </div>
    </header>
  );
}
