'use client'

import OrbitMark from '@/components/icons/OrbitMark'
import { C24 } from '@/components/tokens'

interface SuggestionChipsProps {
  suggestions: string[]
  onSend: (text: string) => void
}

export default function SuggestionChips({ suggestions, onSend }: SuggestionChipsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => onSend(s)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#fff',
            border: `1px solid ${C24.border}`,
            borderRadius: 10,
            padding: '8px 12px',
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            animation: `orbitFadeUp ${200 + i * 60}ms ease`,
          }}
        >
          <OrbitMark size={11} />
          <span style={{ fontSize: 12.5, fontWeight: 500, color: C24.text, flex: 1 }}>{s}</span>
        </button>
      ))}
    </div>
  )
}
