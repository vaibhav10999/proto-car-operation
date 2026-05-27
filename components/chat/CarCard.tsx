'use client'

import MaterialIcon from '@/components/icons/MaterialIcon'
import { C24, ORBIT_GRADIENT } from '@/components/tokens'
import type { Car } from '@/lib/types'

interface CarCardProps {
  car: Car
  onSend: (text: string) => void
  remoteMode?: boolean
}

function CarSilhouette({ color, style = {} }: { color: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 100" width={140} height={70} style={{ display: 'block', ...style }}>
      <ellipse cx="100" cy="92" rx="92" ry="4" fill="rgba(0,0,0,0.08)" />
      <path d="M10,72 L20,50 Q30,32 60,30 L130,30 Q150,32 165,46 L188,60 Q195,62 195,72 L195,80 L10,80 Z" fill={color} />
      <path d="M40,46 L62,36 L122,36 L150,46 L150,56 L40,56 Z" fill="rgba(255,255,255,0.9)" />
      <line x1="100" y1="32" x2="100" y2="56" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="50" cy="80" r="11" fill="#111" />
      <circle cx="50" cy="80" r="5.5" fill="#444" />
      <circle cx="155" cy="80" r="11" fill="#111" />
      <circle cx="155" cy="80" r="5.5" fill="#444" />
    </svg>
  )
}

function formatPrice(p: number): string {
  if (p >= 100000) return `₹${(p / 100000).toFixed(2)} lakh`
  return `₹${p.toLocaleString('en-IN')}`
}

function formatKm(k: number): string {
  return k >= 1000 ? `${(k / 1000).toFixed(0)}k km` : `${k} km`
}

export default function CarCard({ car, onSend, remoteMode = false }: CarCardProps) {
  const bgColor = car.imageColor || '#3a4350'
  const lightBg = bgColor + '22'

  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${C24.border}`,
        borderRadius: 16,
        overflow: 'hidden',
        width: '100%',
        boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
      }}
    >
      {/* Header with car silhouette */}
      <div
        style={{
          background: `linear-gradient(135deg, ${lightBg} 0%, ${bgColor}18 100%)`,
          padding: '14px 16px 10px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          minHeight: 90,
          position: 'relative',
        }}
      >
        <div>
          {car.owner === 1 && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                background: C24.successTint,
                borderRadius: 999,
                padding: '3px 8px',
                marginBottom: 6,
              }}
            >
              <MaterialIcon name="verified" size={12} color={C24.success} fill={1} />
              <span style={{ fontSize: 10.5, fontWeight: 700, color: C24.success }}>
                1st Owner · Certified
              </span>
            </div>
          )}
        </div>
        <CarSilhouette color={bgColor} style={{ position: 'absolute', right: 8, bottom: 6, opacity: 0.85 }} />
        {car.popularity.testDrives14d >= 10 && (
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: C24.orangeTint,
              border: `1px solid ${C24.orange}30`,
              borderRadius: 999,
              padding: '3px 8px',
            }}
          >
            <MaterialIcon name="trending_up" size={11} color={C24.orange} />
            <span style={{ fontSize: 10, fontWeight: 700, color: C24.orangeDark }}>
              High interest
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '12px 14px 14px' }}>
        {/* Car name */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C24.text, letterSpacing: -0.2 }}>
            {car.make} {car.model} {car.variant}
          </div>
          <div style={{ fontSize: 12, color: C24.textSecondary, marginTop: 1 }}>
            {car.year} · {formatKm(car.km)} · {car.fuel} · {car.transmission}
          </div>
        </div>

        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: C24.text, letterSpacing: -0.4 }}>
            {formatPrice(car.price)}
          </span>
          <span style={{ fontSize: 12.5, color: C24.blue, fontWeight: 600 }}>
            ₹{car.emi.toLocaleString('en-IN')}/mo EMI
          </span>
        </div>

        {/* Inspection score */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <div
            style={{
              background: car.inspectionScore >= 8 ? C24.successTint : C24.orangeTint,
              borderRadius: 999,
              padding: '3px 8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <MaterialIcon
              name="shield"
              size={12}
              color={car.inspectionScore >= 8 ? C24.success : C24.warning}
              fill={1}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: car.inspectionScore >= 8 ? C24.success : C24.warning,
              }}
            >
              {car.inspectionScore}/10 Inspection
            </span>
          </div>
          <span style={{ fontSize: 11, color: C24.textMuted }}>
            {car.popularity.testDrives14d} test drives in 14 days
          </span>
        </div>

        {/* Remote mode banner */}
        {remoteMode && (
          <div style={{ background: '#FFF9F0', border: '1px solid #F7931E30', borderRadius: 8, padding: '6px 10px', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: C24.orange }}>📍 Visit the hub to test drive this car</span>
          </div>
        )}

        {/* CTA buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          <button
            onClick={() => !remoteMode && onSend(`Locate the ${car.make} ${car.model} ${car.variant} (id: ${car.id})`)}
            disabled={remoteMode}
            style={{
              background: remoteMode ? C24.borderLight : C24.appBg,
              border: `1px solid ${C24.border}`,
              borderRadius: 8,
              padding: '8px 4px',
              cursor: remoteMode ? 'not-allowed' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              opacity: remoteMode ? 0.45 : 1,
            }}
          >
            <MaterialIcon name="location_on" size={16} color={C24.blue} fill={1} />
            <span style={{ fontSize: 10.5, fontWeight: 600, color: C24.text }}>Locate</span>
          </button>

          <button
            onClick={() => onSend(`Tell me more details about ${car.make} ${car.model} ${car.variant} (id: ${car.id})`)}
            style={{
              background: C24.appBg,
              border: `1px solid ${C24.border}`,
              borderRadius: 8,
              padding: '8px 4px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
            }}
          >
            <MaterialIcon name="info" size={16} color={C24.blue} fill={0} />
            <span style={{ fontSize: 10.5, fontWeight: 600, color: C24.text }}>Details</span>
          </button>

          <button
            onClick={() =>
              !remoteMode && onSend(`Book a test drive for ${car.make} ${car.model} ${car.variant} (id: ${car.id})`)
            }
            disabled={remoteMode}
            style={{
              background: remoteMode ? C24.borderLight : ORBIT_GRADIENT,
              border: 'none',
              borderRadius: 8,
              padding: '8px 4px',
              cursor: remoteMode ? 'not-allowed' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              opacity: remoteMode ? 0.45 : 1,
              boxShadow: '0 2px 6px rgba(0,113,188,0.25)',
            }}
          >
            <MaterialIcon name="directions_car" size={16} color="#fff" fill={1} />
            <span style={{ fontSize: 10.5, fontWeight: 700, color: '#fff' }}>Book Drive</span>
          </button>
        </div>
      </div>
    </div>
  )
}
