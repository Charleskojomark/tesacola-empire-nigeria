"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface AudioContextType {
  isSoundEnabled: boolean;
  isPlaying: boolean;
  volume: number;
  isSilentRoute: boolean;
  toggleSound: () => void;
  setVolume: (vol: number) => void;
}

const AudioContext = createContext<AudioContextType>({
  isSoundEnabled: false,
  isPlaying: false,
  volume: 0.4,
  isSilentRoute: false,
  toggleSound: () => {},
  setVolume: () => {},
});

// Routes that must strictly remain silent according to brand direction Point 37
const SILENT_PREFIXES = [
  "/shop",
  "/product",
  "/checkout",
  "/cart",
  "/order-confirmation",
  "/fit-guide",
  "/care",
  "/colours",
  "/admin",
  "/custom",
  "/contact",
];

export function AudioProvider({ children }: { children: React.ReactNode }) {
  // STRICT REQUIREMENT (Point 37): Sound OFF by default. No automatic playback.
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  // Determine if current route must remain silent
  const isSilentRoute = Boolean(
    pathname && SILENT_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  );

  // Initialize audio element when ready (prepared for future original composition)
  useEffect(() => {
    // Only instantiated in browser
    if (typeof window !== "undefined") {
      const audio = new Audio();
      audio.loop = true;
      audio.volume = volume;
      // Audio source is initially empty until client provides original composition (Point 37)
      audioRef.current = audio;

      return () => {
        audio.pause();
        audio.src = "";
        audioRef.current = null;
      };
    }
  }, []);

  // Update volume
  const setVolume = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  };

  // Mute / pause if transitioning to a silent route
  useEffect(() => {
    if (isSilentRoute && audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isSilentRoute, isPlaying]);

  const toggleSound = () => {
    if (isSilentRoute) return;

    const nextState = !isSoundEnabled;
    setIsSoundEnabled(nextState);

    if (!audioRef.current) return;

    if (nextState) {
      // If client provides an audio source in future:
      if (audioRef.current.src) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        // Architecture ready; no audio file wired yet (Point 37)
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current.src) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isSoundEnabled,
        isPlaying: isPlaying && !isSilentRoute,
        volume,
        isSilentRoute,
        toggleSound,
        setVolume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
