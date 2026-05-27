'use client'

import { useState } from 'react'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { C24 } from '@/components/tokens'
import type { Hub } from '@/lib/types'
import hubsData from '@/data/hubs.json'

const hubs = hubsData as Hub[]

const REMOTE_HUB: Hub = {
  id: 'remote',
  name: 'Browsing remotely',
  shortName: 'Remote',
  distance: '—',
  availableCars: 0,
  remote: true,
}

interface HubPickerProps {
  currentHubId?: string
  onSelect: (hub: Hub) => void
  onDismiss?: () => void
  forcePick?: boolean
}

export default function HubPicker({ currentHubId, onSelect, onDismiss, forcePick = false }: HubPickerProps) {
  const [selected, setSelected] = useState<string | null>(currentHubId ?? null)

  const confirm = () => {
    if (!selected) return
    if (selected === 'remote') { onSelect(REMOTE_HUB); return }
    const found = hubs.find(h => h.id === selected)
    if (found) onSelect(found)
  }

  return (
    <>
      {/* ── BACKDROP (sits behind the sheet) ── */}
      <div
        onClick={forcePick ? undefined : onDismiss}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 310,
          background: 'rgba(0,0,0,0.42)',
          animation: 'orbitFadeUp 180ms ease',
        }}
      />

      {/* ── SHEET (sits above backdrop) ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 320,               // always above backdrop
          background: '#fff',
          borderRadius: '22px 22px 0 0',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '82%',
          animation: 'hubSlideUp 240ms cubic-bezier(0.34,1.2,0.64,1)',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.10)',
        }}
        // Stop clicks inside the sheet from reaching the backdrop
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 6px', flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: C24.border }} />
        </div>

        {/* Title */}
        <div style={{ padding: '4px 20px 14px', flexShrink: 0 }}>
          <h2 style={{
            fontFamily: 'var(--font-bricolage), var(--font-inter), system-ui, sans-serif',
            fontSize: 20, fontWeight: 800, color: C24.text,
            margin: '0 0 4px', letterSpacing: -0.5,
          }}>
            Which hub are you at?
          </h2>
          <p style={{
            fontSize: 13, color: C24.textSecondary, margin: 0,
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
          }}>
            We'll show cars available for test drive at your hub.
          </p>
        </div>

        {/* Hub list — scrollable */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '0 16px' }}>
          {hubs.map(hub => {
            const isSelected = selected === hub.id
            return (
              <button
                key={hub.id}
                onClick={() => setSelected(hub.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: isSelected ? C24.blueTint : '#fff',
                  border: `1.5px solid ${isSelected ? C24.blue : C24.border}`,
                  borderRadius: 14,
                  padding: '12px 14px',
                  cursor: 'pointer',
                  marginBottom: 8,
                  textAlign: 'left',
                  transition: 'border-color 120ms, background 120ms',
                }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                  background: isSelected ? C24.blue : C24.appBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 120ms',
                }}>
                  <MaterialIcon
                    name="location_on"
                    size={18}
                    color={isSelected ? '#fff' : C24.textSecondary}
                    fill={1}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 14, fontWeight: 700, letterSpacing: -0.2, marginBottom: 2,
                    color: isSelected ? C24.blue : C24.text,
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    transition: 'color 120ms',
                  }}>
                    {hub.name}
                    {hub.isNearest && (
                      <span style={{
                        marginLeft: 7, fontSize: 10, fontWeight: 700,
                        background: C24.successTint, color: C24.success,
                        borderRadius: 999, padding: '2px 7px',
                        verticalAlign: 'middle',
                      }}>
                        Nearest
                      </span>
                    )}
                  </div>
                  <div style={{
                    fontSize: 12, color: C24.textSecondary,
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  }}>
                    {hub.distance} away · {hub.availableCars} cars available
                  </div>
                </div>
                {isSelected && (
                  <MaterialIcon name="check_circle" size={20} color={C24.blue} fill={1} />
                )}
              </button>
            )
          })}

          {/* Divider */}
          <div style={{ height: 1, background: C24.borderLight, margin: '4px 0 10px' }} />

          {/* Not at a hub option */}
          <button
            onClick={() => setSelected('remote')}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              background: selected === 'remote' ? '#FFF9F0' : 'transparent',
              border: `1px solid ${selected === 'remote' ? C24.orange + '60' : 'transparent'}`,
              borderRadius: 12, padding: '10px 14px',
              cursor: 'pointer', marginBottom: 12, textAlign: 'left',
            }}
          >
            <MaterialIcon
              name="home"
              size={18}
              color={selected === 'remote' ? C24.orange : C24.textMuted}
              fill={0}
            />
            <span style={{
              fontSize: 13.5, fontWeight: 600,
              color: selected === 'remote' ? C24.orange : C24.textSecondary,
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
            }}>
              I'm not at a hub — browse remotely
            </span>
          </button>
        </div>

        {/* ── CONTINUE BUTTON — always pinned, never inside scroll ── */}
        <div style={{
          flexShrink: 0,
          padding: '12px 16px 32px',
          borderTop: `0.5px solid ${C24.borderLight}`,
          background: '#fff',
        }}>
          <button
            onClick={confirm}
            disabled={!selected}
            style={{
              width: '100%',
              background: selected ? C24.orange : C24.borderLight,
              color: selected ? '#fff' : C24.textMuted,
              border: 'none',
              borderRadius: 14,
              padding: '15px 16px',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 16,
              fontWeight: 700,
              cursor: selected ? 'pointer' : 'default',
              letterSpacing: -0.2,
              transition: 'background 150ms, color 150ms',
              boxShadow: selected ? `0 6px 18px ${C24.orange}45` : 'none',
            }}
          >
            {selected ? 'Continue →' : 'Select a hub to continue'}
          </button>
        </div>
      </div>
    </>
  )
}
