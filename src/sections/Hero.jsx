import { motion } from "motion/react";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import heroImg from "../assets/hero.jpg";
import TiltCard from "../components/TiltCard.jsx";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(245,158,11,0.08),transparent_60%)]"
      />
      <Container className="py-20 md:py-28 grid gap-10 md:grid-cols-2 items-center">
        {/* Left text ... (unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl/tight md:text-5xl/tight font-semibold tracking-tight">
            Premium <span className="text-amber-800">Plywood</span> & Solid Wood
            for Business
          </h1>
          <p className="mt-4 text-neutral-700">
            We supply ISI-certified plywood, blockboard, MDF, laminates and
            veneers — hand-picked for durability, finish and value.
          </p>
          <div className="mt-8 flex items-center gap-4 justify-center md:justify-start">
            <Button as="a" href="#contact">
              Get a Quote
            </Button>
            <Button as="a" href="#products" variant="outline">
              Browse Products
            </Button>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600 justify-center md:justify-start">
            <li>Bulk & retail orders</li>
            <li>On-time delivery</li>
            <li>Custom sizes</li>
          </ul>
        </motion.div>

        {/* 3D image card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <TiltCard
            gyro
            gyroMax={14}
            className="group rounded-3xl overflow-hidden"
          >
            <figure className="relative rounded-3xl ring-1 ring-black/5 bg-white">
              <div className="aspect-[4/3]">
                <img
                  src={heroImg}
                  alt="Close-up of premium plywood sheets stacked neatly"
                  className="h-full w-full object-cover rounded-3xl transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  draggable={false}
                />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(60% 60% at 30% 20%, rgba(255,255,255,.18), transparent 60%), radial-gradient(60% 60% at 80% 0%, rgba(253,230,138,.15), transparent 45%)",
                }}
              />
            </figure>
          </TiltCard>
        </motion.div>
      </Container>
    </section>
  );
}
