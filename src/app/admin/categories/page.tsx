import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { dbRepository } from "@/db";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { FolderTree, Plus, Check } from "lucide-react";

export default async function AdminCategoriesPage() {
  const session = await getSession();
  if (!session || session.role === "CUSTOMER") {
    redirect("/admin/login");
  }

  const categories = await dbRepository.getCategories(false);

  async function createCategoryAction(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    await dbRepository.createCategory({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      description,
      sortOrder: 10,
      isActive: true,
    });
    redirect("/admin/categories");
  }

  return (
    <AdminLayout userEmail={session.email} userRole={session.role}>
      <div className="space-y-6">
        <div className="pb-6 border-b border-[#30363d]">
          <h1 className="text-xl font-semibold text-white">Product Category Management</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Maintain hierarchical shopping taxonomy. Categories update in real-time across the storefront.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Categories — Desktop Table */}
          <div className="lg:col-span-8 space-y-3">
            <div className="hidden sm:block bg-[#161b22] border border-[#30363d] rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-[#21262d] text-neutral-400 uppercase text-[10px] tracking-wider border-b border-[#30363d]">
                  <tr>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Slug</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#30363d]">
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-10 text-center text-neutral-500">No categories yet.</td>
                    </tr>
                  ) : categories.map((c) => (
                    <tr key={c.id} className="hover:bg-[#1c2128]">
                      <td className="py-3 px-4 font-semibold text-white">{c.name}</td>
                      <td className="py-3 px-4 font-mono text-neutral-400">{c.slug}</td>
                      <td className="py-3 px-4 text-neutral-400 max-w-xs truncate font-light">
                        {c.description || "—"}
                      </td>
                      <td className="py-3 px-4">
                        {c.isActive ? (
                          <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            Active
                          </span>
                        ) : (
                          <span className="text-[11px] text-neutral-500">Archived</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List */}
            <div className="sm:hidden space-y-2">
              {categories.length === 0 ? (
                <div className="bg-[#161b22] border border-[#30363d] p-8 text-center text-xs text-neutral-500 rounded-lg">
                  No categories yet.
                </div>
              ) : categories.map((c) => (
                <div key={c.id} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-white">{c.name}</p>
                    {c.isActive ? (
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" />Active
                      </span>
                    ) : (
                      <span className="text-[11px] text-neutral-500">Archived</span>
                    )}
                  </div>
                  <p className="font-mono text-neutral-500 text-[11px]">{c.slug}</p>
                  {c.description && <p className="text-neutral-400 font-light">{c.description}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Add Form */}
          <div className="lg:col-span-4 bg-[#161b22] border border-[#30363d] p-6 rounded-lg space-y-4 text-xs">
            <h2 className="font-semibold text-white uppercase tracking-wider text-[11px] pb-2 border-b border-[#30363d]">
              Add New Category
            </h2>
            <form action={createCategoryAction} className="space-y-4">
              <div>
                <label className="block text-neutral-400 mb-1">Category Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Travel &amp; Luggage"
                  className="w-full bg-[#0d1117] border border-[#30363d] p-2 text-white rounded focus:border-[#d6be67] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">URL Slug</label>
                <input
                  type="text"
                  name="slug"
                  placeholder="travel-luggage"
                  className="w-full bg-[#0d1117] border border-[#30363d] p-2 text-white rounded focus:border-[#d6be67] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Editorial overview of category products..."
                  className="w-full bg-[#0d1117] border border-[#30363d] p-2 text-white rounded focus:border-[#d6be67] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#238636] hover:bg-[#2ea043] text-white font-medium rounded transition-colors"
              >
                Create Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
