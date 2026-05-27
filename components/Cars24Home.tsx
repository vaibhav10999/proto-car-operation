'use client'

import MaterialIcon from '@/components/icons/MaterialIcon'
import ModeSwitcher, { type AppMode } from '@/components/ModeSwitcher'
import { C24 } from '@/components/tokens'
import carsData from '@/data/cars.json'
import type { Car } from '@/lib/types'

const cars = carsData as Car[]
const featuredCars = cars.filter(c => c.availability === 'available').slice(0, 3)

function formatPrice(p: number) {
  return `₹${(p / 100000).toFixed(2)}L`
}

function CarSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 100" width={120} height={60} style={{ display: 'block' }}>
      <ellipse cx="100" cy="92" rx="88" ry="4" fill="rgba(0,0,0,0.06)" />
      <path d="M10,72 L20,50 Q30,32 60,30 L130,30 Q150,32 165,46 L188,60 Q195,62 195,72 L195,80 L10,80 Z" fill={color} />
      <path d="M40,46 L62,36 L122,36 L150,46 L150,56 L40,56 Z" fill="rgba(255,255,255,0.88)" />
      <line x1="100" y1="32" x2="100" y2="56" stroke={color} strokeWidth="1.5" opacity="0.35" />
      <circle cx="50" cy="80" r="10" fill="#111" /><circle cx="50" cy="80" r="4.5" fill="#555" />
      <circle cx="155" cy="80" r="10" fill="#111" /><circle cx="155" cy="80" r="4.5" fill="#555" />
    </svg>
  )
}

const TABS = [
  { id: 'All', icon: 'apps' },
  { id: 'Buy', icon: 'directions_car' },
  { id: 'Sell', icon: 'sell' },
  { id: 'Loans', icon: 'savings' },
  { id: 'Challan', icon: 'receipt_long' },
]

const NAV_ITEMS = [
  { id: 'Home', icon: 'home' },
  { id: 'Activity', icon: 'description' },
  { id: 'Garage', icon: 'directions_car' },
  { id: 'Showrooms', icon: 'storefront' },
  { id: 'Explore', icon: 'explore' },
]

interface Cars24HomeProps {
  mode: AppMode
  onModeChange: (m: AppMode) => void
}

