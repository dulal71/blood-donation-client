"use client";

import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loading animation.json";

export default function Loading({
  text = "Loading...",
  size = 180,
}) {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center">
      <Lottie
        animationData={loadingAnimation}
        loop
        className="pointer-events-none"
        style={{ width: size, height: size }}
      />

      <p className="text-sm text-zinc-500">{text}</p>
    </div>
  );
}