import { useState } from "react";
import Container from "./container.jsx";
import Button from "./Button.jsx";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu.jsx";

const links = [
  { href: "#products", label: "Products" },
  { href: "#features", label: "Why Us" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a href="#" className="font-semibold tracking-tight text-amber-800">
          WoodWorks
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-neutral-700 hover:text-amber-800 transition"
            >
              {l.label}
            </a>
          ))}
          <Button as="a" href="#contact">
            Get a Quote
          </Button>
        </nav>

        {/* Mobile trigger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-black/5"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="size-6" />
        </button>
      </Container>

      {/* Mobile drawer */}
      <MobileMenu open={open} onClose={() => setOpen(false)} links={links} />
    </header>
  );
}
