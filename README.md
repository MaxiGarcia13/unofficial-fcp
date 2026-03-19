# Pádel Cantabria — Unofficial UI

I built this because on the [official site](https://ligacantabradepadel.es) of the Liga Cántabra de Pádel it was hard to see which match is next and when the league runs until. This project makes that clearer.

## What it does

- **Home** — Entry point with gender and category selection.
- **Group pages** (`/[gender]-[group]`) — For a chosen category (e.g. men’s 1ª), you get:
  - A **standings table** (position, team, matchups, points, matches played/won).
  - A **calendar** with “This week” and upcoming match blocks.
- Data is fetched from an external API (proxied by the app) with loading and error states and retry.

## Tech stack

| Layer            | Technology                                                              |
| ---------------- | ----------------------------------------------------------------------- |
| **Framework**    | [Astro](https://astro.build) 5 (SSR)                                    |
| **UI / islands** | [React](https://react.dev) 19                                           |
| **Styling**      | [Tailwind CSS](https://tailwindcss.com) 4 (Vite plugin)                 |
| **Hosting**      | [Vercel](https://vercel.com) (via `@astrojs/vercel`)                    |
| **Linting**      | ESLint ([@antfu/eslint-config](https://github.com/antfu/eslint-config)) |

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment**

   The app talks to an external API. Set:
   - **`API_URL`** (server, secret) — Base URL of the backend (e.g. the official league API). Used in `src/pages/api/group-info.ts` to fetch group info.
   - **`REQUEST_CACHE`** (optional, client, public) — Cache duration in seconds for requests.

   For local dev, use a `.env` file (and keep it in `.gitignore`). On Vercel, use the project’s environment variables.

3. **Run locally**

   ```bash
   npm run dev
   ```

   Then open the URL shown in the terminal (usually `http://localhost:4321`).

## Scripts

| Command           | Description               |
| ----------------- | ------------------------- |
| `npm run dev`     | Start dev server          |
| `npm run build`   | Production build          |
| `npm run preview` | Preview production build  |
| `npm run lint`    | Run ESLint                |
| `npm run format`  | ESLint with auto-fix      |
| `npm run phoenix` | Clean install and rebuild |

## Design

- **Theme** — Dark UI based on the Liga Cántabra de Pádel branding (see `--color-cantabria-*` in `src/styles/global.css`).
- **Font** — Inter (weights 400, 500, 700) from `/assets/fonts/`.
- **Layout** — Responsive, max-width content area, header with filters and an “Unofficial” badge.

## License

ISC — see `package.json`. This is an independent, unofficial project for educational purposes.
