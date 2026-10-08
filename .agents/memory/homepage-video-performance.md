---
name: Homepage hero video performance
description: The media-format choice and performance constraint for the AUTO GAMMA hero loop.
---

Keep the original source footage unchanged and serve a silent, browser-friendly MP4 container copy for the looping hero background without re-encoding.

**Why:** The source clip is a 1080p/50 fps H.264 MOV. Preserving its image quality is more important than a small bandwidth reduction; lazy loading near the viewport and pausing offscreen provide performance gains without reducing quality.

**How to apply:** If the hero footage changes, keep the original untouched, remux to MP4 without re-encoding, and defer playback until the hero is near the viewport. Do not lower resolution or frame rate without explicit approval.
