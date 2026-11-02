"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "inline-flex size-[var(--gui-text-l)] shrink-0 items-center justify-center rounded-[var(--gui-radius-xs)] bg-[var(--gui-neutral-3)] text-[var(--gui-neutral-1)] outline-none transition-colors [transition-duration:var(--gui-motion-small)] hover:bg-[var(--gui-neutral-4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gui-focus)] data-checked:bg-[var(--gui-neutral-10)] disabled:pointer-events-none disabled:bg-[var(--gui-neutral-3)] disabled:text-[var(--gui-neutral-6)]",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex size-[var(--gui-text-m)] items-center justify-center">
        <Check aria-hidden="true" className="size-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
