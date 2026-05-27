'use client'

interface OrbitMarkProps {
  size?: number
  glow?: boolean
  spin?: boolean
  white?: boolean   // render solid white sparkles (for colored backgrounds)
  color?: string    // arbitrary solid color override
  className?: string
  style?: React.CSSProperties
}

let idCounter = 0

export default function OrbitMark({
  size = 24,
  glow = false,
  spin = false,
  white = false,
  color,
  className = '',
  style = {},
}: OrbitMarkProps) {
  const uid = `orbitGrad-${++idCounter}`
  const glowSize = size * 1.8

  // Solid fill takes priority over gradient
  const solidFill = color ?? (white ? '#ffffff' : null)

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: size,
        height: size,
        flexShrink: 0,
        ...style,
      }}
    >
      {glow && (
        <span
          style={{
            position: 'absolute',
            width: glowSize,
            height: glowSize,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,113,188,0.25) 0%, transparent 70%)',
            filter: 'blur(6px)',
            pointerEvents: 'none',
          }}
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        style={{ animation: spin ? 'orbitSpin 2.4s linear infinite' : undefined, flexShrink: 0 }}
      >
        {!solidFill && (
          <defs>
            <linearGradient id={uid} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2BB3FF" />
              <stop offset="60%" stopColor="#0071BC" />
              <stop offset="100%" stopColor="#1A3DBE" />
            </linearGradient>
          </defs>
        )}
        {/* Large 4-point sparkle */}
        <path
          d="M6 2 L7.2 5.8 L11 7 L7.2 8.2 L6 12 L4.8 8.2 L1 7 L4.8 5.8 Z"
          fill={solidFill ?? `url(#${uid})`}
        />
        {/* Small 4-point sparkle */}
        <path
          d="M17 13 L17.9 15.6 L20.5 16.5 L17.9 17.4 L17 20 L16.1 17.4 L13.5 16.5 L16.1 15.6 Z"
          fill={solidFill ?? `url(#${uid})`}
          opacity={solidFill ? 0.85 : 1}
        />
      </svg>
    </span>
  )
}
