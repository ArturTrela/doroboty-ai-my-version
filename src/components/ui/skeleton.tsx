import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-[var(--gui-radius-s)] bg-[var(--gui-surface-muted)]",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
