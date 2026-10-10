import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "min-h-12 w-full min-w-0 rounded-[var(--gui-radius-s)] border-0 bg-[var(--gui-control)] px-[var(--gui-space-m)] py-[var(--gui-space-s)] text-[length:var(--gui-text-s)] leading-[var(--gui-leading-s)] tracking-[var(--gui-tracking-l)] text-[var(--gui-text)] shadow-[var(--gui-control-shadow)] outline-none transition-[background-color,color,box-shadow] [transition-duration:var(--gui-motion-small)] file:inline-flex file:border-0 file:bg-transparent file:font-medium file:text-[var(--gui-text)] placeholder:text-[var(--gui-text-muted-accessible)] hover:shadow-[var(--gui-control-hover-shadow)] focus-visible:shadow-[var(--gui-control-focus-shadow)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--gui-control-disabled)] disabled:text-[var(--gui-neutral-6)] aria-invalid:bg-[var(--gui-error-transparent)] aria-invalid:shadow-[var(--gui-control-invalid-shadow)] read-only:bg-[var(--gui-control-readonly)] read-only:text-[var(--gui-neutral-8)]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
