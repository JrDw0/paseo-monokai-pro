# paseo-monokai-pro

Monokai Pro's filter schemes as Paseo app themes. Seven entries in **Settings → Appearance**, each
contributed with one `addTheme` call. Client-only plugin: no server entry, no subprocess, no RPC.

Unofficial. Monokai Pro is Wimer Hazell's product ([monokai.pro](https://monokai.pro)); this repo
only reuses the color values from his published ports and is not affiliated with or endorsed by him.
Buying Monokai Pro supports the author; this plugin does not include his editor themes or syntax
packages.

| Theme                   | id          | `appearance` |
| ----------------------- | ----------- | ------------ |
| Monokai Pro             | `pro`       | dark         |
| Monokai Pro Light       | `light`     | light        |
| Monokai Pro (Classic)   | `classic`   | dark         |
| Monokai Pro (Machine)   | `machine`   | dark         |
| Monokai Pro (Ristretto) | `ristretto` | dark         |
| Monokai Pro (Octagon)   | `octagon`   | dark         |
| Monokai Pro (Spectrum)  | `spectrum`  | dark         |

Requires Paseo **0.8 or later** — the plugin uses the v0.8 runtime entries layout
(`index.client.ts`). On Paseo 0.7.x, install the last 0.7 build instead:

```bash
paseo plugin add JrDw0/paseo-monokai-pro --ref v0.1.0
```

An older daemon rejects the current build with `This plugin was made for an older version of
Paseo`, and a 0.8 daemon rejects `v0.1.0` the same way — the two layouts are not loadable by each
other, hence the tag.

## Install

```bash
paseo plugin add JrDw0/paseo-monokai-pro            # Paseo 0.8+
paseo plugin add JrDw0/paseo-monokai-pro --ref v0.1.0  # Paseo 0.7.x
```

Then pick a theme in **Settings → Appearance**. The daemon needs `pluginsEnabled: true`
(**Settings → Plugins**, or the root field in `$PASEO_HOME/config.json` followed by `paseo reload`).

The plugin has no `build` hook, so `paseo plugin add` runs no package manager, install script, or
Git hook. `npm install` here is only for local typechecking; Paseo supplies the SDK at compile time.

After editing `index.ts`, run `paseo plugin reload monokai-pro` — a running client does not
re-evaluate the bundle on its own.

## What it reads and changes

The plugin registers static color data and nothing else. It opens no files, reads no environment
variables, makes no network requests, touches no Paseo state, and registers no surfaces, panels,
commands, or RPC handlers. `paseo plugin logs monokai-pro` shows only `[paseo] Loading plugin` and
`[paseo] Plugin ready`.

The only state change is yours: selecting a theme persists `theme: "plugin"` plus
`pluginThemeId: "monokai-pro/theme/<id>"` in your appearance settings. Disable or remove the plugin
and Paseo falls back to the default theme rather than leaving the app unpainted.

## Palette mapping

Paseo expands 8 hex tokens into its full semantic set, so the plugin lists only those. Each value is
a documented Monokai Pro token — nothing is eyeballed.

| Plugin key        | Paseo surfaces                                 | Monokai Pro token                                                                                                                                   |
| ----------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `background`      | app, workspace, terminal, sidebar              | `background`                                                                                                                                        |
| `foreground`      | primary text, terminal foreground              | `foreground`                                                                                                                                        |
| `raised`          | cards, popovers, hovered rows                  | `dimmed5` (`surface.background`)                                                                                                                    |
| `control`         | inputs, secondary fills                        | `background` + 15% `foreground` — the scheme's active-element overlay (`#FCFCFA26`) flattened, because Paseo fills inputs instead of layering alpha |
| `border`          | borders, highest raised tint                   | `dimmed4`                                                                                                                                           |
| `ring`            | focus rings, scrollbars, terminal bright black | `dimmed3` (official focused border)                                                                                                                 |
| `mutedForeground` | secondary text                                 | `dimmed2` (`text.muted`)                                                                                                                            |
| `accent`          | buttons, selection, focus                      | `accent3` (the yellow bracket color)                                                                                                                |

Dark filters derive from this table in a loop; `light` is written out because the light scheme
defines one raised step only, so `raised` and `control` share `backgroundDimmed1`.

Source of the hexes: Monokai Pro filter schemes as published in Wimer Hazell's own ports —
`monokai-pro/zed` and `monokai-pro/opencode` (Pro), plus the per-filter dimmed/accent ladders in
`iatosh/monokai-pro.wezterm`, cross-checked against `helix-editor/helix` `monokai_pro.toml` and the
Monokai Pro Light terminal palettes. `classic` keeps the original Monokai `foreground` `#F8F8F2` and
comment `#75715E` rather than the port's recomputed values.

## Known limits

- **Syntax colors are not themeable by plugins.** Code blocks keep Paseo's built-in highlight theme,
  so Monokai coloring shows up in chrome, panels, menus, and the terminal, not in highlighted
  source.
- **Light buttons hit 3.03:1.** Paseo derives `accentForeground` from `background`, so `#FAF4F2`
  text on the official light `accent3` `#CC7A0A` clears AA for large text only. Set
  `accent: "#7058BE"` (official `accent6`, 5.04:1) in `index.client.ts` if you want AA body-text
  labels on buttons.
- `statusDanger`, diff tints, and shadows come from Paseo's built-in derivations; the plugin API
  exposes no knobs for them.
- Theme selection is global — only one contributed theme is active at a time, across all themes and
  hosts.

## Entry point

`index.client.ts` is the v0.8 client entry; the theme is data, so there is no server entry and no
subprocess work at all. `PluginClientContext` comes from `@getpaseo/plugin/client`, and every
`add*` returns an idempotent remover — this plugin keeps none, so Paseo drops the seven themes at
cleanup. The `v0.1.0` tag holds the pre-migration `index.ts` layout for 0.7 daemons.

## Development

```bash
npm install     # dev dependencies for typechecking only
npm run typecheck
```

## License

MIT, code only. The Monokai Pro name belongs to its author; see the note above.
