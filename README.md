# Movie Color Palettes

A web application that displays color palettes extracted from movies. 
Goes hand in hand with the [movies-palettes](https://github.com/adriencarpentier/movies-palettes-backend) backend script to generate the data.

## Dependencies

- [Deno](https://docs.deno.com/runtime/getting_started/installation/) 2.x or higher
- **Framework**: SvelteKit 2.x with Svelte 5
- **Styling**: TailwindCSS with custom configuration
- **Build Tool**: Vite
- **Language**: TypeScript
- **Deployment**: GitHub Actions with automatic versioning

## Run locally

```bash
deno install
```

```bash
deno task dev
```

## Build

```bash
deno task build
```

Preview the prod build with:

```bash
deno task preview
```

## Check types, lint, format code

To lint and format the code:

```bash
deno fmt --check
deno lint
```

For type checking and Svelte-specific validations:

```bash
deno task check
```

This will check for TypeScript errors, unused CSS, accessibility issues, and other Svelte-specific warnings.

## LLM-assisted development for Svelte 5

LLMs are not trained to understand the Svelte 5 syntax.
You can use [this](https://svelte-llm.khromov.se) to provide a better understanding of the Svelte 5 syntax to the LLM.
Cursor supports adding context via URL using the [Paste Links feature](https://docs.cursor.com/context/@-symbols/@-link#paste-links): just paste `@https://svelte-llm.khromov.se/svelte` in the chat or composer input.
