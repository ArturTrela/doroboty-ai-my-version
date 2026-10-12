import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { parseJobDescription } from "./description";
import { JobDescription } from "./job-description";

describe("job descriptions", () => {
  it("recognizes legacy section labels without guessing at prose", () => {
    expect(
      parseJobDescription("O firmie\nFirma testowa.\n\nZakres odpowiedzialności\nTwój projekt."),
    ).toEqual([
      { type: "heading", text: "O firmie" },
      { type: "paragraph", text: "Firma testowa." },
      { type: "heading", text: "Zakres odpowiedzialności" },
      { type: "paragraph", text: "Twój projekt." },
    ]);
    expect(parseJobDescription("Krótki opis\nNadal ten sam akapit.")[0]).toEqual({
      type: "paragraph",
      text: "Krótki opis Nadal ten sam akapit.",
    });
  });
  it("supports explicit headings and distinct bullet/numbered lists with CRLF", () => {
    expect(
      parseJobDescription("## Zespół\r\n- Produkt\r\n- Dane\r\n\r\n1. Rozmowa\r\n2. Projekt"),
    ).toEqual([
      { type: "heading", text: "Zespół" },
      { type: "list", ordered: false, items: ["Produkt", "Dane"] },
      { type: "list", ordered: true, items: ["Rozmowa", "Projekt"] },
    ]);
    expect(parseJobDescription(" \n")).toEqual([]);
  });
  it("renders semantic headings and lists, but never interprets untrusted HTML", () => {
    const html = renderToStaticMarkup(
      createElement(JobDescription, {
        description: "# Oczekiwania\n- <script>alert(1)</script>\n\n<img src=x onerror=alert(1)>",
      }),
    );
    expect(html).toContain("<h3");
    expect(html).toContain("<ul");
    expect(html).toContain("<li");
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;script&gt;");
  });
});
