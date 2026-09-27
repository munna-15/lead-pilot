
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Bot,
  Building2,
  CalendarDays,
  Clock3,
  Mail,
  MessageSquareText,
  Phone,
  Sparkles,
  UserRound,
} from "lucide-react";
import { getLeadById } from "@/services/leads.service";

interface LeadDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

function statusStyles(status: string) {
  if (status === "HOT") {
    return "border-[#F87171]/15 bg-[#F87171]/[0.08] text-[#FCA5A5]";
  }

  if (status === "WARM") {
    return "border-[#FBBF24]/15 bg-[#FBBF24]/[0.08] text-[#FCD34D]";
  }

  return "border-[#64748B]/20 bg-[#64748B]/[0.08] text-[#94A3B8]";
}

function scoreStyles(score: number) {
  if (score >= 80) {
    return "text-[#34D399]";
  }

  if (score >= 60) {
    return "text-[#FBBF24]";
  }

  return "text-[#94A3B8]";
}

function urgencyStyles(urgency: string) {
  if (urgency === "HIGH") {
    return "text-[#FCA5A5]";
  }

  if (urgency === "MEDIUM") {
    return "text-[#FCD34D]";
  }

  return "text-[#94A3B8]";
}

function formatDate(
  value: string | null,
  fallback = "Not available",
) {
  if (!value) {
    return fallback;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatFollowUpType(value: string | null) {
  if (value === "initial") {
    return "Initial follow-up";
  }

  if (value === "reminder_1") {
    return "Reminder 1";
  }

  if (value === "reminder_2") {
    return "Final reminder";
  }

  return "Not started";
}

export default async function LeadDetailsPage({
  params,
}: LeadDetailsPageProps) {
  const { id } = await params;

  let lead;

  try {
    const response = await getLeadById(id);

    if (!response?.success || !response?.data) {
      notFound();
    }

    lead = response.data;
  } catch (error) {
    console.error("Fetch lead details error:", error);
    notFound();
  }

  const initials = lead.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="p-5 sm:p-8">
      <div className="flex flex-col gap-5">
        <Link
          href="/leads"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-[#64748B] transition-colors duration-200 hover:text-[#CBD5E1]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to leads
        </Link>

        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
          <div>
            <p className="text-sm font-medium text-[#64748B]">
              Lead details
            </p>

            <h2 className="mt-2 font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-[-0.03em] text-[#F1F5F9] sm:text-4xl">
              {lead.name}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#64748B]">
              <span>{lead.id}</span>
              <span className="h-1 w-1 rounded-full bg-[#475569]" />
              <span>{lead.company}</span>
            </div>
          </div>

          <span
            className={`inline-flex w-fit rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-[0.08em] ${statusStyles(
              lead.status,
            )}`}
          >
            {lead.status} LEAD
          </span>
        </div>
      </div>

      <div className="mt-7 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-[#1B222C] bg-[#0D1014]">
          <div className="border-b border-[#1B222C] px-6 py-5">
            <div className="flex items-center gap-2">
              <UserRound className="h-4 w-4 text-[#38BDF8]" />
              <h3 className="text-base font-semibold text-[#E2E8F0]">
                Lead profile
              </h3>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#1B222C] bg-[#11151B] text-sm font-semibold text-[#7DD3FC]">
                {initials}
              </div>

              <div>
                <h4 className="text-lg font-semibold text-[#E2E8F0]">
                  {lead.name}
                </h4>

                <p className="mt-1 text-sm text-[#64748B]">
                  {lead.company}
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#1B222C] bg-[#0A0C0F] p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
                  <Mail className="h-4 w-4" />
                  Email
                </div>

                <p className="mt-2 break-all text-sm font-medium text-[#CBD5E1]">
                  {lead.email}
                </p>
              </div>

              <div className="rounded-xl border border-[#1B222C] bg-[#0A0C0F] p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
                  <Phone className="h-4 w-4" />
                  Phone
                </div>

                <p className="mt-2 text-sm font-medium text-[#CBD5E1]">
                  {lead.phone}
                </p>
              </div>

              <div className="rounded-xl border border-[#1B222C] bg-[#0A0C0F] p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
                  <Building2 className="h-4 w-4" />
                  Company
                </div>

                <p className="mt-2 text-sm font-medium text-[#CBD5E1]">
                  {lead.company}
                </p>
              </div>

              <div className="rounded-xl border border-[#1B222C] bg-[#0A0C0F] p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
                  <Building2 className="h-4 w-4" />
                  Business type
                </div>

                <p className="mt-2 text-sm font-medium text-[#CBD5E1]">
                  {lead.businessType || "Not provided"}
                </p>
              </div>

              <div className="rounded-xl border border-[#1B222C] bg-[#0A0C0F] p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
                  <CalendarDays className="h-4 w-4" />
                  Created
                </div>

                <p className="mt-2 text-sm font-medium text-[#CBD5E1]">
                  {formatDate(lead.createdAt)}
                </p>
              </div>

              <div className="rounded-xl border border-[#1B222C] bg-[#0A0C0F] p-4">
                <div className="text-xs font-medium text-[#64748B]">
                  Budget
                </div>

                <p className="mt-2 text-sm font-medium text-[#CBD5E1]">
                  {lead.budget || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#1B222C] bg-[#0D1014]">
          <div className="border-b border-[#1B222C] px-6 py-5">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-[#38BDF8]" />
              <h3 className="text-base font-semibold text-[#E2E8F0]">
                AI qualification
              </h3>
            </div>
          </div>

          <div className="p-6">
            <p className="text-sm font-medium text-[#64748B]">
              Lead score
            </p>

            <div className="mt-1 flex items-end gap-2">
              <span
                className={`font-[var(--font-space-grotesk)] text-5xl font-semibold tracking-[-0.04em] ${scoreStyles(
                  lead.score,
                )}`}
              >
                {lead.score}
              </span>

              <span className="mb-1 text-sm text-[#475569]">
                /100
              </span>
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#1B222C]">
              <div
                className={`h-full rounded-full ${
                  lead.score >= 80
                    ? "bg-[#34D399]"
                    : lead.score >= 60
                      ? "bg-[#FBBF24]"
                      : "bg-[#64748B]"
                }`}
                style={{
                  width: `${Math.min(Math.max(lead.score, 0), 100)}%`,
                }}
              />
            </div>

            <div className="mt-7 space-y-5">
              <div>
                <p className="text-xs font-medium text-[#64748B]">
                  Status
                </p>

                <p
                  className={`mt-1.5 text-sm font-medium ${
                    lead.status === "HOT"
                      ? "text-[#FCA5A5]"
                      : lead.status === "WARM"
                        ? "text-[#FCD34D]"
                        : "text-[#94A3B8]"
                  }`}
                >
                  {lead.status}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-[#64748B]">
                  Service
                </p>

                <p className="mt-1.5 text-sm font-medium text-[#CBD5E1]">
                  {lead.service}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-[#64748B]">
                  Urgency
                </p>

                <p
                  className={`mt-1.5 text-sm font-medium ${urgencyStyles(
                    lead.urgency,
                  )}`}
                >
                  {lead.urgency}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-[#64748B]">
                  Lead stage
                </p>

                <p className="mt-1.5 text-sm font-medium text-[#CBD5E1]">
                  {lead.stage}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-5 rounded-2xl border border-[#1B222C] bg-[#0D1014]">
        <div className="border-b border-[#1B222C] px-6 py-5">
          <div className="flex items-center gap-2">
            <MessageSquareText className="h-4 w-4 text-[#38BDF8]" />
            <h3 className="text-base font-semibold text-[#E2E8F0]">
              Project inquiry
            </h3>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-xs font-medium text-[#64748B]">
              Requested service
            </p>

            <p className="mt-1.5 text-sm font-medium text-[#CBD5E1]">
              {lead.service}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-[#64748B]">
              Original message
            </p>

            <p className="mt-1.5 whitespace-pre-wrap text-sm leading-7 text-[#94A3B8]">
              {lead.message || "No message provided."}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-[#1B222C] bg-[#0D1014]">
        <div className="border-b border-[#1B222C] px-6 py-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#38BDF8]" />
            <h3 className="text-base font-semibold text-[#E2E8F0]">
              AI lead summary
            </h3>
          </div>
        </div>

        <div className="p-6">
          <p className="max-w-4xl text-sm leading-7 text-[#94A3B8]">
            {lead.summary || "No AI summary available yet."}
          </p>
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-[#1B222C] bg-[#0D1014]">
        <div className="border-b border-[#1B222C] px-6 py-5">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-[#38BDF8]" />
            <h3 className="text-base font-semibold text-[#E2E8F0]">
              Follow-up activity
            </h3>
          </div>
        </div>

        <div className="grid gap-5 p-6 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="text-xs font-medium text-[#64748B]">
              Follow-up status
            </p>

            <p className="mt-1.5 text-sm font-medium text-[#CBD5E1]">
              {lead.followUp}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-[#64748B]">
              Follow-up count
            </p>

            <p className="mt-1.5 text-sm font-medium text-[#CBD5E1]">
              {lead.followUpCount}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-[#64748B]">
              Last contacted
            </p>

            <p className="mt-1.5 text-sm font-medium text-[#CBD5E1]">
              {formatDate(lead.lastContactedAt)}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-[#64748B]">
              Last follow-up
            </p>

            <p className="mt-1.5 text-sm font-medium text-[#CBD5E1]">
              {formatFollowUpType(lead.lastFollowUpType)}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-[#64748B]">
              Next follow-up
            </p>

            <p className="mt-1.5 text-sm font-medium text-[#CBD5E1]">
              {formatDate(lead.nextFollowUpAt)}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-[#64748B]">
              Initial follow-up
            </p>

            <p className="mt-1.5 text-sm font-medium text-[#CBD5E1]">
              {formatDate(lead.followUpAt)}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-[#64748B]">
              Next action
            </p>

            <p className="mt-1.5 text-sm font-medium text-[#CBD5E1]">
              {lead.nextAction}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-[#64748B]">
              Source
            </p>

            <p className="mt-1.5 text-sm font-medium text-[#CBD5E1]">
              {lead.source}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

