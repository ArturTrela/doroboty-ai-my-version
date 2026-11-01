import type { ReactNode } from "react";
import { LoaderCircle } from "lucide-react";

export function AiThinkingIndicator({ children }: { children: ReactNode }) {
  return (
    <p
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="mt-[var(--gui-space-s)] flex items-center gap-[var(--gui-space-xs)] text-sm text-[var(--gui-link)]"
    >
      <LoaderCircle
        aria-hidden="true"
        className="size-5 shrink-0 motion-safe:animate-spin [animation-duration:calc(var(--motion-large-duration)*2)]"
      />
      <span>{children}</span>
    </p>
  );
}
