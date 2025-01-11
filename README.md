# Movie Color Palettes

A web application that displays color palettes extracted from movies. 
Goes hand in hand with the [movies-palettes](https://github.com/adriencarpentier/movies-palettes-backend) backend script to generate the data.

## Dependencies

- [Deno](https://docs.deno.com/runtime/getting_started/installation/) 2.x or higher
- A [SQLite](https://www.sqlite.org/download.html) database
- **Framework**: SvelteKit 2.x with Svelte 5
- **Styling**: TailwindCSS with custom configuration
- **Build Tool**: Vite
- **Language**: TypeScript
- **Deployment**: GitHub Actions with automatic versioning

## Database setup

```sql
CREATE TABLE "movies" (
	"id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"title" VARCHAR NOT NULL UNIQUE,
	"type" VARCHAR,
	"status" VARCHAR,
	"path" VARCHAR,
	"director" VARCHAR,
	"year" VARCHAR,
	"added" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "palettes" (
	"id" varchar NOT NULL,
	"movie_id" int NOT NULL,
	"clusters_nb" int NOT NULL,
	"calculation_date" DATETIME DEFAULT CURRENT_TIMESTAMP,
	"calculation_duration_seconds" REAL,
	"runtime" varchar,
	"frame_skip" int,
	"resize_width" int,
	"resize_height" int,
	"batch_size" int,
	"colors" text NOT NULL,
	"clustering_method" varchar NOT NULL,
	"is_black_and_white" BOOLEAN DEFAULT FALSE,
	"length" int,
	PRIMARY KEY (id)
);
```

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
