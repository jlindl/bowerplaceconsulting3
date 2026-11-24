import { founders } from "@/content/site";

/** Cobalt monogram tiles stand in for portraits until real photography is supplied. */
export default function Founders({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ul className="grid gap-5 md:grid-cols-2" data-anim="stagger">
      {founders.map((f) => (
        <li key={f.name} className="group relative overflow-hidden border border-rule bg-white p-7 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <div
              className="relative flex h-28 w-28 shrink-0 items-end overflow-hidden bg-cobalt p-3 text-white md:h-36 md:w-36"
              aria-hidden="true"
            >
              <svg className="absolute -right-6 -top-6 h-28 w-28 text-white/25 transition-transform duration-1000 ease-[cubic-bezier(.2,.7,.1,1)] group-hover:rotate-90" viewBox="0 0 30 30" fill="none">
                <path d="M8 30V22A14 14 0 0 1 22 8h8" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="x-wide relative text-[40px] font-semibold leading-none tracking-[-0.04em] md:text-[52px]">{f.initials}</span>
            </div>
            <p className="label text-right text-muted">{f.role}</p>
          </div>
          <H className="h2 mt-10 md:mt-14">{f.name}</H>
          <p className="mt-5 max-w-[50ch] text-[16px] leading-relaxed text-ink/80">{f.bio}</p>
        </li>
      ))}
    </ul>
  );
}
