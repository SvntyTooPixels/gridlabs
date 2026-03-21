"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function DeviceOrientationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if the device requires an explicit user action for gyroscope permission (iOS 13+)
    if (
      typeof window !== "undefined" &&
      typeof (DeviceOrientationEvent as any) !== "undefined" &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      const hasRequested = localStorage.getItem("gyro-permission-requested");
      if (!hasRequested) {
        setShowPrompt(true);
      }
    }
  }, []);

  const handleRequest = async () => {
    try {
      const permissionState = await (DeviceOrientationEvent as any).requestPermission();
      // Even if denied, we don't want to ask again and annoy the user.
      localStorage.setItem("gyro-permission-requested", "true");
      setShowPrompt(false);
    } catch (error) {
      console.error("Gyroscope permission error:", error);
      localStorage.setItem("gyro-permission-requested", "true");
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("gyro-permission-requested", "true");
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div 
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 50, x: "-50%" }}
          className="fixed bottom-6 left-1/2 w-[90%] max-w-[320px] z-50 flex flex-col items-center gap-3 rounded-2xl border border-white/20 bg-slate-900/90 p-4 shadow-2xl backdrop-blur-xl sm:max-w-md sm:flex-row sm:justify-between"
        >
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-sm font-semibold text-white">Enable 3D Motion</span>
            <span className="text-xs text-slate-300 mt-1">
              Allow gyroscope access for immersive parallax effects.
            </span>
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            <button
              onClick={handleDismiss}
              className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20 sm:flex-none"
            >
              Skip
            </button>
            <button
              onClick={handleRequest}
              className="flex-1 rounded-xl bg-[linear-gradient(135deg,#2563eb,#ec4899,#14b8a6)] px-4 py-2 text-xs font-bold text-white shadow-lg transition hover:scale-[1.02] sm:flex-none"
            >
              Enable
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
