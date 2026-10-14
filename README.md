# DMIT VPS Field Guide

以中文为主的公开科普网站，用图解和可追溯的来源，解释 VPS、个人 VPN、DMIT 机房与线路、LAX 产品选型，以及 GitHub Actions 与 Vercel 的区别。

- 仓库：https://github.com/mykcs/dmit-vps-guide
- 官网：https://www.dmit.io/pages/location/los-angeles
- 价格核对日期：2026-10-15（静态公开网页标价，非实时库存）。
- 发布后网址由仓库 Settings → Pages 提供。

## 内容

1. VPS、VPN、网络线路的区别与安全边界。
2. DMIT LAX、HKG、TYO 地区，Premium / Eyeball / Tier 1 网络，以及 AS3 / AN4 / AN5 硬件。
3. 洛杉矶代表性套餐：美元参考价、年付/月付分开、日流量简易估算器。
4. Tailscale Exit Node 和原生 WireGuard 两条路线、安全提醒。
5. GitHub Actions + Pages 与 Vercel Build + Hosting 的比较。

## 本地预览（Node.js 20+，无第三方 npm 依赖）

~~~bash
npm run check
python3 -m http.server 8080 --directory dist
~~~

打开 http://localhost:8080 。更新价格只编辑 data/plans.json，不要直接改 HTML 中的价格表；构建脚本自动生成。

## 自动发布

.github/workflows/pages.yml 在 main 推送后校验、构建、上传 Pages artifact 并部署。初次需在 Settings → Pages → Build and deployment → Source 选择 GitHub Actions。

公开仓库标准 GitHub Actions runner 免费。本站纯静态，目前无需 Vercel 项目；若将来迁移，构建命令是 npm run build，输出目录为 dist。

## 隐私隔离（重要）

本仓库公开，不能复制私有 Stash/VPN 配置仓库的真实节点域名、IP、订阅地址、SSH/WireGuard 私钥、账户资料或 token。网站只含公开资料、脱敏示例和教育性建议，不购买 VPS，也不连接实际服务器。

权威来源和价格规则：docs/SOURCES.md。
发布与验收：docs/DEPLOYMENT.md。
Agent 维护边界：AGENTS.md。

> 独立学习资料，不是 DMIT 官方网站或付费推广。定价、网络可用性、地区限制和条款以最终结账页为准。
