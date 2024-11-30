# Movie Color Palettes

A web application that displays color palettes extracted from movies. 
Goes hand in hand with the [movies-palettes](https://github.com/adriencarpentier/movies-palettes-backend) backend script to generate the data.

## Dependencies

- Bun 1.0.x or higher
- **Framework**: SvelteKit 2.x with Svelte 5
- **Styling**: TailwindCSS with custom configuration
- **Build Tool**: Vite
- **Language**: TypeScript
- **Deployment**: GitHub Actions with automatic versioning

## Installation

1. Clone the repository:
```bash
git clone https://github.com/adriencarpentier/movie-color-palettes.git
```

2. Install dependencies:
```bash
bun install
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
