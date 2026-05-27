'use client'

import { useState, useEffect } from 'react'
import Cars24Home from '@/components/Cars24Home'
import ChatAssistant from '@/components/ChatAssistant'
import HubPicker from '@/components/HubPicker'
import ArrivalNotification from '@/components/ArrivalNotification'
import DemoControls from '@/components/DemoControls'
import { HubContext } from '@/components/HubContext'
import type { Hub } from '@/lib/types'
import type { AppMode } from '@/components/ModeSwitcher'

const DEFAULT_HUB_ID = 'noida-sec18'

export default function App() {
  const [mode, setMode] = useState<AppMode>('browse')
  const [hub, setHub] = useState<Hub | null>(null)
  const [showHubPicker, setShowHubPicker] = useState(false)
  const [hubPickerForcePick, setHubPickerForcePick] = useState(false)
  const [showArrival, setShowArrival] = useState(false)
  const [arrivalHub, setArrivalHub] = useState<Hub | null>(null)
  const [showChatOverlay, setShowChatOverlay] = useState(false)

  // Auto-fire arrival notification after 3s
  useEffect(() => {
    const timer = setTimeout(() => {
      import('@/data/hubs.json').then(({ default: hubs }) => {
        const nearest = (hubs as Hub[]).find(h => h.id === DEFAULT_HUB_ID) ?? null
        if (nearest) {
          setArrivalHub(nearest)
          setShowArrival(true)
        }
      })
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  const handleModeChange = (m: AppMode) => {
    if (m === 'browse') {
      setMode('browse')
      return
    }
    // Enter Chat directly — no forced hub picker on entry.
    // Hub-required features (Scan, Locate, Book) prompt for hub selection contextually.
    setShowChatOverlay(true)
    setMode('chat')
    setTimeout(() => setShowChatOverlay(false), 2200)
  }

  const handleArrivalOpenChat = () => {
    setShowArrival(false)
    if (arrivalHub) setHub(arrivalHub)
    setShowChatOverlay(true)
    setMode('chat')
    setTimeout(() => setShowChatOverlay(false), 2200)
  }

  const handleHubSelect = (selected: Hub) => {
    setHub(selected)
    setShowHubPicker(false)
    setHubPickerForcePick(false)
  }

  // Demo controls
  const handleSimulateArrival = (h: Hub) => {
    setArrivalHub(h)
    setShowArrival(true)
  }
  const handleLeaveHub = () => {
    setHub({ id: 'remote', name: 'Browsing remotely', shortName: 'Remote', distance: '—', availableCars: 0, remote: true })
  }
  const handleReset = () => {
    setMode('browse')
    setHub(null)
    setShowHubPicker(false)
    setShowArrival(false)
    setShowChatOverlay(false)
  }

  const remoteMode = hub?.remote ?? false

  return (
    <HubContext.Provider value={{ hub, remoteMode, openPicker: () => { setHubPickerForcePick(false); setShowHubPicker(true) } }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

        {/* Screens */}
        {mode === 'browse' ? (
          <Cars24Home mode={mode} onModeChange={handleModeChange} />
        ) : (
          <ChatAssistant mode={mode} onModeChange={handleModeChange} />
        )}

        {/* Chat welcome overlay */}
        {showChatOverlay && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            zIndex: 150,
            animation: 'orbitFadeUp 300ms ease',
            padding: '0 32px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 64 }}>✨</div>
            <p style={{
              fontFamily: 'var(--font-bricolage), var(--font-inter), system-ui, sans-serif',
              fontSize: 22,
              fontWeight: 800,
              color: '#0B1F2A',
              letterSpacing: -0.5,
              margin: 0,
            }}>
              {hub && !hub.remote ? `I see you're at ${hub.shortName}.` : "Let's find your car."}
            </p>
            <p style={{ fontSize: 14, color: '#5E6B78', margin: 0, lineHeight: 1.5 }}>
              {hub && !hub.remote
                ? "I'll show cars available here. You can locate them, scan, and book test drives."
                : "Tell me what you're looking for and I'll find the best options."}
            </p>
          </div>
        )}

        {/* Hub picker overlay */}
        {showHubPicker && (
          <HubPicker
            currentHubId={hub?.id}
            onSelect={handleHubSelect}
            onDismiss={hubPickerForcePick ? undefined : () => setShowHubPicker(false)}
            forcePick={hubPickerForcePick}
          />
        )}

        {/* Arrival notification */}
        {arrivalHub && (
          <ArrivalNotification
            hub={arrivalHub}
            visible={showArrival}
            onOpenChat={handleArrivalOpenChat}
            onDismiss={() => setShowArrival(false)}
          />
        )}

        {/* Demo controls FAB */}
        <DemoControls
          onSimulateArrival={handleSimulateArrival}
          onLeaveHub={handleLeaveHub}
          onReset={handleReset}
        />
      </div>
    </HubContext.Provider>
  )
}
