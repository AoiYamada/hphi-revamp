import { cn } from '@/utilities'
import { FC, SVGProps } from 'react'

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
type Intensity = 'subtle' | 'medium' | 'committed'

const intensityToOpacity: Record<Intensity, number> = {
  subtle: 0.1,
  medium: 0.16,
  committed: 0.22,
}

const positionToAnchor: Record<Position, string> = {
  'top-right': '85% 15%',
  'top-left': '15% 15%',
  'bottom-right': '85% 85%',
  'bottom-left': '15% 85%',
  center: '50% 50%',
}

export const Bloom: FC<{
  position?: Position
  intensity?: Intensity
  size?: number
  className?: string
}> = ({ position = 'top-right', intensity = 'subtle', size = 70, className }) => {
  const opacity = intensityToOpacity[intensity]
  const anchor = positionToAnchor[position]
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 -z-10', className)}
      style={{
        background: `radial-gradient(ellipse ${size}% ${size + 10}% at ${anchor}, hsl(var(--secondary) / ${opacity}), transparent 70%)`,
      }}
    />
  )
}

const positionToCorner: Record<Position, string> = {
  'top-right': '-right-12 -top-12',
  'top-left': '-left-12 -top-12',
  'bottom-right': '-right-12 -bottom-12',
  'bottom-left': '-left-12 -bottom-12',
  center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
}

export const IrisMark: FC<
  SVGProps<SVGSVGElement> & { position?: Position; size?: number }
> = ({ position = 'top-right', size = 180, className, ...props }) => (
  <svg
    aria-hidden
    viewBox="0 0 120 120"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="0.6"
    className={cn(
      'pointer-events-none absolute -z-10 text-accent/40',
      positionToCorner[position],
      className,
    )}
    {...props}
  >
    <circle cx="60" cy="60" r="54" />
    <circle cx="60" cy="60" r="42" />
    <circle cx="60" cy="60" r="30" />
    <circle cx="60" cy="60" r="18" />
    <circle cx="60" cy="60" r="2.5" fill="currentColor" stroke="none" />
  </svg>
)

/**
 * Tactile noise overlay. Self-contained inline SVG (no external assets).
 * Adds material warmth to large flat surfaces (CTA, hero, section bands).
 * The fractalNoise pattern is mixed at very low opacity so it reads as
 * paper-grain, not as obvious texture.
 */
export const Grain: FC<{ opacity?: number; className?: string }> = ({
  opacity = 0.05,
  className,
}) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>`
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 -z-10 mix-blend-multiply', className)}
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${svg}")`,
        backgroundSize: '160px 160px',
        opacity,
      }}
    />
  )
}
