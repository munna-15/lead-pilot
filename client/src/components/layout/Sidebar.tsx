"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bot,
  LayoutDashboard,
  Settings,
  Users,
  Workflow,
  X,
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Leads",
    href: "/leads",
    icon: Users,
  },
  {
    label: "Automations",
    href: "/automations",
    icon: Workflow,
  },
  {
    label: "Follow-ups",
    href: "/follow-ups",
    icon: Bot,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[248px] flex-col border-r border-[#202832] bg-[#090B0E] transition-transform duration-200 ease-out lg:z-40 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-[#202832] px-6">
          <Link href="/" className="block" onClick={onClose}>
            <p className="font-[var(--font-space-grotesk)] text-[21px] font-semibold tracking-[-0.03em] text-[#F8FAFC]">
              Lead<span className="text-[#22D3EE]">Pilot</span>
            </p>

            <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.24em] text-[#718096]">
              AI Operations
            </p>
          </Link>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#202832] bg-[#0C0F13] text-[#718096] transition-colors duration-200 hover:border-[#303B48] hover:bg-[#12161C] hover:text-[#E2E8F0] lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto p-4">
          <p className="px-3 pb-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#596579]">
            Workspace
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                    active
                      ? "border-[#22D3EE]/15 bg-[#22D3EE]/[0.08] text-[#67E8F9]"
                      : "border-transparent text-[#A8B3C2] hover:border-[#202832] hover:bg-[#11151A] hover:text-[#F1F5F9]"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="shrink-0 border-t border-[#202832] p-4">
          <Link
            href="/settings"
            onClick={onClose}
            className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors duration-200 ${
              isActive("/settings")
                ? "border-[#22D3EE]/15 bg-[#22D3EE]/[0.08] text-[#67E8F9]"
                : "border-transparent text-[#718096] hover:border-[#202832] hover:bg-[#11151A] hover:text-[#E2E8F0]"
            }`}
          >
            <Settings className="h-4 w-4 shrink-0" />
            <span>Settings</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
