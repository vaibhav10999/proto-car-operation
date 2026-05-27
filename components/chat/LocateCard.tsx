'use client'

import MaterialIcon from '@/components/icons/MaterialIcon'
import { C24 } from '@/components/tokens'

interface LocateCardProps {
  carId: string
  bay: string
  lat: number
  lng: number
  etaMin: number
  carName?: string
}

export default function LocateCard({ bay, lat, lng, etaMin, carName }: LocateCardProps) {
  const mapsUrl = `https://www.google.com/maps/?q=${lat},${lng}`

  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${C24.border}`,
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
      }}
    >
      {/* Static map representation */}
      <div
        style={{
          background: 'linear-gradient(135deg, #e8f4f8 0%, #d4eaf4 100%)',
          height: 100,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Grid lines for parking lot feel */}
        <svg width="100%" height="100" style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="none">
          {[0, 1, 2, 3, 4].map(i => (
            <line key={`v${i}`} x1={`${20 * i + 10}%`} y1="0" x2={`${20 * i + 10}%`} y2="100" stroke={C24.border} strokeWidth="1" />
          ))}
          {[0, 1, 2, 3].map(i => (
            <line key={`h${i}`} x1="0" y1={`${25 * i + 12}%`} x2="100%" y2={`${25 * i + 12}%`} stroke={C24.border} strokeWidth="1" />
          ))}
        </svg>
        {/* Pin */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50% 50% 50% 0',
              background: C24.blue,
              transform: 'rotate(-45deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(0,113,188,0.4)',
            }}
          >
            <div style={{ transform: 'rotate(45deg)' }}>
              <MaterialIcon name="directions_car" size={16} color="#fff" fill={1} />
            </div>
          </div>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'rgba(0,113,188,0.3)',
              marginTop: -2,
            }}
          />
        </div>
        {/* Bay label */}
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: 10,
            background: C24.blue,
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            borderRadius: 6,
            padding: '3px 8px',
            letterSpacing: 0.5,
          }}
        >
          Bay {bay}
        </div>
      </div>

      {/* Info row */}
      <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          {carName && (
            <div style={{ fontSize: 12.5, fontWeight: 700, color: C24.text, marginBottom: 3 }}>{carName}</div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <MaterialIcon name="directions_walk" size={14} color={C24.textSecondary} />
            <span style={{ fontSize: 12.5, color: C24.textSecondary }}>~{etaMin} min walk · Bay {bay}</span>
          </div>
          <div style={{ fontSize: 11, color: C24.textMuted, marginTop: 3 }}>
            Tip: scan the number plate when you reach the car to confirm.
          </div>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: C24.blue,
            color: '#fff',
            borderRadius: 10,
            padding: '9px 12px',
            fontSize: 12.5,
            fontWeight: 700,
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <MaterialIcon name="open_in_new" size={14} color="#fff" />
          Open Maps
        </a>
      </div>
    </div>
  )
}
