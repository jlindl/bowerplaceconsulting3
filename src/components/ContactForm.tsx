"use client";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { services, site } from "@/content/site";

type Errors = Partial<Record<"name" | "email" | "org" | "message", string>>;

export default function ContactForm() {
  const [service, setService] = useState("General enquiry");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    const match = services.find((s) => s.slug === slug);
    if (match) setService(match.title);
  }, []);

  function check(name: keyof Errors, raw: string): string | undefined {
    const value = raw.trim();
    if (name === "name" && !value) return "Enter your full name.";
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Enter a work email in the format name@organisation.gov.uk.";
    if (name === "org" && !value) return "Enter the name of your organisation.";
    if (name === "message" && value.length < 10) return "Add a sentence or two about your programme so we can reply usefully.";
    return undefined;
  }

  // Validate as people go: on leaving a field they have typed in, and live once an error is showing.
  function onFieldEvent(e: React.FocusEvent<HTMLFormElement> | React.FormEvent<HTMLFormElement>) {
    const t = e.target as HTMLInputElement;
    const name = t.name as keyof Errors;
    if (!["name", "email", "org", "message"].includes(name)) return;
    const isBlur = e.type === "blur";
    if (!errors[name] && !(isBlur && t.value.trim())) return;
    setErrors((prev) => ({ ...prev, [name]: check(name, t.value) }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) ?? "");
    const next: Errors = {};
    (["name", "email", "org", "message"] as const).forEach((k) => {
      const err = check(k, v(k));
      if (err) next[k] = err;
    });
    setErrors(next);
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }
    const subject = `${v("service")}: enquiry from ${v("org").trim()}`;
    const body = `Name: ${v("name").trim()}\nEmail: ${v("email").trim()}\nOrganisation: ${v("org").trim()}\nService interest: ${v("service")}\n\n${v("message").trim()}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const done = sent && (
      <div ref={statusRef} tabIndex={-1} role="status" className="border-t border-ink pt-10 outline-none">
        <p className="label text-cobalt">Almost there</p>
        <h2 className="h2 mt-5">Your email is ready to send.</h2>
        <p className="mt-5 max-w-[46ch] text-[17px] text-muted">
          We have opened your email app with your message addressed to {site.email}. Press send there and we will
          reply within one working day. If nothing opened, email us directly at{" "}
          <a className="ulink text-ink" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
        <button type="button" onClick={() => setSent(false)} className="arrow-link mt-8">
          <span className="u">Edit your message</span>
        </button>
      </div>
  );

  const field = (id: keyof Errors, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label htmlFor={id} className="label text-muted">
        {label}
      </label>
      <input
        id={id}
        name={id}
        className="field"
        aria-invalid={errors[id] ? true : undefined}
        aria-describedby={errors[id] ? `${id}-err` : undefined}
        {...props}
      />
      {errors[id] && (
        <p id={`${id}-err`} className="mt-2 text-[14px] text-[#c0261a]">
          {errors[id]}
        </p>
      )}
    </div>
  );

  return (
    <>
    {done}
    <form
      hidden={sent}
      noValidate
      onSubmit={onSubmit}
      onBlur={onFieldEvent}
      onInput={onFieldEvent}
      className="border-t border-ink pt-10"
      aria-labelledby="form-title"
    >
      <h2 id="form-title" className="h3">
        Tell us about your programme
      </h2>
      <div className="mt-10 grid gap-9 sm:grid-cols-2 sm:gap-x-8">
        {field("name", "Full name", { autoComplete: "name", required: true })}
        {field("email", "Work email", { type: "email", autoComplete: "email", required: true })}
        {field("org", "Organisation", { autoComplete: "organization", required: true })}
        <div>
          <label htmlFor="service" className="label text-muted">
            Service interest
          </label>
          <select
            id="service"
            name="service"
            className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22><path d=%22M1 1l5 5 5-5%22 fill=%22none%22 stroke=%22%2314261f%22 stroke-width=%221.4%22/></svg>')] bg-[length:12px_8px] bg-[right_2px_center] bg-no-repeat pr-8"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            {services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
            <option>General enquiry</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="label text-muted">
            How can we help?
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="field resize-y"
            required
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-err" : undefined}
          />
          {errors.message && (
            <p id="message-err" className="mt-2 text-[14px] text-[#c0261a]">
              {errors.message}
            </p>
          )}
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[40ch] text-[14px] text-muted" id="form-note">
          We work exclusively with public sector and government organisations. This opens your email app with your
          message ready to send.
        </p>
        <Button type="submit" className="shrink-0" describedBy="form-note">
          Continue to email
        </Button>
      </div>
    </form>
    </>
  );
}
