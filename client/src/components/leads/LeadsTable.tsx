"use client";

import Link from "next/link";

import { useMemo, useState } from "react";

import {
  ArrowDownUp,
  Bot,
  ChevronDown,
  ChevronRight,
  Filter,
  Mail,
  Phone,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import type { Lead } from "@/services/leads.service";

interface LeadsTableProps {
  leads: Lead[];
}

type StatusFilter = "ALL" | Lead["status"];

type SortOption = "NEWEST" | "OLDEST" | "SCORE_HIGH" | "SCORE_LOW";

export default function LeadsTable({ leads }: LeadsTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [sortOption, setSortOption] = useState<SortOption>("NEWEST");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = leads.filter((lead) => {
      const matchesSearch =
        !query ||
        lead.name.toLowerCase().includes(query) ||
        lead.company.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.phone.toLowerCase().includes(query) ||
        lead.service.toLowerCase().includes(query) ||
        lead.status.toLowerCase().includes(query) ||
        lead.stage.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "ALL" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return [...result].sort((a, b) => {
      if (sortOption === "SCORE_HIGH") {
        return b.score - a.score;
      }

      if (sortOption === "SCORE_LOW") {
        return a.score - b.score;
      }

      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      if (sortOption === "OLDEST") {
        return dateA - dateB;
      }

      return dateB - dateA;
    });
  }, [leads, search, statusFilter, sortOption]);

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

  const statusOptions: StatusFilter[] = ["ALL", "HOT", "WARM", "COLD"];

  const sortOptions: {
    value: SortOption;
    label: string;
  }[] = [
    {
      value: "NEWEST",
      label: "Newest",
    },
    {
      value: "OLDEST",
      label: "Oldest",
    },
    {
      value: "SCORE_HIGH",
      label: "Highest score",
    },
    {
      value: "SCORE_LOW",
      label: "Lowest score",
    },
  ];

  const selectedSortLabel =
    sortOptions.find((option) => option.value === sortOption)?.label ??
    "Newest";

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1B222C] bg-[#0D1014]">
      <div className="flex flex-col gap-4 border-b border-[#1B222C] p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search leads..."
            className="h-11 w-full rounded-xl border border-[#1B222C] bg-[#0A0C0F] pl-10 pr-4 text-sm text-[#F1F5F9] outline-none placeholder:text-[#475569] transition-colors duration-200 focus:border-[#38BDF8]/30"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsStatusOpen((open) => !open);
                setIsSortOpen(false);
              }}
              className={`inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm transition-colors duration-200 ${
                statusFilter !== "ALL"
                  ? "border-[#38BDF8]/20 bg-[#38BDF8]/[0.06] text-[#7DD3FC]"
                  : "border-[#1B222C] bg-[#0A0C0F] text-[#94A3B8] hover:border-[#283341] hover:text-[#CBD5E1]"
              }`}
            >
              <Filter className="h-4 w-4" />

              {statusFilter === "ALL" ? "Status" : statusFilter}

              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  isStatusOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isStatusOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-40 overflow-hidden rounded-xl border border-[#1B222C] bg-[#0D1014] p-1.5 shadow-2xl shadow-black/30">
                {statusOptions.map((option) => {
                  const isSelected = statusFilter === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setStatusFilter(option);
                        setIsStatusOpen(false);
                      }}
                      className={`flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                        isSelected
                          ? "bg-[#38BDF8]/[0.08] text-[#7DD3FC]"
                          : "text-[#94A3B8] hover:bg-white/[0.025] hover:text-[#CBD5E1]"
                      }`}
                    >
                      {option === "ALL" ? "All statuses" : option}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsSortOpen((open) => !open);
                setIsStatusOpen(false);
              }}
              className={`inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm transition-colors duration-200 ${
                sortOption !== "NEWEST"
                  ? "border-[#38BDF8]/20 bg-[#38BDF8]/[0.06] text-[#7DD3FC]"
                  : "border-[#1B222C] bg-[#0A0C0F] text-[#94A3B8] hover:border-[#283341] hover:text-[#CBD5E1]"
              }`}
            >
              <ArrowDownUp className="h-4 w-4" />

              <span className="hidden sm:inline">{selectedSortLabel}</span>

              <span className="sm:hidden">Sort</span>

              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-44 overflow-hidden rounded-xl border border-[#1B222C] bg-[#0D1014] p-1.5 shadow-2xl shadow-black/30">
                {sortOptions.map((option) => {
                  const isSelected = sortOption === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSortOption(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                        isSelected
                          ? "bg-[#38BDF8]/[0.08] text-[#7DD3FC]"
                          : "text-[#94A3B8] hover:bg-white/[0.025] hover:text-[#CBD5E1]"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label="Lead filters"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#1B222C] bg-[#0A0C0F] text-[#64748B] transition-colors duration-200 hover:border-[#283341] hover:text-[#CBD5E1]"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-[#1B222C] text-left">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                Lead
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                Service
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                AI Score
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                Status
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                Stage
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-[#1B222C]/70 transition-colors duration-200 last:border-0 hover:bg-white/[0.015]"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1B222C] bg-[#11151B] text-xs font-semibold text-[#7DD3FC]">
                        {lead.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#E2E8F0]">
                          {lead.name}
                        </p>

                        <p className="mt-1 truncate text-sm text-[#64748B]">
                          {lead.company}
                        </p>

                        <div className="mt-2 flex items-center gap-4 text-xs text-[#475569]">
                          <span className="inline-flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5" />
                            {lead.email}
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5" />
                            {lead.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-[#CBD5E1]">
                      {lead.service}
                    </p>

                    <p className="mt-1.5 text-xs uppercase tracking-[0.08em] text-[#64748B]">
                      {lead.urgency} urgency
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-[#38BDF8]" />

                      <span
                        className={`text-base font-semibold ${scoreStyles(
                          lead.score,
                        )}`}
                      >
                        {lead.score}
                      </span>

                      <span className="text-sm text-[#475569]">/100</span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold tracking-[0.08em] ${statusStyles(
                        lead.status,
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span className="text-sm font-medium text-[#94A3B8]">
                      {lead.stage}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <Link
                      href={`/leads/${lead.id}`}
                      aria-label={`Open ${lead.name}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#1B222C] text-[#64748B] transition-colors duration-200 hover:border-[#283341] hover:text-[#CBD5E1]"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <p className="text-sm font-medium text-[#CBD5E1]">
                    No leads found
                  </p>

                  <p className="mt-1 text-sm text-[#64748B]">
                    Try changing your search, status, or sort selection.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[#1B222C] px-6 py-5">
        <p className="text-sm text-[#64748B]">
          Showing <span className="text-[#CBD5E1]">{filteredLeads.length}</span>{" "}
          of <span className="text-[#CBD5E1]">{leads.length}</span> leads
        </p>

        {(search || statusFilter !== "ALL" || sortOption !== "NEWEST") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("ALL");
              setSortOption("NEWEST");
            }}
            className="text-sm font-medium text-[#64748B] transition-colors hover:text-[#7DD3FC]"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
