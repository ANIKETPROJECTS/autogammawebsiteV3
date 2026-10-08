---
name: Package firewall recovery
description: Handling security-blocked transitive packages during imported npm setup
---

An imported npm lockfile can retain a security-blocked transitive version even after updating its direct parent to the newest compatible release. If the updated parent still resolves the blocked package, use a narrowly scoped override to the patched version compatible with the parent.

**Why:** The initial install and the compatible parent update both attempted the same blocked transitive tarball during this project's import setup. Do not bypass the package firewall.

**How to apply:** Check the latest parent and transitive releases, preserve the existing major stack where possible, and verify the resolved dependency tree plus type check and build after installation.
