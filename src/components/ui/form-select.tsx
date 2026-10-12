"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type FormSelectOption = {
  value: string;
  label: string;
};

export function FormSelect({
  id,
  name,
  value,
  defaultValue,
  options,
  placeholder = "Wybierz",
  ariaLabel,
  required,
  disabled,
  className,
  triggerClassName,
  onValueChange,
  progressiveFallback = false,
}: {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  options: FormSelectOption[];
  placeholder?: string;
  ariaLabel?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  onValueChange?: (value: string) => void;
  progressiveFallback?: boolean;
}) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const selectedValue = value ?? internalValue;
  const selectedLabel = options.find((option) => option.value === selectedValue)?.label;

  return (
    <span className={cn("block min-w-0", className)}>
      <Select
        name={name}
        value={selectedValue}
        onValueChange={(nextValue) => {
          const normalized = nextValue ?? "";
          setInternalValue(normalized);
          onValueChange?.(normalized);
        }}
        required={required}
        disabled={disabled}
      >
        <SelectTrigger id={id} aria-label={ariaLabel} className={cn("w-full", triggerClassName)}>
          <SelectValue placeholder={placeholder}>{selectedLabel}</SelectValue>
        </SelectTrigger>
        <SelectContent align="start">
          {options.map((option) => (
            <SelectItem key={option.value || "__all"} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {progressiveFallback && name ? (
        <noscript>
          <select
            className="native-select mt-2"
            aria-label={ariaLabel}
            name={name}
            defaultValue={defaultValue}
            required={required}
            disabled={disabled}
          >
            {options.map((option) => (
              <option key={option.value || "__all"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </noscript>
      ) : null}
    </span>
  );
}
