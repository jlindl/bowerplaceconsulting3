import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import MethodLedger from "@/components/sections/MethodLedger";
import Accreditations from "@/components/sections/Accreditations";
import CtaBand from "@/components/CtaBand";
import Button from "@/components/Button";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital transformation, major programme management and AI and cloud services for UK central government, local authorities, the NHS and arm's-length bodies.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        lines={["Three services.", <span key="e" className="text-cobalt">One senior team.</span>]}
        lead="Each service is led by people who have delivered it inside government, from the first strategy conversation to the benefits it was meant to bring."
      />

      <div className="wrap pt-12 md:pt-20">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-title`} className="group scroll-mt-24 py-16 md:py-24">
            <div className="h-px w-full bg-ink" data-anim="rule" />
            <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
              <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2 lg:col-start-7" : ""}`}>
                <p className="x-wide text-[clamp(56px,6vw,96px)] font-semibold leading-none tracking-[-0.05em] text-cobalt">{s.no}</p>
                <h2 id={`${s.slug}-title`} className="h1 mt-6">
                  {s.title}
                </h2>
                <p className="mt-6 max-w-[52ch] text-[18px] leading-relaxed text-ink/80" data-anim="fade">
                  {s.body}
                </p>
                <ul className="mt-10 border-t border-rule" data-anim="stagger">
                  {s.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-4 border-b border-rule py-4 text-[16px] transition-[padding,color] duration-500 hover:pl-2 hover:text-cobalt"
                    >
                      <span className="inline-block h-2 w-2 shrink-0 bg-cobalt" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-10" data-anim="rise">
                  <Button href={`/contact?service=${s.slug}`}>{s.cta}</Button>
                </div>
              </div>
              <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : "lg:col-start-8"}`}>
                <div className="lg:sticky lg:top-28">
                  <div className="photo aspect-[4/5] w-full" data-anim="img">
                    <Image src={s.image} alt={s.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <MethodLedger />
      <div className="border-t border-rule">
        <Accreditations />
      </div>
      <CtaBand />
    </>
  );
}
