import { motion } from "motion/react";
import Container from "../components/Container";
import { ShieldCheck, Truck, CheckCircle2, Trees } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Certified Quality",
    body: "ISI & moisture resistant grades with consistent core.",
  },
  {
    icon: Truck,
    title: "Reliable Logistics",
    body: "Local delivery with careful handling and tracking.",
  },
  {
    icon: CheckCircle2,
    title: "Fair Pricing",
    body: "Tiered rates for retailers, contractors & bulk buyers.",
  },
  {
    icon: Trees,
    title: "Sustainable Sourcing",
    body: "Responsibly sourced wood products wherever possible.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-24">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold">Why choose WoodWorks?</h2>
          <p className="mt-3 text-neutral-700">
            We focus on durability, finish, and business-friendly service.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="card p-6"
            >
              <it.icon className="size-6 text-amber-800" />
              <div className="mt-3 font-medium">{it.title}</div>
              <p className="mt-1 text-sm text-neutral-600">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
