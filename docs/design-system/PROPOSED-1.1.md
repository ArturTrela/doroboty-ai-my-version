# Historical Poster People 1.1 proposal — superseded

This earlier proposal is **not an approved standalone reference release** and must not be used as active implementation guidance. Wojtek subsequently requested project documentation updates to prevent the audited mistakes. The active rules are now in [README.md](README.md), [IMPLEMENTATION.md](IMPLEMENTATION.md) and [VERIFICATION.md](VERIFICATION.md).

The proposal originally grouped workspace shell, editable form, record/detail surface, ResponsivePanel, persistent save and feedback recipes. The corrected implementation distinguishes them as follows:

- ResponsivePanel and SalaryFact adapt existing C14/C15/C18 and C07/C21 respectively; they do not create new visual families. Search remains visible outside filters. Applied facets update immediately within the host's existing single-value URL model; the bottom result action closes the filter dialog.
- Stable save names/aria-pressed implement existing action semantics with the host's persistent state. They do not replace persistence with the example's transient saves.
- Workspace, form, detail and feedback recipes compose existing host primitives and documented source roles. They are documented receiving-project adaptations, not proof that v1 contained these screens or established new semantic colors.
- A future reusable kit release would require a deliberate versioned package replacement with provenance, examples and validation. This documentation update does not create that release or retroactively approve all application screens.

Do not reopen the abandoned draft-filter behavior or use an extension proposal to normalize deviations from documented components. The immutable v1 agent kit remains unchanged.
