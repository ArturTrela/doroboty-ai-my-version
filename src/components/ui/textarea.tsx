import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-28 w-full rounded-[var(--gui-radius-s)] border-0 bg-[var(--gui-control)] px-[var(--gui-space-m)] py-[var(--gui-space-s)] text-[length:var(--gui-text-s)] leading-[var(--gui-leading-s)] tracking-[var(--gui-tracking-l)] text-[var(--gui-text)] shadow-[var(--gui-control-shadow)] outline-none transition-[background-color,color,box-shadow] [transition-duration:var(--gui-motion-small)] placeholder:text-[var(--gui-text-muted-accessible)] hover:shadow-[var(--gui-control-hover-shadow)] focus-visible:shadow-[var(--gui-control-focus-shadow)] disabled:cursor-not-allowed disabled:bg-[var(--gui-control-disabled)] disabled:text-[var(--gui-neutral-6)] aria-invalid:bg-[var(--gui-error-transparent)] aria-invalid:shadow-[var(--gui-control-invalid-shadow)] read-only:bg-[var(--gui-control-readonly)] read-only:text-[var(--gui-neutral-8)]",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
