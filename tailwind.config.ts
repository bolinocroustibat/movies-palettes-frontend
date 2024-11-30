import scrollbar from 'tailwind-scrollbar';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Work Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '4xl': ['2.5rem', {
          lineHeight: '1.1',
          letterSpacing: '-0.03em',
          fontWeight: '600',
        }],
        '2xl': ['1.5rem', {
          lineHeight: '1.2',
          letterSpacing: '-0.02em',
          fontWeight: '500',
        }],
      },
    }
  },

  plugins: [scrollbar({ nocompatible: true })]
} satisfies Config;
