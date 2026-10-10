"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react";

const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-[var(--gui-space-xxs)]", className)}
      {...props}
    />
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  );
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-[var(--gui-space-xs)] rounded-[var(--gui-radius-s)] border-0 bg-[var(--gui-control)] px-[var(--gui-space-m)] py-[var(--gui-space-s)] text-[length:var(--gui-text-s)] leading-[var(--gui-leading-s)] tracking-[var(--gui-tracking-l)] text-[var(--gui-text)] whitespace-nowrap shadow-[var(--gui-control-shadow)] outline-none select-none transition-[background-color,color,box-shadow] [transition-duration:var(--gui-motion-small)] hover:shadow-[var(--gui-control-hover-shadow)] focus-visible:shadow-[var(--gui-control-focus-shadow)] disabled:cursor-not-allowed disabled:bg-[var(--gui-control-disabled)] disabled:text-[var(--gui-neutral-6)] aria-invalid:bg-[var(--gui-error-transparent)] aria-invalid:shadow-[var(--gui-control-invalid-shadow)] data-placeholder:text-[var(--gui-text-muted-accessible)] data-[size=default]:min-h-12 data-[size=sm]:min-h-10 data-[size=sm]:rounded-[var(--gui-radius-xs)] data-[size=sm]:px-[var(--gui-space-s)] data-[size=sm]:py-[var(--gui-space-xs)] data-[size=sm]:text-[length:var(--gui-text-xs)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-[var(--gui-space-xs)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={<ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />}
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            "relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-[var(--gui-radius-s)] border-0 bg-popover p-[var(--gui-space-xxs)] font-ui text-popover-foreground shadow-[var(--gui-shadow-m)] outline-none [animation-duration:var(--gui-motion-small)] data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-[var(--gui-scale-enter)] data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-[var(--gui-scale-enter)]",
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        "px-[var(--gui-space-xs)] py-[var(--gui-space-xxs)] text-[length:var(--gui-text-xxs)] leading-[var(--gui-leading-xxs)] font-medium tracking-[var(--gui-tracking-xl)] text-[var(--gui-text-muted-accessible)]",
        className,
      )}
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-[var(--gui-space-xs)] rounded-[var(--gui-radius-xs)] py-[var(--gui-space-xxs)] pr-8 pl-[var(--gui-space-xs)] text-[length:var(--gui-text-s)] leading-[var(--gui-leading-s)] tracking-[var(--gui-tracking-l)] text-[var(--gui-text)] outline-hidden select-none focus:bg-[var(--gui-surface-muted)] data-selected:bg-[var(--gui-surface)] data-disabled:pointer-events-none data-disabled:text-[var(--gui-neutral-6)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-[var(--gui-space-xs)]",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "pointer-events-none -mx-[var(--gui-space-xxs)] my-[var(--gui-space-xxs)] h-px bg-[var(--gui-edge)]",
        className,
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-[var(--gui-space-xxs)] [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-[var(--gui-space-xxs)] [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
