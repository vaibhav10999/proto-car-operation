'use client'

import MaterialIcon from '@/components/icons/MaterialIcon'
import { C24 } from '@/components/tokens'
import type { Hub } from '@/lib/types'

interface HubPillProps {
  hub: Hub
  onClick: () => void
}

export default function HubPill({ hub, onClick }: HubPillProps) {
  const isRemote = hub.remote

  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: isRemote ? '#FFF9F0' : C24.successTint,
        border: `1px solid ${isRemote ? C24.orange + '40' : C24.success + '40'}`,
        borderRadius: 999,
        padding: '4px 10px 4px 6px',
        cursor: 'pointer',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
      }}
    >
      <MaterialIcon
        name={isRemote ? 'wifi_off' : 'location_on'}
        size={13}
        color={isRemote ? C24.orange : C24.success}
        fill={1}
      />
      <span style={{
        fontSize: 11.5,
        fontWeight: 700,
        color: isRemote ? C24.orange : C24.success,
        letterSpacing: -0.1,
      }}>
        {hub.shortName}
      </span>
      <MaterialIcon
        name="keyboard_arrow_down"
        size={13}
        color={isRemote ? C24.orange : C24.success}
      />
    </button>
  )
}
