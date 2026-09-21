import React from "react";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { dbRepository } from "@/db";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProductForm } from "@/components/admin/ProductForm";

interface AdminEditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditProductPage({ params }: AdminEditProductPageProps) {
  const { id } = await params;
  const session = await getSession();
  if (!session || session.role === "CUSTOMER") {
    redirect("/admin/login");
  }

  const [product, categories] = await Promise.all([
    dbRepository.getProductById(id),
    dbRepository.getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <AdminLayout userEmail={session.email} userRole={session.role}>
      <ProductForm categories={categories} initialProduct={product} />
    </AdminLayout>
  );
}
