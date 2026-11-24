import Lines from "../Lines";
import Words from "../Words";
import { principles } from "@/content/site";

export default function Principles() {
  return (
    <section aria-labelledby="why-title" className="on-dark bg-ink text-white">
      <div className="wrap section">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="label flex items-center gap-3 self-start text-on-dark-muted lg:col-span-4">
            <span className="h-2 w-2 bg-cobalt" aria-hidden="true" />
            Why Bower Place
          </p>
          <Lines
            id="why-title"
            className="h2 lg:col-span-8"
            lines={["The public sector", "deserves better than", "generic consulting."]}
          />
        </div>

        <Words
          className="x-wide mt-20 max-w-[22ch] text-[clamp(30px,4.6vw,72px)] font-semibold leading-[1.02] tracking-[-0.035em] md:mt-32 lg:ml-[33.4%] lg:max-w-none"
          text="Large consultancies bring scale but little accountability. Smaller firms bring agility but not breadth. We built Bower Place to offer both."
          accent={["both"]}
        />

        <ol className="mt-20 grid gap-px bg-rule-dark md:mt-32 md:grid-cols-2 lg:grid-cols-4" data-anim="stagger">
          {principles.map((p, i) => (
            <li key={p.title} className="group relative overflow-hidden bg-ink p-7 md:p-9">
              <span
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-cobalt transition-transform duration-700 ease-[cubic-bezier(.2,.7,.1,1)] group-hover:scale-x-100"
                aria-hidden="true"
              />
              <span className="label text-on-dark-muted">0{i + 1}</span>
              <h3 className="h3 mt-10 md:mt-16">{p.title}</h3>
              <p className="mt-3 text-[16px] text-on-dark-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
