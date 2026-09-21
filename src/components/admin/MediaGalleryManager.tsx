"use client";

import React, { useState, useRef } from "react";
import { ProductImage } from "@/types";
import {
  Upload,
  Video,
  Image as ImageIcon,
  Trash2,
  ChevronUp,
  ChevronDown,
  Plus,
  Star,
  Play,
  Film,
  Link as LinkIcon,
  Loader2,
  Check,
  Info,
} from "lucide-react";

export interface MediaSlot extends Omit<ProductImage, "id" | "productId" | "createdAt"> {
  id: string;
  label: string;
  isUploading?: boolean;
}

interface MediaGalleryManagerProps {
  initialMedia?: ProductImage[];
  onChange: (media: ProductImage[]) => void;
}

const DEFAULT_SLOTS: MediaSlot[] = [
  {
    id: "slot-1",
    label: "Angle 1: Front Profile",
    url: "",
    altText: "Front Angle",
    isMain: true,
    sortOrder: 1,
    mediaType: "IMAGE",
  },
  {
    id: "slot-2",
    label: "Angle 2: Lateral Profile",
    url: "",
    altText: "Lateral Profile",
    isMain: false,
    sortOrder: 2,
    mediaType: "IMAGE",
  },
  {
    id: "slot-3",
    label: "Angle 3: Sole & Stitching Detail",
    url: "",
    altText: "Sole & Stitching Detail",
    isMain: false,
    sortOrder: 3,
    mediaType: "IMAGE",
  },
  {
    id: "slot-4",
    label: "Angle 4: Video Reel / 360° Movement",
    url: "",
    altText: "Artisan Movement Video Reel",
    isMain: false,
    sortOrder: 4,
    mediaType: "VIDEO",
  },
];

