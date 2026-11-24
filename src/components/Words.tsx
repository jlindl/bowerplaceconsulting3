import type { ElementType } from "react";

/** Splits text into word spans that fill from faint to solid as the reader scrolls. */
export default function Words({
  as: Tag = "p",
  text,
  className = "",
  accent = [],
}: {
  as?: ElementType;
  text: string;
  className?: string;
  accent?: string[];
}) {
  const words = text.split(" ");
  return (
    <Tag className={className} data-anim="words" aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className={`w inline-block ${accent.includes(w.replace(/[.,]/g, "")) ? "text-cobalt" : ""}`}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
