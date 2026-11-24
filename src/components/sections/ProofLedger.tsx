import Lines from "../Lines";
import { stats } from "@/content/site";

/** Full-bleed cobalt panel. Figures rise through masks; they are never counted up. */
export default function ProofLedger() {
  return (
    <section aria-labelledby="proof-title" className="on-cobalt bg-cobalt text-white">
      <div className="wrap section">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="label flex items-center gap-3 self-start text-on-cobalt lg:col-span-4">
            <span className="h-2 w-2 bg-white" aria-hidden="true" />
            Track record
          </p>
          <Lines
            id="proof-title"
            className="h2 lg:col-span-8"
            lines={["Twenty years in", "the public sector.", "Now on your side."]}
          />
        </div>

        <dl className="mt-16 grid grid-cols-2 border-t border-white/30 md:mt-24 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`group flex flex-col gap-4 border-white/30 py-8 pr-4 md:py-12 ${i % 2 === 1 ? "border-l pl-5 md:pl-8" : ""} ${
                i >= 2 ? "border-t lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l lg:pl-8" : ""}`}
            >
              <dt className="order-2 max-w-[24ch] text-[15px] leading-snug text-on-cobalt">{s.label}</dt>
              <dd className="order-1 transition-transform duration-700 ease-[cubic-bezier(.2,.7,.1,1)] group-hover:-translate-y-1.5" data-anim="lines">
                <span className="line">
                  <span className="line-inner x-wide block text-[8.4vw] sm:text-[clamp(40px,5vw,56px)] lg:text-[clamp(44px,4.3vw,66px)] font-semibold leading-[0.95] tracking-[-0.04em]">
                    {s.value}
                  </span>
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
