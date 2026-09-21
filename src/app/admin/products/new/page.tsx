import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { dbRepository } from "@/db";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function AdminNewProductPage() {
  const session = await getSession();
  if (!session || session.role === "CUSTOMER") {
    redirect("/admin/login");
  }

  const categories = await dbRepository.getCategories();

  return (
    <AdminLayout userEmail={session.email} userRole={session.role}>
      <ProductForm categories={categories} />
    </AdminLayout>
  );
}
