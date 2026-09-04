import type { PluginContext, PluginThemeContribution } from "@getpaseo/plugin";

/**
 * Monokai Pro filter schemes. Every hex traces back to a documented Monokai Pro token, so the
 * ramp survives a palette revision:
 *
 * - `background`/`foreground`: the scheme's `background` and `foreground`.
 * - `raised`: `dimmed5`, the official card/surface tint.
 * - `control`: `background` + 15% `foreground` — the scheme's own active-element white overlay
 *   (`#FCFCFA26` in Pro) flattened onto the background, because Paseo fills inputs instead of
 *   layering alpha over them.
 * - `border`: `dimmed4`. Paseo uses this for borders *and* the highest raised tint.
 * - `ring`: `dimmed3`, the official focused-border color, so focus rings match the scheme.
 * - `mutedForeground`: `dimmed2`, the official muted text.
 * - `accent`: `accent3` (the yellow bracket color), which is Monokai Pro's own UI accent.
 *
 * `classic` predates the dimmed ladder, so `control` is its selection/line-highlight color and
 * `ring` is its comment color.
 */
interface FilterScheme {
  id: string;
  name: string;
  background: string;
  foreground: string;
  raised: string;
  control: string;
  border: string;
  ring: string;
  mutedForeground: string;
  accent: string;
}

const DARK_FILTERS: readonly FilterScheme[] = [
  {
    id: "pro",
    name: "Monokai Pro",
    background: "#2D2A2E",
    foreground: "#FCFCFA",
    raised: "#403E41",
    control: "#4C494C",
    border: "#5B595C",
    ring: "#727072",
    mutedForeground: "#939293",
    accent: "#FFD866",
  },
  {
    id: "classic",
    name: "Monokai Pro (Classic)",
    background: "#272822",
    foreground: "#F8F8F2",
    raised: "#3B3C35",
    control: "#49483E",
    border: "#57584F",
    ring: "#75715E",
    mutedForeground: "#919288",
    accent: "#E6DB74",
  },
  {
    id: "machine",
    name: "Monokai Pro (Machine)",
    background: "#273136",
    foreground: "#F2FFFC",
    raised: "#3A4449",
    control: "#455054",
    border: "#545F62",
    ring: "#6B7678",
    mutedForeground: "#8B9798",
    accent: "#FFED72",
  },
  {
    id: "ristretto",
    name: "Monokai Pro (Ristretto)",
    background: "#2C2525",
    foreground: "#FFF1F3",
    raised: "#403838",
    control: "#4B4344",
    border: "#5B5353",
    ring: "#72696A",
    mutedForeground: "#948A8B",
    accent: "#F9CC6C",
  },
  {
    id: "octagon",
    name: "Monokai Pro (Octagon)",
    background: "#282A3A",
    foreground: "#EAF2F1",
    raised: "#3A3D4B",
    control: "#454855",
    border: "#535763",
    ring: "#696D77",
    mutedForeground: "#888D94",
    accent: "#FFD76D",
  },
  {
    id: "spectrum",
    name: "Monokai Pro (Spectrum)",
    background: "#222222",
    foreground: "#F7F1FF",
    raised: "#363537",
    control: "#424143",
    border: "#525053",
    ring: "#69676C",
    mutedForeground: "#8B888F",
    accent: "#FCE566",
  },
];

/**
 * Light keeps the two documented surfaces flat (`backgroundDimmed1` covers both raised and
 * control) because the scheme only defines one raised step; `backgroundDimmed2` is the line and
 * bracket color, and the darkened `accent3` (`#CC7A0A`) is what carries the yellow identity on a
 * light background.
 */
const LIGHT_FILTERS: readonly PluginThemeContribution[] = [
  {
    id: "light",
    name: "Monokai Pro Light",
    appearance: "light",
    colors: {
      background: "#FAF4F2",
      foreground: "#29242A",
      raised: "#EDE7E5",
      control: "#EDE7E5",
      border: "#D3CDCC",
      mutedForeground: "#706B6E",
      ring: "#A59FA0",
      accent: "#CC7A0A",
    },
  },
];

export default function contribute(plugin: PluginContext) {
  for (const scheme of DARK_FILTERS) {
    plugin.addTheme({
      id: scheme.id,
      name: scheme.name,
      appearance: "dark",
      colors: {
        background: scheme.background,
        foreground: scheme.foreground,
        raised: scheme.raised,
        control: scheme.control,
        border: scheme.border,
        accent: scheme.accent,
        mutedForeground: scheme.mutedForeground,
        ring: scheme.ring,
      },
    });
  }

  for (const theme of LIGHT_FILTERS) {
    plugin.addTheme(theme);
  }

  return () => {};
}
