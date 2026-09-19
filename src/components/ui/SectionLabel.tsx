import React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  number?: string;
  label: string;
  className?: string;
}

export default function SectionLabel({ number, label, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-[#969BA3]",
        className
      )}
    >
      {number && (
        <>
          <span className="text-[#00E5FF] font-semibold">{number}</span>
          <span className="text-[#969BA3]/40">/</span>
        </>
      )}
      <span>{label}</span>
    </div>
  );
}
