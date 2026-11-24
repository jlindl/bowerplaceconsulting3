"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Oversized wordmark whose letters rise into place as the footer scrolls in. */
export default function FooterWord({ word }: { word: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current!.querySelectorAll(".ch"), {
          yPercent: 105,
          ease: "none",
          stagger: 0.05,
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom 96%", scrub: 0.8 },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );
  return (
    <p
      ref={ref}
      aria-hidden="true"
      className="x-wide flex justify-between overflow-hidden whitespace-nowrap text-[clamp(34px,9.4vw,150px)] font-semibold leading-[0.9] tracking-[-0.05em]"
    >
      {word.split("").map((ch, i) => (
        <span key={i} className="ch inline-block">
          {ch === " " ? " " : ch}
        </span>
      ))}
    </p>
  );
}
