# Singko Technopreneurship

Small dashboard-style React application for monitoring branches, devices, alerts, and reports. Scaffolded with Vite, TypeScript, and Tailwind CSS.

Features
- Basic layout and pages for monitoring, alerts, reports, and settings
- Reusable UI components (cards, badges, sidebar)

Tech stack
- React + TypeScript
- Vite (dev server + build)
- Tailwind CSS for styling

Repository structure (key files)
- `index.html` — app entry HTML
- `package.json` — scripts and dependencies
- `vite.config.ts` — Vite configuration
- `src/index.tsx`, `src/App.tsx` — React entry and app shell
- `src/index.css` — Tailwind entry CSS
- `src/components/` — UI components (GlassCard, MetricCard, Sidebar, StatusBadge)
- `src/pages/` — page views (Dashboard, Alerts, DeviceMonitoring, BranchMonitoring, Reports, Settings, Login)

Getting started
1. Install dependencies:

```
npm install
```

2. Run the dev server:

```
npm run dev
```

3. Build for production:

```
npm run build
```

4. Preview the production build:

```
npm run preview
```

Notes
- This repo uses TypeScript and Tailwind; check `tsconfig.json` and `tailwind.config.js` to adjust settings.
- Tests: none included at the moment.

Contributing
- Open an issue or PR describing the change.

License
- Add a license file as needed.
