import React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { dbRepository } from "@/db";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { formatCurrency } from "@/lib/utils";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import { adminDeleteProduct } from "@/app/actions/admin";

export default async function AdminProductsPage() {
  const session = await getSession();
  if (!session || session.role === "CUSTOMER") {
    redirect("/admin/login");
  }

  const products = await dbRepository.getProducts({ publishedOnly: false });

  return (
    <AdminLayout userEmail={session.email} userRole={session.role}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#30363d]">
          <div>
            <h1 className="text-xl font-semibold text-white">Products &amp; Inventory Management</h1>
            <p className="text-xs text-neutral-400 mt-1">
              Catalog specifications, pricing, stock levels, and publish status.
            </p>
          </div>
          <Link
            href="/admin/products/new"
            className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-medium rounded transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Product</span>
          </Link>
        </div>

        {/* ── DESKTOP TABLE (hidden on mobile) ── */}
        <div className="hidden sm:block bg-[#161b22] border border-[#30363d] rounded-lg overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-[#21262d] text-neutral-400 uppercase text-[10px] tracking-wider border-b border-[#30363d]">
              <tr>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Visibility</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363d]">
              {products.map((p) => {
                const img = p.images?.[0]?.url || "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=100&q=80";

                return (
                  <tr key={p.id} className="hover:bg-[#1c2128] transition-colors">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="relative w-10 h-12 bg-[#0d1117] border border-[#30363d] flex-shrink-0 overflow-hidden rounded">
                        <Image src={img} alt={p.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-white truncate max-w-xs">{p.name}</p>
                        <p className="text-[11px] text-neutral-500 truncate">{p.category?.name || "Footwear"}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-neutral-400">{p.sku}</td>
                    <td className="py-3 px-4 font-medium text-white">{formatCurrency(p.price)}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-[#21262d] text-neutral-300 border border-[#30363d]">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {p.isPublished ? (
                        <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Published
                        </span>
                      ) : (
                        <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                          Draft
                        </span>
                      )}
                      <p className="text-[10px] text-neutral-500 mt-0.5">
                        {p.images?.length || 0} media assets
                      </p>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/product/${p.slug}`}
                          target="_blank"
                          className="p-1 text-neutral-400 hover:text-white transition-colors"
                          title="View Live Store Page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/products/${p.id}`}
                          className="p-1 text-neutral-400 hover:text-[#d6be67] transition-colors"
                          title="Edit Product & Angles / Videos"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <form
                          action={async () => {
                            "use server";
                            await adminDeleteProduct(p.id);
                          }}
                        >
                          <button
                            type="submit"
                            className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── MOBILE CARD LIST (visible only on mobile) ── */}
        <div className="sm:hidden space-y-3">
          {products.length === 0 ? (
            <div className="bg-[#161b22] border border-[#30363d] p-8 text-center text-xs text-neutral-500 rounded-lg">
              No products in catalog yet.
            </div>
          ) : (
            products.map((p) => {
              const img = p.images?.[0]?.url || "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=100&q=80";
              return (
                <div key={p.id} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 flex gap-3">
                  <div className="relative w-14 h-16 bg-[#0d1117] border border-[#30363d] flex-shrink-0 overflow-hidden rounded">
                    <Image src={img} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div>
                      <p className="font-semibold text-white text-sm truncate">{p.name}</p>
                      <p className="text-[11px] text-neutral-500">{p.category?.name || "Footwear"} · {p.sku}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-white text-xs">{formatCurrency(p.price)}</span>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-[#21262d] text-neutral-300 border border-[#30363d]">
                        {p.status}
                      </span>
                      {p.isPublished ? (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Published
                        </span>
                      ) : (
                        <span className="text-[10px] text-neutral-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />Draft
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 pt-1 border-t border-[#30363d]">
                      <Link
                        href={`/product/${p.slug}`}
                        target="_blank"
                        className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </Link>
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-[#d6be67]"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await adminDeleteProduct(p.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
