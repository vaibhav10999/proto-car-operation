'use client'

import MaterialIcon from '@/components/icons/MaterialIcon'
import { C24 } from '@/components/tokens'
import type { Booking } from '@/lib/types'

interface BookingCardProps {
  booking: Booking
  onSend: (text: string) => void
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  Booked: { bg: C24.blueTint, text: C24.blue },
  'Key handed over': { bg: C24.orangeTint, text: C24.orangeDark },
  'Test drive started': { bg: C24.successTint, text: C24.success },
  Completed: { bg: C24.successTint, text: C24.success },
  Cancelled: { bg: C24.errorTint, text: C24.error },
}

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
  } catch {
    return iso
  }
}

export default function BookingCard({ booking, onSend }: BookingCardProps) {
  const statusColor = STATUS_COLORS[booking.status] || { bg: C24.appBg, text: C24.textSecondary }

  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${C24.border}`,
        borderRadius: 16,
        padding: 14,
        boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: C24.text }}>Test Drive Booking</span>
        <div
          style={{
            background: statusColor.bg,
            borderRadius: 999,
            padding: '3px 10px',
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: statusColor.text }}>{booking.status}</span>
        </div>
      </div>

      <div
        style={{
          background: C24.appBg,
          borderRadius: 10,
          padding: '10px 12px',
          marginBottom: 12,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
        }}
      >
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: C24.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>Booking ID</div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C24.text, marginTop: 2 }}>{booking.bookingId}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: C24.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>Slot Time</div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C24.text, marginTop: 2 }}>
            {booking.slotTime ? formatTime(booking.slotTime) : '—'}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: C24.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>Hub</div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: C24.text, marginTop: 2 }}>Sector 18, Noida</div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: C24.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>Car</div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: C24.text, marginTop: 2 }}>Tata Nexon XZA+</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <button
          onClick={() => onSend(`Locate my booked car (id: ${booking.carId})`)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            background: C24.appBg,
            border: `1px solid ${C24.border}`,
            borderRadius: 10,
            padding: '9px 12px',
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: 12.5,
            fontWeight: 700,
            color: C24.text,
          }}
        >
          <MaterialIcon name="location_on" size={14} color={C24.blue} fill={1} />
          Locate Car
        </button>
        <button
          onClick={() => onSend('I want to start my test drive, show me the start PIN')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            background: C24.blue,
            border: 'none',
            borderRadius: 10,
            padding: '9px 12px',
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: 12.5,
            fontWeight: 700,
            color: '#fff',
          }}
        >
          <MaterialIcon name="key" size={14} color="#fff" fill={1} />
          Start Drive
        </button>
      </div>
    </div>
  )
}
