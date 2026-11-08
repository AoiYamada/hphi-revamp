/**
 * Typography customisations for @tailwindcss/typography, ported verbatim from the old
 * tailwind.config.mjs (`theme.extend.typography`). This is the only JS config left; globals.css
 * loads it through `@config` in styles/prose.css.
 *
 * It has to stay a config object: the plugin merges these values into its own rules in place, so
 * the plugin's later resets (`h2 + *`, `:first-child`, `thead th:first-child`, `h2 strong`, the
 * `md:prose-lg` size modifiers) keep winning over them exactly as before. Rewriting them as
 * `@utility` or `.prose h2 { ... }` rules changes the cascade order (see styles/prose.css).
 */

/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            // Wire prose tokens to the design system (the `--color-*` theme tokens in globals.css).
            '--tw-prose-body': 'var(--color-foreground)',
            '--tw-prose-headings': 'var(--color-foreground)',
            '--tw-prose-lead': 'var(--color-muted-foreground)',
            '--tw-prose-links': 'var(--color-iris-soft)',
            '--tw-prose-bold': 'var(--color-foreground)',
            '--tw-prose-counters': 'var(--color-iris-soft)',
            '--tw-prose-bullets': 'var(--color-iris-soft)',
            '--tw-prose-hr': 'var(--color-border)',
            '--tw-prose-quotes': 'var(--color-foreground)',
            '--tw-prose-quote-borders': 'var(--color-border)',
            '--tw-prose-captions': 'var(--color-muted-foreground)',
            '--tw-prose-code': 'var(--color-primary)',
            '--tw-prose-pre-code': 'var(--color-background)',
            '--tw-prose-pre-bg': 'var(--color-foreground)',
            '--tw-prose-th-borders': 'var(--color-border)',
            '--tw-prose-td-borders': 'var(--color-border)',

            color: 'var(--color-foreground)',
            lineHeight: '1.75',
            maxWidth: '72ch',

            // Numbered chapters via CSS counter — every h2 gets an auto-incrementing
            // chapter number, the editorial-journalistic move from the Simular reference.
            counterReset: 'chapter',

            // Tonal heading stack — what the user means by "different colors per heading".
            // h1 anchors in Slate Plum; h2 carries brand voice (Iris Ink); h3 lifts
            // (Hyacinth); h4 drops to label-style Quiet Plum. Hierarchy at a glance.
            h1: {
              color: 'var(--color-foreground)',
              fontWeight: '300',
              fontSize: '2.5rem',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              marginTop: '0',
              marginBottom: '0.6em',
            },
            h2: {
              // iris-soft reads more vivid than the anchor-coloured primary at heading
              // scale — text strokes lose chroma vs. button surface.
              color: 'var(--color-iris-soft)',
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
            //   color: 'var(--color-lilac)',
            //   fontWeight: '400',
            //   fontVariantNumeric: 'tabular-nums',
            //   marginRight: '0.1em',
            // },
            h3: {
              color: 'var(--color-foreground)',
              fontWeight: '600',
              fontSize: '1.25rem',
              lineHeight: '1.35',
              marginTop: '1.8em',
              marginBottom: '0.4em',
            },
            h4: {
              color: 'var(--color-muted-foreground)',
              fontWeight: '500',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginTop: '1.6em',
              marginBottom: '0.4em',
            },

            // Inline
            strong: { color: 'var(--color-foreground)', fontWeight: '600' },
            em: { color: 'var(--color-foreground)', fontStyle: 'italic' },

            a: {
              color: 'var(--color-iris-soft)',
              fontWeight: '500',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              textDecorationThickness: '1.5px',
              textDecorationColor: 'var(--color-lilac)',
              transition: 'color 200ms ease-out, text-decoration-color 200ms ease-out',
              '&:hover': {
                color: 'var(--color-primary)',
                textDecorationColor: 'var(--color-iris-soft)',
              },
            },

            // Blockquote — Soft Bloom panel, no side stripe (banned).
            blockquote: {
              fontStyle: 'italic',
              fontWeight: '400',
              color: 'var(--color-foreground)',
              backgroundColor: 'color-mix(in srgb, var(--color-muted) 50%, transparent)',
              border: 'none',
              borderRadius: '16px',
              padding: '1.25em 1.5em',
              quotes: 'none',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },

            // Inline + block code
            code: {
              color: 'var(--color-primary)',
              backgroundColor: 'color-mix(in srgb, var(--color-muted) 70%, transparent)',
              padding: '0.15em 0.4em',
              borderRadius: '6px',
              fontWeight: '500',
              fontSize: '0.9em',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              backgroundColor: 'var(--color-foreground)',
              color: 'var(--color-background)',
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
              color: 'var(--color-iris-soft)',
              fontWeight: '600',
            },
            'ul > li::marker': { color: 'var(--color-iris-soft)' },
            li: { marginTop: '0.5em', marginBottom: '0.5em' },

            // HR — quiet, generous, with a small Soft Violet dot in the
            // middle as a section-break flourish.
            hr: {
              borderColor: 'var(--color-border)',
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
              backgroundColor: 'var(--color-background)',
              padding: '0 0.75em',
              color: 'var(--color-lilac)',
              fontSize: '1.5em',
              lineHeight: '1',
            },

            // Tables
            'thead th': {
              backgroundColor: 'color-mix(in srgb, var(--color-muted) 50%, transparent)',
              color: 'var(--color-foreground)',
              fontWeight: '600',
              padding: '0.75em 1em',
              borderBottom: '1px solid var(--color-border)',
              whiteSpace: 'nowrap',
            },
            'tbody td': {
              padding: '0.75em 1em',
              borderBottom: '1px solid var(--color-border)',
            },
            'table p': { marginTop: '0.5em', marginBottom: '0.5em' },

            // Figures / captions
            figcaption: {
              color: 'var(--color-muted-foreground)',
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
