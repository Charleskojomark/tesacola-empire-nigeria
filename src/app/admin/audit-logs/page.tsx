import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { dbRepository } from "@/db";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { formatDate } from "@/lib/utils";
import { ShieldAlert, Activity } from "lucide-react";

export default async function AdminAuditLogsPage() {
  const session = await getSession();
  if (!session || session.role === "CUSTOMER") {
    redirect("/admin/login");
  }

  const logs = await dbRepository.getAuditLogs();

  return (
    <AdminLayout userEmail={session.email} userRole={session.role}>
      <div className="space-y-6">
        <div className="pb-6 border-b border-[#30363d]">
          <h1 className="text-xl font-semibold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#d6be67]" />
            <span>Administrative Audit Trail</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Immutable system activity log recording status changes, price updates, and record alterations.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block bg-[#161b22] border border-[#30363d] rounded-lg overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-[#21262d] text-neutral-400 uppercase text-[10px] tracking-wider border-b border-[#30363d]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Operator</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">Operational Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363d]">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-neutral-500">
                    No privileged actions logged yet during this session.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#1c2128]">
                    <td className="py-3 px-4 text-neutral-400 font-mono text-[11px]">
                      {new Date(log.createdAt).toLocaleTimeString()} &bull; {formatDate(log.createdAt)}
                    </td>
                    <td className="py-3 px-4 text-white font-medium">{log.userEmail}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[#21262d] text-[#d6be67] border border-[#30363d]">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-neutral-400">
                      {log.entityType} #{log.entityId.slice(0, 8)}
                    </td>
                    <td className="py-3 px-4 text-neutral-300 font-light">{log.details}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List */}
        <div className="sm:hidden space-y-3">
          {logs.length === 0 ? (
            <div className="bg-[#161b22] border border-[#30363d] p-8 text-center text-xs text-neutral-500 rounded-lg">
              No privileged actions logged yet.
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 text-xs space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[#21262d] text-[#d6be67] border border-[#30363d]">
                    {log.action}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono flex-shrink-0">
                    {new Date(log.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-white font-medium">{log.userEmail}</p>
                <p className="text-neutral-400 font-mono text-[11px]">
                  {log.entityType} #{log.entityId.slice(0, 8)} &bull; {formatDate(log.createdAt)}
                </p>
                {log.details && <p className="text-neutral-300 font-light border-t border-[#30363d] pt-2">{log.details}</p>}
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
