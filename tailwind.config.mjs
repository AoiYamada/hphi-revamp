import animate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]', 'class'],
  plugins: [animate, typography],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        // One rounding scale, applied across every component. See DESIGN.md.
        // Values lifted from the original 6/10/14/20 to give surfaces a more
        // confident curve at scale (cards, panels) while keeping interactive
        // controls touch-precise.
        DEFAULT: '10px',
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
      },
      colors: {
        // Channel-mode hsl(... / <alpha-value>) so utilities like bg-primary/45 work.
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        background: 'hsl(var(--background) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        anchor: {
          DEFAULT: 'hsl(var(--anchor) / <alpha-value>)',
          foreground: 'hsl(var(--anchor-foreground) / <alpha-value>)',
        },
        ring: 'hsl(var(--ring) / <alpha-value>)',
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        success: 'hsl(var(--success) / <alpha-value>)',
        error: 'hsl(var(--error) / <alpha-value>)',
        warning: 'hsl(var(--warning) / <alpha-value>)',
        chart: {
          1: 'hsl(var(--chart-1) / <alpha-value>)',
          2: 'hsl(var(--chart-2) / <alpha-value>)',
          3: 'hsl(var(--chart-3) / <alpha-value>)',
          4: 'hsl(var(--chart-4) / <alpha-value>)',
          5: 'hsl(var(--chart-5) / <alpha-value>)',
        },
      },
      boxShadow: {
        // Flat-by-default tonal layering. lift-1 is the resting elevation for
        // clickable cards. lift-2 is the hover step. lift-focus is the keyboard
        // focus ring (Soft Violet, sits outside the element).
        'lift-1': '0 1px 2px 0 hsl(var(--primary) / 0.06)',
        'lift-2': '0 8px 24px -12px hsl(var(--primary) / 0.18)',
        'lift-focus': '0 0 0 3px hsl(var(--accent) / 0.45)',
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: {
            // Wire prose tokens to the design system. Earlier drafts referenced
            // `var(--text)` directly which injected bare HSL channels; fixed here.
            '--tw-prose-body': 'hsl(var(--foreground))',
            '--tw-prose-headings': 'hsl(var(--foreground))',
            '--tw-prose-lead': 'hsl(var(--muted-foreground))',
            '--tw-prose-links': 'hsl(var(--secondary))',
            '--tw-prose-bold': 'hsl(var(--foreground))',
            '--tw-prose-counters': 'hsl(var(--secondary))',
            '--tw-prose-bullets': 'hsl(var(--secondary))',
            '--tw-prose-hr': 'hsl(var(--border))',
            '--tw-prose-quotes': 'hsl(var(--foreground))',
            '--tw-prose-quote-borders': 'hsl(var(--border))',
            '--tw-prose-captions': 'hsl(var(--muted-foreground))',
            '--tw-prose-code': 'hsl(var(--primary))',
            '--tw-prose-pre-code': 'hsl(var(--background))',
            '--tw-prose-pre-bg': 'hsl(var(--foreground))',
            '--tw-prose-th-borders': 'hsl(var(--border))',
            '--tw-prose-td-borders': 'hsl(var(--border))',

            color: 'hsl(var(--foreground))',
            lineHeight: '1.75',
            maxWidth: '72ch',

            // Numbered chapters via CSS counter — every h2 gets an auto-incrementing
            // chapter number, the editorial-journalistic move from the Simular reference.
            counterReset: 'chapter',

            // Tonal heading stack — what the user means by "different colors per heading".
            // h1 anchors in Slate Plum; h2 carries brand voice (Iris Ink); h3 lifts
            // (Hyacinth); h4 drops to label-style Quiet Plum. Hierarchy at a glance.
            h1: {
              color: 'hsl(var(--foreground))',
              fontWeight: '300',
              fontSize: '2.5rem',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              marginTop: '0',
              marginBottom: '0.6em',
            },
            h2: {
              // Hyacinth (--secondary) reads more vivid than Iris Ink (--primary)
              // at heading scale — text strokes lose chroma vs. button surface.
              color: 'hsl(var(--secondary))',
              fontWeight: '600',
              fontSize: '1.625rem',
              lineHeight: '1.25',
              letterSpacing: '-0.01em',
              marginTop: '2.5em',
              marginBottom: '0.6em',
              counterIncrement: 'chapter',
            },
            // 'h2::before': {
            //   content: 'counter(chapter, decimal-leading-zero) "  "',
            //   color: 'hsl(var(--accent))',
            //   fontWeight: '400',
            //   fontVariantNumeric: 'tabular-nums',
            //   marginRight: '0.1em',
            // },
            h3: {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
              fontSize: '1.25rem',
              lineHeight: '1.35',
              marginTop: '1.8em',
              marginBottom: '0.4em',
            },
            h4: {
              color: 'hsl(var(--muted-foreground))',
              fontWeight: '500',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginTop: '1.6em',
              marginBottom: '0.4em',
            },

            // Inline
            strong: { color: 'hsl(var(--foreground))', fontWeight: '600' },
            em: { color: 'hsl(var(--foreground))', fontStyle: 'italic' },

            a: {
              color: 'hsl(var(--secondary))',
              fontWeight: '500',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              textDecorationThickness: '1.5px',
              textDecorationColor: 'hsl(var(--accent))',
              transition: 'color 200ms ease-out, text-decoration-color 200ms ease-out',
              '&:hover': {
                color: 'hsl(var(--primary))',
                textDecorationColor: 'hsl(var(--secondary))',
              },
            },

            // Blockquote — Soft Bloom panel, no side stripe (banned).
            blockquote: {
              fontStyle: 'italic',
              fontWeight: '400',
              color: 'hsl(var(--foreground))',
              backgroundColor: 'hsl(var(--muted) / 0.5)',
              border: 'none',
              borderRadius: '16px',
              padding: '1.25em 1.5em',
              quotes: 'none',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },

            // Inline + block code
            code: {
              color: 'hsl(var(--primary))',
              backgroundColor: 'hsl(var(--muted) / 0.7)',
              padding: '0.15em 0.4em',
              borderRadius: '6px',
              fontWeight: '500',
              fontSize: '0.9em',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              backgroundColor: 'hsl(var(--foreground))',
              color: 'hsl(var(--background))',
              borderRadius: '14px',
              padding: '1.25em 1.5em',
              fontSize: '0.875em',
              lineHeight: '1.6',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              padding: '0',
              fontSize: '1em',
              fontWeight: '400',
            },

            // Lists — colored markers
            'ol > li::marker': {
              color: 'hsl(var(--secondary))',
              fontWeight: '600',
            },
            'ul > li::marker': { color: 'hsl(var(--secondary))' },
            li: { marginTop: '0.5em', marginBottom: '0.5em' },

            // HR — quiet, generous, with a small Soft Violet dot in the
            // middle as a section-break flourish.
            hr: {
              borderColor: 'hsl(var(--border))',
              marginTop: '3.5em',
              marginBottom: '3.5em',
              position: 'relative',
              overflow: 'visible',
            },
            'hr::after': {
              content: '"·"',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'hsl(var(--background))',
              padding: '0 0.75em',
              color: 'hsl(var(--accent))',
              fontSize: '1.5em',
              lineHeight: '1',
            },

            // Tables
            'thead th': {
              backgroundColor: 'hsl(var(--muted) / 0.5)',
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
              padding: '0.75em 1em',
              borderBottom: '1px solid hsl(var(--border))',
              whiteSpace: 'nowrap',
            },
            'tbody td': {
              padding: '0.75em 1em',
              borderBottom: '1px solid hsl(var(--border))',
            },
            'table p': { marginTop: '0.5em', marginBottom: '0.5em' },

            // Figures / captions
            figcaption: {
              color: 'hsl(var(--muted-foreground))',
              fontSize: '0.875em',
              marginTop: '0.75em',
            },

            // Images
            img: {
              borderRadius: '14px',
              marginTop: '2em',
              marginBottom: '2em',
            },
          },
        },

        // `prose-md` modifier — bumps heading scale at md breakpoint.
        md: {
          css: {
            h1: { fontSize: '3rem', letterSpacing: '-0.022em' },
            h2: { fontSize: '2rem' },
            h3: { fontSize: '1.5rem' },
          },
        },

        // `prose-lg` — long-form articles use this on desktop.
        lg: {
          css: {
            h1: { fontSize: '3.5rem', letterSpacing: '-0.025em' },
            h2: { fontSize: '2.25rem' },
            h3: { fontSize: '1.625rem' },
            fontSize: '1.0625rem',
            lineHeight: '1.78',
          },
        },
      }),
    },
  },
}

export default config
