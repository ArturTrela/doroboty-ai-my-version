// Glyph routes adapted from the supplied DoRoboty.ai PCB lettering.
const glyphs: Record<string, string> = {
  A: "M1 11V4L4 1L7 4V11M1 7H7",
  B: "M1 11V1H5L7 3V5L5 6H1M5 6L7 8V9L5 11H1",
  C: "M7 1H3L1 3V9L3 11H7",
  D: "M1 11V1H5L7 3V9L5 11H1",
  E: "M7 1H1V11H7M1 6H6",
  F: "M7 1H1V11M1 6H6",
  G: "M7 1H3L1 3V9L3 11H7V6H5",
  H: "M1 1V11M7 1V11M1 6H7",
  I: "M2 1H6M4 1V11M2 11H6",
  J: "M7 1V9L5 11H3L1 9V8",
  K: "M1 1V11M7 1L1 7M4 4L7 11",
  L: "M1 1V11H7",
  M: "M1 11V1L4 5L7 1V11",
  N: "M1 11V1L7 11V1",
  O: "M3 1H5L7 3V9L5 11H3L1 9V3Z",
  P: "M1 11V1H5L7 3V5L5 7H1",
  Q: "M3 1H5L7 3V9L5 11H3L1 9V3ZM5 8L8 12",
  R: "M1 11V1H5L7 3V5L5 7H1M4 7L7 11",
  S: "M7 1H3L1 3V4L3 6H5L7 8V9L5 11H1",
  T: "M1 1H7M4 1V11",
  U: "M1 1V9L3 11H5L7 9V1",
  V: "M1 1V5L4 11L7 5V1",
  W: "M1 1V11L4 7L7 11V1",
  X: "M1 1L7 11M7 1L1 11",
  Y: "M1 1V3L4 6L7 3V1M4 6V11",
  Z: "M1 1H7L1 11H7",
  "0": "M3 1H5L7 3V9L5 11H3L1 9V3ZM2 9L6 3",
  "1": "M2 3L4 1V11M2 11H6",
  "2": "M1 3L3 1H5L7 3V4L1 10V11H7",
  "3": "M1 1H5L7 3V4L5 6H3M5 6L7 8V9L5 11H1",
  "4": "M1 1V7H7M6 1V11",
  "5": "M7 1H1V6H5L7 8V9L5 11H1",
  "6": "M7 1H3L1 3V9L3 11H5L7 9V8L5 6H1",
  "7": "M1 1H7V3L3 11",
  "8": "M3 1H5L7 3V4L5 6H3L1 4V3ZM3 6L1 8V9L3 11H5L7 9V8L5 6",
  "9": "M1 11H5L7 9V3L5 1H3L1 3V4L3 6H7",
  ".": "M4 11H4.2",
  "·": "M4 6H4.2",
  ":": "M4 4H4.2M4 8H4.2",
  "-": "M1 6H7",
  "–": "M0 6H8",
};

const accents: Record<string, string> = {
  "\u0301": "M4 -1L6 -3",
  "\u0307": "M4 -2H4.2",
  "\u0328": "M6 11L4 13L5 14H7",
};

export function PcbLettering({ text }: { text: string }) {
  const words = text.trim().toLocaleUpperCase("pl").split(/\s+/);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span className="robot-lettering" aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span className="robot-lettering-word" key={wordIndex}>
            {Array.from(word, (character, index) => {
              const [base, ...marks] = Array.from(character.normalize("NFD"));
              const route = glyphs[base === "Ł" ? "L" : base];
              if (!route) return <span key={index}>{character}</span>;

              const accent =
                base === "Ł" ? "M0 8L5 4" : marks.map((mark) => accents[mark] ?? "").join("");
              const start = /^M(-?[\d.]+) (-?[\d.]+)/.exec(route);

              return (
                <svg key={index} viewBox="0 -4 9 20">
                  <path d={route + accent} />
                  {start && <circle cx={start[1]} cy={start[2]} r=".94" />}
                </svg>
              );
            })}
          </span>
        ))}
      </span>
    </>
  );
}