export function MediaGalleryManager({
  initialMedia,
  onChange,
}: MediaGalleryManagerProps) {
  const [slots, setSlots] = useState<MediaSlot[]>(() => {
    if (initialMedia && initialMedia.length > 0) {
      return initialMedia.map((m, idx) => ({
        id: m.id || `slot-${idx + 1}`,
        label: m.altText || `Angle ${idx + 1}`,
        url: m.url,
        altText: m.altText || `Product Media ${idx + 1}`,
        isMain: m.isMain || idx === 0,
        sortOrder: m.sortOrder || idx + 1,
        mediaType: m.mediaType || (m.url?.match(/\.(mp4|webm|mov|ogg)(\?.*)?$/i) || m.url?.startsWith("data:video") ? "VIDEO" : "IMAGE"),
      }));
    }
    return DEFAULT_SLOTS;
  });

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const notifyChange = (updatedSlots: MediaSlot[]) => {
    const validMedia: ProductImage[] = updatedSlots
      .filter((s) => s.url.trim() !== "")
      .map((s, idx) => ({
        id: s.id,
        productId: "",
        url: s.url.trim(),
        altText: s.label || s.altText || `Media ${idx + 1}`,
        isMain: s.isMain,
        sortOrder: idx + 1,
        mediaType: s.mediaType,
        createdAt: new Date().toISOString(),
      }));
    onChange(validMedia);
  };

  const handleFileUpload = async (slotId: string, file: File) => {
    // Set slot to uploading state
    setSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, isUploading: true } : s))
    );

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.url) {
        setSlots((prev) => {
          const next = prev.map((s) => {
            if (s.id === slotId) {
              const detectedType = data.mediaType as "IMAGE" | "VIDEO";
              return {
                ...s,
                url: data.url,
                mediaType: detectedType,
                altText: s.label || file.name,
                isUploading: false,
              };
            }
            return s;
          });
          notifyChange(next);
          return next;
        });
      } else {
        // Fallback: Read as client Data URL directly
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          const isVideo = file.type.startsWith("video/") || /\.(mp4|webm|mov)$/i.test(file.name);
          const detectedType: "IMAGE" | "VIDEO" = isVideo ? "VIDEO" : "IMAGE";
          setSlots((prev) => {
            const next: MediaSlot[] = prev.map((s) =>
              s.id === slotId
                ? {
                    ...s,
                    url: dataUrl,
                    mediaType: detectedType,
                    isUploading: false,
                  }
                : s
            );
            notifyChange(next);
            return next;
          });
        };
        reader.readAsDataURL(file);
      }
    } catch {
      // Local client file reader fallback
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const isVideo = file.type.startsWith("video/") || /\.(mp4|webm|mov)$/i.test(file.name);
        const detectedType: "IMAGE" | "VIDEO" = isVideo ? "VIDEO" : "IMAGE";
        setSlots((prev) => {
          const next: MediaSlot[] = prev.map((s) =>
            s.id === slotId
              ? {
                  ...s,
                  url: dataUrl,
                  mediaType: detectedType,
                  isUploading: false,
                }
              : s
          );
          notifyChange(next);
          return next;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (slotId: string, url: string) => {
    setSlots((prev) => {
      const next = prev.map((s) => {
        if (s.id === slotId) {
          const isVideo =
            /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url) ||
            url.includes("youtube.com") ||
            url.includes("vimeo.com") ||
            url.startsWith("data:video");
          return {
            ...s,
            url,
            mediaType: isVideo ? ("VIDEO" as const) : s.mediaType,
          };
        }
        return s;
      });
      notifyChange(next);
      return next;
    });
  };

  const handleTypeToggle = (slotId: string, mediaType: "IMAGE" | "VIDEO") => {
    setSlots((prev) => {
      const next = prev.map((s) => (s.id === slotId ? { ...s, mediaType } : s));
      notifyChange(next);
      return next;
    });
  };

  const handleSetMain = (slotId: string) => {
    setSlots((prev) => {
      const next = prev.map((s) => ({
        ...s,
        isMain: s.id === slotId,
      }));
      notifyChange(next);
      return next;
    });
  };

  const handleRemoveSlot = (slotId: string) => {
    setSlots((prev) => {
      if (prev.length <= 1) {
        const next = [{ ...DEFAULT_SLOTS[0], url: "" }];
        notifyChange(next);
        return next;
      }
      const next = prev.filter((s) => s.id !== slotId);
      // Ensure at least one is main
      if (!next.some((s) => s.isMain) && next.length > 0) {
        next[0].isMain = true;
      }
      notifyChange(next);
      return next;
    });
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    setSlots((prev) => {
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const next = [...prev];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      notifyChange(next);
      return next;
    });
  };

  const handleAddSlot = () => {
    setSlots((prev) => {
      const nextNumber = prev.length + 1;
      const newSlot: MediaSlot = {
        id: `slot-${Date.now()}`,
        label: `Angle ${nextNumber}: Additional Perspective / Video`,
        url: "",
        altText: `Angle ${nextNumber}`,
        isMain: false,
        sortOrder: nextNumber,
        mediaType: nextNumber % 2 === 0 ? "VIDEO" : "IMAGE",
      };
      const next = [...prev, newSlot];
      notifyChange(next);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#30363d]">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Film className="w-4 h-4 text-[#d6be67]" />
            <span>Product Media Gallery (Angles &amp; Videos)</span>
          </h3>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Provide at least 4 distinct angle images or 4 videos to showcase master leatherwork, lasting, welt stitching, and movement reels.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddSlot}
          className="px-3 py-1.5 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#d6be67] text-xs font-medium rounded transition-colors flex items-center gap-1.5 self-start cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Media Slot</span>
        </button>
      </div>

      {/* Explanatory banner regarding Primary Thumbnail */}
      <div className="bg-[#12161c] border border-[#30363d] p-3 rounded-lg flex items-start gap-3 text-xs text-neutral-300">
        <Info className="w-4 h-4 text-[#d6be67] flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-semibold text-white">
            Storefront Primary Thumbnail:
          </p>
          <p className="text-neutral-400 text-[11px] leading-relaxed">
            The media marked with the <span className="text-[#d6be67] font-medium">Primary Store Thumbnail</span> badge is the main cover image shown on storefront catalog cards, search results, and homepage collections. Tap &ldquo;Set as Primary&rdquo; on any uploaded photo or video to designate it as the main cover.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slots.map((slot, index) => {
          const hasContent = slot.url.trim() !== "";

          return (
            <div
              key={slot.id}
              className={`p-4 rounded-lg border transition-all ${
                slot.isMain
                  ? "bg-[#1c2128] border-[#d6be67]/60 shadow-[0_0_15px_rgba(214,190,103,0.08)]"
                  : "bg-[#161b22] border-[#30363d] hover:border-neutral-600"
              }`}
            >
              {/* Header with Slot Title, Type Switch, and Actions (clean & fully responsive) */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                  <input
                    type="text"
                    value={slot.label}
                    onChange={(e) => {
                      const updated = slots.map((s) =>
                        s.id === slot.id ? { ...s, label: e.target.value } : s
                      );
                      setSlots(updated);
                      notifyChange(updated);
                    }}
                    placeholder={`Angle ${index + 1}`}
                    className="w-full bg-transparent text-xs font-semibold text-white border-b border-dashed border-neutral-600 focus:border-[#d6be67] focus:outline-none py-0.5"
                  />
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {/* Image vs Video Toggle */}
                  <div className="flex bg-[#0d1117] p-0.5 rounded border border-[#30363d]">
                    <button
                      type="button"
                      onClick={() => handleTypeToggle(slot.id, "IMAGE")}
                      className={`px-2 py-1 text-[10px] font-medium rounded flex items-center gap-1 transition-colors cursor-pointer ${
                        slot.mediaType === "IMAGE"
                          ? "bg-[#238636] text-white"
                          : "text-neutral-400 hover:text-white"
                      }`}
                      title="Set as Image"
                    >
                      <ImageIcon className="w-3 h-3" />
                      <span>Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTypeToggle(slot.id, "VIDEO")}
                      className={`px-2 py-1 text-[10px] font-medium rounded flex items-center gap-1 transition-colors cursor-pointer ${
                        slot.mediaType === "VIDEO"
                          ? "bg-[#8957e5] text-white"
                          : "text-neutral-400 hover:text-white"
                      }`}
                      title="Set as Video"
                    >
                      <Video className="w-3 h-3" />
                      <span>Video</span>
                    </button>
                  </div>

                  {/* Actions */}
                  <button
                    type="button"
                    onClick={() => handleMove(index, "up")}
                    disabled={index === 0}
                    className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Move up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(index, "down")}
                    disabled={index === slots.length - 1}
                    className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Move down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(slot.id)}
                    className="p-1 text-neutral-400 hover:text-red-400 cursor-pointer"
                    title="Remove slot"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Preview Stage with Elegant Floating Thumbnail Badge */}
              <div className="relative aspect-video w-full bg-[#0d1117] border border-[#30363d] rounded overflow-hidden mb-3 flex items-center justify-center">
                {/* Primary Store Thumbnail Floating Overlay Badge */}
                {slot.isMain && (
                  <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 bg-black/90 backdrop-blur-sm border border-[#d6be67] text-[#d6be67] text-[10px] font-semibold tracking-wider uppercase rounded shadow-lg flex items-center gap-1.5 pointer-events-none">
                    <Star className="w-3 h-3 fill-[#d6be67]" />
                    <span>Primary Store Thumbnail</span>
                  </div>
                )}

                {slot.isUploading ? (
                  <div className="flex flex-col items-center gap-2 text-neutral-400">
                    <Loader2 className="w-6 h-6 animate-spin text-[#d6be67]" />
                    <span className="text-[11px]">Uploading media asset...</span>
                  </div>
                ) : hasContent ? (
                  slot.mediaType === "VIDEO" ? (
                    <div className="relative w-full h-full group">
                      <video
                        src={slot.url}
                        controls
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-[#d6be67] font-mono border border-[#d6be67]/30 flex items-center gap-1 pointer-events-none">
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>VIDEO REEL</span>
                      </div>
                    </div>
                  ) : (
                    // Image Preview
                    <div className="relative w-full h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={slot.url}
                        alt={slot.label}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-neutral-300 font-mono border border-neutral-700 flex items-center gap-1">
                        <ImageIcon className="w-2.5 h-2.5" />
                        <span>PHOTO</span>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center gap-1 text-neutral-500 text-center px-4">
                    {slot.mediaType === "VIDEO" ? (
                      <Video className="w-8 h-8 text-neutral-600 mb-1" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-neutral-600 mb-1" />
                    )}
                    <p className="text-[11px] font-medium text-neutral-400">
                      No media loaded for {slot.label}
                    </p>
                    <p className="text-[10px] text-neutral-600">
                      Upload a local file or enter a hosted URL below
                    </p>
                  </div>
                )}
              </div>

              {/* Upload & URL Inputs */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={(el) => {
                      fileInputRefs.current[slot.id] = el;
                    }}
                    accept={
                      slot.mediaType === "VIDEO"
                        ? "video/mp4,video/webm,video/quicktime,video/*"
                        : "image/jpeg,image/png,image/webp,image/avif,image/*"
                    }
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(slot.id, file);
                    }}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRefs.current[slot.id]?.click()}
                    disabled={slot.isUploading}
                    className="flex-1 px-3 py-2 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white text-xs font-medium rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#d6be67]" />
                    <span>Upload {slot.mediaType === "VIDEO" ? "Video File (.mp4)" : "Image File"}</span>
                  </button>

                  {/* Explicit Primary Thumbnail Action Button */}
                  {slot.isMain ? (
                    <div className="px-2.5 sm:px-3 py-2 bg-[#d6be67]/15 border border-[#d6be67]/40 text-[#d6be67] text-xs font-semibold rounded flex items-center gap-1.5 flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Primary Cover</span>
                      <span className="sm:hidden">Primary</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSetMain(slot.id)}
                      className="px-2.5 sm:px-3 py-2 bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] hover:border-[#d6be67] text-neutral-400 hover:text-[#d6be67] text-xs font-medium rounded flex items-center gap-1.5 transition-colors flex-shrink-0 cursor-pointer"
                      title="Set this angle as the primary storefront thumbnail"
                    >
                      <Star className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Set as Primary</span>
                      <span className="sm:hidden">Make Main</span>
                    </button>
                  )}
                </div>

                {/* Direct URL Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <LinkIcon className="w-3 h-3 text-neutral-500" />
                  </div>
                  <input
                    type="text"
                    value={slot.url}
                    onChange={(e) => handleUrlChange(slot.id, e.target.value)}
                    placeholder={
                      slot.mediaType === "VIDEO"
                        ? "Or paste video URL (Cloudinary, Vimeo, MP4 CDN)"
                        : "Or paste image URL (Cloudinary, Unsplash, CDN)"
                    }
                    className="w-full pl-8 pr-2.5 py-1.5 bg-[#0d1117] border border-[#30363d] text-white text-[11px] rounded focus:border-[#d6be67] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
