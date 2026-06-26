import React from "react";

type DashboardPageTitleProps = {
  title: string;
  moduleLabel?: string;
  pathLabel?: string;
  description?: string;
  badgeLabel?: string;
  badgeTone?: "primary" | "success";
};

const badgeClassMap: Record<"primary" | "success", string> = {
  primary: "bg-primary/5 text-primary border-primary/10",
  success: "bg-green-50 text-green-600 border-green-100",
};

export default function DashboardPageTitle({
  title,
  moduleLabel = "Dashboard Module",
  pathLabel,
  description,
  badgeLabel,
  badgeTone = "primary",
}: DashboardPageTitleProps) {
  return (
    <div className="flex flex-col gap-4 mb-6 pb-5 border-b border-gray-100">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">
            {moduleLabel}
          </span>
        </div>
        <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight">
          {title}
        </h2>
        {(description || pathLabel) && (
          <p className="text-[12px] md:text-[13px] text-gray-500 mt-2 font-medium flex flex-col sm:flex-row sm:items-center sm:gap-2">
            {description ?? (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
                Path:{" "}
                <code className="bg-gray-50 text-primary border border-gray-100 px-1.5 py-0.5 rounded font-mono text-[11px]">
                  {pathLabel}
                </code>
              </>
            )}
          </p>
        )}
      </div>

      {badgeLabel ? (
        <div
          className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xs ${badgeClassMap[badgeTone]}`}
        >
          {badgeLabel}
        </div>
      ) : null}
    </div>
  );
}
