"use client";

import { useEffect, useMemo, useState } from "react";
import { Bot, GitBranch, Layers3, ShieldCheck } from "lucide-react";

import HeroOverview from "@/components/dashboard/HeroOverview";
import StatCard from "@/components/dashboard/StatCard";
import LeadPerformance from "@/components/dashboard/LeadPerformance";
import RecentLeads from "@/components/dashboard/RecentLeads";
import { getLeads, type Lead } from "@/services/leads.service";

const QUALIFIED_SCORE = 70;

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLeads = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getLeads();

        if (!response.success) {
          throw new Error(response.message || "Failed to load leads");
        }

        setLeads(response.data);
      } catch (error) {
        console.error("Dashboard leads error:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load dashboard data",
        );
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, []);

  const activeLeads = leads.length;

  const qualifiedLeads = useMemo(
    () => leads.filter((lead) => lead.score >= QUALIFIED_SCORE).length,
    [leads],
  );

  const stats = [
    {
      label: "Active Leads",
      value: loading ? "—" : String(activeLeads),
      change: loading ? "Loading" : "Live data",
      icon: Layers3,
    },
    {
      label: "AI Qualified",
      value: loading ? "—" : String(qualifiedLeads),
      change: loading ? "Loading" : `Score ≥ ${QUALIFIED_SCORE}`,
      icon: Bot,
    },
    {
      label: "Automations",
      value: "—",
      change: "n8n connected",
      icon: GitBranch,
    },
    {
      label: "Success Rate",
      value: "—",
      change: "Not available",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <HeroOverview />

      {error && (
        <div className="mt-5 rounded-xl border border-[#FB7185]/20 bg-[#FB7185]/[0.06] px-4 py-3 text-sm text-[#FDA4AF]">
          {error}
        </div>
      )}

      <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <LeadPerformance leads={leads} loading={loading} />
        <RecentLeads leads={leads} loading={loading} />
      </div>
    </div>
  );
}
