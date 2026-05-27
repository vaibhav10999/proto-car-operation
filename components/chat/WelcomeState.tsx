'use client'

import OrbitMark from '@/components/icons/OrbitMark'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { C24, ORBIT_GRADIENT } from '@/components/tokens'
import { CHIP_MESSAGES } from '@/lib/chipActions'
import { useHub } from '@/components/HubContext'
import type { Hub } from '@/lib/types'

const CHIPS = ['Under ₹5L', 'Automatic', 'SUV', 'Hatchback', 'Sedan']

interface WelcomeStateProps {
  onSend: (text: string) => void
  hub: Hub | null
}

export default function WelcomeState({ onSend, hub }: WelcomeStateProps) {
  const { openPicker } = useHub()
  const isRemote = hub?.remote
  const noHub = !hub

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '28px 20px 24px',
      animation: 'orbitFadeUp 320ms ease',
      flex: 1,
    }}>
      {/* Orbit mark */}
      <OrbitMark size={52} glow style={{ marginBottom: 18 }} />

      {/* Greeting */}
      <h1 style={{
        fontFamily: 'var(--font-bricolage), var(--font-inter), system-ui, sans-serif',
        fontSize: 24,
        fontWeight: 800,
        letterSpacing: -0.8,
        color: C24.text,
        textAlign: 'center',
        margin: '0 0 8px',
        lineHeight: 1.2,
      }}>
        {isRemote ? 'Explore cars from anywhere.' : (
          <>
            Welcome to the{' '}
            <span style={{ background: ORBIT_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              hub.
            </span>
          </>
        )}
      </h1>

      {/* Subtext */}
      <p style={{
        fontSize: 13.5,
        color: C24.textSecondary,
        textAlign: 'center',
        margin: '0 0 18px',
        lineHeight: 1.45,
        maxWidth: 280,
      }}>
        {isRemote
          ? "You're browsing remotely. Locate and test drive features are available at a hub."
          : 'Find cars, locate them in the lot, and book test drives.'}
      </p>

      {/* Hub strip */}
      <button
        onClick={openPicker}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: noHub ? C24.appBg : isRemote ? '#FFF9F0' : C24.successTint,
          border: `1px solid ${noHub ? C24.border : isRemote ? C24.orange + '30' : C24.success + '30'}`,
          borderRadius: 999,
          padding: '5px 13px',
          marginBottom: 24,
          cursor: 'pointer',
        }}
      >
        <MaterialIcon
          name={noHub ? 'location_searching' : isRemote ? 'wifi_off' : 'location_on'}
          size={13}
          color={noHub ? C24.textMuted : isRemote ? C24.orange : C24.success}
          fill={1}
        />
        <span style={{
          fontSize: 12, fontWeight: 600,
          color: noHub ? C24.textSecondary : isRemote ? C24.orange : C24.success,
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}>
          {noHub ? 'Tap to select your hub' : isRemote ? 'Browsing remotely' : hub!.name}
        </span>
        {!noHub && !isRemote && (
          <>
            <span style={{ color: C24.border }}>·</span>
            <span style={{ fontSize: 12, color: C24.textSecondary }}>{hub!.availableCars} cars</span>
          </>
        )}
      </button>

      {/* Shortcuts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%' }}>
        <button
          onClick={() => {
            if (noHub || isRemote) {
              // Prompt hub selection first for hub-only features
              openPicker()
            } else {
              onSend(CHIP_MESSAGES['Scan a car'])
            }
          }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#fff',
            border: `1.5px solid ${(noHub || isRemote) ? C24.border : C24.blue}`,
            borderRadius: 14, padding: '13px 14px',
            cursor: 'pointer', fontFamily: 'var(--font-inter), system-ui, sans-serif',
            position: 'relative',
          }}
        >
          <MaterialIcon
            name="qr_code_scanner"
            size={20}
            color={(noHub || isRemote) ? C24.textMuted : C24.blue}
            fill={0}
          />
          <div>
            <span style={{
              fontSize: 13, fontWeight: 700,
              color: (noHub || isRemote) ? C24.textSecondary : C24.text,
              display: 'block',
            }}>Scan a car</span>
            {(noHub || isRemote) && (
              <span style={{ fontSize: 10.5, color: C24.textMuted, display: 'block' }}>
                Select hub first
              </span>
            )}
          </div>
        </button>
        <button
          onClick={() => onSend(CHIP_MESSAGES['Already booked'])}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#fff', border: `1.5px solid ${C24.blue}`,
            borderRadius: 14, padding: '13px 14px',
            cursor: 'pointer', fontFamily: 'var(--font-inter), system-ui, sans-serif',
          }}
        >
          <MaterialIcon name="event_available" size={20} color={C24.blue} fill={0} />
          <span style={{ fontSize: 13, fontWeight: 700, color: C24.text }}>My booking</span>
        </button>
      </div>
    </div>
  )
}
