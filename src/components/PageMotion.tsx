"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";

/**
 * Every scroll and load animation on a page, driven by data attributes.
 * All of it lives inside gsap.matchMedia so reduced-motion visitors get the
 * finished state with nothing pinned or scrubbed.
 *
 *  data-anim="lines"   masked line rise (children .line > .line-inner)
 *  data-anim="fade"    soft rise + fade (never used on calls to action)
 *  data-anim="rise"    rise only, stays visible (safe for calls to action)
 *  data-anim="stagger" children rise in sequence
 *  data-anim="img"     clip-path unveil with a scale settle (on .photo)
 *  data-anim="rule"    hairline draws left to right
 *  data-anim="expand"  image card grows to full bleed as you scroll (scrub)
 *  data-anim="words"   words fill from faint to solid as you read (scrub)
 *  data-anim="hscroll" pinned horizontal track (desktop only)
 *  data-anim="stack"   cards stack: each recedes as the next arrives (scrub)
 *  data-anim="letters" letters rise into place (scrub)
 *  data-parallax="n"   vertical drift of n percent
 *  data-hero           plays on load instead of on scroll
 */
export default function PageMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = scope.current!;
        const all = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T & HTMLElement>(sel));
        const inHero = (el: Element) => !!el.closest("[data-hero]");
        const trig = (el: Element, start = "top 85%") =>
          inHero(el) ? undefined : { trigger: el, start, once: true };

        all('[data-anim="lines"]').forEach((el) => {
          gsap.from(el.querySelectorAll(".line-inner"), {
            yPercent: 112,
            rotate: 2,
            transformOrigin: "0 100%",
            duration: 1.15,
            ease: "expo.out",
            stagger: 0.09,
            delay: inHero(el) ? 0.1 : 0,
            scrollTrigger: trig(el),
          });
        });

        all('[data-anim="fade"]').forEach((el) => {
          gsap.from(el, { y: 28, autoAlpha: 0, duration: 1, ease: EASE, delay: inHero(el) ? 0.45 : 0, scrollTrigger: trig(el) });
        });

        all('[data-anim="rise"]').forEach((el) => {
          gsap.from(el, { y: 36, duration: 1.1, ease: EASE, delay: inHero(el) ? 0.55 : 0, scrollTrigger: trig(el) });
        });

        all('[data-anim="stagger"]').forEach((el) => {
          gsap.from(el.children, { y: 40, autoAlpha: 0, duration: 1, ease: EASE, stagger: 0.09, scrollTrigger: trig(el, "top 88%") });
        });

        all('[data-anim="img"]').forEach((el) => {
          const img = el.querySelector("img");
          const tl = gsap.timeline({ scrollTrigger: trig(el), delay: inHero(el) ? 0.3 : 0 });
          tl.fromTo(el, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.3, ease: "expo.inOut" });
          if (img) tl.from(img, { scale: 1.25, duration: 1.8, ease: "expo.out" }, 0.15);
        });

        all('[data-anim="rule"]').forEach((el) => {
          gsap.from(el, { scaleX: 0, transformOrigin: "0 50%", duration: 1.4, ease: "expo.out", scrollTrigger: trig(el, "top 92%") });
        });

        all('[data-anim="expand"]').forEach((el) => {
          const img = el.querySelector("img");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 90%", end: "top 12%", scrub: 0.6 },
          });
          tl.fromTo(
            el,
            { clipPath: "inset(0% 16% 0% 16% round 28px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" }
          );
          if (img) tl.fromTo(img, { scale: 1.22 }, { scale: 1, ease: "none" }, 0);
        });

        // Words move from a muted tone (still 3:1 for large text, so never illegible) to their full colour.
        all('[data-anim="words"]').forEach((el) => {
          const faint = el.dataset.faint || "#858b97";
          const words = Array.from(el.querySelectorAll<HTMLElement>(".w"));
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } });
          words.forEach((w, i) => {
            const full = getComputedStyle(w).color;
            tl.fromTo(w, { color: faint }, { color: full, ease: "none", duration: 1 }, i * 0.05 * 10);
          });
        });

        all('[data-anim="letters"]').forEach((el) => {
          gsap.from(el.querySelectorAll(".ch"), {
            yPercent: 100,
            ease: "none",
            stagger: 0.04,
            scrollTrigger: { trigger: el, start: "top 98%", end: "bottom 92%", scrub: 0.8 },
          });
        });

        all("[data-parallax]").forEach((el) => {
          const amt = Number(el.dataset.parallax || 8);
          gsap.fromTo(
            el,
            { yPercent: -amt },
            { yPercent: amt, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }
          );
        });

        // Stacking cards: a card scales back and dims only while the next one is sliding over it.
        // Triggers hang off the non-sticky wrapper (sticky elements make unreliable triggers),
        // using each card's natural layout offset. Offsets mirror the sticky `top` in CaseStack.
        all('[data-anim="stack"]').forEach((wrap) => {
          const cards = Array.from(wrap.querySelectorAll<HTMLElement>("[data-card]"));
          const STICK = 96;
          const STEP = 14;
          const natural = () => {
            let y = 0;
            return cards.map((c) => {
              const top = y;
              const mb = parseFloat(getComputedStyle(c).marginBottom) || 0;
              y += c.offsetHeight + mb;
              return { top, h: c.offsetHeight };
            });
          };
          cards.forEach((card, i) => {
            if (!cards[i + 1]) return;
            const st = {
              trigger: wrap,
              // next card's top crosses this card's bottom edge...
              start: () => {
                const n = natural();
                return `top+=${n[i + 1].top - n[i].h - STEP * i} ${STICK}px`;
              },
              // ...until it reaches its own stuck position
              end: () => `top+=${natural()[i + 1].top - STEP * (i + 1)} ${STICK}px`,
              scrub: true,
              invalidateOnRefresh: true,
            };
            const tl = gsap.timeline({ scrollTrigger: st });
            tl.fromTo(card.querySelector("[data-card-inner]"), { scale: 1 }, { scale: 0.94, ease: "none" }, 0);
            tl.fromTo(card.querySelector("[data-card-shade]"), { opacity: 0 }, { opacity: 0.4, ease: "none" }, 0);
          });
        });
      });

      // Pinned horizontal track: desktop with motion only. Kept to about 1.5 screens of scroll.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        const root = scope.current!;
        root.querySelectorAll<HTMLElement>('[data-anim="hscroll"]').forEach((section) => {
          const track = section.querySelector<HTMLElement>("[data-track]");
          if (!track) return;
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);
          const progress = section.querySelector<HTMLElement>("[data-track-progress]");
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              // Pinned above later triggers: refresh first so their offsets include the pin spacer.
              refreshPriority: 1,
            },
          });
          tl.to(track, { x: () => -distance(), ease: "none" }, 0);
          if (progress) tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
        });
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => mm.revert();
    },
    { scope }
  );

  return <div ref={scope}>{children}</div>;
}
