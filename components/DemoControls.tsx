'use client'

import { useState } from 'react'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { C24 } from '@/components/tokens'
import type { Hub } from '@/lib/types'
import hubsData from '@/data/hubs.json'

const hubs = hubsData as Hub[]

interface DemoControlsProps {
  onSimulateArrival: (hub: Hub) => void
  onLeaveHub: () => void
  onReset: () => void
}

export default function DemoControls({ onSimulateArrival, onLeaveHub, onReset }: DemoControlsProps) {
  const [open, setOpen] = useState(false)

  const actions = [
    {
      label: `📍 Arrive at ${hubs[0].shortName}`,
      action: () => { onSimulateArrival(hubs[0]); setOpen(false) },
    },
    {
      label: `📍 Arrive at ${hubs[1].shortName}`,
      action: () => { onSimulateArrival(hubs[1]); setOpen(false) },
    },
    {
      label: '❌ Leave the hub',
      action: () => { onLeaveHub(); setOpen(false) },
    },
    {
      label: '🔄 Reset demo',
      action: () => { onReset(); setOpen(false) },
    },
  ]

  return (
    <div style={{ position: 'absolute', bottom: 44, left: 12, zIndex: 500 }}>
      {/* Action menu */}
      {open && (
        <div style={{
          position: 'absolute',
          bottom: 44,
          left: 0,
          background: '#fff',
          borderRadius: 14,
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
          border: `1px solid ${C24.border}`,
          minWidth: 200,
          overflow: 'hidden',
          animation: 'orbitFadeUp 180ms ease',
        }}>
          <div style={{ padding: '8px 12px 6px', borderBottom: `1px solid ${C24.border}` }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: C24.textMuted, letterSpacing: 0.8, textTransform: 'uppercase' }}>
              Demo Controls
            </span>
          </div>
          {actions.map((a, i) => (
            <button
              key={i}
              onClick={a.action}
              style={{
                display: 'block',
                width: '100%',
                background: 'none',
                border: 'none',
                padding: '10px 14px',
                textAlign: 'left',
                fontSize: 13,
                fontWeight: 600,
                color: C24.text,
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                borderBottom: i < actions.length - 1 ? `1px solid ${C24.borderLight}` : 'none',
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Demo Controls"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: '#0B1F2A',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          opacity: 0.75,
          transition: 'opacity 150ms',
        }}
      >
        <MaterialIcon name={open ? 'close' : 'tune'} size={17} color="#fff" />
      </button>
    </div>
  )
}
