'use client'

import OrbitMark from '@/components/icons/OrbitMark'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { C24 } from '@/components/tokens'

export type AppMode = 'browse' | 'chat'

// Full gradient for active Chat tab
const CHAT_GRADIENT = 'linear-gradient(135deg, #2BB3FF 0%, #0071BC 55%, #1A3DBE 100%)'

// Shimmer gradient for inactive Chat tab on dark bg (catches the eye)
const CHAT_INACTIVE_DARK = 'linear-gradient(135deg, rgba(43,179,255,0.30) 0%, rgba(0,113,188,0.25) 55%, rgba(26,61,190,0.30) 100%)'

interface ModeSwitcherProps {
  mode: AppMode
  onChange: (mode: AppMode) => void
  compact?: boolean
  darkBg?: boolean   // true when rendered on blue header
}

export default function ModeSwitcher({ mode, onChange, compact = false, darkBg = false }: ModeSwitcherProps) {
  const py = compact ? 5 : 7
  const px = compact ? 11 : 15

  const chatInactive = mode !== 'chat'

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 3,
        background: darkBg ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.06)',
        backdropFilter: darkBg ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: darkBg ? 'blur(10px)' : 'none',
        borderRadius: 999,
        padding: 4,
        border: darkBg
          ? '1px solid rgba(255,255,255,0.22)'
          : `1px solid ${C24.border}`,
        // When Chat is active, add outer blue ring
        boxShadow: mode === 'chat'
          ? `0 0 0 2px rgba(43,179,255,0.35), 0 4px 12px rgba(0,0,0,0.15)`
          : darkBg
          ? '0 2px 8px rgba(0,0,0,0.15)'
          : '0 1px 4px rgba(0,0,0,0.08)',
        transition: 'box-shadow 250ms ease',
      }}
    >
      {/* ── BROWSE TAB ── */}
      <button
        onClick={() => onChange('browse')}
        style={{
          appearance: 'none',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 999,
          padding: `${py}px ${px}px`,
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: -0.2,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          transition: 'all 220ms ease',
          // Active on dark bg: crisp white pill
          // Active on light bg: white pill with subtle shadow
          // Inactive: transparent
          background: mode === 'browse'
            ? '#fff'
            : 'transparent',
          color: mode === 'browse'
            ? C24.blue
            : darkBg
            ? 'rgba(255,255,255,0.72)'
            : C24.textSecondary,
          boxShadow: mode === 'browse'
            ? '0 1px 4px rgba(0,0,0,0.14)'
            : 'none',
        }}
      >
        <MaterialIcon
          name="search"
          size={14}
          color={mode === 'browse' ? C24.blue : darkBg ? 'rgba(255,255,255,0.65)' : C24.textMuted}
        />
        Browse
      </button>

      {/* ── CHAT TAB ── */}
      <button
        onClick={() => onChange('chat')}
        style={{
          appearance: 'none',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 999,
          padding: `${py}px ${px}px`,
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: -0.2,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          transition: 'background 220ms ease, box-shadow 220ms ease',
          // Active: full gradient + strong glow
          // Inactive on dark: frosted blue tint + pulsing glow to draw eye
          // Inactive on light: subtle blue tint
          background: mode === 'chat'
            ? CHAT_GRADIENT
            : darkBg
            ? CHAT_INACTIVE_DARK
            : 'rgba(0,113,188,0.08)',
          color: mode === 'chat'
            ? '#fff'
            : darkBg
            ? 'rgba(255,255,255,0.92)'
            : C24.blue,
          boxShadow: mode === 'chat'
            ? `0 3px 12px rgba(0,113,188,0.55), inset 0 1px 0 rgba(255,255,255,0.15)`
            : darkBg && chatInactive
            ? undefined // animation handles this
            : 'none',
          // Pulsing glow on "Chat" when inactive + on dark bg to attract attention
          animation: chatInactive && darkBg ? 'chatGlow 2.4s ease-out infinite' : 'none',
        }}
      >
        {/* Always white so sparkle is visible on any blue/coloured surface */}
        <OrbitMark size={13} white />
        Chat
        {/* Dot indicator when inactive on dark bg — signals "something here" */}
        {chatInactive && darkBg && (
          <span style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            marginLeft: 1,
            animation: 'inspectionPulse 1.8s ease-in-out infinite',
            flexShrink: 0,
          }} />
        )}
      </button>
    </div>
  )
}
