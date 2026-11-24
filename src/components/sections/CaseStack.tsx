import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "../Icons";
import { cases } from "@/content/site";

/**
 * Signature moment: the four case studies stack like files on a desk.
 * Each card sticks, then recedes as the next slides over it (scrubbed, desktop and mobile).
 * Figures are revealed, never counted.
 */
export default function CaseStack() {
  return (
    <div data-anim="stack" className="relative mt-16 md:mt-24">
      {cases.map((c, i) => (
        <article
          key={c.slug}
          data-card
          aria-labelledby={`stack-${c.slug}`}
          className="sticky mb-6 md:mb-10"
          style={{ top: `calc(96px + ${i * 14}px)` }}
        >
          <div data-card-inner className="relative origin-top">
            <div data-card-shade aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 bg-ink opacity-0" />
            <Link
              href={`/work#${c.slug}`}
              className="group grid min-h-[72vh] overflow-hidden border border-rule bg-white md:min-h-[min(78vh,720px)] lg:grid-cols-12"
            >
              <div className="flex flex-col justify-between gap-10 p-7 md:p-12 lg:col-span-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="label text-muted">
                    Case {String(i + 1).padStart(2, "0")} <span className="mx-2 text-rule">/</span> {c.service}
                  </p>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-cobalt group-hover:bg-cobalt group-hover:text-white">
                    <ArrowUpRight />
                  </span>
                </div>
                <div>
                  <h3 id={`stack-${c.slug}`} className="h3 text-muted">
                    {c.client}
                  </h3>
                  <p className="x-wide mt-3 text-[clamp(72px,10vw,168px)] font-semibold leading-[0.85] tracking-[-0.055em] text-cobalt">
                    {c.figure}
                  </p>
                  <p className="mt-4 max-w-[26ch] text-[19px] font-medium leading-snug">{c.figureLabel}</p>
                </div>
                <p className="max-w-[48ch] border-t border-rule pt-5 text-[16px] text-muted">{c.outcome}</p>
              </div>
              <div className="photo relative min-h-[260px] lg:col-span-6">
                <Image src={c.image} alt={c.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
