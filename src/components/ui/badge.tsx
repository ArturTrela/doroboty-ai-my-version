import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex min-h-6 w-fit shrink-0 items-center justify-center gap-[var(--gui-space-xxs)] overflow-hidden rounded-[var(--gui-radius-full)] border-0 px-[var(--gui-space-xs)] py-[var(--gui-space-xxs)] text-[length:var(--gui-text-xxs)] leading-[var(--gui-leading-xxs)] font-medium tracking-[var(--gui-tracking-xl)] whitespace-nowrap outline-none transition-[background-color,color,box-shadow] [transition-duration:var(--gui-motion-small)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gui-focus)] aria-invalid:outline-2 aria-invalid:outline-[var(--gui-error)] [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--gui-neutral-10)] text-[var(--gui-neutral-1)] [a]:hover:bg-[var(--gui-neutral-9)]",
        secondary:
          "bg-[var(--gui-surface-muted)] text-[var(--gui-text)] [a]:hover:bg-[var(--gui-control-hover)]",
        destructive:
          "bg-[var(--gui-error-transparent)] text-[var(--gui-error)] [a]:hover:bg-[var(--gui-error)] [a]:hover:text-[var(--gui-neutral-1)]",
        outline:
          "text-[var(--gui-text)] shadow-[var(--gui-edge-shadow)] [a]:hover:bg-[var(--gui-surface-muted)]",
        ghost:
          "text-[var(--gui-text-muted-accessible)] hover:bg-[var(--gui-surface-muted)] hover:text-[var(--gui-text)]",
        link: "text-[var(--gui-link)] underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants };
