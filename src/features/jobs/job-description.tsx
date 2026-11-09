import { parseJobDescription } from "@/features/jobs/description";
import { cn } from "@/lib/utils";
import { PcbLettering } from "@/features/public/pcb-lettering";

export function JobDescription({
  description,
  compact = false,
  pcbHeadings = false,
}: {
  description: string;
  compact?: boolean;
  pcbHeadings?: boolean;
}) {
  return (
    <div
      data-job-description
      className={cn(
        "space-y-[var(--gui-space-m)] text-muted-foreground",
        compact ? "text-sm" : "text-base",
      )}
    >
      {parseJobDescription(description).map((block, index) => {
        if (block.type === "heading")
          return (
            <h3
              key={index}
              className="pt-[var(--gui-space-xs)] font-ui text-lg font-semibold text-foreground"
            >
              {pcbHeadings ? <PcbLettering text={block.text} /> : block.text}
            </h3>
          );
        if (block.type === "paragraph") return <p key={index}>{block.text}</p>;
        const List = block.ordered ? "ol" : "ul";
        return (
          <List
            key={index}
            className={cn(
              "space-y-[var(--gui-space-xxs)] pl-[var(--gui-space-m)]",
              block.ordered ? "list-decimal" : "list-disc",
            )}
          >
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </List>
        );
      })}
    </div>
  );
}
