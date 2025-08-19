import Container from "../components/container.jsx";
import Button from "../components/Button.jsx";

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <Container className="grid gap-10 md:grid-cols-2">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-semibold">Request a quote</h2>
          <p className="mt-3 text-neutral-700">
            Tell us what you need — product type, thickness, quantity, delivery
            location — and we’ll respond quickly.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-neutral-700">
            <li>Phone: +91 98xx-xxx-xxx</li>
            <li>Email: sales@woodworks.example</li>
            <li>Address: NH-27, Industrial Area, Guwahati</li>
          </ul>
        </div>

        <form className="card p-6 grid gap-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              className="mt-1 w-full rounded-xl border-neutral-300"
              placeholder="Your name"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Phone</label>
              <input
                className="mt-1 w-full rounded-xl border-neutral-300"
                placeholder="+91 ..."
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="mt-1 w-full rounded-xl border-neutral-300"
                placeholder="you@company.com"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">What do you need?</label>
            <textarea
              rows="4"
              className="mt-1 w-full rounded-xl border-neutral-300"
              placeholder="e.g., 50 sheets of BWP plywood, 19mm"
            />
          </div>
          <Button type="submit" className="justify-self-start">
            Send Request
          </Button>
          <p className="text-xs text-neutral-500">
            Submitting won’t actually send anywhere (demo). Hook up your backend
            or form service later.
          </p>
        </form>
      </Container>
    </section>
  );
}
