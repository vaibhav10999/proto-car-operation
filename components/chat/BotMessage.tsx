'use client'

import OrbitMark from '@/components/icons/OrbitMark'
import { C24 } from '@/components/tokens'
import type { Card } from '@/lib/types'
import CardRenderer from '@/components/chat/CardRenderer'
import SuggestionChips from '@/components/chat/SuggestionChips'

interface BotMessageProps {
  text: string
  cards?: Card[]
  suggestions?: string[]
  streaming?: boolean
  onSend: (text: string) => void
  onScanComplete?: (plate: string) => void
}

export default function BotMessage({ text, cards, suggestions, streaming, onSend, onScanComplete }: BotMessageProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '2px 0', animation: 'orbitFadeUp 200ms ease' }}>
      <OrbitMark size={20} style={{ marginTop: 3, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {text && (
          <p style={{
            margin: '0 0 8px',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: 14.5,
            fontWeight: 500,
            color: C24.text,
            lineHeight: 1.55,
            letterSpacing: -0.1,
          }}>
            {text}
            {streaming && (
              <span style={{
                display: 'inline-block',
                width: 2,
                height: 14,
                background: C24.blue,
                borderRadius: 1,
                marginLeft: 2,
                verticalAlign: 'middle',
                animation: 'orbitPulse 1s ease-in-out infinite',
              }} />
            )}
          </p>
        )}
        {cards && cards.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 8 }}>
            {cards.map((card, i) => (
              <CardRenderer key={i} card={card} onSend={onSend} onScanComplete={onScanComplete} />
            ))}
          </div>
        )}
        {suggestions && suggestions.length > 0 && !streaming && (
          <SuggestionChips suggestions={suggestions} onSend={onSend} />
        )}
      </div>
    </div>
  )
}
