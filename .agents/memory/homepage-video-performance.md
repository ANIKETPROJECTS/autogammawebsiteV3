---
name: Homepage hero video performance
description: The media-format choice and performance constraint for the AUTO GAMMA hero loop.
---

Keep the original source footage unchanged and serve a silent, browser-friendly MP4 derivative for the looping hero background.

**Why:** The source clip was a large 1080p/50 fps MOV, which adds avoidable bandwidth and video-decoding work for a background with no audio. A 900p/30 fps H.264 version reduces that work while remaining sharp at common desktop and mobile sizes.

**How to apply:** If the hero footage changes, regenerate a silent MP4 derivative, preserve the original, and defer playback until the hero is near the viewport. Check the encoded result before replacing the current version.
