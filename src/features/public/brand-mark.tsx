import { Bot } from "lucide-react";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-8 place-items-center rounded-[var(--gui-radius-s)] bg-[var(--gui-color-1)] text-[var(--gui-accent-text-accessible)] ${className}`}
    >
      <Bot className="size-[18px]" strokeWidth={2} />
    </span>
  );
}
