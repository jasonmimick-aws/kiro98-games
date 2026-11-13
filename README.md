# Kiro 98 Games

A Kiro Crew app that adds a **Kiro 98 Games** page: a late-90s desktop with
icons, a taskbar, a Start menu, a clock, and original games in windows.
It pairs with the [Kiro 98 theme pack](https://github.com/jasonmimick-aws/kiro98-theme).

Games so far:

- **Solitaire** (Klondike): drag or click-to-move, double-click auto-move,
  Draw 1 / Draw 3, undo, auto finish, score and timer.

## Install

```bash
kirocrew app install ~/work/kiro98-games
kirocrew app enable kiro98-games
```

Or: sidebar → Apps → Sources (gear) → install a local directory.

The page appears in the sidebar as **Kiro 98 Games**.

## Develop

```
games/*.html            one self-contained game per file (also works as a chat widget)
tools/page.template.mjs the desktop page (React via window.__kirocrew_modules, no JSX)
tools/build.py          embeds games into ui/index.mjs and draws assets/icon.png
ui/index.mjs            GENERATED: the module the dashboard loads
```

After editing, run `python3 tools/build.py`, then reinstall or use
`kirocrew app dev kiro98-games` for live reload.

Each game runs in a sandboxed iframe (`sandbox="allow-scripts"`, no same-origin),
so game code cannot reach the dashboard, its storage or your session.

All art is original. Klondike is a public-domain card game.
