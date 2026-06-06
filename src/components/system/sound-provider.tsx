"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type SoundContextType = {
  muted: boolean;
  toggleMute: () => void;
  playTick: () => void;
  playDrone: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

let globalAudioCtx: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!globalAudioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      globalAudioCtx = new AudioContextClass();
    }
  }
  if (globalAudioCtx && globalAudioCtx.state === "suspended") {
    globalAudioCtx.resume().catch(() => {});
  }
  return globalAudioCtx;
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false); // Default to unmuted now that toggle is removed

  useEffect(() => {
    const stored = localStorage.getItem("muted");
    if (stored !== null) {
      setMuted(stored === "true");
    }
  }, []);

  const toggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    localStorage.setItem("muted", String(nextMuted));
    
    // Resume context on user gesture
    if (!nextMuted) {
      getAudioContext();
    }
  };

  useEffect(() => {
    const resumeAudio = () => {
      if (!muted) {
        getAudioContext();
      }
    };
    window.addEventListener("click", resumeAudio);
    return () => window.removeEventListener("click", resumeAudio);
  }, [muted]);

  const playTick = () => {
    if (muted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(850, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);

      gainNode.gain.setValueAtTime(0.14, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  };

  const playDrone = () => {
    if (muted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filterNode = ctx.createBiquadFilter();
      const gainNode = ctx.createGain();

      osc1.connect(filterNode);
      osc2.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(55, now); // Low A note
      osc1.frequency.linearRampToValueAtTime(110, now + 2.2);

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(55.5, now); // Slightly detuned for width
      osc2.frequency.linearRampToValueAtTime(111, now + 2.2);

      filterNode.type = "lowpass";
      filterNode.frequency.setValueAtTime(80, now);
      filterNode.frequency.exponentialRampToValueAtTime(480, now + 0.8);
      filterNode.frequency.exponentialRampToValueAtTime(80, now + 2.2);

      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.28, now + 0.6);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 2.2);
      osc2.stop(now + 2.2);
    } catch (e) {
      console.warn("Audio drone playback failed", e);
    }
  };

  return (
    <SoundContext.Provider value={{ muted, toggleMute, playTick, playDrone }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}
