import { useState, useSyncExternalStore, type ReactNode } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
const query = "(max-width: 850px)";
function subscribe(notify: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
}
export function ResponsivePanel({
  title,
  description,
  children,
  resultCount,
}: {
  title: string;
  description: string;
  children: ReactNode;
  resultCount: number;
}) {
  const mobile = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
  const [open, setOpen] = useState(false);
  if (!mobile) return children;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" className="pp-filter-button" />}>
        <SlidersHorizontal className="pp-icon" />
        {title}
      </DialogTrigger>
      <DialogContent className="pp-filter-dialog pp-dialog" showCloseButton={false}>
        <div className="pp-dialog-heading">
          <DialogTitle>{title}</DialogTitle>
          <DialogClose
            render={<Button variant="outline" size="icon-sm" aria-label="Zamknij filtry" />}
          >
            ×
          </DialogClose>
        </div>
        <DialogDescription className="pp-filter-help">{description}</DialogDescription>
        <div className="pp-filter-scroll">{children}</div>
        <div className="pp-filter-dialog-footer">
          <DialogClose render={<Button />}>Pokaż {resultCount} ofert</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
