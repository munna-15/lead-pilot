"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bot,
  CheckCircle2,
  Clock3,
  Database,
  Mail,
  Play,
  RefreshCw,
  Webhook,
  XCircle,
  Zap,
  type LucideIcon,
} from "lucide-react";

import {
  getAutomationStats,
  type AutomationStats,
  type AutomationWorkflow,
} from "@/services/automations.service";

type WorkflowMeta = {
  trigger: string;
  triggerIcon: LucideIcon;
  steps: {
    label: string;
    value: string;
    icon: LucideIcon;
  }[];
};

const workflowMeta: Record<string, WorkflowMeta> = {
  "Lead Intake & AI Qualification": {
    trigger: "Website webhook",
    triggerIcon: Webhook,
    steps: [
      {
        label: "Trigger",
        value: "Website webhook",
        icon: Webhook,
      },
      {
        label: "AI qualification",
        value: "Gemini",
        icon: Bot,
      },
      {
        label: "Lead storage",
        value: "MongoDB",
        icon: Database,
      },
      {
        label: "Notification",
        value: "Email",
        icon: Mail,
      },
    ],
  },

  "Lead Follow-up Automation": {
    trigger: "Hourly schedule",
    triggerIcon: Clock3,
    steps: [
      {
        label: "Trigger",
        value: "Hourly schedule",
        icon: Clock3,
      },
      {
        label: "Lead query",
        value: "MongoDB",
        icon: Database,
      },
      {
        label: "Follow-up",
        value: "Gmail",
        icon: Mail,
      },
      {
        label: "Lead update",
        value: "MongoDB",
        icon: Database,
      },
    ],
  },
};

const configuredWorkflowNames = [
  "Lead Intake & AI Qualification",
  "Lead Follow-up Automation",
];

const formatDateTime = (value: string | null) => {
  if (!value) {
    return "No execution yet";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

const formatStatus = (status: string | null) => {
  if (!status) {
    return "No runs";
  }

  switch (status) {
    case "success":
      return "Successful";

    case "error":
      return "Failed";

    case "running":
      return "Running";

    case "canceled":
      return "Canceled";

    default:
      return status;
  }
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Failed to load automation data.";
};

const StatsSkeleton = () => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse border border-white/[0.06] bg-white/[0.015] p-5 sm:p-6"
        >
          {" "}
          <div className="h-3 w-24 rounded bg-white/[0.07]" />
          <div className="mt-5 h-9 w-20 rounded bg-white/[0.07]" />
          <div className="mt-4 h-3 w-32 rounded bg-white/[0.05]" />
        </div>
      ))}
    </div>
  );
};

const WorkflowSkeleton = () => {
  return (
    <div className="animate-pulse border border-white/[0.06] bg-white/[0.015] p-5 sm:p-7">
      {" "}
      <div className="flex items-start justify-between gap-5">
        {" "}
        <div className="flex gap-4">
          {" "}
          <div className="h-11 w-11 shrink-0 rounded-xl bg-white/[0.07]" />
          <div>
            <div className="h-4 w-48 rounded bg-white/[0.07]" />

            <div className="mt-2 h-3 w-28 rounded bg-white/[0.05]" />
          </div>
        </div>
        <div className="h-6 w-20 rounded-full bg-white/[0.06]" />
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-20 rounded-xl bg-white/[0.035]" />
        ))}
      </div>
      <div className="mt-7 h-24 rounded-xl bg-white/[0.025]" />
    </div>
  );
};

