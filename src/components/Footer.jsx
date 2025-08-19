import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 bg-white text-center md:text-left">
      <Container className="py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-semibold text-amber-800">WoodWorks</div>
          <p className="mt-2 text-sm text-neutral-600">
            Premium plywood & wood products for retailers, contractors, and
            small businesses.
          </p>
        </div>
        <div>
          <div className="font-semibold">Contact</div>
          <ul className="mt-2 text-sm text-neutral-700">
            <li>+91 98xx-xxx-xxx</li>
            <li>sales@woodworks.example</li>
            <li>NH-27, Industrial Area, Guwahati</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Hours</div>
          <ul className="mt-2 text-sm text-neutral-700">
            <li>Mon–Sat: 9:00 – 19:00</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
      </Container>
      <div className="text-center py-6 text-xs text-neutral-500">
        © {new Date().getFullYear()} WoodWorks. All rights reserved.
      </div>
    </footer>
  );
}
