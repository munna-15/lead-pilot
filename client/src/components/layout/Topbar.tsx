"use client";

import { Bell, Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const pageInfo: Record<string, string> = {
  "/": "Overview",
  "/leads": "Leads",
  "/automations": "Automations",
  "/follow-ups": "Follow-ups",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();

  const currentPage = pageInfo[pathname] ?? "Overview";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#202832] bg-[#07080A]/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onMenuClick}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#202832] bg-[#0C0F13] text-[#718096] transition-colors duration-200 hover:border-[#303B48] hover:bg-[#12161C] hover:text-[#E2E8F0] lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="min-w-0">
          <p className="hidden text-[11px] font-medium uppercase tracking-[0.12em] text-[#718096] sm:block">
            Automation workspace
          </p>

          <h1 className="truncate font-[var(--font-space-grotesk)] text-base font-semibold tracking-[-0.02em] text-[#F8FAFC] sm:mt-1 sm:text-lg">
            {currentPage}
          </h1>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#202832] bg-[#0C0F13] text-[#718096] transition-colors duration-200 hover:border-[#303B48] hover:bg-[#12161C] hover:text-[#E2E8F0]"
        >
          <Search className="h-4 w-4" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#202832] bg-[#0C0F13] text-[#718096] transition-colors duration-200 hover:border-[#303B48] hover:bg-[#12161C] hover:text-[#E2E8F0]"
        >
          <Bell className="h-4 w-4" />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />
        </button>

        <div className="hidden items-center gap-2 rounded-full border border-[#202832] bg-[#0C0F13] px-3 py-1.5 text-xs text-[#A8B3C2] md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.35)]" />
          System operational
        </div>

        <button
          type="button"
          aria-label="Profile"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#202832] bg-[#12161C] text-xs font-semibold text-[#E2E8F0] transition-colors duration-200 hover:border-[#303B48] hover:bg-[#171C23]"
        >
          M
        </button>
      </div>
    </header>
  );
}
