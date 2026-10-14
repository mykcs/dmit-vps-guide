# Public VPS educational website — agent instructions

This is a PUBLIC guide. Only researched official product facts, educational examples and static web source belong here.

- data/plans.json is the sole pricing authority. Update checked_on only after verifying DMIT official listings and documenting SKU, price interval and sources.
- site/ holds accessible HTML, CSS and JavaScript; scripts/build.mjs generates dist, scripts/check.mjs verifies.
- .github/workflows/pages.yml is the only intended production deployment workflow. Test with npm run check; verify actual live URL after deployment.
- Chinese explanatory style should be ELI5-first, minimal green-tinted editorial visual design; distinguish confirmed facts from estimates.
- Never copy files or secrets from the PRIVATE VPN/Stash archive. Never publish actual subscription URLs, addresses, WireGuard private keys, SSH credentials, identifiers or personal logs. Do not contact or change a VPS.
- For routing claims, measure on the actual ingress ISP and desired egress destinations; do not infer from product label alone.
- This is not an automated VPN deployment service, VPN reseller, billing portal or user-data collector.
- Keep deployment dependency-free and static unless a proven requirement justifies it; no tracking, cookies, external fonts or added workflow secrets.
