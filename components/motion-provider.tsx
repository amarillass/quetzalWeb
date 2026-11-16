"use client";

import { MotionConfig } from "framer-motion";

// Turns off movement animations for visitors whose device is set to "reduce motion".
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
