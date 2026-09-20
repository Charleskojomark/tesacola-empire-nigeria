import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { dbRepository } from "@/db";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminSaveProduct } from "@/app/actions/admin";

export default async function AdminNewProductPage() {
  const session = await getSession();
  if (!session || session.role === "CUSTOMER") {
    redirect("/admin/login");
  }

  const categories = await dbRepository.getCategories();

  async function createProductAction(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const categoryId = formData.get("categoryId") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const fullDescription = formData.get("fullDescription") as string;
    const material = formData.get("material") as string;
    const colour = formData.get("colour") as string;
    const construction = formData.get("construction") as string;
    const sku = formData.get("sku") as string;
    const imageUrl = formData.get("imageUrl") as string;

    await adminSaveProduct({
      name,
      price,
      categoryId,
      shortDescription,
      fullDescription,
      material,
      colour,
      construction,
      sku: sku || `TSA-MN-${Date.now()}`,
      status: "IN_STOCK",
      images: imageUrl
        ? [{ id: `img-${Date.now()}`, productId: "", url: imageUrl, altText: name, isMain: true, sortOrder: 1, createdAt: new Date().toISOString() }]
        : [],
    });

    redirect("/admin/products");
  }

  return (
    <AdminLayout userEmail={session.email} userRole={session.role}>
      <div className="max-w-3xl space-y-6">
        <div className="pb-4 border-b border-[#30363d]">
          <h1 className="text-xl font-semibold text-white">Create New Product Dossier</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Add a new handcrafted article to the master Tesacola commercial database.
          </p>
        </div>

        <form action={createProductAction} className="bg-[#161b22] border border-[#30363d] p-6 rounded-lg space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-neutral-400 mb-1">Product Title *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Tesacola Regent Chelsea Boot"
                className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Category Classification *</label>
              <select
                name="categoryId"
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
              <label className="block text-neutral-400 mb-1">SKU Reference</label>
              <input
                type="text"
                name="sku"
                placeholder="TSA-MN-CHL-001"
                className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Retail Price (NGN) *</label>
              <input
                type="number"
                name="price"
                required
                min={0}
                placeholder="165000"
                className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Primary Image URL</label>
              <input
                type="url"
                name="imageUrl"
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-neutral-400 mb-1">Short Editorial Summary *</label>
              <textarea
                name="shortDescription"
                required
                rows={2}
                placeholder="Concise overview of leather cut and aesthetic profile..."
                className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-neutral-400 mb-1">Full Technical Description *</label>
              <textarea
                name="fullDescription"
                required
                rows={4}
                placeholder="Detailed explanation of lasting, ergonomics, and leather behavior..."
                className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Material Specification</label>
              <input
                type="text"
                name="material"
                placeholder="Full-grain vegetable-tanned steerhide"
                className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Construction Technique</label>
              <input
                type="text"
                name="construction"
                placeholder="Blake-stitched leather sole"
                className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#30363d] flex items-center justify-end gap-3">
            <Link
              href="/admin/products"
              className="px-4 py-2 border border-[#30363d] hover:bg-[#21262d] text-neutral-300 rounded"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-5 py-2 bg-[#238636] hover:bg-[#2ea043] text-white font-medium rounded"
            >
              Save Product Record
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
