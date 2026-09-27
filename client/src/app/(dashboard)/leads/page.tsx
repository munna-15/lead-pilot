"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { LoaderCircle, Plus, Users } from "lucide-react";

import AddLeadModal from "@/components/leads/AddLeadModal";
import LeadsTable from "@/components/leads/LeadsTable";
import { getLeads, type Lead } from "@/services/leads.service";

export default function LeadsPage() {
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getLeads();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch leads");
      }

      setLeads(Array.isArray(response.data) ? response.data : []);
    } catch (error: unknown) {
      console.error("Fetch leads error:", error);

      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };

        setError(axiosError.response?.data?.message || "Failed to load leads");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to load leads");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const leadStats = useMemo(() => {
    const today = new Date();

    const newToday = leads.filter((lead) => {
      if (!lead.createdAt) {
        return false;
      }

      const createdAt = new Date(lead.createdAt);

      return (
        createdAt.getFullYear() === today.getFullYear() &&
        createdAt.getMonth() === today.getMonth() &&
        createdAt.getDate() === today.getDate()
      );
    }).length;

    return [
      {
        label: "Total Leads",
        value: leads.length,
      },
      {
        label: "Hot Leads",
        value: leads.filter((lead) => lead.status === "HOT").length,
      },
      {
        label: "Warm Leads",
        value: leads.filter((lead) => lead.status === "WARM").length,
      },
      {
        label: "New Today",
        value: newToday,
      },
    ];
  }, [leads]);

  const handleLeadCreated = async () => {
    setIsAddLeadOpen(false);
    await fetchLeads();
  };

  return (
    <div className="p-5 sm:p-8">
      <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-[#64748B]">
            <Users className="h-4 w-4" />
            Lead management
          </div>

          <h2 className="mt-2 font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-[-0.03em] text-[#F1F5F9] sm:text-4xl">
            Leads
          </h2>

          <p className="mt-3 max-w-xl text-base leading-7 text-[#94A3B8]">
            Capture, qualify, and manage every lead from one centralized
            workspace.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddLeadOpen(true)}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#38BDF8] px-5 text-sm font-semibold text-[#061014] transition-colors duration-200 hover:bg-[#7DD3FC]"
        >
          <Plus className="h-4 w-4" />
          Add lead
        </button>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {leadStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#1B222C] bg-[#0D1014] p-5 transition-colors duration-200 hover:border-[#283341]"
          >
            <p className="text-sm font-medium text-[#64748B]">{stat.label}</p>

            <p className="mt-2 font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-[-0.025em] text-[#F1F5F9]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-7">
        {loading ? (
          <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-[#1B222C] bg-[#0D1014]">
            <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
              <LoaderCircle className="h-5 w-5 animate-spin" />
              Loading leads...
            </div>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-[#3A2024] bg-[#120D0F] p-6">
            <p className="text-sm font-medium text-[#F1F5F9]">
              Unable to load leads
            </p>

            <p className="mt-2 text-sm leading-6 text-[#94A3B8]">{error}</p>

            <button
              type="button"
              onClick={fetchLeads}
              className="mt-4 inline-flex h-10 items-center rounded-lg border border-[#283341] px-4 text-sm font-medium text-[#CBD5E1] transition-colors hover:bg-[#151A20]"
            >
              Try again
            </button>
          </div>
        ) : (
          <LeadsTable leads={leads} />
        )}
      </div>

      <AddLeadModal
        open={isAddLeadOpen}
        onClose={() => setIsAddLeadOpen(false)}
        onLeadCreated={handleLeadCreated}
      />
    </div>
  );
}
