"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Lead } from "@/services/leads.service";

interface LeadPerformanceProps {
  leads: Lead[];
  loading: boolean;
}

const QUALIFIED_SCORE = 70;

export default function LeadPerformance({
  leads,
  loading,
}: LeadPerformanceProps) {
  const data = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));

    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const dayLeads = leads.filter((lead) => {
      const createdAt = new Date(lead.createdAt);

      return createdAt >= date && createdAt < nextDate;
    });

    const qualified = dayLeads.filter(
      (lead) => lead.score >= QUALIFIED_SCORE,
    ).length;

    return {
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      leads: dayLeads.length,
      qualified,
    };
  });

  return (
    <section className="min-w-0 rounded-2xl border border-[#202832] bg-[#0c0f13] p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#718096]">
            Performance
          </p>

          <h2 className="mt-1 text-lg font-semibold tracking-tight text-[#f8fafc]">
            Lead performance
          </h2>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#718096]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#22d3ee]" />
            Leads
          </span>

          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#818cf8]" />
            Qualified
          </span>
        </div>
      </div>

      <div className="mt-6 h-[260px] w-full min-w-0">
        {loading ? (
          <div className="flex h-full items-center justify-center text-xs text-[#718096]">
            Loading performance...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid
                stroke="#202832"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#718096", fontSize: 11 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#718096", fontSize: 11 }}
                width={28}
                allowDecimals={false}
              />

              <Tooltip
                cursor={{ stroke: "#303b48" }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #202832",
                  background: "#12161c",
                  color: "#f8fafc",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.35)",
                }}
                labelStyle={{
                  color: "#a8b3c2",
                }}
              />

              <Area
                type="monotone"
                dataKey="leads"
                stroke="#22d3ee"
                fill="rgba(34, 211, 238, 0.08)"
                strokeWidth={2}
              />

              <Area
                type="monotone"
                dataKey="qualified"
                stroke="#818cf8"
                fill="rgba(129, 140, 248, 0.05)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
