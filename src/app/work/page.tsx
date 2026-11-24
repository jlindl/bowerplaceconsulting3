import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CaseReport from "@/components/sections/CaseReport";
import CtaBand from "@/components/CtaBand";
import { cases } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from central government, a metropolitan local authority, an NHS trust and an arm's-length body. Client names withheld; full details under NDA.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="Case studies"
        lines={["Work that", <span key="e" className="text-cobalt">speaks for itself.</span>]}
        lead="Four programmes across central government, local government, health and an arm's-length body. Client names are withheld by default, and full details are available under NDA."
      />
      <div className="wrap pt-8 md:pt-12">
        {cases.map((c, i) => (
          <CaseReport key={c.slug} c={c} index={i} />
        ))}
      </div>
      <CtaBand lines={["Facing a", "programme like", "one of these?"]} />
    </>
  );
}
