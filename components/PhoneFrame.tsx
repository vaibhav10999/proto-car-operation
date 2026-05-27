'use client'

import { C24 } from '@/components/tokens'

interface PhoneFrameProps {
  children: React.ReactNode
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <>
      {/* Desktop: centered iPhone bezel */}
      <div className="hidden md:flex min-h-screen items-center justify-center" style={{ background: C24.appBg }}>
        <div
          style={{
            width: 393,
            height: 852,
            borderRadius: 48,
            overflow: 'hidden',
            position: 'relative',
            background: '#fff',
            boxShadow: '0 30px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.10)',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          {/* Dynamic Island */}
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 122,
              height: 36,
              borderRadius: 24,
              background: '#000',
              zIndex: 100,
            }}
          />
          {/* Status Bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 50,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              padding: '0 28px 6px',
              zIndex: 95,
              pointerEvents: 'none',
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 600, color: C24.text, letterSpacing: -0.2 }}>9:41</span>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <svg width="17" height="11" viewBox="0 0 17 11">
                <rect x="0" y="7" width="3" height="4" rx="0.6" fill={C24.text} />
                <rect x="4.5" y="5" width="3" height="6" rx="0.6" fill={C24.text} />
                <rect x="9" y="2.5" width="3" height="8.5" rx="0.6" fill={C24.text} />
                <rect x="13.5" y="0" width="3" height="11" rx="0.6" fill={C24.text} />
              </svg>
              <span style={{ fontSize: 11, fontWeight: 700, color: C24.text }}>4G</span>
              <svg width="25" height="12" viewBox="0 0 25 12">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={C24.text} strokeOpacity="0.5" fill="none" />
                <rect x="2" y="2" width="17" height="8" rx="1.5" fill={C24.text} />
                <path d="M23 4v4c.6-.2 1-0.8 1-2s-.4-1.8-1-2z" fill={C24.text} fillOpacity="0.5" />
              </svg>
            </div>
          </div>
          {/* Home Indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 134,
              height: 5,
              borderRadius: 100,
              background: 'rgba(0,0,0,0.18)',
              zIndex: 60,
              pointerEvents: 'none',
            }}
          />
          {/* Content */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {children}
          </div>
        </div>
      </div>

      {/* Mobile: full screen — use dvh so Safari's URL bar doesn't cause overflow */}
      <div
        className="md:hidden w-full overflow-hidden"
        style={{
          background: '#fff',
          height: '100dvh',       // dynamic viewport: shrinks when keyboard/browser chrome appears
        }}
      >
        {children}
      </div>
    </>
  )
}