export default function AutomationsPage() {
  const [stats, setStats] = useState<AutomationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAutomations = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);

      const data = await getAutomationStats();

      setStats(data);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAutomations();
  }, []);

  const workflowMap = useMemo(() => {
    return new Map(
      (stats?.workflows ?? []).map((workflow) => [workflow.name, workflow]),
    );
  }, [stats]);

  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      {" "}
      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        {" "}
        <header className="flex flex-col gap-6 border-b border-white/[0.07] pb-8 sm:flex-row sm:items-end sm:justify-between">
          {" "}
          <div>
            {" "}
            <div className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/30">
              {" "}
              <span className="h-px w-8 bg-z-cyan" />
              Automation{" "}
            </div>
            <h1 className="font-display text-[clamp(2.3rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.065em] text-white/90">
              Workflow intelligence.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/35 sm:text-base">
              Monitor the workflows powering lead qualification and automated
              follow-up.
            </p>
          </div>
          <button
            type="button"
            onClick={() => loadAutomations(true)}
            disabled={loading || refreshing}
            className="inline-flex w-fit items-center gap-2 border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-xs font-medium text-white/55 transition hover:border-z-cyan/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />

            {refreshing ? "Refreshing" : "Refresh"}
          </button>
        </header>
        {error && !loading ? (
          <div className="mt-8 border border-red-400/10 bg-red-400/[0.03] px-5 py-4">
            <div className="flex items-center gap-3">
              <XCircle size={17} className="text-red-300/60" />

              <p className="text-sm text-red-200/65">{error}</p>
            </div>

            <button
              type="button"
              onClick={() => loadAutomations()}
              className="mt-3 text-xs text-white/45 underline underline-offset-4 transition hover:text-white"
            >
              Try again
            </button>
          </div>
        ) : null}
        <section className="mt-8">
          {loading ? (
            <StatsSkeleton />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Stat
                label="Total workflows"
                value={stats?.totalWorkflows ?? 0}
                detail="Connected workflows"
                icon={Zap}
              />

              <Stat
                label="Active workflows"
                value={stats?.activeWorkflows ?? 0}
                detail="Currently active"
                icon={Activity}
              />

              <Stat
                label="Total executions"
                value={stats?.totalRuns ?? 0}
                detail={`${stats?.successfulRuns ?? 0} successful`}
                icon={Play}
              />

              <Stat
                label="Success rate"
                value={`${stats?.successRate ?? 0}%`}
                detail={`${stats?.runsToday ?? 0} runs today`}
                icon={CheckCircle2}
              />
            </div>
          )}
        </section>
        <section className="mt-12">
          <div className="flex items-end justify-between border-b border-white/[0.06] pb-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                Connected workflows
              </p>

              <h2 className="mt-2 font-display text-2xl font-medium tracking-[-0.04em] text-white/80">
                Automation activity
              </h2>
            </div>

            {!loading && stats ? (
              <span className="text-xs text-white/25">
                {stats.totalRuns} executions
              </span>
            ) : null}
          </div>

          <div className="mt-5 space-y-4">
            {loading ? (
              <>
                <WorkflowSkeleton />
                <WorkflowSkeleton />
              </>
            ) : (
              configuredWorkflowNames.map((name) => (
                <WorkflowCard
                  key={name}
                  workflow={workflowMap.get(name)}
                  name={name}
                />
              ))
            )}
          </div>
        </section>
        <section className="mt-12 border-t border-white/[0.06] pt-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
              Lead automation flow
            </p>

            <h2 className="mt-2 font-display text-2xl font-medium tracking-[-0.04em] text-white/80">
              From signal to action.
            </h2>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Trigger",
                value: "Website webhook",
                icon: Webhook,
              },
              {
                label: "Qualification",
                value: "Gemini",
                icon: Bot,
              },
              {
                label: "Storage",
                value: "MongoDB",
                icon: Database,
              },
              {
                label: "Action",
                value: "Email",
                icon: Mail,
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="relative border border-white/[0.06] bg-white/[0.015] p-5"
                >
                  <div className="flex h-9 w-9 items-center justify-center border border-white/[0.07] bg-white/[0.025]">
                    <Icon
                      size={15}
                      strokeWidth={1.4}
                      className="text-z-cyan/70"
                    />
                  </div>

                  <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-white/25">
                    {item.label}
                  </p>

                  <p className="mt-2 text-sm text-white/60">{item.value}</p>

                  {index < 3 ? (
                    <span className="absolute right-[-9px] top-1/2 z-10 hidden h-px w-4 bg-white/[0.08] lg:block" />
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
}) {
  return (
    <div className="border border-white/[0.06] bg-white/[0.015] p-5 sm:p-6">
      {" "}
      <div className="flex items-center justify-between">
        {" "}
        <span className="text-[10px] uppercase tracking-[0.18em] text-white/25">
          {label}{" "}
        </span>
        <Icon size={15} strokeWidth={1.3} className="text-white/20" />
      </div>
      <div className="mt-5 font-display text-3xl font-semibold tracking-[-0.06em] text-white/85">
        {value}
      </div>
      <p className="mt-2 text-xs text-white/25">{detail}</p>
    </div>
  );
}

function WorkflowCard({
  workflow,
  name,
}: {
  workflow?: AutomationWorkflow;
  name: string;
}) {
  const meta = workflowMeta[name];
  const TriggerIcon = meta?.triggerIcon ?? Webhook;

  if (!workflow) {
    return (
      <article className="border border-amber-300/10 bg-amber-300/[0.015] p-5 sm:p-7">
        {" "}
        <div className="flex items-center gap-3">
          {" "}
          <TriggerIcon size={17} className="text-amber-200/50" />
          <div>
            <h3 className="text-base font-medium text-white/70">{name}</h3>

            <p className="mt-1 text-xs text-amber-200/40">
              Workflow not found in n8n
            </p>
          </div>
        </div>
      </article>
    );
  }

  const isHealthy =
    workflow.active &&
    workflow.lastStatus !== "error" &&
    workflow.lastStatus !== "canceled";

  return (
    <article className="border border-white/[0.06] bg-white/[0.015] p-5 transition-colors duration-300 hover:border-white/[0.1] sm:p-7">
      {" "}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {" "}
        <div className="flex min-w-0 items-start gap-4">
          {" "}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/[0.07] bg-white/[0.025]">
            {" "}
            <TriggerIcon
              size={17}
              strokeWidth={1.3}
              className="text-z-cyan/70"
            />{" "}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-medium text-white/80">
              {workflow.name}
            </h3>

            <p className="mt-1 text-xs text-white/25">
              {meta?.trigger ?? "n8n workflow"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isHealthy ? "bg-emerald-300/70" : "bg-red-300/70"
            }`}
          />

          <span
            className={`text-[10px] uppercase tracking-[0.16em] ${
              isHealthy ? "text-emerald-200/55" : "text-red-200/55"
            }`}
          >
            {workflow.active ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <Metric label="Executions" value={workflow.runs} />

        <Metric label="Success rate" value={`${workflow.successRate}%`} />

        <Metric label="Runs today" value={workflow.runsToday} />
      </div>
      <div className="mt-6 grid gap-4 border-t border-white/[0.06] pt-5 sm:grid-cols-2">
        <div>
          <p className="text-[9px] uppercase tracking-[0.18em] text-white/20">
            Last execution
          </p>

          <div className="mt-2 flex items-center gap-2">
            <Clock3 size={13} className="text-white/20" />

            <span className="text-xs text-white/50">
              {formatDateTime(workflow.lastRun)}
            </span>
          </div>
        </div>

        <div>
          <p className="text-[9px] uppercase tracking-[0.18em] text-white/20">
            Last status
          </p>

          <div className="mt-2 flex items-center gap-2">
            {workflow.lastStatus === "success" ? (
              <CheckCircle2 size={13} className="text-emerald-300/60" />
            ) : (
              <XCircle size={13} className="text-white/20" />
            )}

            <span className="text-xs text-white/50">
              {formatStatus(workflow.lastStatus)}
            </span>
          </div>
        </div>
      </div>
      {meta?.steps?.length ? (
        <div className="mt-6 border-t border-white/[0.06] pt-5">
          <div className="flex flex-wrap gap-2">
            {meta.steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.label}
                  className="flex items-center gap-2 border border-white/[0.05] bg-white/[0.015] px-3 py-2"
                >
                  <Icon size={12} strokeWidth={1.3} className="text-white/25" />

                  <span className="text-[10px] text-white/35">
                    {step.value}
                  </span>

                  {index < meta.steps.length - 1 ? (
                    <span className="ml-1 text-white/10">→</span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border border-white/[0.05] bg-white/[0.012] px-4 py-4">
      {" "}
      <p className="text-[9px] uppercase tracking-[0.17em] text-white/20">
        {label}{" "}
      </p>
      <p className="mt-2 font-display text-xl font-medium tracking-[-0.04em] text-white/70">
        {value}
      </p>
    </div>
  );
}
