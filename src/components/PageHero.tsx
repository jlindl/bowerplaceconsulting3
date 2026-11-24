import Image from "next/image";
import Lines from "./Lines";

export default function PageHero({
  label,
  lines,
  lead,
  image,
  alt,
  caption,
}: {
  label: string;
  lines: React.ReactNode[];
  lead: React.ReactNode;
  image?: string;
  alt?: string;
  caption?: string;
}) {
  return (
    <section aria-labelledby="page-title">
      <div className="wrap pt-[128px] md:pt-[176px]" data-hero>
        <p className="label flex items-center gap-3 self-start" data-anim="fade">
          <span className="h-2 w-2 bg-cobalt" aria-hidden="true" />
          {label}
        </p>
        <Lines as="h1" id="page-title" hero className="display mt-8" lines={lines} />
        <div className="mt-10 grid gap-6 border-t border-ink pt-7 lg:grid-cols-12">
          <p className="lead max-w-[54ch] lg:col-span-6 lg:col-start-7" data-anim="fade">
            {lead}
          </p>
        </div>
      </div>
      {image && (
        <figure className="mt-16 md:mt-24">
          <div className="photo photo-duo relative h-[56vh] min-h-[320px] w-full md:h-[80vh]" data-anim="expand">
            <Image src={image} alt={alt ?? ""} fill priority sizes="100vw" className="object-cover" />
            {caption && (
              <figcaption className="label absolute bottom-6 left-[var(--gutter)] z-10 flex items-center gap-3 text-white">
                <span className="h-2 w-2 bg-white" aria-hidden="true" />
                {caption}
              </figcaption>
            )}
          </div>
        </figure>
      )}
    </section>
  );
}
