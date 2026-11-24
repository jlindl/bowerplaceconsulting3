import type { Metadata } from "next";
import Lines from "@/components/Lines";
import ContactForm from "@/components/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Bower Place. We reply within one working day, and every enquiry is treated in strict confidence.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section aria-labelledby="page-title" className="">
      <div className="wrap pt-[128px] md:pt-[176px]" data-hero>
        <p className="label flex items-center gap-3 self-start" data-anim="fade">
          <span className="h-2 w-2 bg-cobalt" aria-hidden="true" />
          Contact
        </p>
        <Lines
          as="h1"
          id="page-title"
          hero
          className="display mt-8"
          lines={["Start a", <span key="e" className="text-cobalt">conversation.</span>]}
        />
      </div>

      <div className="wrap mt-12">
        <div className="grid gap-16 border-t border-ink pt-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="lead max-w-[40ch]" data-anim="fade">
            Not sure which service fits? Let&rsquo;s talk. We reply within one working day, and every enquiry is
            treated in strict confidence.
          </p>

          <dl className="mt-12 border-t border-rule" data-anim="fade">
            <div className="border-b border-rule py-6">
              <dt className="label text-muted">Email</dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${site.email}`}
                  className="ulink break-words text-[clamp(18px,1.5vw,20px)] font-medium"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div className="border-b border-rule py-6">
              <dt className="label text-muted">Telephone</dt>
              <dd className="mt-2">
                <a href={site.phoneHref} className="ulink text-[clamp(18px,1.5vw,20px)] font-medium">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div className="border-b border-rule py-6">
              <dt className="label text-muted">Response</dt>
              <dd className="mt-2 text-[17px]">Within one working day</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ContactForm />
        </div>
      </div>
      </div>

      <div className="on-cobalt mt-[var(--section)] bg-cobalt text-white">
        <dl className="wrap grid gap-px py-16 md:grid-cols-3 md:py-24" data-anim="stagger">
          {[
            ["Response", "Within one working day"],
            ["Confidentiality", "Every enquiry in strict confidence"],
            ["Who we work with", "Public sector and government organisations only"],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-white/30 py-8 md:pr-10">
              <dt className="label text-on-cobalt">{k}</dt>
              <dd className="x-wide mt-4 text-[clamp(22px,2.2vw,32px)] font-semibold leading-[1.1] tracking-[-0.025em]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
