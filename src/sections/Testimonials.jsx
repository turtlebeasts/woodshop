import { motion } from "motion/react";
import Container from "../components/Container";

const quotes = [
  {
    name: "Sharma Traders",
    body: "Consistent quality and on-time deliveries. Our customers are happy.",
    role: "Retailer",
  },
  {
    name: "NorthEast Interiors",
    body: "Great pricing on BWP sheets. Zero warping issues in our projects.",
    role: "Contractor",
  },
  {
    name: "BuildRight",
    body: "Responsive team. They helped us source custom sizes quickly.",
    role: "Distributor",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold">
            Trusted by local businesses
          </h2>
          <p className="mt-3 text-neutral-700">
            Here’s what partners say about us.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="card p-6 text-center md:text-left"
            >
              <blockquote className="text-neutral-800">“{q.body}”</blockquote>
              <figcaption className="mt-4 text-sm text-neutral-600">
                <span className="font-medium text-neutral-800">{q.name}</span> —{" "}
                {q.role}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
