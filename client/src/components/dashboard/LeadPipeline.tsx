import { ArrowRight } from "lucide-react";

const stages = [
  {
    label: "New",
    value: 32,
    percentage: 100,
  },
  {
    label: "Contacted",
    value: 24,
    percentage: 75,
  },
  {
    label: "Qualified",
    value: 41,
    percentage: 86,
  },
  {
    label: "Proposal",
    value: 18,
    percentage: 52,
  },
  {
    label: "Won",
    value: 13,
    percentage: 38,
  },
];

export default function LeadPipeline() {
  return (
    <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
      {" "}
      <div className="flex items-start justify-between gap-4">
        {" "}
        <div>
          {" "}
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Pipeline{" "}
          </p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
            Lead pipeline
          </h2>
        </div>
        <button className="hidden items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary-dark sm:inline-flex">
          View leads
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-5">
        {stages.map((stage, index) => (
          <div key={stage.label} className="relative">
            <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
              <p className="text-xs font-medium text-muted">{stage.label}</p>

              <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                {stage.value}
              </p>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-border/60">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${stage.percentage}%` }}
                />
              </div>
            </div>

            {index < stages.length - 1 && (
              <ArrowRight className="absolute -right-2.5 top-1/2 hidden h-4 w-4 -translate-y-1/2 bg-white text-muted sm:block" />
            )}
          </div>
        ))}
      </div>
      <button className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary sm:hidden">
        View all leads
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </section>
  );
}
