'use client'

import OrbitMark from '@/components/icons/OrbitMark'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { C24, ORBIT_GRADIENT } from '@/components/tokens'
import { CHIP_MESSAGES } from '@/lib/chipActions'

// Wider suggestion-style prompts — feel like the assistant is recommending these
const SUGGESTIONS = [
  { label: 'Show me cars under ₹8 lakh',       msg: 'Show me cars between ₹5 lakh and ₹8 lakh' },
  { label: 'Best automatic hatchbacks here',    msg: 'Show me automatic hatchbacks available here' },
  { label: "What's most test-driven this week?", msg: "What cars are most test-driven at this hub this week?" },
]

interface QuickChipsProps {
  onSend: (text: string) => void
}

export default function QuickChips({ onSend }: QuickChipsProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      padding: '8px 14px 10px',
    }}>
      {SUGGESTIONS.map((s, i) => (
        <button
          key={s.msg}
          onClick={() => onSend(s.msg)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: '#fff',
            border: `1px solid ${C24.border}`,
            borderRadius: 12,
            padding: '9px 12px',
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            animation: `orbitFadeUp ${180 + i * 60}ms ease both`,
            transition: 'border-color 120ms, box-shadow 120ms',
          }}
        >
          {/* Small blue circle with white sparkle — matches the Orbit AI switcher style */}
          <div style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: ORBIT_GRADIENT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <OrbitMark size={13} white />
          </div>

          <span style={{
            flex: 1,
            fontSize: 13,
            fontWeight: 500,
            color: C24.text,
            letterSpacing: -0.1,
            lineHeight: 1.3,
          }}>
            {s.label}
          </span>

          <MaterialIcon
            name="arrow_forward_ios"
            size={12}
            color={C24.textMuted}
            style={{ flexShrink: 0 }}
          />
        </button>
      ))}
    </div>
  )
}
