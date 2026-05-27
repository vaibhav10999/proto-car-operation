'use client'

import { C24, ORBIT_GRADIENT } from '@/components/tokens'
import MaterialIcon from '@/components/icons/MaterialIcon'
import type { Car } from '@/lib/types'

interface CompareCardProps {
  carA: Car
  carB: Car
  onSend: (text: string) => void
}

function fmt(p: number) {
  return `₹${(p / 100000).toFixed(2)}L`
}
function fmtKm(k: number) {
  return k >= 1000 ? `${Math.round(k / 1000)}k km` : `${k} km`
}

const PARAMS = [
  {
    key: 'price',
    label: 'Price',
    icon: 'currency_rupee',
    get: (c: Car) => fmt(c.price),
    better: (a: Car, b: Car) => a.price < b.price ? 'a' : b.price < a.price ? 'b' : null,
  },
  {
    key: 'emi',
    label: 'EMI / month',
    icon: 'payments',
    get: (c: Car) => `₹${c.emi.toLocaleString('en-IN')}`,
    better: (a: Car, b: Car) => a.emi < b.emi ? 'a' : b.emi < a.emi ? 'b' : null,
  },
  {
    key: 'year',
    label: 'Year',
    icon: 'calendar_today',
    get: (c: Car) => String(c.year),
    better: (a: Car, b: Car) => a.year > b.year ? 'a' : b.year > a.year ? 'b' : null,
  },
  {
    key: 'km',
    label: 'Kilometres',
    icon: 'speed',
    get: (c: Car) => fmtKm(c.km),
    better: (a: Car, b: Car) => a.km < b.km ? 'a' : b.km < a.km ? 'b' : null,
  },
  {
    key: 'fuel',
    label: 'Fuel type',
    icon: 'local_gas_station',
    get: (c: Car) => c.fuel,
    better: () => null,
  },
  {
    key: 'transmission',
    label: 'Transmission',
    icon: 'settings',
    get: (c: Car) => c.transmission,
    better: () => null,
  },
  {
    key: 'inspection',
    label: 'Inspection',
    icon: 'shield',
    get: (c: Car) => `${c.inspectionScore}/10`,
    better: (a: Car, b: Car) => a.inspectionScore > b.inspectionScore ? 'a' : b.inspectionScore > a.inspectionScore ? 'b' : null,
  },
  {
    key: 'owner',
    label: 'Ownership',
    icon: 'person',
    get: (c: Car) => c.owner === 1 ? '1st owner' : `${c.owner}nd owner`,
    better: (a: Car, b: Car) => a.owner < b.owner ? 'a' : b.owner < a.owner ? 'b' : null,
  },
]

function CarSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 100" width={80} height={40} style={{ display: 'block' }}>
      <path d="M10,72 L20,50 Q30,32 60,30 L130,30 Q150,32 165,46 L188,60 Q195,62 195,72 L195,80 L10,80 Z" fill={color} />
      <path d="M40,46 L62,36 L122,36 L150,46 L150,56 L40,56 Z" fill="rgba(255,255,255,0.88)" />
      <circle cx="50" cy="80" r="9" fill="#111" /><circle cx="50" cy="80" r="4" fill="#555" />
      <circle cx="155" cy="80" r="9" fill="#111" /><circle cx="155" cy="80" r="4" fill="#555" />
    </svg>
  )
}

export default function CompareCard({ carA, carB, onSend }: CompareCardProps) {
  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${C24.border}`,
      borderRadius: 18,
      overflow: 'hidden',
      boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
    }}>
      {/* Header row with car names */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 1fr',
        borderBottom: `1px solid ${C24.border}`,
      }}>
        {/* Label column header */}
        <div style={{
          padding: '10px 10px 10px 14px',
          background: C24.appBg,
          borderRight: `1px solid ${C24.border}`,
        }} />

        {/* Car A */}
        {[carA, carB].map((car, i) => (
          <div key={car.id} style={{
            padding: '12px 10px 10px',
            background: i === 0 ? '#F0F5FF' : '#FFF5F0',
            borderRight: i === 0 ? `1px solid ${C24.border}` : 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
          }}>
            <CarSVG color={car.imageColor || '#3a4350'} />
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 12,
                fontWeight: 800,
                color: C24.text,
                letterSpacing: -0.2,
                lineHeight: 1.2,
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
              }}>
                {car.make} {car.model}
              </div>
              <div style={{
                fontSize: 10.5,
                color: C24.textSecondary,
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
              }}>
                {car.variant}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Parameter rows */}
      {PARAMS.map((param, rowIdx) => {
        const valA = param.get(carA)
        const valB = param.get(carB)
        const winner = param.better(carA, carB)
        const isLast = rowIdx === PARAMS.length - 1

        return (
          <div key={param.key} style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr 1fr',
            borderBottom: isLast ? 'none' : `0.5px solid ${C24.borderLight}`,
          }}>
            {/* Label */}
            <div style={{
              padding: '9px 8px 9px 12px',
              background: C24.appBg,
              borderRight: `1px solid ${C24.border}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 2,
            }}>
              <MaterialIcon name={param.icon} size={13} color={C24.textMuted} fill={0} />
              <span style={{
                fontSize: 10,
                fontWeight: 600,
                color: C24.textMuted,
                lineHeight: 1.2,
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
              }}>
                {param.label}
              </span>
            </div>

            {/* Value A */}
            <div style={{
              padding: '10px 10px',
              background: winner === 'a' ? '#E8F5E9' : 'transparent',
              borderRight: `0.5px solid ${C24.borderLight}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontSize: 12.5,
                fontWeight: winner === 'a' ? 800 : 600,
                color: winner === 'a' ? C24.success : C24.text,
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                textAlign: 'center',
              }}>
                {valA}
                {winner === 'a' && ' ✓'}
              </span>
            </div>

            {/* Value B */}
            <div style={{
              padding: '10px 10px',
              background: winner === 'b' ? '#E8F5E9' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontSize: 12.5,
                fontWeight: winner === 'b' ? 800 : 600,
                color: winner === 'b' ? C24.success : C24.text,
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                textAlign: 'center',
              }}>
                {valB}
                {winner === 'b' && ' ✓'}
              </span>
            </div>
          </div>
        )
      })}

      {/* CTA row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 1fr',
        borderTop: `1px solid ${C24.border}`,
      }}>
        <div style={{ background: C24.appBg }} />
        {[carA, carB].map((car, i) => (
          <button
            key={car.id}
            onClick={() => onSend(`Book a test drive for ${car.make} ${car.model} ${car.variant} (id: ${car.id})`)}
            style={{
              padding: '11px 8px',
              background: i === 0 ? ORBIT_GRADIENT : C24.orange,
              border: 'none',
              borderLeft: i === 1 ? `1px solid rgba(255,255,255,0.2)` : 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 11.5,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: -0.1,
            }}
          >
            Book Drive
          </button>
        ))}
      </div>
    </div>
  )
}
