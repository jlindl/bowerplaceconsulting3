import type { ElementType } from "react";

/**
 * Splits text into word spans that fill from faint to solid as the reader scrolls.
 * Screen readers get the sentence once from an sr-only span; the animated words are hidden from them.
 */
export default function Words({
  as: Tag = "p",
  text,
  className = "",
  accent = [],
  accentClass = "text-cobalt",
  faint,
}: {
  as?: ElementType;
  text: string;
  className?: string;
  accent?: string[];
  accentClass?: string;
  faint?: string;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className} data-anim="words" data-faint={faint}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className={`w inline-block ${accent.includes(w.replace(/[.,]/g, "")) ? accentClass : ""}`}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
