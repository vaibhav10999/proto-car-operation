'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { nanoid } from '@/lib/nanoid'
import MaterialIcon from '@/components/icons/MaterialIcon'
import OrbitMark from '@/components/icons/OrbitMark'
import WelcomeState from '@/components/chat/WelcomeState'
import UserBubble from '@/components/chat/UserBubble'
import BotMessage from '@/components/chat/BotMessage'
import ThinkingPill from '@/components/chat/ThinkingPill'
import InputBar from '@/components/chat/InputBar'
import { parseResponse } from '@/lib/parseResponse'
import { C24 } from '@/components/tokens'
import type { Message } from '@/lib/types'

export default function OnsiteAssistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

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
    setThinking(true)

    const assistantId = nanoid()
    let fullText = ''

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, text: m.text })),
        }),
      })

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`)
      }

      setThinking(false)
      setMessages(prev => [
        ...prev,
        { id: assistantId, role: 'assistant', text: '', streaming: true },
      ])

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullText += decoder.decode(value, { stream: true })
        const { text } = parseResponse(fullText)
        setMessages(prev =>
          prev.map(m => (m.id === assistantId ? { ...m, text } : m))
        )
        scrollToBottom()
      }

      // Final parse to extract structured data
      const { text, structured } = parseResponse(fullText)
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? {
                ...m,
                text,
                cards: structured?.cards,
                suggestions: structured?.suggestions,
                streaming: false,
              }
            : m
        )
      )
    } catch (err) {
      console.error('sendMessage error:', err)
      setThinking(false)
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? {
                ...m,
                text: 'Connection issue. Please try again.',
                streaming: false,
              }
            : m
        )
      )
    }
  }, [messages, thinking, scrollToBottom])

  const resetChat = () => setMessages([])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#fff',
        paddingTop: 50, // clear status bar
      }}
    >
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          height: 52,
          background: 'rgba(255,255,255,0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: `0.5px solid ${C24.border}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          zIndex: 40,
          gap: 8,
        }}
      >
        {messages.length > 0 ? (
          <button
            onClick={resetChat}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}
            aria-label="Back"
          >
            <MaterialIcon name="arrow_back_ios" size={18} color={C24.text} />
          </button>
        ) : (
          <MaterialIcon name="arrow_back_ios" size={18} color={C24.textMuted} />
        )}

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
          <OrbitMark size={16} />
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: C24.text,
              letterSpacing: -0.2,
            }}
          >
            Onsite Assistant
          </span>
        </div>

        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} aria-label="Menu">
          <MaterialIcon name="more_vert" size={20} color={C24.textSecondary} />
        </button>
      </div>

      {/* Hub strip (only when chat active) */}
      {messages.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 102,
            left: 0,
            right: 0,
            zIndex: 35,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px 0',
            background: C24.successTint,
            borderBottom: `0.5px solid ${C24.success}30`,
          }}
        >
          <MaterialIcon name="location_on" size={12} color={C24.success} fill={1} />
          <span style={{ fontSize: 11, fontWeight: 600, color: C24.success, marginLeft: 4 }}>
            Sector 18, Noida · GPS verified
          </span>
        </div>
      )}

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingTop: messages.length > 0 ? 112 : 52,
          paddingBottom: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.length === 0 ? (
          <WelcomeState onSend={sendMessage} hub={null} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '12px 16px' }}>
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
                />
              )
            )}
            {thinking && <ThinkingPill />}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div
        style={{
          borderTop: `0.5px solid ${C24.border}`,
          background: 'rgba(255,255,255,0.94)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <InputBar onSend={sendMessage} disabled={thinking} />
        {/* Bottom nav bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '6px 0 20px',
          }}
        >
          {[
            { id: 'Home', icon: 'home' },
            { id: 'Activity', icon: 'description' },
            { id: 'Garage', icon: 'directions_car' },
            { id: 'Showrooms', icon: 'storefront' },
            { id: 'Explore', icon: 'explore' },
          ].map(item => {
            const isActive = item.id === 'Home'
            return (
              <div
                key={item.id}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: 1, padding: '4px 0' }}
              >
                <MaterialIcon
                  name={item.icon}
                  size={22}
                  color={isActive ? C24.blue : C24.textSecondary}
                  fill={isActive ? 1 : 0}
                  weight={isActive ? 500 : 400}
                />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? C24.blue : C24.textSecondary,
                    letterSpacing: -0.1,
                  }}
                >
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
