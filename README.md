# AM — Cinematic Music Studio (Unofficial Fan Concept)

A one-page, scroll-driven "music studio" concept inspired by Apple Music,
built as a front-end design study. Video intro reveal, spinning 3D vinyl deck
with a procedurally synthesized audio engine, artist rail, tilt-grid album
covers, and an interactive AI-generated 3D control room.

**Live:** served via GitHub Pages from this repo.

## ⚠️ Disclaimer

**This is an unofficial, non-commercial fan concept for educational and
portfolio purposes only.** Not affiliated with, endorsed by, or sponsored by
Apple Inc. "Apple Music" is a trademark of Apple Inc. Artist/album names are
referenced nominatively; **all audio is procedurally synthesized in the
browser — no real recordings are used or distributed.** Nothing is for sale.

See [LICENSE](LICENSE) for the MIT license (original code only) and full
trademark notice.

## Highlights

- Single self-contained `index.html` (~100KB) — no build step
- Web Audio API engine that synthesizes preview tones per track
- `assets/hero-reveal.webm` intro video (shared by both intro layers)
- "The Room" — 3D music studio mesh generated with **Higgsfield AI**
  (`generate_image` → `image_to_3d`), rendered with `<model-viewer>`
- Custom cursor, scroll reveals, screen labels, easter egg back room

## Run locally

```bash
python3 -m http.server 8732
# open http://localhost:8732
```
