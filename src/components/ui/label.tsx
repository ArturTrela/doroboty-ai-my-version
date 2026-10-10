"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-[var(--gui-space-xs)] text-[length:var(--gui-text-xs)] leading-[var(--gui-leading-xs)] font-medium tracking-[var(--gui-tracking-l)] text-[var(--gui-text)] select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:text-[var(--gui-neutral-6)] peer-disabled:cursor-not-allowed peer-disabled:text-[var(--gui-neutral-6)]",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
