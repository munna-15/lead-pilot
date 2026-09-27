import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

export default function StatCard({
  label,
  value,
  change,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-[#1B222C] bg-[#0D1014] p-5 transition-all hover:border-[#283341] hover:bg-[#0F1318]">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#1B222C] bg-[#11151B] text-[#38BDF8]">
          <Icon className="h-4 w-4" />
        </div>

        <span className="text-xs font-medium text-[#34D399]">{change}</span>
      </div>

      <p className="mt-5 text-xs font-medium text-[#64748B]">{label}</p>

      <p className="mt-1 font-[var(--font-space-grotesk)] text-2xl font-semibold tracking-[-0.025em]">
        {value}
      </p>
    </div>
  );
}
