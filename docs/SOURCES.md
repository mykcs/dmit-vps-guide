# Primary sources and audit rules

Verified date: 2026-10-15 (static published pages, not live cart confirmation).

1. DMIT Los Angeles official location and prices: https://www.dmit.io/pages/location/los-angeles
2. DMIT Hong Kong location: https://www.dmit.io/pages/location/hong-kong
3. DMIT Tokyo location: https://www.dmit.io/pages/location/tokyo
4. DMIT central prices cross-check: https://www.dmit.io/pages/pricing
5. WireGuard quickstart: https://www.wireguard.com/quickstart/
6. Tailscale exit node setup: https://tailscale.com/docs/features/exit-nodes/how-to/setup
7. GitHub Pages custom workflow: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
8. GitHub Actions billing: https://docs.github.com/en/billing/concepts/product-billing/github-actions
9. Vercel Hobby: https://vercel.com/docs/plans/hobby
10. Vercel limits: https://vercel.com/docs/limits

Method:
- data/plans.json contains selected REPRESENTATIVE LAX SKUs, not a complete DMIT catalog.
- The plan name TINY/STARTER appears in different platforms, locations and network families; always show full composite name.
- All prices are USD, labels month/year are exact; AS3.T1.WEE is USD 36.90 per YEAR.
- For T1, reproduce the web's wording Max (IN, OUT) instead of inventing a billing formula.
- Official page warns that prices can lag. A displayed Order Now does not prove real-time checkout inventory.
- No tax, payment fees, add-on IPs, discounts, renewal changes, or final cart charge are assumed.
- Gbps port headline does not imply achieved single-user speed.
- Build time estimates are advice, NOT benchmark receipts. USA–Singapore throughput must be measured in context.

Update rules:
1. Open official product pages and checkout for every modified SKU.
2. Compare full names, cores, RAM, storage, transfer, port, interval, USD price, and availability.
3. Edit data/plans.json with date, run npm run check, inspect deploy and mobile table.
4. For unverifiable facts, say unknown rather than inventing a price or inventory.
5. Never move private account/VPN configuration details into this public record.
