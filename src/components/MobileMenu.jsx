import { useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import Button from "./Button.jsx";

export default function MobileMenu({ open, onClose, links = [] }) {
  // lock body scroll when menu is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev;
    return () => (document.body.style.overflow = prev);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          className="relative z-50 md:hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white ring-1 ring-black/10 shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-black/5">
              <Dialog.Title className="font-semibold tracking-tight text-amber-800">
                WoodWorks
              </Dialog.Title>
              <button
                aria-label="Close menu"
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-black/5"
              >
                <X className="size-6" />
              </button>
            </div>

            {/* Links */}
            <nav className="px-5 py-4 grid gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={onClose}
                  className="rounded-xl border border-black/5 px-4 py-3 text-base text-neutral-800 hover:bg-amber-50"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                >
                  {l.label}
                </motion.a>
              ))}
              <Button as="a" href="#contact" className="mt-2">
                Get a Quote
              </Button>
            </nav>

            {/* Footer / contact */}
            <div className="mt-auto px-5 py-5 border-t border-black/5 text-sm text-neutral-700">
              <div className="font-medium text-neutral-900">Contact</div>
              <ul className="mt-2 space-y-1">
                <li>+91 98xx-xxx-xxx</li>
                <li>sales@woodworks.example</li>
                <li>NH-27, Industrial Area, Guwahati</li>
              </ul>
            </div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
