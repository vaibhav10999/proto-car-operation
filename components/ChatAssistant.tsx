'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { nanoid } from '@/lib/nanoid'
import MaterialIcon from '@/components/icons/MaterialIcon'
import ModeSwitcher, { type AppMode } from '@/components/ModeSwitcher'
import HubPill from '@/components/HubPill'
import WelcomeState from '@/components/chat/WelcomeState'
import UserBubble from '@/components/chat/UserBubble'
import BotMessage from '@/components/chat/BotMessage'
import ThinkingPill from '@/components/chat/ThinkingPill'
import InspectionScanPill from '@/components/chat/InspectionScanPill'
import InputBar from '@/components/chat/InputBar'
import { parseResponse } from '@/lib/parseResponse'
import { C24 } from '@/components/tokens'
import { useHub } from '@/components/HubContext'
import type { Message } from '@/lib/types'

const INSPECTION_KEYWORDS = [
  'km', 'kilometre', 'kilometer', 'driven', 'mileage',
  'inspection', 'condition', 'report', 'check', 'issue', 'problem',
  'work', 'repair', 'service', 'history', 'damage', 'scratch',
  'dent', 'engine', 'tyre', 'tire', 'brake', 'oil', 'accident',
  'interior', 'exterior', 'worth', 'good', 'bad', 'rating',
]

function isInspectionQuery(text: string): boolean {
  const lower = text.toLowerCase()
  return INSPECTION_KEYWORDS.some(kw => lower.includes(kw))
}

interface ChatAssistantProps {
  mode: AppMode
  onModeChange: (m: AppMode) => void
}

