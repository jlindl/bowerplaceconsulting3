import Image from "next/image";
import type { CaseStudy } from "@/content/site";

/** Full case study, laid out like a report page: sticky figure column, ruled ledger beside it. */
export default function CaseReport({ c, index }: { c: CaseStudy; index: number }) {
  const rows = [
    { k: "Challenge", v: c.challenge },
    { k: "Approach", v: c.approach },
    { k: "Outcome", v: c.outcome },
  ];
  return (
    <article id={c.slug} aria-labelledby={`${c.slug}-title`} className="group scroll-mt-24 py-16 md:py-24">
      <div className="h-px w-full bg-ink" data-anim="rule" />
      <div className="mt-6 flex flex-wrap justify-between gap-3">
        <p className="label text-muted">
          Case {String(index + 1).padStart(2, "0")} <span className="mx-2 text-rule">/</span> {c.service}
        </p>
        <p className="label text-muted">Client name withheld</p>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:motion-safe:sticky lg:top-28">
            <h2 id={`${c.slug}-title`} className="h3 text-muted">
              {c.client}
            </h2>
            <p className="mt-3" data-anim="lines">
              <span className="line">
                <span className="line-inner x-wide block whitespace-nowrap pt-[0.06em] text-[clamp(80px,10vw,156px)] font-semibold leading-[0.88] tracking-[-0.055em] text-cobalt">
                  {c.figure}
                </span>
              </span>
            </p>
            <p className="mt-5 max-w-[24ch] text-[19px] font-medium leading-snug" data-anim="fade">
              {c.figureLabel}
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="photo aspect-[3/2] w-full" data-anim="img">
            <Image src={c.image} alt={c.alt} fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
          </div>
          <dl className="mt-10">
            {rows.map((r) => (
              <div key={r.k} className="grid gap-2 border-t border-rule py-6 sm:grid-cols-[140px_1fr] sm:gap-6" data-anim="fade">
                <dt className="label pt-1 text-muted">{r.k}</dt>
                <dd className={`text-[17px] leading-relaxed ${r.k === "Outcome" ? "font-medium text-ink" : "text-ink/80"}`}>{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </article>
  );
}