export default function Cars24Home({ mode, onModeChange }: Cars24HomeProps) {
  return (
    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>

      {/* === STICKY HEADER === */}
      <div style={{ background: C24.blueGradient, flexShrink: 0, paddingTop: 54 }}>

        {/* Row 1: Location + Avatar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 16px 10px',
        }}>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 999,
            padding: '6px 11px 6px 8px', cursor: 'pointer',
          }}>
            <MaterialIcon name="location_on" size={15} color="#fff" fill={1} />
            <span style={{ fontSize: 13.5, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>Noida</span>
            <MaterialIcon name="keyboard_arrow_down" size={16} color="rgba(255,255,255,0.75)" />
          </button>
          <div style={{
            width: 34, height: 34, borderRadius: 17,
            background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: C24.blue, fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>VA</span>
          </div>
        </div>

        {/* Row 2: Search bar */}
        <div style={{
          margin: '0 16px 10px',
          background: 'rgba(255,255,255,0.15)', borderRadius: 12,
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <MaterialIcon name="search" size={18} color="rgba(255,255,255,0.65)" />
          <span style={{
            fontSize: 14, color: 'rgba(255,255,255,0.6)',
            fontFamily: 'var(--font-inter), system-ui, sans-serif', fontWeight: 500,
          }}>Search Alto, i20, Swift…</span>
        </div>

        {/* Row 3: Mode switcher — darkBg because we're on the blue gradient */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0 16px 14px' }}>
          <ModeSwitcher mode={mode} onChange={onModeChange} darkBg />
        </div>

        {/* Row 4: Category tabs */}
        <div style={{ display: 'flex', overflowX: 'auto', padding: '0 12px 14px', gap: 4 }}>
          {TABS.map((tab, i) => {
            const isActive = i === 0
            return (
              <button key={tab.id} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                minWidth: 60, padding: '4px 8px 5px',
                background: 'transparent', border: 'none', cursor: 'pointer',
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 21,
                  background: isActive ? '#fff' : 'rgba(255,255,255,0.16)',
                  border: isActive ? 'none' : '1px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <MaterialIcon name={tab.icon} size={20} color={isActive ? C24.blue : '#fff'} fill={isActive ? 1 : 0} />
                </div>
                <span style={{
                  fontSize: 10.5, fontWeight: isActive ? 700 : 500, color: '#fff',
                  letterSpacing: -0.1, whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                }}>{tab.id}</span>
                {isActive && <div style={{ width: 12, height: 2, background: '#fff', borderRadius: 1, marginTop: -2 }} />}
              </button>
            )
          })}
        </div>
      </div>

      {/* === SCROLLABLE BODY === */}
      <div style={{ flex: 1, overflowY: 'auto', background: '#fff', paddingBottom: 90 }}>

        {/* Recommended for you */}
        <div style={{ padding: '16px 16px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontSize: 17, fontWeight: 800, color: C24.text, letterSpacing: -0.4,
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
          }}>Recommended for you</span>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: C24.blue, fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>See all</span>
        </div>

        <div style={{ display: 'flex', gap: 12, padding: '6px 16px 18px', overflowX: 'auto' }}>
          {featuredCars.map(car => (
            <div key={car.id} style={{
              flexShrink: 0, width: 172,
              background: '#fff', border: `1px solid ${C24.border}`,
              borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                height: 88, background: `${car.imageColor}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CarSVG color={car.imageColor || '#3a4350'} />
              </div>
              <div style={{ padding: '10px 12px 12px' }}>
                <div style={{
                  fontSize: 13.5, fontWeight: 700, color: C24.text, letterSpacing: -0.2, marginBottom: 3,
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                }}>
                  {car.make} {car.model}
                </div>
                <div style={{
                  fontSize: 11.5, color: C24.textSecondary, marginBottom: 6,
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                }}>
                  {car.year} · {car.fuel} · {car.transmission}
                </div>
                <div style={{
                  fontSize: 16, fontWeight: 800, color: C24.text, letterSpacing: -0.3,
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                }}>
                  {formatPrice(car.price)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{ padding: '4px 16px 10px' }}>
          <span style={{
            fontSize: 17, fontWeight: 800, color: C24.text, letterSpacing: -0.4,
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
          }}>Quick actions</span>
        </div>
        <div style={{ display: 'flex', gap: 10, padding: '2px 16px 20px' }}>
          {[
            { label: 'Sell your car', sub: 'Best price guaranteed', bg: '#1F5B3A', textColor: '#fff', icon: 'sell' },
            { label: 'Car loan', sub: 'Zero down payment', bg: '#EDF1FF', textColor: C24.blueDeep, icon: 'savings' },
            { label: 'Pay challan', sub: 'Check & clear fines', bg: C24.cardTintBeige, textColor: C24.text, icon: 'receipt_long' },
          ].map(tile => (
            <div key={tile.label} style={{
              flex: 1, minHeight: 110, borderRadius: 14,
              background: tile.bg, padding: '13px 12px',
              position: 'relative', overflow: 'hidden', cursor: 'pointer',
            }}>
              <div style={{
                fontSize: 13, fontWeight: 700, color: tile.textColor,
                lineHeight: 1.3, marginBottom: 4,
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
              }}>{tile.label}</div>
              <div style={{
                fontSize: 10.5, color: tile.textColor, opacity: 0.75,
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
              }}>{tile.sub}</div>
              <div style={{ position: 'absolute', bottom: -10, right: -8, opacity: 0.15 }}>
                <MaterialIcon name={tile.icon} size={64} color={tile.textColor} fill={1} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === FIXED BOTTOM NAV === */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: `0.5px solid ${C24.border}`,
      }}>
        <div style={{
          display: 'flex',
          paddingTop: 8,
          paddingBottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
        }}>
          {NAV_ITEMS.map(item => {
            const isActive = item.id === 'Home'
            return (
              <div key={item.id} style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 2, paddingTop: 4,
              }}>
                <MaterialIcon
                  name={item.icon} size={22}
                  color={isActive ? C24.blue : C24.textSecondary}
                  fill={isActive ? 1 : 0}
                  weight={isActive ? 600 : 400}
                />
                <span style={{
                  fontSize: 10, fontWeight: isActive ? 700 : 500,
                  color: isActive ? C24.blue : C24.textSecondary,
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                }}>{item.id}</span>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
