"use client";

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Clock3,
  TrendingUp,
  Users,
} from "lucide-react";

const overviewStats = [
  {
    label: "Total leads",
    value: "128",
    change: "+12.4%",
    trend: "up",
    icon: Users,
  },
  {
    label: "AI qualified",
    value: "94",
    change: "+8.2%",
    trend: "up",
    icon: Bot,
  },
  {
    label: "Conversion rate",
    value: "18.7%",
    change: "+3.4%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    label: "Automation success",
    value: "98.4%",
    change: "+2.1%",
    trend: "up",
    icon: CheckCircle2,
  },
];

const pipeline = [
  {
    label: "New",
    value: 32,
    percentage: 25,
  },
  {
    label: "Contacted",
    value: 48,
    percentage: 38,
  },
  {
    label: "Nurture",
    value: 28,
    percentage: 22,
  },
  {
    label: "Converted",
    value: 20,
    percentage: 15,
  },
];

const activity = [
  {
    label: "Leads captured",
    value: "128",
    change: "+12.4%",
    icon: Users,
  },
  {
    label: "AI qualifications",
    value: "94",
    change: "+8.2%",
    icon: Bot,
  },
  {
    label: "Follow-ups sent",
    value: "67",
    change: "+14.1%",
    icon: Clock3,
  },
  {
    label: "Successful runs",
    value: "98.4%",
    change: "+2.1%",
    icon: Activity,
  },
];

const sources = [
  {
    name: "Website",
    leads: 82,
    percentage: 64,
  },
  {
    name: "Direct",
    leads: 24,
    percentage: 19,
  },
  {
    name: "Referral",
    leads: 14,
    percentage: 11,
  },
  {
    name: "Other",
    leads: 8,
    percentage: 6,
  },
];

export default function AnalyticsPage() {
  return (
    <main className="p-5 sm:p-8">
      <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-[#64748B]">
            <BarChart3 className="h-4 w-4" />
            Performance intelligence
          </div>

          <h2 className="mt-2 font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-[-0.03em] text-[#F1F5F9] sm:text-4xl">
            Analytics
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-7 text-[#94A3B8]">
            Understand lead performance, pipeline movement, and automation
            activity from one centralized view.
          </p>
        </div>

        <div className="flex h-10 items-center rounded-xl border border-[#1B222C] bg-[#0D1014] px-3.5 text-xs font-medium text-[#94A3B8]">
          Last 30 days
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#1B222C] bg-[#0D1014] p-5 transition-colors duration-200 hover:border-[#283341]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#1B222C] bg-[#11151B] text-[#38BDF8]">
                  <Icon className="h-4 w-4" />
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#34D399]">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  {stat.change}
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-[#64748B]">
                {stat.label}
              </p>

              <p className="mt-1 font-[var(--font-space-grotesk)] text-2xl font-semibold tracking-[-0.025em] text-[#F1F5F9]">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-7 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-[#1B222C] bg-[#0D1014] p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-[var(--font-space-grotesk)] text-lg font-semibold text-[#F1F5F9]">
                Lead pipeline
              </h3>

              <p className="mt-1 text-sm text-[#64748B]">
                Current distribution across lead stages.
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#1B222C] bg-[#11151B] text-[#38BDF8]">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-7 space-y-5">
            {pipeline.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#CBD5E1]">
                    {item.label}
                  </span>

                  <span className="text-sm text-[#64748B]">
                    <span className="font-semibold text-[#E2E8F0]">
                      {item.value}
                    </span>{" "}
                    leads
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#11151B]">
                  <div
                    className="h-full rounded-full bg-[#38BDF8] transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>

                <p className="mt-1.5 text-right text-[11px] text-[#475569]">
                  {item.percentage}% of total
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#1B222C] bg-[#0D1014] p-5 sm:p-6">
          <div>
            <h3 className="font-[var(--font-space-grotesk)] text-lg font-semibold text-[#F1F5F9]">
              Lead sources
            </h3>

            <p className="mt-1 text-sm text-[#64748B]">
              Where your leads are coming from.
            </p>
          </div>

          <div className="mt-7 space-y-5">
            {sources.map((source) => (
              <div key={source.name}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#CBD5E1]">
                    {source.name}
                  </span>

                  <span className="text-xs text-[#64748B]">
                    {source.leads} · {source.percentage}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#11151B]">
                  <div
                    className="h-full rounded-full bg-[#818CF8]"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-5 rounded-2xl border border-[#1B222C] bg-[#0D1014] p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h3 className="font-[var(--font-space-grotesk)] text-lg font-semibold text-[#F1F5F9]">
              Automation activity
            </h3>

            <p className="mt-1 text-sm text-[#64748B]">
              Activity generated by your automated workflows.
            </p>
          </div>

          <span className="text-xs font-medium uppercase tracking-[0.1em] text-[#475569]">
            Last 30 days
          </span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {activity.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-xl border border-[#1B222C] bg-[#0A0C0F] p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1B222C] bg-[#11151B] text-[#38BDF8]">
                    <Icon className="h-3.5 w-3.5" />
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#34D399]">
                    <ArrowUpRight className="h-3 w-3" />
                    {item.change}
                  </span>
                </div>

                <p className="mt-4 text-xs font-medium text-[#64748B]">
                  {item.label}
                </p>

                <p className="mt-1 font-[var(--font-space-grotesk)] text-xl font-semibold text-[#E2E8F0]">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-[#1B222C] bg-[#0D1014] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#1B222C] bg-[#11151B] text-[#38BDF8]">
            <CheckCircle2 className="h-4 w-4" />
          </div>

          <div>
            <h3 className="font-[var(--font-space-grotesk)] text-lg font-semibold text-[#F1F5F9]">
              Performance summary
            </h3>

            <p className="mt-1 text-sm leading-6 text-[#64748B]">
              LeadPilot is currently processing leads through AI qualification
              and automated follow-up workflows.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 border-t border-[#1B222C] pt-5 sm:grid-cols-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#475569]">
              Qualification
            </p>

            <p className="mt-1.5 text-sm font-semibold text-[#CBD5E1]">
              73.4% qualified
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#475569]">
              Follow-up
            </p>

            <p className="mt-1.5 text-sm font-semibold text-[#CBD5E1]">
              67 sequences sent
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#475569]">
              Automation
            </p>

            <p className="mt-1.5 text-sm font-semibold text-[#34D399]">
              98.4% success rate
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
