'use client'

import { useState, useEffect } from 'react'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { C24 } from '@/components/tokens'
import type { Hub } from '@/lib/types'

interface ArrivalNotificationProps {
  hub: Hub
  onOpenChat: () => void
  onDismiss: () => void
  visible: boolean
}

export default function ArrivalNotification({ hub, onOpenChat, onDismiss, visible }: ArrivalNotificationProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (visible) {
      requestAnimationFrame(() => setMounted(true))
    } else {
      setMounted(false)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'absolute',
        top: 58,
        left: 10,
        right: 10,
        zIndex: 200,
        transform: mounted ? 'translateY(0)' : 'translateY(-110%)',
        transition: 'transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents: 'all',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 18,
          padding: '11px 13px',
          boxShadow: '0 8px 28px rgba(0,0,0,0.16), 0 0 0 0.5px rgba(0,0,0,0.06)',
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start',
        }}
      >
        {/* Cars24 icon */}
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: C24.blue,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 900, letterSpacing: -0.5 }}>C</span>
        </div>

        {/* Text */}
        <button
          onClick={onOpenChat}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            padding: 0,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: C24.text }}>Cars24</span>
            <span style={{ fontSize: 11, color: C24.textMuted }}>now</span>
          </div>
          <p style={{
            fontSize: 13,
            fontWeight: 500,
            color: C24.text,
            margin: 0,
            lineHeight: 1.4,
          }}>
            📍 You're at <strong>{hub.name}</strong>. Try Chat mode for a DIY test drive experience.
          </p>
          <div style={{
            marginTop: 8,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: C24.blue,
            color: '#fff',
            borderRadius: 8,
            padding: '5px 10px',
            fontSize: 12,
            fontWeight: 700,
          }}>
            <MaterialIcon name="chat" size={13} color="#fff" fill={1} />
            Open Chat
          </div>
        </button>

        {/* Close */}
        <button
          onClick={e => { e.stopPropagation(); onDismiss() }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 2,
            color: C24.textMuted,
            display: 'flex',
            flexShrink: 0,
          }}
        >
          <MaterialIcon name="close" size={16} color={C24.textMuted} />
        </button>
      </div>
    </div>
  )
}
