---
name: Package firewall recovery
description: Handling security-blocked transitive packages during imported npm setup
---

An imported npm lockfile can retain a security-blocked transitive version even after updating its direct parent to the newest compatible release. If the updated parent still resolves the blocked package, use a narrowly scoped override to the patched version compatible with the parent.

**Why:** The initial install and the compatible parent update both attempted the same blocked transitive tarball during this project's import setup. Do not bypass the package firewall.

**How to apply:** Check the latest parent and transitive releases, preserve the existing major stack where possible, and verify the resolved dependency tree plus type check and build after installation.

Replit-generated lockfiles can also contain `resolved` tarball URLs on `package-firewall.replit.internal`. An external VPS cannot resolve that private hostname, producing `ENOTFOUND` even when the package itself is valid. For an external deployment, change only those lockfile URLs to the matching `https://registry.npmjs.org/` tarball URL; preserve package versions and integrity hashes.

**Why:** Private registry hostnames are scoped to Replit, while `resolved` URLs in a lockfile take precedence over the target machine's default npm registry.

**How to apply:** Distinguish an external DNS failure from a Replit security block. Keep the Replit firewall policy for installs inside Replit; make lockfile tarball URLs portable when the project must install on an external server.
