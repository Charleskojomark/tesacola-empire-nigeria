import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { dbRepository } from "@/db";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { formatDate } from "@/lib/utils";
import { adminUpdateBusinessEnquiry, adminDeleteBusinessEnquiry } from "@/app/actions/admin";
import { Briefcase, Building2, Globe2, ExternalLink, Trash2 } from "lucide-react";

export default async function AdminBusinessEnquiriesPage() {
  const session = await getSession();
  if (!session || session.role === "CUSTOMER") {
    redirect("/admin/login");
  }

  const enquiries = await dbRepository.getBusinessEnquiries();

  return (
    <AdminLayout userEmail={session.email} userRole={session.role}>
      <div className="space-y-6">
        <div className="pb-6 border-b border-[#30363d] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-semibold text-white">Commercial B2B &amp; Manufacturing Leads</h1>
            <p className="text-xs text-neutral-400 mt-1">
              Contract manufacturing enquiries, retail stockists, corporate gifting, and diaspora export leads.
            </p>
          </div>
          <span className="text-xs text-neutral-500">{enquiries.length} lead{enquiries.length === 1 ? "" : "s"}</span>
        </div>

        <div className="space-y-4">
          {enquiries.length === 0 ? (
            <div className="bg-[#161b22] border border-[#30363d] p-12 text-center text-xs text-neutral-500 rounded-lg">
              No commercial B2B inquiries logged in the database yet.
            </div>
          ) : (
            enquiries.map((enq) => (
              <div
                key={enq.id}
                className="bg-[#161b22] border border-[#30363d] p-6 rounded-lg space-y-4 text-xs"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-[#30363d] gap-2">
                  <div>
                    <span className="font-mono text-[#d6be67] font-medium text-xs">
                      {enq.referenceNumber}
                    </span>
                    <h3 className="font-semibold text-white text-sm mt-0.5">
                      {enq.businessName} &bull; <span className="font-normal text-neutral-400">{enq.country} ({enq.city})</span>
                    </h3>
                    <p className="text-[11px] text-neutral-500">
                      Contact: {enq.contactName} &bull; {enq.email} &bull; {enq.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="px-2.5 py-1 rounded text-[10px] font-semibold uppercase bg-purple-950 text-purple-300 border border-purple-800">
                      {enq.status}
                    </span>
                    <span className="text-neutral-500 text-[11px]">
                      {formatDate(enq.createdAt)}
                    </span>
                    {/* Delete Button */}
                    <form
                      action={async () => {
                        "use server";
                        await adminDeleteBusinessEnquiry(enq.id);
                      }}
                    >
                      <button
                        type="submit"
                        title="Delete this enquiry"
                        className="p-1.5 rounded text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
                        onClick={(e) => {
                          if (!confirm(`Delete commercial enquiry from ${enq.businessName}? This cannot be undone.`)) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#0d1117] p-4 rounded border border-[#21262d]">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">Partnership Model</span>
                    <strong className="text-white font-medium">{enq.businessType}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">Product Line &amp; Volume</span>
                    <span className="text-neutral-300">{enq.productCategory} (Vol: {enq.estimatedQuantity})</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">Target Horizon</span>
                    <span className="text-neutral-300">{enq.timeline || "Within 60–90 Days"}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase block">Commercial Brief &amp; Specifications</span>
                  <p className="text-neutral-300 leading-relaxed font-light">{enq.customRequirements}</p>
                </div>

                {enq.website && (
                  <div className="pt-1">
                    <a
                      href={enq.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#58a6ff] hover:underline text-[11px]"
                    >
                      <Globe2 className="w-3.5 h-3.5" />
                      <span>Corporate Portal: {enq.website}</span>
                    </a>
                  </div>
                )}

                {/* Status Update Action */}
                <form
                  action={async (formData: FormData) => {
                    "use server";
                    const status = formData.get("status") as any;
                    const notes = formData.get("notes") as string;
                    await adminUpdateBusinessEnquiry(enq.id, status, notes);
                  }}
                  className="pt-3 border-t border-[#30363d] flex flex-col sm:flex-row items-end gap-3"
                >
                  <div className="flex-1 w-full">
                    <label className="block text-neutral-500 text-[10px] uppercase mb-1">Commercial Desk Notes</label>
                    <input
                      type="text"
                      name="notes"
                      defaultValue={enq.internalNotes || ""}
                      placeholder="e.g. Sent sample leather swatches to UK address; initial 200-pair quote dispatched..."
                      className="w-full bg-[#0d1117] border border-[#30363d] p-2 text-white rounded text-xs focus:border-[#d6be67] focus:outline-none"
                    />
                  </div>

                  <div className="w-full sm:w-48">
                    <label className="block text-neutral-500 text-[10px] uppercase mb-1">Lead Status</label>
                    <select
                      name="status"
                      defaultValue={enq.status}
                      className="w-full bg-[#0d1117] border border-[#30363d] p-2 text-white rounded text-xs focus:border-[#d6be67] focus:outline-none"
                    >
                      <option value="NEW">NEW</option>
                      <option value="REVIEWING">REVIEWING</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="IN_DISCUSSION">IN_DISCUSSION</option>
                      <option value="QUOTED">QUOTED</option>
                      <option value="CONVERTED">CONVERTED</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 bg-[#21262d] hover:bg-[#30363d] text-white rounded font-medium transition-colors"
                  >
                    Update Lead
                  </button>
                </form>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
