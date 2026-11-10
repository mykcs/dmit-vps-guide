# Dev · DMIT VPS Field Guide

Project implementation belongs to the [existing README](../../README.md), [package.json](../../package.json), source data/plans.json and scripts/build.mjs / scripts/check.mjs.

- **Build/check:** npm run check is the existing verification command. The [GitHub Pages workflow](../../.github/workflows/pages.yml) runs checks and deploys on main push (or manual dispatch), **not** on every documentation-only PR.
- **Release authority:** the live GitHub Actions run, current main, Pages settings and served site; don't infer deployment from this markdown.
- **Public/private boundary:** do not import any data from the separate private VPN configuration archive.
- **Current work:** [PRs](https://github.com/mykcs/dmit-vps-guide/pulls) and [Issues](https://github.com/mykcs/dmit-vps-guide/issues). [Current convention](https://github.com/mykcs/.agents/blob/main/docs/agents/HANDOFF_PATTERN.md) is being adopted separately in PR #1; preserve that active writer's AGENTS.md changes.
- **Wish:** [docs/wish](../wish/README.md); [shared Dev protocol](https://github.com/mykcs/.agents/blob/main/docs/agents/DEV_PROTOCOL.md).

Publishing, billing changes, secrets, SSH/VPN operations or real-time pricing claims require their own evidence and authorization.
