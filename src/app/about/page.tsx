import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Founders from "@/components/sections/Founders";
import Accreditations from "@/components/sections/Accreditations";
import ProofLedger from "@/components/sections/ProofLedger";
import CtaBand from "@/components/CtaBand";
import Lines from "@/components/Lines";
import Words from "@/components/Words";
import { values } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bower Place was founded by practitioners who spent their careers inside public sector programmes: the breadth of a large consultancy with the accountability of a small one.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Bower Place"
        lines={["Built by people", "who have done", <span key="e" className="text-cobalt">the job.</span>]}
        lead="Founded by practitioners who spent their careers inside public sector programmes, and who stay on the work once it starts."
        image="/images/about.webp"
        alt="A Victorian clock tower beside a classical civic building with columns"
        caption="Civic institutions, built to last"
      />

      <section aria-label="Our position" className="wrap section">
        <Words
          className="x-wide max-w-[24ch] text-[clamp(30px,4.4vw,68px)] font-semibold leading-[1.02] tracking-[-0.035em]"
          text="The breadth of a large consultancy. The accountability of a small one. Senior people who stay on the work."
          accent={["accountability"]}
        />
      </section>

      <section aria-labelledby="values-title" className="wrap pb-[var(--section)]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label flex items-center gap-3 self-start">
              <span className="h-2 w-2 bg-cobalt" aria-hidden="true" />
              What we hold to
            </p>
            <Lines id="values-title" className="h2 mt-6" lines={["Four commitments", "we keep."]} />
          </div>
          <ol className="lg:col-span-7" data-anim="stagger">
            {values.map((v, i) => (
              <li
                key={v.title}
                className="group grid grid-cols-[64px_1fr] gap-4 border-t border-rule py-8 transition-colors duration-500 last:border-b hover:border-cobalt"
              >
                <span className="x-wide text-[28px] font-semibold leading-none tracking-[-0.04em] text-cobalt">0{i + 1}</span>
                <div className="transition-transform duration-700 ease-[cubic-bezier(.2,.7,.1,1)] group-hover:translate-x-2">
                  <h3 className="h3">{v.title}</h3>
                  <p className="mt-2 max-w-[52ch] text-[16px] text-muted">{v.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ProofLedger />

      <section aria-labelledby="founders-title" className="wrap section">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="label flex items-center gap-3 self-start lg:col-span-4">
            <span className="h-2 w-2 bg-cobalt" aria-hidden="true" />
            Who you work with
          </p>
          <Lines id="founders-title" className="h2 lg:col-span-8" lines={["The people on", "your programme."]} />
        </div>
        <div className="mt-16 md:mt-20">
          <Founders />
        </div>
      </section>

      <div className="border-t border-rule">
        <Accreditations />
      </div>
      <CtaBand />
    </>
  );
}
