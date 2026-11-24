import Lines from "./Lines";
import Button from "./Button";
import { site } from "@/content/site";

export default function CtaBand({
  lines = ["Not sure which", "service fits?", "Let's talk."],
}: {
  lines?: React.ReactNode[];
}) {
  return (
    <section aria-labelledby="cta-title" className="on-cobalt overflow-hidden bg-cobalt text-white">
      <div className="wrap section relative">
        <svg
          className="pointer-events-none absolute -right-[10%] top-1/2 hidden h-[140%] -translate-y-1/2 text-white/10 lg:block"
          viewBox="0 0 30 30"
          fill="none"
          aria-hidden="true"
          data-parallax="10"
        >
          <path d="M8 30V22A14 14 0 0 1 22 8h8" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <p className="label relative flex items-center gap-3 text-on-cobalt">
          <span className="h-2 w-2 bg-white" aria-hidden="true" />
          Start a conversation
        </p>
        <Lines as="h2" id="cta-title" className="display relative mt-8" lines={lines} />
        <div className="relative mt-12 grid gap-8 border-t border-white/30 pt-8 md:grid-cols-12 md:items-center">
          <p className="max-w-[44ch] text-[17px] text-on-cobalt md:col-span-6">
            We reply within one working day, and every enquiry is treated in strict confidence.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-6 md:justify-end" data-anim="rise">
            <a href={site.phoneHref} className="ulink font-mono text-[15px]">
              {site.phone}
            </a>
            <Button href="/contact">Start a conversation</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
