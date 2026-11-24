import HomeHero from "@/components/sections/HomeHero";
import ProofLedger from "@/components/sections/ProofLedger";
import Marquee from "@/components/sections/Marquee";
import ServiceRows from "@/components/sections/ServiceRows";
import Principles from "@/components/sections/Principles";
import MethodLedger from "@/components/sections/MethodLedger";
import CaseStack from "@/components/sections/CaseStack";
import Founders from "@/components/sections/Founders";
import CtaBand from "@/components/CtaBand";
import Lines from "@/components/Lines";
import Button from "@/components/Button";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <Marquee />
      <ProofLedger />
      <ServiceRows />
      <Principles />
      <MethodLedger />

      <section aria-labelledby="work-title" className="bg-paper-2">
        <div className="wrap section">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="label flex items-center gap-3 self-start">
                <span className="h-2 w-2 bg-cobalt" aria-hidden="true" />
                Selected work
              </p>
              <Lines id="work-title" className="h1 mt-6" lines={["Work that", "speaks for itself."]} />
            </div>
            <p className="text-[16px] text-muted lg:col-span-4 lg:col-start-9" data-anim="fade">
              Client names are withheld by default. Full details are available under NDA.
            </p>
          </div>
          <CaseStack />
          <div className="mt-6 flex justify-end" data-anim="rise">
            <Button href="/work" variant="ghost">
              Read the full case studies
            </Button>
          </div>
        </div>
      </section>

      <section aria-labelledby="founders-title">
        <div className="wrap section">
          <div className="grid gap-8 lg:grid-cols-12">
            <p className="label flex items-center gap-3 self-start lg:col-span-4">
              <span className="h-2 w-2 bg-cobalt" aria-hidden="true" />
              Who you work with
            </p>
            <Lines
              id="founders-title"
              className="h2 lg:col-span-8"
              lines={["Founded by people", "who have run", "the programmes."]}
            />
          </div>
          <div className="mt-16 md:mt-20">
            <Founders />
          </div>
          <div className="mt-10 flex justify-end" data-anim="rise">
            <Button href="/about" variant="ghost">
              More about Bower Place
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
