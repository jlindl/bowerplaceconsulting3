import Button from "@/components/Button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[88vh] flex-col justify-center pb-24 pt-[140px]">
      <p className="label flex items-center gap-3 self-start">
        <span className="h-2 w-2 bg-cobalt" aria-hidden="true" />
        Error 404
      </p>
      <h1 className="display mt-8">
        This page is
        <br />
        <span className="text-cobalt">off the record.</span>
      </h1>
      <p className="lead mt-8 max-w-[48ch]">
        The page may have moved, or the link may be out of date. Everything we do is one step away.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Button href="/">Back to the homepage</Button>
        <Button href="/contact" variant="ghost">
          Start a conversation
        </Button>
      </div>
    </section>
  );
}
