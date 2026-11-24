"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Lines from "../Lines";
import { ArrowUpRight } from "../Icons";
import { gsap, useGSAP } from "@/lib/gsap";
import { services } from "@/content/site";

/**
 * Service index. On fine pointers a duotone preview follows the cursor and swaps
 * image per row; on touch the image sits inline under each row.
 */
export default function ServiceRows() {
  const scope = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        const el = preview.current!;
        gsap.set(el, { xPercent: 0, yPercent: -50 });
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
        const list = scope.current!.querySelector<HTMLElement>("[data-list]")!;
        const move = (e: PointerEvent) => {
          const r = scope.current!.getBoundingClientRect();
          xTo(e.clientX - r.left + 36);
          yTo(e.clientY - r.top);
        };
        list.addEventListener("pointermove", move);
        return () => list.removeEventListener("pointermove", move);
      });
      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section ref={scope} aria-labelledby="services-title" className="relative">
      <div className="wrap section">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="label flex items-center gap-3 self-start lg:col-span-4">
            <span className="h-2 w-2 bg-cobalt" aria-hidden="true" />
            Our services
          </p>
          <div className="lg:col-span-8">
            <Lines id="services-title" className="h2" lines={["Lasting digital change,", "from strategy", "to live service."]} />
            <p className="lead mt-6 max-w-[52ch]" data-anim="fade">
              Three specialist services, each led by people who have delivered them inside government.
            </p>
          </div>
        </div>

        <ul className="mt-16 border-t border-ink md:mt-24" data-list onPointerLeave={() => setActive(null)}>
          {services.map((s, i) => (
            <li key={s.slug} className="border-b border-rule" onPointerEnter={() => setActive(i)}>
              <Link
                href={`/services#${s.slug}`}
                className="group relative isolate grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-5 overflow-hidden py-8 md:gap-x-10 md:py-11 lg:grid-cols-12"
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
              >
                <span
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-paper-2 transition-transform duration-700 ease-[cubic-bezier(.2,.7,.1,1)] group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <span className="label self-start pt-2 text-muted lg:col-span-1">{s.no}</span>
                <h3 className="x-wide text-[clamp(26px,3.2vw,46px)] font-semibold uppercase leading-[0.98] tracking-[-0.035em] transition-[color,transform] duration-700 ease-[cubic-bezier(.2,.7,.1,1)] group-hover:translate-x-3 group-hover:text-cobalt lg:col-span-6">
                  {s.title}
                </h3>
                <span className="flex h-14 w-14 items-center justify-center justify-self-end rounded-full border border-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-cobalt group-hover:bg-cobalt group-hover:text-white lg:order-last lg:col-span-1">
                  <ArrowUpRight size={16} />
                </span>
                <p className="col-span-3 max-w-[40ch] text-[16px] text-muted lg:col-span-4 lg:col-start-8 lg:row-start-1">{s.short}</p>
                <div className="photo photo-duo col-span-3 aspect-[16/9] lg:hidden">
                  <Image src={s.image} alt="" fill sizes="100vw" className="object-cover" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Cursor-following preview (desktop, fine pointer) */}
      <div ref={preview} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block" style={{ willChange: "transform" }}>
        <div
          className={`relative h-[300px] w-[240px] overflow-hidden transition-[opacity,scale] duration-500 ease-[cubic-bezier(.2,.7,.1,1)] ${
            active === null ? "scale-75 opacity-0" : "scale-100 opacity-100"
          }`}
        >
        {services.map((s, i) => (
          <div
            key={s.slug}
            className={`photo photo-duo absolute inset-0 transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${
              active === i ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(100%_0_0_0)]"
            }`}
          >
            <Image src={s.image} alt="" fill sizes="480px" className="object-cover" />
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
