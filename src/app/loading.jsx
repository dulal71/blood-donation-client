"use client";

import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie
        animationData={loadingAnimation}
        loop
        className="w-40 h-40"
      />
    </div>
  );
}