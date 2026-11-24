"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "./Icons";

/** Text that rolls up on hover. The duplicate is hidden from assistive tech. */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

/**
 * Pill button with a rising fill, rolling label and a gentle magnetic pull
 * toward the pointer (fine pointers only, off for reduced motion).
 */
export default function Button({
  href,
  children,
  variant = "primary",
  type,
  className = "",
  describedBy,
}: {
  href?: string;
  children: string;
  variant?: "primary" | "ghost";
  type?: "submit" | "button";
  className?: string;
  describedBy?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.32;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "translate3d(0,0,0)";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const cls = `btn roll-host btn-${variant} ${className}`;
  const inner = (
    <>
      <Roll>{children}</Roll>
      {variant === "primary" && (
        <span className="btn-icon">
          <ArrowUpRight size={12} />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} ref={ref as React.Ref<HTMLAnchorElement>} className={cls} aria-describedby={describedBy}>
        {inner}
      </Link>
    );
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type={type ?? "button"} className={cls} aria-describedby={describedBy}>
      {inner}
    </button>
  );
}
