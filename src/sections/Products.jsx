import { motion } from "motion/react";
import Container from "../components/Container";

const images = import.meta.glob("../assets/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  as: "url",
});

const products = [
  {
    name: "Plywood MR (Commercial)",
    spec: "12, 16, 18mm",
    img: "plywood-mr.jpg",
  },
  { name: "Plywood BWR / BWP", spec: "6–19mm", img: "plywood-bwr.webp" },
  { name: "Blockboard", spec: "19mm", img: "blockboard.jpg" },
  { name: "MDF & HDF", spec: "3–18mm", img: "mdf.jpg" },
  { name: "Laminates", spec: "0.8–1mm", img: "laminate.jpg" },
  { name: "Veneers", spec: "Natural & Recon", img: "veneer.webp" },
];

export default function Products() {
  return (
    <section
      id="products"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-amber-50/40"
    >
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold">Popular Products</h2>
          <p className="mt-3 text-neutral-700">
            Ask for custom sizes and bulk pricing.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => {
            const src = images[`../assets/${p.img}`]; // resolves to hashed URL at build
            return (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.03 }}
                className="card overflow-hidden"
              >
                <div className="relative aspect-[4/3] bg-neutral-100">
                  {src ? (
                    <img
                      src={src}
                      alt={p.name}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-neutral-500 text-xs">
                      {/* Fallback if image file is missing */}
                      {p.img} not found in /src/assets
                    </div>
                  )}
                </div>

                <div className="p-5 text-center md:text-left">
                  <div className="font-medium">{p.name}</div>
                  <div className="mt-1 text-sm text-neutral-600">{p.spec}</div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
