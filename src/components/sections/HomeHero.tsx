import Image from "next/image";
import Lines from "../Lines";
import Button from "../Button";
import { accreditations } from "@/content/site";

export default function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="wrap pt-[112px] md:pt-[min(132px,17vh)]" data-hero>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2" data-anim="fade">
          <p className="label flex items-center gap-3 self-start text-ink">
            <span className="h-2 w-2 bg-cobalt" aria-hidden="true" />
            GovTech consulting for the UK public sector
          </p>
          <p className="label hidden text-muted md:block">Central government · Local authorities · NHS · ALBs</p>
        </div>

        <Lines
          as="h1"
          id="hero-title"
          hero
          className="display mt-[min(4vh,36px)]"
          lines={[
            "Public services,",
            "delivered from",
            <span key="i">
              the <span className="text-cobalt">inside.</span>
            </span>,
          ]}
        />

        <div className="mt-[min(5vh,48px)] grid gap-8 border-t border-ink pt-7 lg:grid-cols-12 lg:gap-10">
          <ul className="hidden flex-wrap gap-x-6 gap-y-2 self-start lg:col-span-5 lg:flex" aria-label="Accreditations" data-anim="fade">
            {accreditations.map((a) => (
              <li key={a.name} className="label flex items-center gap-2 text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-cobalt" aria-hidden="true" />
                {a.name}
              </li>
            ))}
          </ul>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="lead max-w-[54ch] !text-ink/75" data-anim="fade">
              Senior practitioners who have run government programmes, now helping central government, local
              authorities, the NHS and arm&rsquo;s-length bodies deliver change that lasts.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3" data-anim="rise">
              <Button href="/contact">Start a conversation</Button>
              <Button href="/services" variant="ghost">
                Explore our services
              </Button>
            </div>
          </div>
        </div>
      </div>

      <figure className="mt-16 md:mt-24">
        <div className="photo photo-duo relative h-[62vh] min-h-[380px] w-full md:h-[88vh]" data-anim="expand">
          <Image
            src="/images/hero.webp"
            alt="An ornate stone government building behind bare winter trees"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <figcaption className="label absolute bottom-6 left-[var(--gutter)] z-10 flex items-center gap-3 text-white">
            <span className="h-2 w-2 bg-white" aria-hidden="true" />
            Change built to last
          </figcaption>
        </div>
      </figure>
    </section>
  );
}
