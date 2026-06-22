import { ReactNode } from "react";

export default function GraniteInsightBox({
  title,
  poweredBy = "IBM GRANITE",
  loading,
  error,
  children,
}: {
  title: string;
  poweredBy?: string;
  loading?: boolean;
  error?: string | null;
  children?: ReactNode;
}) {
  return (
    <div className="relative rounded-sm border border-gold/40 bg-deep-green/20 vhs-noise p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="font-display text-lg text-gold tracking-wide">{title}</span>
        <span className="text-[10px] font-display tracking-widest text-foreground/50 border border-foreground/20 px-2 py-0.5 rounded-sm">
          POWERED BY {poweredBy}
        </span>
      </div>

      {loading && (
        <div className="space-y-2 animate-pulse">
          <div className="h-3 bg-foreground/15 rounded w-full" />
          <div className="h-3 bg-foreground/15 rounded w-5/6" />
          <div className="h-3 bg-foreground/15 rounded w-2/3" />
        </div>
      )}

      {!loading && error && (
        <p className="text-sm text-red-400/90">
          {poweredBy} is unavailable right now: {error}
        </p>
      )}

      {!loading && !error && children}
    </div>
  );
}
