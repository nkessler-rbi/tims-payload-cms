/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        display: ['var(--font-display)', "'Helvetica Neue'", 'Arial', 'sans-serif'],
        'display-bold': ['var(--font-display-bold)', "'Helvetica Neue'", 'Arial', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--th-espresso-soft)',
              '--tw-prose-headings': 'var(--th-espresso)',
              h1: {
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: '0.25em',
              },
              h2: {
                fontFamily: 'var(--font-display-bold)',
                fontWeight: 600,
                letterSpacing: '-0.025em',
                lineHeight: 1.05,
              },
              h3: {
                fontFamily: 'var(--font-display-bold)',
                fontWeight: 600,
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: 'clamp(36px, 5.5vw, 70px)',
              },
              h2: {
                fontSize: 'clamp(28px, 3.6vw, 46px)',
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: 'clamp(40px, 5.5vw, 70px)',
              },
              h2: {
                fontSize: 'clamp(32px, 3.6vw, 46px)',
              },
            },
          ],
        },
      },
    },
  },
}

export default config
