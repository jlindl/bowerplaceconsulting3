/** Mark: a cobalt tile cut by a quarter arc, the "bower" reduced to one gesture. */
export function Mark({ size = 30, inverted = false }: { size?: number; inverted?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden="true">
      <rect width="30" height="30" fill={inverted ? "#FFFFFF" : "#1F3BFF"} />
      <path d="M8 30V22A14 14 0 0 1 22 8h8" fill="none" stroke={inverted ? "#1F3BFF" : "#FFFFFF"} strokeWidth="3.2" />
    </svg>
  );
}

export default function Logo({ inverted = false, descriptor = false }: { inverted?: boolean; descriptor?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 ${inverted ? "text-white" : "text-ink"}`}>
      <Mark inverted={inverted} />
      <span className="flex flex-col leading-none">
        <span className="x-wide text-[17px] font-semibold uppercase tracking-[0.02em]">Bower Place</span>
        {descriptor && (
          <span className={`label mt-1.5 !text-[11px] ${inverted ? "text-on-dark-muted" : "text-muted"}`}>
            Public sector consulting
          </span>
        )}
      </span>
    </span>
  );
}
