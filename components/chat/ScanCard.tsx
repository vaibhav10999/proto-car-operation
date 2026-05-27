'use client'

import { useEffect, useRef, useState } from 'react'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { C24 } from '@/components/tokens'

interface ScanCardProps {
  onScanComplete: (plate: string) => void
}

const MOCK_PLATE = 'UP-16-XX-1234'
const MOCK_CAR_NAME = 'Hyundai i20 Sportz'
const MOCK_CAR_ID = 'c24-noida-i20-001'

export default function ScanCard({ onScanComplete }: ScanCardProps) {
  const [phase, setPhase] = useState<'scanning' | 'done'>('scanning')

  // Always hold the latest callback without making it a useEffect dep
  const callbackRef = useRef(onScanComplete)
  useEffect(() => { callbackRef.current = onScanComplete })

  // Single timer — only runs while phase is 'scanning'.
  // If phase is already 'done' (e.g. after a Strict-Mode remount) this becomes a no-op.
  useEffect(() => {
    if (phase !== 'scanning') return
    const timer = setTimeout(() => {
      setPhase('done')
      // Parent-level gate (scanFiredRef in ChatAssistant) is the real dedup;
      // this just advances our own visual state.
      // Encode plate + matched car id so parent can build an unambiguous message
      callbackRef.current(`${MOCK_PLATE}::${MOCK_CAR_ID}`)
    }, 1800)
    return () => clearTimeout(timer)
  }, [phase])

  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${C24.border}`,
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
    }}>
      {/* Camera viewport */}
      <div style={{
        background: phase === 'scanning' ? '#080c14' : C24.successTint,
        height: 120,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 500ms ease',
      }}>
        {phase === 'scanning' ? (
          <>
            {/* Corner brackets */}
            {(['tl', 'tr', 'bl', 'br'] as const).map(pos => (
              <div key={pos} style={{
                position: 'absolute',
                width: 22, height: 22,
                ...(pos.includes('t') ? { top: 14 } : { bottom: 14 }),
                ...(pos.includes('l') ? { left: 22 } : { right: 22 }),
                borderTop: pos.includes('t') ? `2.5px solid ${C24.blue}` : 'none',
                borderBottom: pos.includes('b') ? `2.5px solid ${C24.blue}` : 'none',
                borderLeft: pos.includes('l') ? `2.5px solid ${C24.blue}` : 'none',
                borderRight: pos.includes('r') ? `2.5px solid ${C24.blue}` : 'none',
              }} />
            ))}
            {/* Sweeping scan beam */}
            <div style={{
              position: 'absolute',
              left: 22, right: 22,
              height: 2,
              borderRadius: 1,
              background: `linear-gradient(90deg, transparent 0%, ${C24.blue} 40%, rgba(100,200,255,0.9) 50%, ${C24.blue} 60%, transparent 100%)`,
              animation: 'scanLine 1.6s ease-in-out infinite',
              boxShadow: `0 0 10px ${C24.blue}90`,
            }} />
            <span style={{
              fontSize: 11.5, color: 'rgba(255,255,255,0.5)',
              letterSpacing: 0.6, position: 'absolute', bottom: 14,
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
            }}>
              Align number plate in frame
            </span>
          </>
        ) : (
          <>
            <MaterialIcon name="check_circle" size={36} color={C24.success} fill={1} />
            <span style={{
              fontSize: 13, fontWeight: 700, color: C24.success,
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
            }}>
              Plate recognised
            </span>
          </>
        )}
      </div>

      {/* Plate info row */}
      <div style={{
        padding: '13px 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{
            fontFamily: 'monospace',
            fontSize: 20, fontWeight: 700, letterSpacing: 3,
            color: phase === 'done' ? C24.text : 'transparent',
            textShadow: phase === 'scanning' ? `0 0 8px ${C24.textMuted}` : 'none',
            transition: 'color 400ms ease',
            marginBottom: 4,
          }}>
            {MOCK_PLATE}
          </div>
          {phase === 'done' && (
            <div style={{
              fontSize: 12.5, color: C24.textSecondary,
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
            }}>
              {MOCK_CAR_NAME} · Found in hub inventory
            </div>
          )}
          {phase === 'scanning' && (
            <div style={{
              fontSize: 12, color: C24.textMuted,
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              letterSpacing: 0.2,
            }}>
              Reading plate…
            </div>
          )}
        </div>

        {phase === 'scanning' && (
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            border: `3px solid ${C24.borderLight}`,
            borderTopColor: C24.blue,
            animation: 'orbitSpin 0.7s linear infinite',
          }} />
        )}
        {phase === 'done' && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            background: C24.successTint,
            borderRadius: 999, padding: '5px 11px',
          }}>
            <MaterialIcon name="verified" size={13} color={C24.success} fill={1} />
            <span style={{
              fontSize: 11.5, fontWeight: 700, color: C24.success,
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
            }}>
              Verified
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
