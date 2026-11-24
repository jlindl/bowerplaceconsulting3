import type { ElementType, ReactNode } from "react";

/** Renders explicit lines inside masks so they can rise on reveal. */
export default function Lines({
  as: Tag = "h2",
  lines,
  className = "",
  hero = false,
  id,
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  hero?: boolean;
  id?: string;
}) {
  return (
    <Tag className={className} data-anim="lines" id={id} {...(hero ? { "data-hero": "" } : {})}>
      {lines.map((l, i) => (
        <span className="line" key={i}>
          <span className="line-inner">{l}</span>
        </span>
      ))}
    </Tag>
  );
}
