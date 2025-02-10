import * as Sentry from "@sentry/sveltekit"

export function initSentry() {
	Sentry.init({
		dsn: import.meta.env.PUBLIC_SENTRY_DSN,
		environment: import.meta.env.VITE_ENV,
		tracesSampleRate: 1.0,
		replaysSessionSampleRate: 0.1,
		replaysOnErrorSampleRate: 1.0,
	})
}