export default function ChatAssistant({ mode, onModeChange }: ChatAssistantProps) {
  const { hub, openPicker } = useHub()
  const [messages, setMessages] = useState<Message[]>([])
  const [thinking, setThinking] = useState(false)
  const [thinkingMode, setThinkingMode] = useState<'default' | 'inspection'>('default')
  const [inspectionStage, setInspectionStage] = useState(0)
  const [carScanned, setCarScanned] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const stageTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  // Gate: ensures the scan callback fires exactly once even under React Strict Mode
  const scanFiredRef = useRef(false)

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, thinking, scrollToBottom])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || thinking) return

    const userMsg: Message = { id: nanoid(), role: 'user', text: content }
    setMessages(prev => [...prev, userMsg])

    // Decide thinking mode — use inspection shimmer if car was scanned AND question is inspection-related
    const useInspection = carScanned && isInspectionQuery(content)
    setThinkingMode(useInspection ? 'inspection' : 'default')
    setInspectionStage(0)

    // Cycle through inspection stages every 1.8s while thinking
    if (useInspection) {
      let stage = 0
      stageTimerRef.current = setInterval(() => {
        stage += 1
        setInspectionStage(stage)
      }, 1800)
    }

    setThinking(true)

    const assistantId = nanoid()
    let fullText = ''

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, text: m.text })),
          hubId: hub?.id ?? null,       // null = no hub selected (discovery mode)
          remoteMode: hub?.remote ?? false,
        }),
      })

      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`)

      setThinking(false)
      if (stageTimerRef.current) { clearInterval(stageTimerRef.current); stageTimerRef.current = null }
      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', text: '', streaming: true }])

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullText += decoder.decode(value, { stream: true })
        const { text } = parseResponse(fullText)
        setMessages(prev => prev.map(m => (m.id === assistantId ? { ...m, text } : m)))
        scrollToBottom()
      }

      const { text, structured } = parseResponse(fullText)
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, text, cards: structured?.cards, suggestions: structured?.suggestions, streaming: false }
            : m
        )
      )
    } catch {
      setThinking(false)
      if (stageTimerRef.current) { clearInterval(stageTimerRef.current); stageTimerRef.current = null }
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, text: 'Connection issue. Please try again.', streaming: false }
            : m
        )
      )
    }
  }, [messages, thinking, scrollToBottom, hub, carScanned])

  // Called by ScanCard when OCR completes.
  // Payload format: "PLATE::CAR_ID" — both parts needed so Claude can look up the exact car.
  const handleScanComplete = useCallback((payload: string) => {
    if (scanFiredRef.current) return
    scanFiredRef.current = true
    setCarScanned(true)
    // Pull scan cards out immediately so ScanCard unmounts (prevents re-firing)
    setMessages(prev =>
      prev.map(m => ({
        ...m,
        cards: m.cards ? m.cards.filter(c => c.type !== 'scan') : m.cards,
      }))
    )
    const [plate, carId] = payload.includes('::') ? payload.split('::') : [payload, '']
    const carMsg = carId
      ? `I scanned number plate ${plate}. The OCR matched it to car id "${carId}" in your inventory. Show me the full details, inspection score, and a summary of this car's condition. Also offer to locate it and book a test drive.`
      : `I scanned the number plate: ${plate}. Please find this car in the inventory and show me its details.`
    sendMessage(carMsg)
  }, [sendMessage])

  const resetChat = () => {
    setMessages([])
    setCarScanned(false)
    scanFiredRef.current = false
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#fff',
      // Push content below the iPhone status bar (handled by PhoneFrame at top:0,h:50)
      paddingTop: 50,
    }}>

      {/* ── HEADER (in flow, not absolute) ── */}
      <div style={{
        flexShrink: 0,
        height: 52,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `0.5px solid ${C24.border}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 8,
        zIndex: 40,
      }}>
        {/* Browse/Chat mode toggle */}
        <ModeSwitcher mode={mode} onChange={onModeChange} compact />

        <div style={{ flex: 1 }} />

        {/* Hub pill */}
        {hub && <HubPill hub={hub} onClick={openPicker} />}

        {/* Clear chat */}
        {messages.length > 0 && (
          <button
            onClick={resetChat}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}
            aria-label="Clear chat"
          >
            <MaterialIcon name="refresh" size={19} color={C24.textSecondary} />
          </button>
        )}
      </div>

      {/* ── SCROLLABLE CONTENT (fills remaining space) ── */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          // No paddingTop needed — header is in flow above
        }}
      >
        {messages.length === 0 ? (
          <WelcomeState onSend={sendMessage} hub={hub} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '14px 14px 8px' }}>
            {messages.map(msg =>
              msg.role === 'user' ? (
                <UserBubble key={msg.id} text={msg.text} />
              ) : (
                <BotMessage
                  key={msg.id}
                  text={msg.text}
                  cards={msg.cards}
                  suggestions={msg.suggestions}
                  streaming={msg.streaming}
                  onSend={sendMessage}
                  onScanComplete={handleScanComplete}
                />
              )
            )}
            {thinking && (
              thinkingMode === 'inspection'
                ? <InspectionScanPill stage={inspectionStage} />
                : <ThinkingPill />
            )}
            {/* Bottom breathing room */}
            <div style={{ height: 8 }} />
          </div>
        )}
      </div>

      {/* ── INPUT + BOTTOM NAV (in flow at bottom) ── */}
      <div style={{
        flexShrink: 0,
        borderTop: `0.5px solid ${C24.border}`,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}>
        <InputBar onSend={sendMessage} disabled={thinking} />
        {/* Bottom nav — padding-bottom uses safe-area-inset on real phones */}
        <div style={{
          display: 'flex',
          paddingTop: 6,
          paddingBottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
        }}>
          {[
            { id: 'Home', icon: 'home' },
            { id: 'Activity', icon: 'description' },
            { id: 'Garage', icon: 'directions_car' },
            { id: 'Showrooms', icon: 'storefront' },
            { id: 'Explore', icon: 'explore' },
          ].map(item => {
            const isActive = item.id === 'Home'
            return (
              <div key={item.id} style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 2, paddingTop: 4,
              }}>
                <MaterialIcon
                  name={item.icon} size={21}
                  color={isActive ? C24.blue : C24.textSecondary}
                  fill={isActive ? 1 : 0}
                  weight={isActive ? 600 : 400}
                />
                <span style={{
                  fontSize: 10, fontWeight: isActive ? 700 : 500,
                  color: isActive ? C24.blue : C24.textSecondary,
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                }}>
                  {item.id}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
