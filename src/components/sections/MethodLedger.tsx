import Lines from "../Lines";
import { method } from "@/content/site";

/**
 * The six stages as a pinned horizontal timeline on desktop (about 1.5 screens of scroll),
 * and a plain grid on touch and for reduced motion.
 */
export default function MethodLedger() {
  return (
    <section id="method" aria-labelledby="method-title" className="scroll-mt-20 overflow-hidden bg-paper" data-anim="hscroll">
      <div className="flex flex-col justify-center py-24 lg:min-h-screen lg:py-0">
        <div className="wrap grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label flex items-center gap-3 self-start">
              <span className="h-2 w-2 bg-cobalt" aria-hidden="true" />
              How we work
            </p>
            <Lines id="method-title" className="h1 mt-6" lines={["One senior team,", "end to end."]} />
          </div>
          <p className="lead max-w-[44ch] lg:col-span-4 lg:col-start-9" data-anim="fade">
            We stay accountable across the whole life of a programme, so nothing is lost between the business case and
            the benefits.
          </p>
        </div>

        <div className="wrap mt-12 lg:mt-16">
          <div className="relative hidden h-px w-full bg-rule lg:block" aria-hidden="true">
            <div className="absolute inset-0 origin-left scale-x-0 bg-cobalt" data-track-progress />
          </div>
        </div>

        <ol className="wrap mt-6 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:flex lg:w-max lg:max-w-none lg:gap-5" data-track>
          {method.map((m) => (
            <li
              key={m.no}
              className="group relative isolate flex min-h-[260px] flex-col justify-between overflow-hidden border border-rule bg-white p-7 transition-colors duration-500 hover:border-cobalt lg:h-[46vh] lg:min-h-[340px] lg:w-[min(30vw,420px)] lg:p-9"
            >
              <span
                className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-cobalt transition-transform duration-700 ease-[cubic-bezier(.2,.7,.1,1)] group-hover:scale-y-100"
                aria-hidden="true"
              />
              <span className="x-wide text-[clamp(64px,7vw,120px)] font-semibold leading-none tracking-[-0.05em] text-cobalt transition-colors duration-500 group-hover:text-white">
                {m.no}
              </span>
              <div className="mt-10 transition-colors duration-500 group-hover:text-white">
                <h3 className="h3">{m.title}</h3>
                <p className="mt-3 max-w-[32ch] text-[16px] text-muted transition-colors duration-500 group-hover:text-on-cobalt">
                  {m.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
