"use client";

import { ArrowUpRight } from "lucide-react";

import { Lead } from "@/services/leads.service";

interface RecentLeadsProps {
  leads: Lead[];
  loading: boolean;
}

const formatRelativeTime = (dateString: string) => {
  const createdAt = new Date(dateString).getTime();
  const now = Date.now();
  const difference = Math.max(0, now - createdAt);

  const minutes = Math.floor(difference / 60000);

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export default function RecentLeads({ leads, loading }: RecentLeadsProps) {
  const recentLeads = [...leads]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 4);

  return (
    <section className="min-w-0 rounded-2xl border border-[#202832] bg-[#0c0f13] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#718096]">
            Activity
          </p>

          <h2 className="mt-1 text-lg font-semibold tracking-tight text-[#f8fafc]">
            Recent leads
          </h2>
        </div>

        <button className="text-[#718096] transition-colors hover:text-[#22d3ee]">
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 space-y-1">
        {loading ? (
          <div className="py-8 text-center text-xs text-[#718096]">
            Loading leads...
          </div>
        ) : recentLeads.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#718096]">
            No leads yet
          </div>
        ) : (
          recentLeads.map((lead) => (
            <div
              key={lead.id}
              className="flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-[#171c23]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(34,211,238,0.1)] text-xs font-semibold text-[#22d3ee]">
                {lead.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#f8fafc]">
                  {lead.name}
                </p>

                <p className="truncate text-xs text-[#718096]">
                  {lead.company}
                </p>
              </div>

              <div className="hidden text-right sm:block">
                <p className="text-xs font-semibold text-[#f8fafc]">
                  {lead.score}
                </p>

                <p className="text-[10px] text-[#718096]">{lead.stage}</p>
              </div>

              <span className="shrink-0 text-[10px] text-[#718096]">
                {formatRelativeTime(lead.createdAt)}
              </span>
            </div>
          ))
        )}
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-1 border-t border-[#202832] pt-4 text-xs font-semibold text-[#22d3ee] transition-colors hover:text-[#67e8f9]">
        View all leads
        <ArrowUpRight className="h-3.5 w-3.5" />
      </button>
    </section>
  );
}
