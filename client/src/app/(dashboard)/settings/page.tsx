"use client";

import { useState } from "react";
import {
  Bell,
  Bot,
  CheckCircle2,
  Clock3,
  Mail,
  Save,
  Settings2,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [automationNotifications, setAutomationNotifications] = useState(true);
  const [followUpNotifications, setFollowUpNotifications] = useState(true);
  const [aiQualification, setAiQualification] = useState(true);

  return (
    <main className="p-5 sm:p-8">
      <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-[#64748B]">
            <Settings2 className="h-4 w-4" />
            Workspace configuration
          </div>

          <h2 className="mt-2 font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-[-0.03em] text-[#F1F5F9] sm:text-4xl">
            Settings
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-7 text-[#94A3B8]">
            Configure your LeadPilot workspace, automation behavior, and
            notification preferences.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#38BDF8] px-5 text-sm font-semibold text-[#061014] transition-colors duration-200 hover:bg-[#7DD3FC]"
        >
          <Save className="h-4 w-4" />
          Save changes
        </button>
      </div>

      <div className="mt-7 grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-5">
          <section className="rounded-2xl border border-[#1B222C] bg-[#0D1014] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#1B222C] bg-[#11151B] text-[#38BDF8]">
                <Settings2 className="h-4 w-4" />
              </div>

              <div>
                <h3 className="font-[var(--font-space-grotesk)] text-lg font-semibold text-[#F1F5F9]">
                  Workspace
                </h3>

                <p className="mt-1 text-sm text-[#64748B]">
                  Basic information about your automation workspace.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="workspace-name"
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-[#64748B]"
                >
                  Workspace name
                </label>

                <input
                  id="workspace-name"
                  type="text"
                  defaultValue="LeadPilot"
                  className="mt-2 h-11 w-full rounded-xl border border-[#1B222C] bg-[#0A0C0F] px-3.5 text-sm text-[#E2E8F0] outline-none transition-colors focus:border-[#38BDF8]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="workspace-email"
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-[#64748B]"
                >
                  Workspace email
                </label>

                <input
                  id="workspace-email"
                  type="email"
                  defaultValue="hello@leadpilot.ai"
                  className="mt-2 h-11 w-full rounded-xl border border-[#1B222C] bg-[#0A0C0F] px-3.5 text-sm text-[#E2E8F0] outline-none transition-colors focus:border-[#38BDF8]/30"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#1B222C] bg-[#0D1014] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#1B222C] bg-[#11151B] text-[#38BDF8]">
                <Workflow className="h-4 w-4" />
              </div>

              <div>
                <h3 className="font-[var(--font-space-grotesk)] text-lg font-semibold text-[#F1F5F9]">
                  Automation
                </h3>

                <p className="mt-1 text-sm text-[#64748B]">
                  Control how your automated workflows operate.
                </p>
              </div>
            </div>

            <div className="mt-6 divide-y divide-[#1B222C]">
              <SettingToggle
                icon={Workflow}
                title="Automation workflows"
                description="Allow active workflows to process incoming leads."
                enabled={true}
                disabled
              />

              <SettingToggle
                icon={Clock3}
                title="Scheduled follow-ups"
                description="Automatically process leads when their follow-up is due."
                enabled={true}
                disabled
              />

              <SettingToggle
                icon={Bot}
                title="AI qualification"
                description="Use AI to score and classify incoming leads."
                enabled={aiQualification}
                onChange={setAiQualification}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-[#1B222C] bg-[#0D1014] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#1B222C] bg-[#11151B] text-[#38BDF8]">
                <Bell className="h-4 w-4" />
              </div>

              <div>
                <h3 className="font-[var(--font-space-grotesk)] text-lg font-semibold text-[#F1F5F9]">
                  Notifications
                </h3>

                <p className="mt-1 text-sm text-[#64748B]">
                  Choose which workspace events should generate notifications.
                </p>
              </div>
            </div>

            <div className="mt-6 divide-y divide-[#1B222C]">
              <SettingToggle
                icon={Mail}
                title="Email notifications"
                description="Receive important workspace updates by email."
                enabled={emailNotifications}
                onChange={setEmailNotifications}
              />

              <SettingToggle
                icon={Workflow}
                title="Automation activity"
                description="Notify when an automation completes or encounters an issue."
                enabled={automationNotifications}
                onChange={setAutomationNotifications}
              />

              <SettingToggle
                icon={Clock3}
                title="Follow-up activity"
                description="Receive notifications for scheduled follow-up activity."
                enabled={followUpNotifications}
                onChange={setFollowUpNotifications}
              />
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <section className="rounded-2xl border border-[#1B222C] bg-[#0D1014] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#1B222C] bg-[#11151B] text-[#38BDF8]">
                <Sparkles className="h-4 w-4" />
              </div>

              <div>
                <h3 className="font-[var(--font-space-grotesk)] text-lg font-semibold text-[#F1F5F9]">
                  AI engine
                </h3>

                <p className="mt-1 text-xs text-[#64748B]">
                  Qualification configuration
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-[#1B222C] bg-[#0A0C0F] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#64748B]">
                  Provider
                </span>

                <span className="rounded-full border border-[#38BDF8]/15 bg-[#38BDF8]/[0.07] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#7DD3FC]">
                  Gemini
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#64748B]">
                  Status
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6EE7B7]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />
                  Operational
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[#1B222C] bg-[#0A0C0F] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#64748B]">
                Qualification output
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {["Lead score", "Status", "Service", "Urgency"].map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-[#1B222C] bg-[#11151B] px-2.5 py-1.5 text-xs font-medium text-[#94A3B8]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#1B222C] bg-[#0D1014] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#34D399]/15 bg-[#34D399]/[0.06] text-[#34D399]">
                <ShieldCheck className="h-4 w-4" />
              </div>

              <div>
                <h3 className="font-[var(--font-space-grotesk)] text-lg font-semibold text-[#F1F5F9]">
                  System status
                </h3>

                <p className="mt-1 text-xs text-[#64748B]">
                  Current platform health
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <StatusRow label="Lead intake" status="Operational" />
              <StatusRow label="AI qualification" status="Operational" />
              <StatusRow label="Follow-up engine" status="Operational" />
              <StatusRow label="Email delivery" status="Operational" />
            </div>

            <div className="mt-5 flex items-center gap-2 border-t border-[#1B222C] pt-4 text-xs text-[#64748B]">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#34D399]" />
              All configured services are operational.
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

interface SettingToggleProps {
  icon: typeof Workflow;
  title: string;
  description: string;
  enabled: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}

function SettingToggle({
  icon: Icon,
  title,
  description,
  enabled,
  onChange,
  disabled = false,
}: SettingToggleProps) {
  return (
    <div className="flex min-h-[72px] items-center justify-between gap-6 py-4 first:pt-0 last:pb-0">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#1B222C] bg-[#11151B] text-[#64748B]">
          <Icon className="h-3.5 w-3.5" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium leading-5 text-[#CBD5E1]">
            {title}
          </p>

          <p className="mt-1 max-w-lg text-xs leading-5 text-[#64748B]">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={title}
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            onChange?.(!enabled);
          }
        }}
        className={`flex h-6.2 w-11.5 shrink-0 items-center rounded-full border p-0.5 outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#38BDF8]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1014] ${
          enabled
            ? "border-[#38BDF8] bg-[#38BDF8]"
            : "border-[#283341] bg-[#11151B]"
        } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      >
        <span
          aria-hidden="true"
          className={`block h-5 w-5 shrink-0 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

interface StatusRowProps {
  label: string;
  status: string;
}

function StatusRow({ label, status }: StatusRowProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#1B222C] bg-[#0A0C0F] px-4 py-3">
      <span className="text-sm font-medium text-[#A8B3C2]">{label}</span>

      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6EE7B7]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />
        {status}
      </span>
    </div>
  );
}
