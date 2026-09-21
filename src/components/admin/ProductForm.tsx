"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Category, Product, ProductImage, ProductStatus } from "@/types";
import { MediaGalleryManager } from "./MediaGalleryManager";
import { adminSaveProduct } from "@/app/actions/admin";
import { Loader2, Save, ArrowLeft } from "lucide-react";

interface ProductFormProps {
  categories: Category[];
  initialProduct?: Product;
}

export function ProductForm({ categories, initialProduct }: ProductFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(initialProduct?.name || "");
  const [sku, setSku] = useState(initialProduct?.sku || "");
  const [price, setPrice] = useState<number>(initialProduct?.price || 165000);
  const [categoryId, setCategoryId] = useState(
    initialProduct?.categoryId || categories[0]?.id || ""
  );
  const [status, setStatus] = useState<ProductStatus>(
    initialProduct?.status || "IN_STOCK"
  );
  const [isFeatured, setIsFeatured] = useState(initialProduct?.isFeatured || false);
  const [isPublished, setIsPublished] = useState(
    initialProduct?.isPublished !== undefined ? initialProduct.isPublished : true
  );
  const [shortDescription, setShortDescription] = useState(
    initialProduct?.shortDescription || ""
  );
  const [fullDescription, setFullDescription] = useState(
    initialProduct?.fullDescription || ""
  );
  const [material, setMaterial] = useState(initialProduct?.material || "");
  const [colour, setColour] = useState(initialProduct?.colour || "");
  const [construction, setConstruction] = useState(
    initialProduct?.construction || ""
  );
  const [productionTime, setProductionTime] = useState(
    initialProduct?.productionTime || "10–14 business days"
  );
  const [deliveryInfo, setDeliveryInfo] = useState(
    initialProduct?.deliveryInfo || "Complimentary insured delivery within Nigeria. International courier via DHL Express."
  );
  const [careInstructions, setCareInstructions] = useState(
    initialProduct?.careInstructions || "Condition quarterly with natural beeswax cream. Insert cedar shoe trees immediately after wear."
  );

  const [media, setMedia] = useState<ProductImage[]>(
    initialProduct?.images || []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Product title is required.");
      return;
    }
    if (!price || price <= 0) {
      setError("Valid retail price is required.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const payload: Partial<Product> & { name: string; price: number; categoryId: string } = {
        ...(initialProduct?.id ? { id: initialProduct.id } : {}),
        name: name.trim(),
        sku: sku.trim() || `TSA-${Date.now()}`,
        price: Number(price),
        categoryId,
        status,
        isFeatured,
        isPublished,
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim(),
        material: material.trim(),
        colour: colour.trim(),
        construction: construction.trim(),
        productionTime: productionTime.trim(),
        deliveryInfo: deliveryInfo.trim(),
        careInstructions: careInstructions.trim(),
        images: media,
      };

      const result = await adminSaveProduct(payload);

      if (!result.success) {
        throw new Error(result.error || "Failed to save product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred while saving product.");
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#30363d]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-neutral-300 rounded transition-colors"
            title="Back to Products"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-white">
              {initialProduct ? `Edit Product: ${initialProduct.name}` : "Create New Product Dossier"}
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Configure catalog pricing, construction details, and 4+ angle media / videos.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2 border border-[#30363d] hover:bg-[#21262d] text-neutral-300 text-xs rounded transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2 bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 text-white text-xs font-semibold rounded flex items-center gap-2 transition-colors shadow-sm"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving Dossier...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{initialProduct ? "Update Product" : "Publish Product"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-950/50 border border-red-800 text-red-300 text-xs rounded">
          {error}
        </div>
      )}

      {/* 1. Media Gallery Section */}
      <section className="bg-[#161b22] border border-[#30363d] p-6 rounded-lg">
        <MediaGalleryManager
          initialMedia={initialProduct?.images}
          onChange={setMedia}
        />
      </section>

      {/* 2. Core Specifications */}
      <section className="bg-[#161b22] border border-[#30363d] p-6 rounded-lg space-y-5 text-xs">
        <h2 className="text-sm font-semibold text-white pb-2 border-b border-[#30363d]">
          General Information &amp; Classification
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-neutral-400 mb-1 font-medium">Product Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tesacola Regent Chelsea Boot"
              className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1 font-medium">Category Classification *</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-neutral-400 mb-1 font-medium">SKU Reference</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="TSA-MN-CHL-001"
              className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1 font-medium">Retail Price (NGN) *</label>
            <input
              type="number"
              required
              min={0}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="165000"
              className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1 font-medium">Commercial Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProductStatus)}
              className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
            >
              <option value="IN_STOCK">In Stock / Ready Dispatch</option>
              <option value="MADE_TO_ORDER">Made to Order / Bespoke</option>
              <option value="PRE_ORDER">Pre-Order</option>
              <option value="UNAVAILABLE">Unavailable / Archived</option>
            </select>
          </div>

          <div className="flex items-center gap-6 sm:col-span-2 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 rounded bg-[#0d1117] border-[#30363d] text-[#d6be67] focus:ring-[#d6be67]"
              />
              <span className="text-neutral-300">Publish in Storefront</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded bg-[#0d1117] border-[#30363d] text-[#d6be67] focus:ring-[#d6be67]"
              />
              <span className="text-neutral-300">Feature on Homepage Showcase</span>
            </label>
          </div>
        </div>
      </section>

      {/* 3. Editorial & Technical Specifications */}
      <section className="bg-[#161b22] border border-[#30363d] p-6 rounded-lg space-y-5 text-xs">
        <h2 className="text-sm font-semibold text-white pb-2 border-b border-[#30363d]">
          Artisanship &amp; Craftsmanship Specifications
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-neutral-400 mb-1 font-medium">Short Editorial Summary *</label>
            <textarea
              required
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Concise overview of leather cut and aesthetic profile..."
              className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-neutral-400 mb-1 font-medium">Full Technical Description *</label>
            <textarea
              required
              rows={4}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="Detailed explanation of lasting, ergonomics, and leather behavior..."
              className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1 font-medium">Material Specification</label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Full-grain vegetable-tanned calfskin"
              className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1 font-medium">Colour Shade</label>
            <input
              type="text"
              value={colour}
              onChange={(e) => setColour(e.target.value)}
              placeholder="Deep Espresso Burnished / Midnight Black"
              className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1 font-medium">Construction Technique</label>
            <input
              type="text"
              value={construction}
              onChange={(e) => setConstruction(e.target.value)}
              placeholder="Goodyear-welted / Blake-stitched leather sole"
              className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1 font-medium">Production Timeline</label>
            <input
              type="text"
              value={productionTime}
              onChange={(e) => setProductionTime(e.target.value)}
              placeholder="10–14 business days"
              className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-neutral-400 mb-1 font-medium">Delivery &amp; Logistics Notes</label>
            <input
              type="text"
              value={deliveryInfo}
              onChange={(e) => setDeliveryInfo(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-neutral-400 mb-1 font-medium">Care &amp; Preservation Instructions</label>
            <textarea
              rows={2}
              value={careInstructions}
              onChange={(e) => setCareInstructions(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#30363d] flex items-center justify-end gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2 border border-[#30363d] hover:bg-[#21262d] text-neutral-300 rounded transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 text-white font-semibold rounded flex items-center gap-2 transition-colors"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{initialProduct ? "Update Product Record" : "Save New Product Record"}</span>
              </>
            )}
          </button>
        </div>
      </section>
    </form>
  );
}
