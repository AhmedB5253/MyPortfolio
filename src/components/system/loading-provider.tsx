"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "@/components/system/loading-screen";

type LoadingContextType = {
  loading: boolean;
};

const LoadingContext = createContext<LoadingContextType>({ loading: true });

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoadedGlobal") === "true" || (window as any).__hasLoadedGlobal;
    if (hasLoaded) {
      setLoading(false);
    }
  }, []);

  // Prevent scroll when cinematic loading screen is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  const handleComplete = React.useCallback(() => {
    if (typeof window !== "undefined") {
      (window as any).__hasLoadedGlobal = true;
      sessionStorage.setItem("hasLoadedGlobal", "true");
    }
    setLoading(false);
  }, []);

  const hasLoadedGlobal = typeof window !== "undefined" && 
    ((window as any).__hasLoadedGlobal || sessionStorage.getItem("hasLoadedGlobal") === "true");

  return (
    <LoadingContext.Provider value={{ loading }}>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loading-screen" onComplete={handleComplete} />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: hasLoadedGlobal ? 0.3 : 1.2, ease: "easeInOut" }}
        style={{ pointerEvents: loading ? "none" : "auto" }}
      >
        {children}
      </motion.div>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
