import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "../lib/cn";

/**
 * TiltCard — mouse tilt on desktop, optional gyroscope on mobile.
 * props:
 *  - gyro: boolean (enable device orientation)
 *  - gyroMax: number (max tilt angle in degrees)
 */
export default function TiltCard({
  className = "",
  children,
  gyro = false,
  gyroMax = 12,
}) {
  const ref = useRef(null);

  // normalized cursor/orientation positions [0..1]
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // map to rotate angles; when gyro is on, use gyroMax
  const targetRx = useTransform(
    y,
    [0, 1],
    [gyro ? gyroMax : 10, gyro ? -gyroMax : -10]
  );
  const targetRy = useTransform(
    x,
    [0, 1],
    [gyro ? -gyroMax : -10, gyro ? gyroMax : 10]
  );

  const rx = useSpring(targetRx, { stiffness: 220, damping: 18 });
  const ry = useSpring(targetRy, { stiffness: 220, damping: 18 });
  const scale = useSpring(1, { stiffness: 220, damping: 18 });

  const [gyroActive, setGyroActive] = useState(false);
  const [needsPermission, setNeedsPermission] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (!gyro) return;
    const hasDO =
      typeof window !== "undefined" && "DeviceOrientationEvent" in window;
    setSupported(hasDO);
    if (!hasDO) return;

    // iOS requires explicit permission; Android usually doesn't
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      setNeedsPermission(true);
    } else {
      const detach = attachOrientation();
      return () => detach?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gyro]);

  function attachOrientation() {
    const handler = (e) => {
      // gamma: left/right (-90..90), beta: front/back (-180..180)
      const g = typeof e.gamma === "number" ? e.gamma : 0;
      const b = typeof e.beta === "number" ? e.beta : 0;
      const nx = (g + 90) / 180; // -> 0..1
      const ny = (b + 180) / 360; // -> 0..1
      x.set(Math.min(1, Math.max(0, nx)));
      y.set(Math.min(1, Math.max(0, ny)));
    };
    window.addEventListener("deviceorientation", handler, { passive: true });
    setGyroActive(true);
    return () => {
      window.removeEventListener("deviceorientation", handler);
      setGyroActive(false);
    };
  }

  async function requestPermission() {
    try {
      const state = await DeviceOrientationEvent.requestPermission();
      if (state === "granted") {
        setNeedsPermission(false);
        attachOrientation();
      } else {
        setNeedsPermission(false); // denied
      }
    } catch {
      setNeedsPermission(false);
    }
  }

  function onMove(e) {
    if (gyro && gyroActive) return; // ignore mouse when gyro is driving
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => scale.set(1.025)}
      onMouseLeave={() => {
        if (!gyroActive) {
          x.set(0.5);
          y.set(0.5);
        }
        scale.set(1);
      }}
      style={{ rotateX: rx, rotateY: ry, scale, transformPerspective: 900 }}
      className={cn(
        "relative will-change-transform transition-[box-shadow,filter] duration-300 hover:drop-shadow-xl",
        className
      )}
    >
      {children}

      {/* iOS prompt — requires a user gesture */}
      {gyro && supported && needsPermission && (
        <button
          type="button"
          onClick={requestPermission}
          className="absolute bottom-3 right-3 rounded-full bg-black/70 text-white text-xs px-3 py-1.5 backdrop-blur-sm"
        >
          Enable motion
        </button>
      )}
    </motion.div>
  );
}
