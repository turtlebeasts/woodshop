// src/components/TiltCard.jsx
import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "../lib/cn";

/**
 * TiltCard — blends gyro + mouse/pointer tilt.
 *
 * Props:
 *  - gyro: boolean           (enable device orientation)
 *  - mouse: boolean          (enable pointer hover/drag)
 *  - gyroMax: number         (deg contribution from gyro)
 *  - mouseMax: number        (deg contribution from pointer)
 *  - gyroWeight: number      (0..1: weight of gyro vs pointer)
 *  - hoverScale: number
 */
export default function TiltCard({
  className = "",
  children,
  gyro = false,
  mouse = true,
  gyroMax = 12,
  mouseMax = 10,
  gyroWeight = 0.6,
  hoverScale = 1.025,
}) {
  const ref = useRef(null);

  // normalized inputs [0..1]
  const gx = useMotionValue(0.5);
  const gy = useMotionValue(0.5);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  // compute blended angles (separate ranges for gyro & mouse, then mix by weight)
  const rotXTarget = useTransform([gy, my], ([gyv, myv]) => {
    const aGy = (0.5 - gyv) * 2 * gyroMax; // map [0..1] -> [+gyroMax .. -gyroMax]
    const aMs = (0.5 - myv) * 2 * mouseMax; // map [0..1] -> [+mouseMax .. -mouseMax]
    return gyroWeight * aGy + (1 - gyroWeight) * aMs;
  });

  const rotYTarget = useTransform([gx, mx], ([gxv, mxv]) => {
    const aGy = (gxv - 0.5) * 2 * gyroMax; // map [0..1] -> [-gyroMax .. +gyroMax]
    const aMs = (mxv - 0.5) * 2 * mouseMax;
    return gyroWeight * aGy + (1 - gyroWeight) * aMs;
  });

  const rotateX = useSpring(rotXTarget, { stiffness: 220, damping: 18 });
  const rotateY = useSpring(rotYTarget, { stiffness: 220, damping: 18 });
  const scale = useSpring(1, { stiffness: 220, damping: 18 });

  // gyro wiring
  const [gyroActive, setGyroActive] = useState(false);
  const [needsPermission, setNeedsPermission] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (!gyro) return;
    const hasDO =
      typeof window !== "undefined" && "DeviceOrientationEvent" in window;
    setSupported(hasDO);
    if (!hasDO) return;

    const needsReq =
      typeof DeviceOrientationEvent.requestPermission === "function";
    if (needsReq) {
      setNeedsPermission(true);
    } else {
      const detach = attachOrientation();
      return () => detach?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gyro]);

  function attachOrientation() {
    const handle = (e) => {
      const g = typeof e.gamma === "number" ? e.gamma : 0; // left/right (-90..90)
      const b = typeof e.beta === "number" ? e.beta : 0; // front/back (-180..180)
      // normalize to [0..1]
      const nx = (g + 90) / 180;
      const ny = (b + 180) / 360;
      gx.set(Math.min(1, Math.max(0, nx)));
      gy.set(Math.min(1, Math.max(0, ny)));
    };
    window.addEventListener("deviceorientation", handle, { passive: true });
    setGyroActive(true);
    return () => {
      window.removeEventListener("deviceorientation", handle);
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
        setNeedsPermission(false);
      }
    } catch {
      setNeedsPermission(false);
    }
  }

  // pointer (mouse/touch/pen)
  function onPointerMove(e) {
    if (!mouse) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerEnter={() => mouse && scale.set(hoverScale)}
      onPointerLeave={() => {
        if (mouse) {
          mx.set(0.5);
          my.set(0.5);
          scale.set(1);
        }
      }}
      style={{ rotateX, rotateY, scale, transformPerspective: 900 }}
      className={cn(
        "relative will-change-transform transition-[box-shadow,filter] duration-300 hover:drop-shadow-xl",
        className
      )}
    >
      {children}

      {/* iOS motion permission prompt */}
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
