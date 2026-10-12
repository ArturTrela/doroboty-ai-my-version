export type DescriptionBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

const legacyHeadings = new Set([
  "O firmie",
  "O roli",
  "Zakres odpowiedzialności",
  "Oczekiwania",
  "Pierwsze 90 dni",
  "Co oferujemy",
  "Proces rekrutacji",
  "Jak pracujemy",
  "Pierwszy projekt",
  "Zespół i współpraca",
  "Warunki współpracy",
  "Jak mierzymy sukces",
  "Dane i ograniczenia",
  "Decyzje i odpowiedzialność",
]);

// Deliberately limited text syntax. Never interpret HTML or execute embedded markup.
export function parseJobDescription(description: string): DescriptionBlock[] {
  const blocks: DescriptionBlock[] = [];
  let paragraph: string[] = [];
  let list: Extract<DescriptionBlock, { type: "list" }> | undefined;
  const flush = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    if (list) blocks.push(list);
    paragraph = [];
    list = undefined;
  };
  for (const raw of description.replace(/\r\n?/g, "\n").split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    const heading = line.match(/^#{1,6}\s+(.+)$/)?.[1];
    if (heading || legacyHeadings.has(line)) {
      flush();
      blocks.push({ type: "heading", text: heading ?? line });
      continue;
    }
    const unordered = line.match(/^[-*]\s+(.+)$/);
    const ordered = line.match(/^\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      const isOrdered = Boolean(ordered);
      if (paragraph.length || (list && list.ordered !== isOrdered)) flush();
      list ??= { type: "list", ordered: isOrdered, items: [] };
      list.items.push((unordered ?? ordered)![1]);
    } else {
      if (list) flush();
      paragraph.push(line);
    }
  }
  flush();
  return blocks;
}
