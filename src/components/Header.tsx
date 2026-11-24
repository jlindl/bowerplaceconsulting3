"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import Logo from "./Logo";
import Button, { Roll } from "./Button";
import { nav, site } from "@/content/site";

const getLenis = () => (window as unknown as { __lenis?: Lenis }).__lenis;

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > 280 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y <= 280) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const lenis = getLenis();
    // Everything behind the menu goes inert while it is open, so focus stays inside the menu and header.
    const behind = [document.getElementById("main"), document.querySelector("footer")];
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      behind.forEach((el) => el?.setAttribute("inert", ""));
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
      behind.forEach((el) => el?.removeAttribute("inert"));
      if (wasOpen.current) toggleRef.current?.focus();
    }
    wasOpen.current = open;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-cobalt focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <header
        onFocusCapture={() => setHidden(false)}
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-700 ease-[cubic-bezier(.2,.7,.1,1)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          open
            ? "border-b border-transparent bg-transparent"
            : scrolled
              ? "border-b border-rule bg-paper/90 backdrop-blur-md"
              : "border-b border-transparent"
        }`}
      >
        <div className="wrap flex h-[76px] items-center justify-between gap-6">
          <Link href="/" aria-label="Bower Place, home" className="relative z-10 shrink-0">
            <Logo inverted={open} />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {nav.slice(0, 3).map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="roll-host group relative flex items-center gap-2 py-2 text-[15px] font-medium"
                    >
                      <span
                        className={`h-1.5 w-1.5 bg-cobalt transition-transform duration-500 ${active ? "scale-100" : "scale-0 group-hover:scale-100"}`}
                        aria-hidden="true"
                      />
                      <Roll>{item.label}</Roll>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-6">
            <a
              href={site.phoneHref}
              className="ulink hidden py-2 font-mono text-[13px] tracking-[0.02em] xl:inline-block"
            >
              {site.phone}
            </a>
            <Button href="/contact" className="hidden !min-h-[46px] sm:inline-flex">
              Start a conversation
            </Button>
            <button
              type="button"
              ref={toggleRef}
              className={`relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden ${open ? "text-white" : "text-ink"}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`absolute h-[1.5px] w-6 bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[4px]"}`}
              />
              <span
                className={`absolute h-[1.5px] w-6 bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[4px]"}`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        data-lenis-prevent
        className={`on-cobalt fixed inset-0 z-40 overflow-y-auto bg-cobalt pt-[76px] text-white transition-[clip-path,visibility] duration-[900ms] ease-[cubic-bezier(.7,0,.2,1)] lg:hidden ${
          open ? "visible [clip-path:inset(0_0_0_0)]" : "pointer-events-none invisible [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile" className="wrap flex min-h-full flex-col pb-10 pt-6">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} className="overflow-hidden border-b border-white/25">
                <Link
                  href={item.href}
                  className="flex items-baseline justify-between py-5 transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.1,1)]"
                  style={{ transform: open ? "none" : "translateY(100%)", transitionDelay: open ? `${0.15 + i * 0.06}s` : "0s" }}
                >
                  <span className="x-wide text-[40px] font-semibold uppercase leading-none tracking-[-0.03em]">{item.label}</span>
                  <span className="label text-on-cobalt">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-3 pt-12">
            <a href={`mailto:${site.email}`} className="block text-[17px]">
              {site.email}
            </a>
            <a href={site.phoneHref} className="block font-mono text-[15px]">
              {site.phone}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
