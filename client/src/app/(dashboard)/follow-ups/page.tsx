"use client";

import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Mail,
  MessageCircle,
  MoreHorizontal,
  RefreshCw,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getLeads, type Lead } from "@/services/leads.service";

const sequenceSteps = [
  {
    label: "Initial",
    description: "First contact",
    delay: "After 24h",
    icon: Mail,
  },
  {
    label: "Reminder 1",
    description: "First reminder",
    delay: "After 48h",
    icon: RefreshCw,
  },
  {
    label: "Reminder 2",
    description: "Final reminder",
    delay: "After 72h",
    icon: RefreshCw,
  },
  {
    label: "Nurture",
    description: "Long-term follow-up",
    delay: "Sequence end",
    icon: CheckCircle2,
  },
];

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-[#1B222C] ${className}`} />
  );
}

function FollowUpsSkeleton() {
  return (
    <>
      {" "}
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-[#1B222C] bg-[#0D1014] p-5"
          >
            {" "}
            <Skeleton className="h-9 w-9 rounded-xl" />{" "}
            <Skeleton className="mt-5 h-4 w-24" />{" "}
            <Skeleton className="mt-2 h-8 w-12" />{" "}
          </div>
        ))}{" "}
      </div>
      <section className="mt-7">
        <div className="mb-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-2 h-4 w-72 max-w-full" />
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#1B222C] bg-[#0D1014]">
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <div className="grid grid-cols-6 border-b border-[#1B222C] px-6 py-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className={`h-3 ${
                      index === 0
                        ? "w-12"
                        : index === 1
                          ? "w-12"
                          : index === 2
                            ? "w-20"
                            : index === 3
                              ? "w-16"
                              : index === 4
                                ? "w-12"
                                : "ml-auto w-14"
                    }`}
                  />
                ))}
              </div>

              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-6 items-center border-b border-[#1B222C]/70 px-6 py-5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />

                    <div>
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="mt-2 h-3 w-20" />
                      <Skeleton className="mt-2 h-3 w-32" />
                    </div>
                  </div>

                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-7 w-20 rounded-full" />
                  <Skeleton className="ml-auto h-9 w-9 rounded-lg" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#1B222C] px-6 py-5">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </section>
      <section className="mt-7 rounded-2xl border border-[#1B222C] bg-[#0D1014] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <Skeleton className="h-9 w-9 shrink-0 rounded-xl" />

          <div>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="mt-2 h-4 w-96 max-w-full" />
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-[#1B222C] bg-[#0A0C0F] p-4"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-3 w-5" />
              </div>

              <Skeleton className="mt-4 h-4 w-20" />
              <Skeleton className="mt-2 h-3 w-24" />

              <div className="mt-4 border-t border-[#1B222C] pt-3">
                <Skeleton className="h-2.5 w-12" />
                <Skeleton className="mt-2 h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function formatDate(value: string | null) {
  if (!value) {
    return "Not scheduled";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not scheduled";
  }

  const now = new Date();

  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isToday) {
    return `Today, ${new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date)}`;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getFollowUpType(lead: Lead) {
  if (lead.lastFollowUpType === "initial") {
    return "Initial follow-up";
  }

  if (lead.lastFollowUpType === "reminder_1") {
    return "Reminder 1";
  }

  if (lead.lastFollowUpType === "reminder_2") {
    return "Reminder 2";
  }

  if (lead.stage === "Nurture") {
    return "Nurture";
  }

  return "Initial follow-up";
}

function getScheduledAt(lead: Lead) {
  if (lead.nextFollowUpAt) {
    return lead.nextFollowUpAt;
  }

  return lead.followUpAt;
}

function getFollowUpStatus(lead: Lead) {
  const scheduledAt = getScheduledAt(lead);

  if (!scheduledAt) {
    return "Not scheduled";
  }

  const date = new Date(scheduledAt);

  if (Number.isNaN(date.getTime())) {
    return "Not scheduled";
  }

  if (date.getTime() <= Date.now()) {
    return "Due";
  }

  return "Scheduled";
}

export default function FollowUpsPage() {
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
      console.error("Fetch follow-ups error:", error);

      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };

        setError(
          axiosError.response?.data?.message || "Failed to load follow-ups",
        );
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to load follow-ups");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const followUps = useMemo(() => {
    return leads
      .filter((lead) => {
        return Boolean(lead.followUpAt || lead.nextFollowUpAt);
      })
      .sort((a, b) => {
        const aDate = getScheduledAt(a);
        const bDate = getScheduledAt(b);

        if (!aDate) return 1;
        if (!bDate) return -1;

        return new Date(aDate).getTime() - new Date(bDate).getTime();
      });
  }, [leads]);

  const followUpStats = useMemo(() => {
    const now = new Date();

    const dueToday = leads.filter((lead) => {
      const scheduledAt = getScheduledAt(lead);

      if (!scheduledAt) {
        return false;
      }

      const date = new Date(scheduledAt);

      if (Number.isNaN(date.getTime())) {
        return false;
      }

      return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
      );
    }).length;

    const contacted = leads.filter((lead) => lead.stage === "Contacted").length;

    const inSequence = leads.filter(
      (lead) => lead.stage === "New" || lead.stage === "Contacted",
    ).length;

    const nurture = leads.filter((lead) => lead.stage === "Nurture").length;

    return [
      {
        label: "Due today",
        value: dueToday,
        icon: Clock3,
      },
      {
        label: "Contacted",
        value: contacted,
        icon: MessageCircle,
      },
      {
        label: "In sequence",
        value: inSequence,
        icon: RefreshCw,
      },
      {
        label: "Nurture",
        value: nurture,
        icon: Users,
      },
    ];
  }, [leads]);

  return (
    <main className="p-5 sm:p-8">
      {" "}
      <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
        {" "}
        <div>
          {" "}
          <div className="flex items-center gap-2 text-sm font-medium text-[#64748B]">
            {" "}
            <Bot className="h-4 w-4" />
            Automated engagement{" "}
          </div>
          <h2 className="mt-2 font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-[-0.03em] text-[#F1F5F9] sm:text-4xl">
            Follow-ups
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#94A3B8]">
            Manage automated follow-up sequences and keep every lead moving
            through the pipeline.
          </p>
        </div>
        <div className="inline-flex h-10 items-center gap-2 self-start rounded-full border border-[#34D399]/15 bg-[#34D399]/[0.06] px-3.5 text-xs font-medium text-[#6EE7B7] xl:self-auto">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.35)]" />
          Automation active
        </div>
      </div>
      {loading ? (
        <FollowUpsSkeleton />
      ) : error ? (
        <div className="mt-7 rounded-2xl border border-[#3A2024] bg-[#120D0F] p-6">
          <p className="text-sm font-medium text-[#F1F5F9]">
            Unable to load follow-ups
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
        <>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {followUpStats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[#1B222C] bg-[#0D1014] p-5 transition-colors duration-200 hover:border-[#283341]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#1B222C] bg-[#11151B] text-[#38BDF8]">
                    <Icon className="h-4 w-4" />
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

          <section className="mt-7">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h3 className="font-[var(--font-space-grotesk)] text-xl font-semibold tracking-[-0.02em] text-[#F1F5F9]">
                  Follow-up queue
                </h3>

                <p className="mt-1 text-sm text-[#64748B]">
                  Leads currently moving through automated sequences.
                </p>
              </div>

              <span className="hidden text-xs font-medium uppercase tracking-[0.12em] text-[#475569] sm:block">
                {followUps.length} active items
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#1B222C] bg-[#0D1014]">
              {followUps.length === 0 ? (
                <div className="flex min-h-[220px] items-center justify-center px-6">
                  <div className="text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-[#1B222C] bg-[#11151B] text-[#64748B]">
                      <Clock3 className="h-4 w-4" />
                    </div>

                    <p className="mt-4 text-sm font-medium text-[#CBD5E1]">
                      No follow-ups scheduled
                    </p>

                    <p className="mt-1 text-sm text-[#64748B]">
                      Follow-up activity will appear here automatically.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                      <thead>
                        <tr className="border-b border-[#1B222C] text-left">
                          <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                            Lead
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                            Stage
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                            Follow-up
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                            Scheduled
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                            Status
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {followUps.map((lead) => {
                          const status = getFollowUpStatus(lead);

                          return (
                            <tr
                              key={lead.id}
                              className="border-b border-[#1B222C]/70 transition-colors duration-200 last:border-0 hover:bg-white/[0.015]"
                            >
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1B222C] bg-[#11151B] text-xs font-semibold text-[#7DD3FC]">
                                    {lead.name
                                      .split(" ")
                                      .map((part) => part[0])
                                      .join("")
                                      .slice(0, 2)}
                                  </div>

                                  <div>
                                    <p className="text-sm font-semibold text-[#E2E8F0]">
                                      {lead.name}
                                    </p>

                                    <p className="mt-1 text-xs text-[#64748B]">
                                      {lead.company}
                                    </p>

                                    <p className="mt-1 text-xs text-[#475569]">
                                      {lead.email}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-5">
                                <span className="text-sm font-medium text-[#A8B3C2]">
                                  {lead.stage}
                                </span>
                              </td>

                              <td className="px-6 py-5">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-3.5 w-3.5 text-[#38BDF8]" />

                                  <span className="text-sm font-medium text-[#CBD5E1]">
                                    {getFollowUpType(lead)}
                                  </span>
                                </div>
                              </td>

                              <td className="px-6 py-5">
                                <span className="text-sm text-[#94A3B8]">
                                  {formatDate(getScheduledAt(lead))}
                                </span>
                              </td>

                              <td className="px-6 py-5">
                                <span
                                  className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${
                                    status === "Due"
                                      ? "border-[#FBBF24]/15 bg-[#FBBF24]/[0.07] text-[#FCD34D]"
                                      : status === "Scheduled"
                                        ? "border-[#38BDF8]/15 bg-[#38BDF8]/[0.07] text-[#7DD3FC]"
                                        : "border-[#475569]/20 bg-[#475569]/[0.07] text-[#94A3B8]"
                                  }`}
                                >
                                  {status}
                                </span>
                              </td>

                              <td className="px-6 py-5 text-right">
                                <button
                                  type="button"
                                  aria-label={`Open actions for ${lead.name}`}
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#1B222C] text-[#64748B] transition-colors duration-200 hover:border-[#283341] hover:text-[#CBD5E1]"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#1B222C] px-6 py-5">
                    <p className="text-sm text-[#64748B]">
                      Showing{" "}
                      <span className="text-[#CBD5E1]">{followUps.length}</span>{" "}
                      active follow-ups
                    </p>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64748B] transition-colors hover:text-[#7DD3FC]"
                    >
                      View all
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>

          <section className="mt-7 rounded-2xl border border-[#1B222C] bg-[#0D1014] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#1B222C] bg-[#11151B] text-[#38BDF8]">
                <RefreshCw className="h-4 w-4" />
              </div>

              <div>
                <h3 className="font-[var(--font-space-grotesk)] text-lg font-semibold text-[#F1F5F9]">
                  Follow-up sequence
                </h3>

                <p className="mt-1 text-sm text-[#64748B]">
                  Leads automatically progress through this sequence based on
                  their follow-up state.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-4">
              {sequenceSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.label} className="relative">
                    <div className="rounded-xl border border-[#1B222C] bg-[#0A0C0F] p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1B222C] bg-[#11151B] text-[#38BDF8]">
                          <Icon className="h-3.5 w-3.5" />
                        </div>

                        <span className="text-[10px] font-semibold text-[#475569]">
                          0{index + 1}
                        </span>
                      </div>

                      <p className="mt-4 text-sm font-semibold text-[#CBD5E1]">
                        {step.label}
                      </p>

                      <p className="mt-1 text-xs text-[#64748B]">
                        {step.description}
                      </p>

                      <div className="mt-4 border-t border-[#1B222C] pt-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#475569]">
                          Timing
                        </p>

                        <p className="mt-1 text-xs font-medium text-[#94A3B8]">
                          {step.delay}
                        </p>
                      </div>
                    </div>

                    {index < sequenceSteps.length - 1 && (
                      <div className="absolute -right-2.5 top-1/2 hidden h-px w-5 bg-[#283341] md:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
