import type { ReactNode } from "react";

type TimelineItem = {
  id: string;
  title: string;
  dateTime: string;
  content?: ReactNode;
};

const dateFormat = new Intl.DateTimeFormat("pl-PL", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function ProcessTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="process-timeline">
      {items.map((item, index) => (
        <li key={item.id} aria-current={index === items.length - 1 ? "step" : undefined}>
          <strong>{item.title}</strong>
          <time dateTime={item.dateTime}>{dateFormat.format(new Date(item.dateTime))}</time>
          {item.content && <div className="process-timeline-content">{item.content}</div>}
        </li>
      ))}
    </ol>
  );
}
