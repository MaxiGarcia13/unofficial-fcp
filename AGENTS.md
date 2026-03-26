# AGENTS

## Project

- Name: `unofficial-fcp`
- Goal: Find the leaderboard, a team or compare a team with other teams.

## Tech Stack

- React (latest stable)
- Astro (latest stable)
- Tailwind CSS (latest stable)
- WebLLM

## Coding Rules

### Naming

- Files: **kebab-case** (e.g., `booking-card.tsx`, `use-booking-form.ts`)
- Components/functions: descriptive names (e.g., `userDisplayName`, `isLoading`)

### Components

- Keep components small with single responsibility
- Prefer existing components before creating new ones
- React components: use **named exports** (`export function Button(...)`)
- Extend HTML attributes for wrapper components (`extends ButtonHTMLAttributes`)

### Styling (Tailwind)

- **Borders**: use `rounded` for corners
- **Colors**:
  - Primary/accent: `bg-green-300`
  - Background: `bg-gray-900`
  - Text: `text-neutral-100`
- Only add `bg-*`/`text-*` when necessary; inherit when possible

### Architecture

- Follow **Clean Architecture**: Domain → Use Cases → Adapters → Frameworks
- **Dependency rule**: Core must not depend on UI or external services
- Use **utils** for pure helpers, **lib** for external integrations, **services** for business logic

### Dependencies

- Use **npm** only (not yarn/pnpm unless asked)
- Check for latest versions when adding packages

### When Unsure

- Ask the user instead of guessing

## Available Skills

### TypeScript

- Docs: https://www.typescriptlang.org/docs/
- Use for: types, interfaces, generics, narrowing, tsconfig

### React

- Docs: https://es.react.dev/learn
- Use for: components, hooks, state, JSX, effects

### Tailwind CSS

- Docs: https://tailwindcss.com/docs
- Use for: utility classes, responsive design, theme

### Astro

- Docs: https://docs.astro.build/en/
- Use for: pages, layouts, routing, React integration

### Conventional Commits

- Format: `<type>: <description>`
- Types: feat, fix, refactor, docs, style, test, chore, perf, ci
- Examples: `feat: add user booking`, `fix: resolve timezone issue`
