'use client'

import OrbitMark from '@/components/icons/OrbitMark'
import { C24 } from '@/components/tokens'

export default function ThinkingPill() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '4px 0' }}>
      <OrbitMark size={20} style={{ marginTop: 2, flexShrink: 0 }} />
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: '#fff',
          border: `1px solid ${C24.border}`,
          borderRadius: 999,
          padding: '6px 14px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}
      >
        <OrbitMark size={14} spin />
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: C24.text,
            letterSpacing: -0.1,
            background: `linear-gradient(90deg, rgba(11,31,42,0.35) 0%, rgba(11,31,42,1) 50%, rgba(11,31,42,0.35) 100%)`,
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'orbitShimmer 1.8s linear infinite',
          }}
        >
          Searching hub inventory…
        </span>
      </div>
    </div>
  )
}
