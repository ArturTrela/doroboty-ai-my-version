# DoRoboty.ai UI — agent materials v1.0.0

Start with [design.md](design.md). This local package reuses the accepted standalone prototype and preserves its detailed [designer reference](reference/index.html).

Requires Node 24. No runtime dependencies or build step.

```sh
npm run check
npm run dev
```

Open http://127.0.0.1:8952/ (or use UI_KIT_PORT to choose a different port).

- `styles/`: existing tokens, shared foundation/components and separate page compositions.
- `components/ui.js`: the retained semantic card/formatting/icon API, with documented package safeguards.
- `components/API.md`: exact imports, classes, anatomy and data contracts.
- `examples/components.html`: working component states and markup examples.
- `examples/index.html`, `examples/oferta.html`: full representative pages.
- `assets/`: local Geist Serif with SIL OFL license, original illustration and its prompt.
- `reference/`: full accepted designer documentation and evidence.
- `CHANGES.md`, `provenance.json`: package decisions and original source hashes.
- `VERIFICATION.md`: actual checks and limits.

Suggested instruction for the next agent:

> Read design.md and components/API.md. Reuse the supplied styles and semantic primitives. Follow the representative composition, preserve Polish UI, and validate the new screen at desktop/mobile widths and with long/missing content. Report actual checks and remaining demo-only behavior.

Use a local HTTP server for the examples, not file:// ES-module loading. The human reference HTML itself can be opened directly. No credentials, hosting identity or deployment setup is included.
