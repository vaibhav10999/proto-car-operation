'use client'

import OrbitMark from '@/components/icons/OrbitMark'
import { C24 } from '@/components/tokens'

interface MetricCardProps {
  title: string
  body: string
}

export default function MetricCard({ title, body }: MetricCardProps) {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 18,
        padding: '14px 16px 16px',
        background: 'linear-gradient(135deg, #0B1F6E 0%, #0071BC 55%, #1480D4 100%)',
        boxShadow: '0 6px 20px rgba(0,113,188,0.35), 0 1px 0 rgba(255,255,255,0.08) inset',
      }}
    >
      {/* Animated shimmer sweep */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '55%',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)',
          animation: 'inspectionSweep 3.5s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Small top badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          background: 'rgba(255,255,255,0.14)',
          border: '1px solid rgba(255,255,255,0.22)',
          borderRadius: 999,
          padding: '3px 9px',
          marginBottom: 10,
        }}
      >
        <OrbitMark size={11} white />
        <span
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: '#fff',
            letterSpacing: 0.9,
            textTransform: 'uppercase',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
          }}
        >
          Hub insight
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 15,
          fontWeight: 800,
          color: '#fff',
          letterSpacing: -0.3,
          marginBottom: 6,
          lineHeight: 1.25,
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        {title}
      </div>

      {/* Body */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.78)',
          lineHeight: 1.5,
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        {body}
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 16,
          right: 16,
          height: 2,
          borderRadius: '0 0 2px 2px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
        }}
      />
    </div>
  )
}
