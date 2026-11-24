import Lines from "../Lines";
import { accreditations } from "@/content/site";

export default function Accreditations() {
  return (
    <section aria-labelledby="accred-title" className="wrap section">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label flex items-center gap-3 self-start">
            <span className="h-2 w-2 bg-cobalt" aria-hidden="true" />
            Accreditations
          </p>
          <Lines id="accred-title" className="h2 mt-6" lines={["Procured simply.", "Held to standard."]} />
        </div>
        <ul className="grid gap-px self-start border border-rule bg-rule sm:grid-cols-2 lg:col-span-7" data-anim="stagger">
          {accreditations.map((a) => (
            <li key={a.name} className="group relative isolate overflow-hidden bg-white p-7 md:p-8">
              <span
                className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-cobalt transition-transform duration-700 ease-[cubic-bezier(.2,.7,.1,1)] group-hover:scale-y-100"
                aria-hidden="true"
              />
              <span className="inline-block h-2.5 w-2.5 bg-cobalt transition-colors duration-500 group-hover:bg-white" aria-hidden="true" />
              <h3 className="h3 mt-8 transition-colors duration-500 group-hover:text-white">{a.name}</h3>
              <p className="mt-2 text-[15px] text-muted transition-colors duration-500 group-hover:text-on-cobalt">{a.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
