# Untitled

Generated from the current project, including edits awaiting autosave. Return to the [theme index](../themes.md). Install the selected fonts and icons using the setup below; assets are acquired separately from their official sources.

## Font and icon setup

Follow [asset installation](../assets.md) when implementing this theme. Download and configure the selected free assets from their official sources; no font files or icon artwork are bundled. Weights below are the authored requests: load matching static faces or a variable range and report any unavailable weight. Register the exact family aliases below, or map the role tokens to the loader’s actual family.

| Selected font                        | Roles                      | Weights       | Family stack                                | Setup                                                                                                                                                                                                                    |
| ------------------------------------ | -------------------------- | ------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <code>Timeless Grotesk</code> (free) | brand, ui, editorial, data | 400, 500, 600 | <code>"Timeless Grotesk", sans-serif</code> | Download and load [Timeless Grotesk](https://timeless.co/type) in the app. Use the vendor’s Grotesk cut; if using Timeless Sans variable files, pin STYL to 0, with ital 0 for upright or 100 for required italic faces. |

### Icons

Selected: [Lucide](https://lucide.dev/guide/react/getting-started), outlined. Install and wire the selected free pack (React: <code>lucide-react</code>); reuse it if already installed. Use the official adapter for other frameworks.

Preserve icon size, color, weight, style, and accessible names. Match the selected style only where the pack supports it; Lucide’s official pack supplies outlines, so report a filled-style gap rather than claiming exact filled artwork. Keep existing package versions and add only missing packages using the receiving project’s package manager.

## Foundations

```json
{
  "name": "Untitled",
  "text": {
    "l": {
      "size": 26,
      "lineHeight": 34
    },
    "m": {
      "size": 17,
      "lineHeight": 26
    },
    "s": {
      "size": 15,
      "lineHeight": 21
    },
    "xl": {
      "size": 39,
      "lineHeight": 43
    },
    "xs": {
      "size": 13,
      "lineHeight": 17
    },
    "xxl": {
      "size": 52,
      "lineHeight": 56
    },
    "xxs": {
      "size": 11,
      "lineHeight": 15
    }
  },
  "fonts": {
    "ui": {
      "family": "\"Timeless Grotesk\", sans-serif",
      "weights": {
        "regular": 400,
        "medium": 500,
        "heavy": 600
      }
    },
    "brand": {
      "family": "\"Timeless Grotesk\", sans-serif",
      "weights": {
        "regular": 400,
        "medium": 500,
        "heavy": 600
      }
    },
    "editorial": {
      "family": "\"Timeless Grotesk\", sans-serif",
      "weights": {
        "regular": 400,
        "medium": 500,
        "heavy": 600
      }
    },
    "data": {
      "family": "\"Timeless Grotesk\", sans-serif",
      "weights": {
        "regular": 400,
        "medium": 500,
        "heavy": 600
      }
    }
  },
  "border": {
    "l": 0,
    "m": 0,
    "s": 0,
    "none": 0
  },
  "radius": {
    "l": 20,
    "m": 13,
    "s": 9,
    "xl": 31,
    "xs": 5,
    "full": 9999,
    "zero": 0
  },
  "shadows": {
    "l": {
      "x": 0,
      "y": 16,
      "blur": 48,
      "color": {
        "dark": "neutral-1",
        "light": "neutral-10"
      },
      "spread": 0,
      "opacity": 0
    },
    "m": {
      "x": 0,
      "y": 8,
      "blur": 24,
      "color": {
        "dark": "neutral-1",
        "light": "neutral-10"
      },
      "spread": 0,
      "opacity": 12
    },
    "s": {
      "x": 0,
      "y": 2,
      "blur": 4,
      "color": {
        "dark": "neutral-1",
        "light": "neutral-10"
      },
      "spread": 0,
      "opacity": 0
    }
  },
  "spacing": {
    "l": 29,
    "m": 19,
    "s": 14,
    "xl": 39,
    "xs": 10,
    "xxl": 58,
    "xxs": 5,
    "zero": 0
  },
  "animation": {
    "large": {
      "type": "spring",
      "duration": 280,
      "easing": [0.16, 1, 0.3, 1],
      "visualDuration": 0.36,
      "bounce": 0.3
    },
    "easing": [0.16, 1, 0.3, 1],
    "duration": 160,
    "popupScale": 0.96,
    "pressDistance": 1,
    "type": "spring",
    "visualDuration": 0.2,
    "bounce": 0.2
  },
  "iconStyle": "outlined",
  "iconFamily": "Lucide",
  "neutralTone": "neutral",
  "buttonRadius": "s",
  "colorEmphasis": 63.489583333333336,
  "letterSpacing": {
    "l": 0.01,
    "m": 0,
    "s": -0.01,
    "xl": 0.02,
    "xs": -0.02
  },
  "primaryForeground": {
    "dark": "neutral-2",
    "light": "neutral-2"
  },
  "primaryActionColor": "neutral-10"
}
```

## light CSS variables

Define these in the app’s existing theme scope for this mode. Keep component styles linked to the variables.

| Variable                         | Value                                                                                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--theme-name`                   | Untitled                                                                                                                                                     |
| `--theme-icon-family`            | Lucide                                                                                                                                                       |
| `--theme-icon-style`             | outlined                                                                                                                                                     |
| `--toolbar-divider-bleed`        | 0                                                                                                                                                            |
| `--focus-ring-outline`           | initial                                                                                                                                                      |
| `--icon-stroke-width`            | 2                                                                                                                                                            |
| `--icon-light-display`           | none                                                                                                                                                         |
| `--icon-regular-display`         | inline                                                                                                                                                       |
| `--icon-bold-display`            | none                                                                                                                                                         |
| `--motion-duration`              | 400ms                                                                                                                                                        |
| `--motion-easing`                | linear(0, 0.2375, 0.5904, 0.8358, 0.9599, 1.0061, 1.0152, 1.0116, 1.0062, 1.0025, 1.0006, 0.9999, 1)                                                         |
| `--motion-type`                  | spring                                                                                                                                                       |
| `--motion-visual-duration`       | 0.2                                                                                                                                                          |
| `--motion-bounce`                | 0.2                                                                                                                                                          |
| `--motion-enabled`               | 1                                                                                                                                                            |
| `--motion-small-iterations`      | infinite                                                                                                                                                     |
| `--motion-large-duration`        | 600ms                                                                                                                                                        |
| `--motion-large-easing`          | linear(0, 0.0846, 0.2691, 0.4778, 0.6674, 0.8179, 0.9249, 0.9926, 1.0293, 1.0442, 1.0452, 1.0388, 1.0296, 1.0202, 1.0121, 1.0061, 1.0019, 0.9995, 0.9983, 1) |
| `--motion-large-type`            | spring                                                                                                                                                       |
| `--motion-large-visual-duration` | 0.36                                                                                                                                                         |
| `--motion-large-bounce`          | 0.3                                                                                                                                                          |
| `--motion-large-iterations`      | infinite                                                                                                                                                     |
| `--motion-popup-scale`           | 0.96                                                                                                                                                         |
| `--motion-press-distance`        | 1px                                                                                                                                                          |
| `--option-badge-background`      | #00afe8                                                                                                                                                      |
| `--option-badge-foreground`      | #fbfbfb                                                                                                                                                      |
| `--navigation-active-foreground` | #fbfbfb                                                                                                                                                      |
| `--emphasis-chart-fill`          | #00afe833                                                                                                                                                    |
| `--emphasis-balance-background`  | #cdcdcd                                                                                                                                                      |
| `--emphasis-rewards-background`  | #f4f4f4                                                                                                                                                      |
| `--emphasis-icon-background`     | #f4f4f4                                                                                                                                                      |
| `--emphasis-icon-foreground`     | #000000                                                                                                                                                      |
| `--emphasis-type-background`     | #f4f4f4                                                                                                                                                      |
| `--emphasis-type-foreground`     | #000000                                                                                                                                                      |
| `--navigation-active-background` | #00afe8                                                                                                                                                      |
| `--surface-raised-image`         | none                                                                                                                                                         |
| `--surface-raised-shadow`        | 0 0 0 0 transparent                                                                                                                                          |
| `--surface-recessed-image`       | none                                                                                                                                                         |
| `--surface-recessed-shadow`      | 0 0 0 0 transparent                                                                                                                                          |
| `--space-zero`                   | 0px                                                                                                                                                          |
| `--space-xxs`                    | 5px                                                                                                                                                          |
| `--space-xs`                     | 10px                                                                                                                                                         |
| `--space-s`                      | 14px                                                                                                                                                         |
| `--space-m`                      | 19px                                                                                                                                                         |
| `--space-l`                      | 29px                                                                                                                                                         |
| `--space-xl`                     | 39px                                                                                                                                                         |
| `--space-xxl`                    | 58px                                                                                                                                                         |
| `--tracking-xs`                  | -0.02em                                                                                                                                                      |
| `--tracking-s`                   | -0.01em                                                                                                                                                      |
| `--tracking-m`                   | 0em                                                                                                                                                          |
| `--tracking-l`                   | 0.01em                                                                                                                                                       |
| `--tracking-xl`                  | 0.02em                                                                                                                                                       |
| `--size-xxs`                     | 11px                                                                                                                                                         |
| `--line-xxs`                     | 15px                                                                                                                                                         |
| `--letter-spacing-xxs`           | 0.02em                                                                                                                                                       |
| `--size-xs`                      | 13px                                                                                                                                                         |
| `--line-xs`                      | 17px                                                                                                                                                         |
| `--letter-spacing-xs`            | 0.01em                                                                                                                                                       |
| `--size-s`                       | 15px                                                                                                                                                         |
| `--line-s`                       | 21px                                                                                                                                                         |
| `--letter-spacing-s`             | 0.01em                                                                                                                                                       |
| `--size-m`                       | 17px                                                                                                                                                         |
| `--line-m`                       | 26px                                                                                                                                                         |
| `--letter-spacing-m`             | 0em                                                                                                                                                          |
| `--size-l`                       | 26px                                                                                                                                                         |
| `--line-l`                       | 34px                                                                                                                                                         |
| `--letter-spacing-l`             | -0.01em                                                                                                                                                      |
| `--size-xl`                      | 39px                                                                                                                                                         |
| `--line-xl`                      | 43px                                                                                                                                                         |
| `--letter-spacing-xl`            | -0.01em                                                                                                                                                      |
| `--size-xxl`                     | 52px                                                                                                                                                         |
| `--line-xxl`                     | 56px                                                                                                                                                         |
| `--letter-spacing-xxl`           | -0.02em                                                                                                                                                      |
| `--radius-zero`                  | 0px                                                                                                                                                          |
| `--radius-xs`                    | 5px                                                                                                                                                          |
| `--radius-s`                     | 9px                                                                                                                                                          |
| `--radius-m`                     | 13px                                                                                                                                                         |
| `--radius-l`                     | 20px                                                                                                                                                         |
| `--radius-xl`                    | 31px                                                                                                                                                         |
| `--radius-full`                  | 9999px                                                                                                                                                       |
| `--border-none`                  | 0px                                                                                                                                                          |
| `--border-s`                     | 0px                                                                                                                                                          |
| `--border-m`                     | 0px                                                                                                                                                          |
| `--border-l`                     | 0px                                                                                                                                                          |
| `--border-default-color`         | #e7e7e733                                                                                                                                                    |
| `--border-shadow-none`           | 0 0 0 0 transparent                                                                                                                                          |
| `--border-shadow-s`              | 0 0 0 0 transparent                                                                                                                                          |
| `--border-shadow-m`              | 0 0 0 0 transparent                                                                                                                                          |
| `--border-shadow-l`              | 0 0 0 0 transparent                                                                                                                                          |
| `--font-ui`                      | "Timeless Grotesk", sans-serif                                                                                                                               |
| `--weight-ui-regular`            | 400                                                                                                                                                          |
| `--weight-ui-medium`             | 500                                                                                                                                                          |
| `--weight-ui-heavy`              | 600                                                                                                                                                          |
| `--font-brand`                   | "Timeless Grotesk", sans-serif                                                                                                                               |
| `--weight-brand-regular`         | 400                                                                                                                                                          |
| `--weight-brand-medium`          | 500                                                                                                                                                          |
| `--weight-brand-heavy`           | 600                                                                                                                                                          |
| `--font-editorial`               | "Timeless Grotesk", sans-serif                                                                                                                               |
| `--weight-editorial-regular`     | 400                                                                                                                                                          |
| `--weight-editorial-medium`      | 500                                                                                                                                                          |
| `--weight-editorial-heavy`       | 600                                                                                                                                                          |
| `--font-data`                    | "Timeless Grotesk", sans-serif                                                                                                                               |
| `--weight-data-regular`          | 400                                                                                                                                                          |
| `--weight-data-medium`           | 500                                                                                                                                                          |
| `--weight-data-heavy`            | 600                                                                                                                                                          |
| `--color-none`                   | transparent                                                                                                                                                  |
| `--color-1`                      | #00afe8                                                                                                                                                      |
| `--color-1-transparent`          | #00afe833                                                                                                                                                    |
| `--color-2`                      | #085e55                                                                                                                                                      |
| `--color-2-transparent`          | #085e5533                                                                                                                                                    |
| `--color-3`                      | #ffed9b                                                                                                                                                      |
| `--color-3-transparent`          | #ffed9b33                                                                                                                                                    |
| `--color-4`                      | #ffb5aa                                                                                                                                                      |
| `--color-4-transparent`          | #ffb5aa33                                                                                                                                                    |
| `--neutral-1`                    | #ffffff                                                                                                                                                      |
| `--neutral-1-transparent`        | #ffffff33                                                                                                                                                    |
| `--neutral-2`                    | #fbfbfb                                                                                                                                                      |
| `--neutral-2-transparent`        | #fbfbfb33                                                                                                                                                    |
| `--neutral-3`                    | #f4f4f4                                                                                                                                                      |
| `--neutral-3-transparent`        | #f4f4f433                                                                                                                                                    |
| `--neutral-4`                    | #e7e7e7                                                                                                                                                      |
| `--neutral-4-transparent`        | #e7e7e733                                                                                                                                                    |
| `--neutral-5`                    | #cdcdcd                                                                                                                                                      |
| `--neutral-5-transparent`        | #cdcdcd33                                                                                                                                                    |
| `--neutral-6`                    | #a1a1a1                                                                                                                                                      |
| `--neutral-6-transparent`        | #a1a1a133                                                                                                                                                    |
| `--neutral-7`                    | #7d7d7d                                                                                                                                                      |
| `--neutral-7-transparent`        | #7d7d7d33                                                                                                                                                    |
| `--neutral-8`                    | #555555                                                                                                                                                      |
| `--neutral-8-transparent`        | #55555533                                                                                                                                                    |
| `--neutral-9`                    | #333333                                                                                                                                                      |
| `--neutral-9-transparent`        | #33333333                                                                                                                                                    |
| `--neutral-10`                   | #000000                                                                                                                                                      |
| `--neutral-10-transparent`       | #00000033                                                                                                                                                    |
| `--success`                      | #00906c                                                                                                                                                      |
| `--success-transparent`          | #00906c33                                                                                                                                                    |
| `--warning`                      | #ffea00                                                                                                                                                      |
| `--warning-transparent`          | #ffea0033                                                                                                                                                    |
| `--error`                        | #fc032d                                                                                                                                                      |
| `--error-transparent`            | #fc032d33                                                                                                                                                    |
| `--shadow-none`                  | none                                                                                                                                                         |
| `--shadow-s`                     | 0px 2px 4px 0px #00000000                                                                                                                                    |
| `--shadow-m`                     | 0px 2px 6px 0px #0000000d, 0px 8px 24px 0px #00000013                                                                                                        |
| `--shadow-l`                     | 0px 16px 48px 0px #00000000                                                                                                                                  |
| `--cte-canvas`                   | #ffffff                                                                                                                                                      |
| `--cte-surface`                  | #fbfbfb                                                                                                                                                      |
| `--cte-surface-muted`            | #f4f4f4                                                                                                                                                      |
| `--cte-text`                     | #000000                                                                                                                                                      |
| `--cte-text-muted`               | #7d7d7d                                                                                                                                                      |
| `--cte-border`                   | #e7e7e733                                                                                                                                                    |
| `--cte-accent`                   | #00afe8                                                                                                                                                      |
| `--cte-accent-text`              | #fbfbfb                                                                                                                                                      |
| `--cte-danger`                   | #fc032d                                                                                                                                                      |
| `--cte-focus`                    | #00afe8                                                                                                                                                      |
| `--cte-font`                     | "Timeless Grotesk", sans-serif                                                                                                                               |
| `--cte-font-size`                | 15px                                                                                                                                                         |
| `--cte-font-weight`              | 400                                                                                                                                                          |
| `--cte-line-height`              | 21px                                                                                                                                                         |
| `--cte-letter-spacing`           | 0.01em                                                                                                                                                       |
| `--cte-detail-font-size`         | 13px                                                                                                                                                         |
| `--cte-detail-line-height`       | 17px                                                                                                                                                         |
| `--cte-detail-letter-spacing`    | 0.01em                                                                                                                                                       |

## dark CSS variables

Define these in the app’s existing theme scope for this mode. Keep component styles linked to the variables.

| Variable                         | Value                                                                                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--theme-name`                   | Untitled                                                                                                                                                     |
| `--theme-icon-family`            | Lucide                                                                                                                                                       |
| `--theme-icon-style`             | outlined                                                                                                                                                     |
| `--toolbar-divider-bleed`        | 0                                                                                                                                                            |
| `--focus-ring-outline`           | initial                                                                                                                                                      |
| `--icon-stroke-width`            | 2                                                                                                                                                            |
| `--icon-light-display`           | none                                                                                                                                                         |
| `--icon-regular-display`         | inline                                                                                                                                                       |
| `--icon-bold-display`            | none                                                                                                                                                         |
| `--motion-duration`              | 400ms                                                                                                                                                        |
| `--motion-easing`                | linear(0, 0.2375, 0.5904, 0.8358, 0.9599, 1.0061, 1.0152, 1.0116, 1.0062, 1.0025, 1.0006, 0.9999, 1)                                                         |
| `--motion-type`                  | spring                                                                                                                                                       |
| `--motion-visual-duration`       | 0.2                                                                                                                                                          |
| `--motion-bounce`                | 0.2                                                                                                                                                          |
| `--motion-enabled`               | 1                                                                                                                                                            |
| `--motion-small-iterations`      | infinite                                                                                                                                                     |
| `--motion-large-duration`        | 600ms                                                                                                                                                        |
| `--motion-large-easing`          | linear(0, 0.0846, 0.2691, 0.4778, 0.6674, 0.8179, 0.9249, 0.9926, 1.0293, 1.0442, 1.0452, 1.0388, 1.0296, 1.0202, 1.0121, 1.0061, 1.0019, 0.9995, 0.9983, 1) |
| `--motion-large-type`            | spring                                                                                                                                                       |
| `--motion-large-visual-duration` | 0.36                                                                                                                                                         |
| `--motion-large-bounce`          | 0.3                                                                                                                                                          |
| `--motion-large-iterations`      | infinite                                                                                                                                                     |
| `--motion-popup-scale`           | 0.96                                                                                                                                                         |
| `--motion-press-distance`        | 1px                                                                                                                                                          |
| `--option-badge-background`      | #00afe8                                                                                                                                                      |
| `--option-badge-foreground`      | #fbfbfb                                                                                                                                                      |
| `--navigation-active-foreground` | #fbfbfb                                                                                                                                                      |
| `--emphasis-chart-fill`          | #00afe833                                                                                                                                                    |
| `--emphasis-balance-background`  | #565656                                                                                                                                                      |
| `--emphasis-rewards-background`  | #2b2b2b                                                                                                                                                      |
| `--emphasis-icon-background`     | #2b2b2b                                                                                                                                                      |
| `--emphasis-icon-foreground`     | #ffffff                                                                                                                                                      |
| `--emphasis-type-background`     | #2b2b2b                                                                                                                                                      |
| `--emphasis-type-foreground`     | #ffffff                                                                                                                                                      |
| `--navigation-active-background` | #00afe8                                                                                                                                                      |
| `--surface-raised-image`         | none                                                                                                                                                         |
| `--surface-raised-shadow`        | 0 0 0 0 transparent                                                                                                                                          |
| `--surface-recessed-image`       | none                                                                                                                                                         |
| `--surface-recessed-shadow`      | 0 0 0 0 transparent                                                                                                                                          |
| `--space-zero`                   | 0px                                                                                                                                                          |
| `--space-xxs`                    | 5px                                                                                                                                                          |
| `--space-xs`                     | 10px                                                                                                                                                         |
| `--space-s`                      | 14px                                                                                                                                                         |
| `--space-m`                      | 19px                                                                                                                                                         |
| `--space-l`                      | 29px                                                                                                                                                         |
| `--space-xl`                     | 39px                                                                                                                                                         |
| `--space-xxl`                    | 58px                                                                                                                                                         |
| `--tracking-xs`                  | -0.02em                                                                                                                                                      |
| `--tracking-s`                   | -0.01em                                                                                                                                                      |
| `--tracking-m`                   | 0em                                                                                                                                                          |
| `--tracking-l`                   | 0.01em                                                                                                                                                       |
| `--tracking-xl`                  | 0.02em                                                                                                                                                       |
| `--size-xxs`                     | 11px                                                                                                                                                         |
| `--line-xxs`                     | 15px                                                                                                                                                         |
| `--letter-spacing-xxs`           | 0.02em                                                                                                                                                       |
| `--size-xs`                      | 13px                                                                                                                                                         |
| `--line-xs`                      | 17px                                                                                                                                                         |
| `--letter-spacing-xs`            | 0.01em                                                                                                                                                       |
| `--size-s`                       | 15px                                                                                                                                                         |
| `--line-s`                       | 21px                                                                                                                                                         |
| `--letter-spacing-s`             | 0.01em                                                                                                                                                       |
| `--size-m`                       | 17px                                                                                                                                                         |
| `--line-m`                       | 26px                                                                                                                                                         |
| `--letter-spacing-m`             | 0em                                                                                                                                                          |
| `--size-l`                       | 26px                                                                                                                                                         |
| `--line-l`                       | 34px                                                                                                                                                         |
| `--letter-spacing-l`             | -0.01em                                                                                                                                                      |
| `--size-xl`                      | 39px                                                                                                                                                         |
| `--line-xl`                      | 43px                                                                                                                                                         |
| `--letter-spacing-xl`            | -0.01em                                                                                                                                                      |
| `--size-xxl`                     | 52px                                                                                                                                                         |
| `--line-xxl`                     | 56px                                                                                                                                                         |
| `--letter-spacing-xxl`           | -0.02em                                                                                                                                                      |
| `--radius-zero`                  | 0px                                                                                                                                                          |
| `--radius-xs`                    | 5px                                                                                                                                                          |
| `--radius-s`                     | 9px                                                                                                                                                          |
| `--radius-m`                     | 13px                                                                                                                                                         |
| `--radius-l`                     | 20px                                                                                                                                                         |
| `--radius-xl`                    | 31px                                                                                                                                                         |
| `--radius-full`                  | 9999px                                                                                                                                                       |
| `--border-none`                  | 0px                                                                                                                                                          |
| `--border-s`                     | 0px                                                                                                                                                          |
| `--border-m`                     | 0px                                                                                                                                                          |
| `--border-l`                     | 0px                                                                                                                                                          |
| `--border-default-color`         | #3d3d3d33                                                                                                                                                    |
| `--border-shadow-none`           | 0 0 0 0 transparent                                                                                                                                          |
| `--border-shadow-s`              | 0 0 0 0 transparent                                                                                                                                          |
| `--border-shadow-m`              | 0 0 0 0 transparent                                                                                                                                          |
| `--border-shadow-l`              | 0 0 0 0 transparent                                                                                                                                          |
| `--font-ui`                      | "Timeless Grotesk", sans-serif                                                                                                                               |
| `--weight-ui-regular`            | 400                                                                                                                                                          |
| `--weight-ui-medium`             | 500                                                                                                                                                          |
| `--weight-ui-heavy`              | 600                                                                                                                                                          |
| `--font-brand`                   | "Timeless Grotesk", sans-serif                                                                                                                               |
| `--weight-brand-regular`         | 400                                                                                                                                                          |
| `--weight-brand-medium`          | 500                                                                                                                                                          |
| `--weight-brand-heavy`           | 600                                                                                                                                                          |
| `--font-editorial`               | "Timeless Grotesk", sans-serif                                                                                                                               |
| `--weight-editorial-regular`     | 400                                                                                                                                                          |
| `--weight-editorial-medium`      | 500                                                                                                                                                          |
| `--weight-editorial-heavy`       | 600                                                                                                                                                          |
| `--font-data`                    | "Timeless Grotesk", sans-serif                                                                                                                               |
| `--weight-data-regular`          | 400                                                                                                                                                          |
| `--weight-data-medium`           | 500                                                                                                                                                          |
| `--weight-data-heavy`            | 600                                                                                                                                                          |
| `--color-none`                   | transparent                                                                                                                                                  |
| `--color-1`                      | #00afe8                                                                                                                                                      |
| `--color-1-transparent`          | #00afe833                                                                                                                                                    |
| `--color-2`                      | #085e55                                                                                                                                                      |
| `--color-2-transparent`          | #085e5533                                                                                                                                                    |
| `--color-3`                      | #ffed9b                                                                                                                                                      |
| `--color-3-transparent`          | #ffed9b33                                                                                                                                                    |
| `--color-4`                      | #ffb5aa                                                                                                                                                      |
| `--color-4-transparent`          | #ffb5aa33                                                                                                                                                    |
| `--neutral-1`                    | #000000                                                                                                                                                      |
| `--neutral-1-transparent`        | #00000033                                                                                                                                                    |
| `--neutral-2`                    | #202020                                                                                                                                                      |
| `--neutral-2-transparent`        | #20202033                                                                                                                                                    |
| `--neutral-3`                    | #2b2b2b                                                                                                                                                      |
| `--neutral-3-transparent`        | #2b2b2b33                                                                                                                                                    |
| `--neutral-4`                    | #3d3d3d                                                                                                                                                      |
| `--neutral-4-transparent`        | #3d3d3d33                                                                                                                                                    |
| `--neutral-5`                    | #565656                                                                                                                                                      |
| `--neutral-5-transparent`        | #56565633                                                                                                                                                    |
| `--neutral-6`                    | #838383                                                                                                                                                      |
| `--neutral-6-transparent`        | #83838333                                                                                                                                                    |
| `--neutral-7`                    | #ababab                                                                                                                                                      |
| `--neutral-7-transparent`        | #ababab33                                                                                                                                                    |
| `--neutral-8`                    | #cfcfcf                                                                                                                                                      |
| `--neutral-8-transparent`        | #cfcfcf33                                                                                                                                                    |
| `--neutral-9`                    | #f4f4f4                                                                                                                                                      |
| `--neutral-9-transparent`        | #f4f4f433                                                                                                                                                    |
| `--neutral-10`                   | #ffffff                                                                                                                                                      |
| `--neutral-10-transparent`       | #ffffff33                                                                                                                                                    |
| `--success`                      | #00906c                                                                                                                                                      |
| `--success-transparent`          | #00906c33                                                                                                                                                    |
| `--warning`                      | #ffea00                                                                                                                                                      |
| `--warning-transparent`          | #ffea0033                                                                                                                                                    |
| `--error`                        | #fc032d                                                                                                                                                      |
| `--error-transparent`            | #fc032d33                                                                                                                                                    |
| `--shadow-none`                  | none                                                                                                                                                         |
| `--shadow-s`                     | 0px 2px 4px 0px #00000000                                                                                                                                    |
| `--shadow-m`                     | 0px 2px 6px 0px #0000000d, 0px 8px 24px 0px #00000013                                                                                                        |
| `--shadow-l`                     | 0px 16px 48px 0px #00000000                                                                                                                                  |
| `--cte-canvas`                   | #000000                                                                                                                                                      |
| `--cte-surface`                  | #202020                                                                                                                                                      |
| `--cte-surface-muted`            | #2b2b2b                                                                                                                                                      |
| `--cte-text`                     | #ffffff                                                                                                                                                      |
| `--cte-text-muted`               | #ababab                                                                                                                                                      |
| `--cte-border`                   | #3d3d3d33                                                                                                                                                    |
| `--cte-accent`                   | #00afe8                                                                                                                                                      |
| `--cte-accent-text`              | #202020                                                                                                                                                      |
| `--cte-danger`                   | #fc032d                                                                                                                                                      |
| `--cte-focus`                    | #00afe8                                                                                                                                                      |
| `--cte-font`                     | "Timeless Grotesk", sans-serif                                                                                                                               |
| `--cte-font-size`                | 15px                                                                                                                                                         |
| `--cte-font-weight`              | 400                                                                                                                                                          |
| `--cte-line-height`              | 21px                                                                                                                                                         |
| `--cte-letter-spacing`           | 0.01em                                                                                                                                                       |
| `--cte-detail-font-size`         | 13px                                                                                                                                                         |
| `--cte-detail-line-height`       | 17px                                                                                                                                                         |
| `--cte-detail-letter-spacing`    | 0.01em                                                                                                                                                       |

## Authored component assignments

These are project edits. The [component reference](untitled-components.md) includes the effective assignments with defaults and shared parts resolved.

```json
{
  "componentTokens": {
    "button:ghost:rest": {
      "paddingX": "l",
      "paddingTop": "s",
      "paddingBottom": "s"
    },
    "button:danger:rest": {
      "paddingX": "l",
      "paddingTop": "s",
      "paddingBottom": "s"
    },
    "input:default:rest": {
      "paddingX": "m",
      "background": "neutral-3",
      "paddingTop": "s",
      "paddingBottom": "s"
    },
    "button:outline:rest": {
      "paddingX": "l",
      "paddingTop": "s",
      "paddingBottom": "s"
    },
    "button:primary:rest": {
      "paddingX": "l",
      "paddingTop": "s",
      "paddingBottom": "s"
    },
    "select:default:rest": {
      "paddingX": "m",
      "background": "neutral-3",
      "paddingTop": "s",
      "paddingBottom": "s"
    },
    "button:secondary:rest": {
      "paddingX": "l",
      "paddingTop": "s",
      "paddingBottom": "s"
    },
    "combobox:default:rest": {
      "paddingX": "m",
      "background": "neutral-3",
      "paddingTop": "s",
      "paddingBottom": "s"
    },
    "menu:default:part:option:rest": {
      "paddingX": "xs",
      "paddingTop": "xs",
      "paddingLeft": "xs",
      "paddingRight": "xs",
      "paddingBottom": "xs"
    },
    "slider:default:part:thumb:rest": {
      "controlSize": "l"
    },
    "slider:default:part:track:rest": {
      "controlSize": "xl"
    },
    "switch:default:part:control:rest": {
      "controlSize": "xl"
    },
    "combobox:default:part:option:rest": {
      "paddingX": "xs",
      "paddingTop": "xs",
      "paddingLeft": "xs",
      "paddingRight": "xs",
      "paddingBottom": "xs"
    },
    "menu:default:part:option:selected": {
      "paddingX": "xs",
      "paddingTop": "xs",
      "paddingLeft": "xs",
      "paddingRight": "xs",
      "paddingBottom": "xs"
    },
    "otp-field:default:part:input:rest": {
      "paddingX": "s",
      "paddingTop": "xs",
      "paddingLeft": "s",
      "paddingRight": "s",
      "paddingBottom": "xs"
    },
    "checkbox:default:part:control:rest": {
      "controlSize": "l"
    },
    "autocomplete:default:part:input:rest": {
      "paddingX": "s",
      "paddingTop": "s",
      "paddingLeft": "s",
      "paddingRight": "s",
      "paddingBottom": "s"
    },
    "autocomplete:default:part:option:rest": {
      "paddingX": "xs",
      "paddingTop": "xs",
      "paddingLeft": "xs",
      "paddingRight": "xs",
      "paddingBottom": "xs"
    },
    "combobox:default:part:option:selected": {
      "paddingX": "xs",
      "paddingTop": "xs",
      "paddingLeft": "xs",
      "paddingRight": "xs",
      "paddingBottom": "xs"
    },
    "autocomplete:default:part:popover:rest": {
      "radius": "s"
    },
    "autocomplete:default:part:option:selected": {
      "paddingX": "xs",
      "paddingTop": "xs",
      "paddingLeft": "xs",
      "paddingRight": "xs",
      "paddingBottom": "xs"
    }
  },
  "componentVariants": {}
}
```
