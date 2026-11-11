"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const links = [
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#moments", label: "Moments" },
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
          <Image src="/logo.png" alt="De Anza MSA logo" width={40} height={40} className="brand-logo" priority />
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
          <a href="#join" className="btn btn-primary" onClick={() => setOpen(false)}>Join us</a>
        </nav>
      </div>
    </header>
  );
}
