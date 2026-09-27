import { ArrowUpRight, Zap } from "lucide-react";

export default function HeroOverview() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#1B222C] bg-[#0D1014] p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#38BDF8]/[0.06] blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 right-24 h-56 w-56 rounded-full bg-[#818CF8]/[0.04] blur-3xl" />

      <div className="relative max-w-2xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#38BDF8]/10 bg-[#38BDF8]/[0.06] px-3 py-1.5 text-xs font-medium text-[#7DD3FC]">
          <Zap className="h-3.5 w-3.5" />
          AI automation engine
        </div>

        <h2 className="font-[var(--font-space-grotesk)] text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
          Turn leads into
          <span className="text-[#7DD3FC]"> automated workflows.</span>
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-6 text-[#94A3B8]">
          Capture, qualify, follow up, and manage your leads through intelligent
          business automation.
        </p>

        <button className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#38BDF8] px-4 py-2.5 text-sm font-semibold text-[#061014] transition-all hover:bg-[#7DD3FC] hover:shadow-[0_0_24px_rgba(56,189,248,0.14)]">
          View leads
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
