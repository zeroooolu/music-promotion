# KJ Music Promotion Prototype

KJ 音乐推广产品的 HTML 高保真原型仓库。

## Repository structure

```text
music-promotion/
├── index.html                  # 原型工作区入口
├── README.md
├── frontend/                   # 用户侧前台原型
│   ├── index.html
│   ├── music-promotion.html
│   ├── promotion-step1.html
│   ├── promotion-step2.html
│   ├── promotion-step3.html
│   ├── promotion-expert.html
│   ├── unified-order.html
│   └── assets/
│       ├── css/
│       ├── js/
│       └── images/
└── admin/                      # 内部运营管理后台原型
    ├── index.html
    ├── pages/
    └── assets/
        ├── css/
        ├── js/
        └── images/
```

## Conventions

- `frontend/`：面向音乐人、厂牌、版权方等客户使用的用户侧页面。
- `admin/`：面向内部运营、服务执行和管理人员使用的后台页面。
- `admin/pages/`：后续新增的 Admin 业务页面统一放在这里。
- HTML 文件统一使用 `kebab-case` 命名。
- 当前已确认的前台页面保持独立 HTML 形态和原有交互，不在目录整理阶段重构其 CSS / JavaScript。
- 当公共样式和交互稳定后，再按前台、后台分别沉淀到各自的 `assets/` 中，避免过早抽象。

## Prototype entry

- 仓库入口：`/index.html`
- 前台入口：`/frontend/index.html`
- Admin 入口：`/admin/index.html`

当前 `frontend/` 中的 7 个页面为已确认的前台原型基线；后续 Admin 原型从 `admin/` 独立迭代。
