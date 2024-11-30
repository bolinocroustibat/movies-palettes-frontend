# Movie Color Palettes

A web application built with SvelteKit that displays color palettes extracted from movies. The application shows the dominant colors from various movies along with detailed information about the extraction process.

## Dependencies

- **Framework**: SvelteKit 2.x with Svelte 5
- **Styling**: TailwindCSS with custom configuration
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Language**: TypeScript
- **Deployment**: GitHub Actions with automatic versioning

## Prerequisites

- Node.js 18.x or higher
- pnpm 8.x or higher

## Installation

1. Clone the repository:
```bash
git clone https://github.com/adriencarpentier/movie-color-palettes.git
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file and set the `VITE_API_URL` environment variable to the URL of the API server.

```env
VITE_API_URL=http://localhost:3000/api
```

## Development

```bash
bun run dev
```

## Deployment

```bash
bun run build
```

## Preview the prod build

```bash
bun run preview
```
