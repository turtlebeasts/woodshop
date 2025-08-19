import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "../lib/cn";

export default function TiltCard({ className = "", children }) {
  const ref = useRef(null);
  const x = useMotionValue(0.5); // cursor X [0..1]
  const y = useMotionValue(0.5); // cursor Y [0..1]

  // map cursor to rotation angles
  const rx = useSpring(useTransform(y, [0, 1], [10, -10]), {
    stiffness: 220,
    damping: 18,
  });
  const ry = useSpring(useTransform(x, [0, 1], [-10, 10]), {
    stiffness: 220,
    damping: 18,
  });
  const scale = useSpring(1, { stiffness: 220, damping: 18 });

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => scale.set(1.025)}
      onMouseLeave={() => {
        x.set(0.5);
        y.set(0.5);
        scale.set(1);
      }}
      style={{ rotateX: rx, rotateY: ry, scale, transformPerspective: 900 }}
      className={cn(
        "will-change-transform transition-[box-shadow,filter] duration-300",
        "hover:drop-shadow-xl",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
