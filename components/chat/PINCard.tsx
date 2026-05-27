'use client'

import { useState } from 'react'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { C24, ORBIT_GRADIENT } from '@/components/tokens'

interface PINCardProps {
  pin: string
  label: string
}

export default function PINCard({ pin, label }: PINCardProps) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(pin).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const digits = pin.split('')

  return (
    <div
      style={{
        background: '#fff',
        border: `2px solid transparent`,
        borderRadius: 16,
        padding: 16,
        backgroundClip: 'padding-box',
        boxShadow: `0 0 0 2px ${C24.blue}40, 0 2px 12px rgba(0,113,188,0.1)`,
        position: 'relative',
      }}
    >
      {/* Gradient accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 16,
          right: 16,
          height: 3,
          background: ORBIT_GRADIENT,
          borderRadius: '0 0 3px 3px',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, marginTop: 6 }}>
        <MaterialIcon name="key" size={16} color={C24.blue} fill={0} />
        <span style={{ fontSize: 12, fontWeight: 600, color: C24.textSecondary }}>{label}</span>
      </div>

      {/* PIN digits */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 12, justifyContent: 'center' }}>
        {digits.map((d, i) => (
          <div
            key={i}
            style={{
              width: 52,
              height: 62,
              background: C24.appBg,
              border: `1.5px solid ${C24.border}`,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'monospace',
              fontSize: 28,
              fontWeight: 800,
              color: C24.text,
              letterSpacing: -1,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Copy button */}
      <button
        onClick={copy}
        style={{
          width: '100%',
          background: copied ? C24.successTint : C24.appBg,
          border: `1px solid ${copied ? C24.success : C24.border}`,
          borderRadius: 10,
          padding: '9px 14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: 13,
          fontWeight: 700,
          color: copied ? C24.success : C24.text,
          transition: 'all 200ms ease',
        }}
      >
        <MaterialIcon
          name={copied ? 'check' : 'content_copy'}
          size={15}
          color={copied ? C24.success : C24.textSecondary}
        />
        {copied ? 'PIN copied!' : 'Copy PIN'}
      </button>

      <p style={{ textAlign: 'center', fontSize: 11, color: C24.textMuted, margin: '8px 0 0', lineHeight: 1.4 }}>
        Show this PIN to staff at the key counter to start your test drive.
      </p>
    </div>
  )
}
