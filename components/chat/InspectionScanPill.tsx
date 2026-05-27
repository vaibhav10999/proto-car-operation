'use client'

import { C24 } from '@/components/tokens'

function CarScanSVG() {
  return (
    <svg viewBox="0 0 120 56" width={80} height={38} style={{ display: 'block', flexShrink: 0 }}>
      {/* Car body */}
      <path
        d="M4,40 L10,28 Q16,18 32,17 L82,17 Q92,18 98,26 L114,36 Q118,37 118,42 L118,46 L4,46 Z"
        fill={C24.blue}
        opacity="0.85"
      />
      {/* Window */}
      <path
        d="M22,26 L36,20 L76,20 L90,26 L90,32 L22,32 Z"
        fill="rgba(255,255,255,0.82)"
      />
      {/* Wheels */}
      <circle cx="28" cy="46" r="7" fill="#1a2533" />
      <circle cx="28" cy="46" r="3.5" fill="#3a4a5a" />
      <circle cx="94" cy="46" r="7" fill="#1a2533" />
      <circle cx="94" cy="46" r="3.5" fill="#3a4a5a" />
      {/* Scan sweep overlay */}
      <rect x="0" y="0" width="120" height="56" fill="url(#scanGrad)" rx="0" />
      <defs>
        <linearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="40%" stopColor="transparent" />
          <stop offset="50%" stopColor="rgba(0,180,255,0.25)" />
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const STAGES = [
  'Pulling inspection report…',
  'Reading 300-point check…',
  'Analysing service history…',
]

interface InspectionScanPillProps {
  stage?: number
}

export default function InspectionScanPill({ stage = 0 }: InspectionScanPillProps) {
  const label = STAGES[stage % STAGES.length]

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '4px 0' }}>
      {/* Car scan widget */}
      <div style={{
        position: 'relative',
        background: `linear-gradient(135deg, #EEF4FF 0%, #DDE8FF 100%)`,
        borderRadius: 12,
        padding: '8px 10px',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <CarScanSVG />
        {/* Animated sweep line */}
        <div style={{
          position: 'absolute',
          top: 0, bottom: 0,
          width: '30%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,160,255,0.18) 50%, transparent 100%)',
          animation: 'inspectionSweep 1.6s ease-in-out infinite',
        }} />
        {/* Bottom scan line */}
        <div style={{
          position: 'absolute',
          bottom: 12, left: 8, right: 8,
          height: 1.5,
          background: `linear-gradient(90deg, transparent, ${C24.blue}, transparent)`,
          animation: 'inspectionPulse 1.6s ease-in-out infinite',
        }} />
      </div>

      {/* Label */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 5,
        paddingTop: 6,
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          background: '#fff',
          border: `1px solid ${C24.border}`,
          borderRadius: 999,
          padding: '5px 12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}>
          {/* Spinner dots */}
          <div style={{ display: 'flex', gap: 3 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 5, height: 5, borderRadius: '50%',
                background: C24.blue,
                animation: `inspectionPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }} />
            ))}
          </div>
          <span style={{
            fontSize: 12.5,
            fontWeight: 600,
            color: C24.text,
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            letterSpacing: -0.1,
            background: `linear-gradient(90deg, ${C24.textSecondary} 0%, ${C24.text} 50%, ${C24.textSecondary} 100%)`,
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'orbitShimmer 2s linear infinite',
          }}>
            {label}
          </span>
        </div>
        <span style={{
          fontSize: 10.5, color: C24.textMuted,
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          paddingLeft: 4,
        }}>
          Reading live car data
        </span>
      </div>
    </div>
  )
}
