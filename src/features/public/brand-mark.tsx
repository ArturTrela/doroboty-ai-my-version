export function BrandMark() {
  return (
    <span aria-hidden="true" className="grid size-6 grid-rows-2 gap-0.5">
      <span className="block rounded-[var(--gui-radius-full)_var(--gui-radius-xs)] bg-foreground" />
      <span className="block rounded-[var(--gui-radius-xs)_var(--gui-radius-full)] bg-foreground" />
    </span>
  );
}
