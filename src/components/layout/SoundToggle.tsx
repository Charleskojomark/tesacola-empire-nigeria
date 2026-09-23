"use client";

import React from "react";
import { useAudio } from "@/lib/audio-context";
import { Volume2, VolumeX } from "lucide-react";

export function SoundToggle({ className = "" }: { className?: string }) {
  const { isSoundEnabled, isSilentRoute, toggleSound } = useAudio();

  if (isSilentRoute) {
    return null;
  }

  return (
    <button
      onClick={toggleSound}
      type="button"
      aria-label={isSoundEnabled ? "Mute ambient brand audio" : "Enable ambient brand audio"}
      aria-pressed={isSoundEnabled}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] uppercase tracking-widest transition-all duration-300 ${
        isSoundEnabled
          ? "border-[#d6be67] text-[#d6be67] bg-[#d6be67]/10"
          : "border-white/20 text-neutral-400 hover:text-white hover:border-white/40 bg-black/40"
      } ${className}`}
      title={
        isSoundEnabled
          ? "Sound ON (Tesacola Ambient Atmosphere)"
          : "Sound OFF (Click to enable atmospheric sound when available)"
      }
    >
      {isSoundEnabled ? (
        <Volume2 className="w-3 h-3 text-[#d6be67] animate-pulse" />
      ) : (
        <VolumeX className="w-3 h-3" />
      )}
      <span className="font-light">
        Sound <strong className="font-normal">{isSoundEnabled ? "ON" : "OFF"}</strong>
      </span>
    </button>
  );
}
