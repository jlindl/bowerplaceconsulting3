"use client";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { formerRoles } from "@/content/site";

/**
 * Continuous ticker of the organisations our founders have led in.
 * It speeds up with scroll velocity and follows scroll direction, and it has a
 * visible pause control (WCAG 2.2.2). Static under reduced motion.
 */
export default function Marquee() {
  const [paused, setPaused] = useState(false);
  const scope = useRef<HTMLElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = scope.current!.querySelector<HTMLElement>("[data-marquee]")!;
        tween.current = gsap.to(track, { xPercent: -50, duration: 48, ease: "none", repeat: -1 });
        let dir = 1;
        const st = ScrollTrigger.create({
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = self.getVelocity();
            if (v !== 0) dir = v > 0 ? 1 : -1;
            const boost = Math.min(Math.abs(v) / 260, 5);
            if (!tween.current || tween.current.paused()) return;
            gsap.to(tween.current, {
              timeScale: dir * (1 + boost),
              duration: 0.25,
              overwrite: true,
              onComplete: () => {
                if (tween.current) gsap.to(tween.current, { timeScale: dir, duration: 1.2, overwrite: true });
              },
            });
          },
        });
        return () => {
          st.kill();
          tween.current?.kill();
          tween.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope }
  );

  const toggle = () => {
    setPaused((p) => {
      if (p) tween.current?.play();
      else tween.current?.pause();
      return !p;
    });
  };

  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {formerRoles.map((r) => (
        <li key={r} className="flex items-center">
          <span className="x-wide whitespace-nowrap px-7 text-[clamp(30px,4.2vw,64px)] font-semibold uppercase tracking-[-0.03em] md:px-12">
            {r}
          </span>
          <span className="h-3 w-3 shrink-0 bg-cobalt" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <section ref={scope} aria-labelledby="marquee-title" className="overflow-hidden py-20 md:py-28">
      <div className="wrap flex items-end justify-between gap-6">
        <h2 id="marquee-title" className="label max-w-[44ch] text-muted">
          Our founders have held senior delivery roles across
        </h2>
        <button
          type="button"
          onClick={toggle}
          className="label flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-cobalt"
          aria-label={paused ? "Play the moving list" : "Pause the moving list"}
        >
          <span className="inline-block h-2 w-2 bg-current" aria-hidden="true" />
          {paused ? "Play" : "Pause"}
        </button>
      </div>
      <div className="mt-10 border-y border-rule py-8">
        <div className="flex w-max" data-marquee>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
