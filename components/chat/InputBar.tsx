'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import MaterialIcon from '@/components/icons/MaterialIcon'
import { C24, ORBIT_GRADIENT } from '@/components/tokens'

interface InputBarProps {
  onSend: (text: string) => void
  disabled?: boolean
}

export default function InputBar({ onSend, disabled = false }: InputBarProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const send = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const onInput = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 100) + 'px'
  }

  const active = value.trim().length > 0

  return (
    <div
      style={{
        padding: '8px 12px 12px',
        background: '#fff',
        borderTop: `0.5px solid ${C24.border}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 8,
          background: C24.appBg,
          borderRadius: 24,
          border: `1.5px solid ${active ? C24.blue : C24.border}`,
          padding: '8px 8px 8px 16px',
          transition: 'border-color 150ms ease, box-shadow 150ms ease',
          boxShadow: active ? `0 0 0 3px ${C24.blueTint}` : 'none',
        }}
      >
        {/* Attach */}
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            color: C24.textSecondary,
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
          onClick={() => {}}
          aria-label="Attach"
        >
          <MaterialIcon name="attach_file" size={20} color={C24.textSecondary} />
        </button>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          onInput={onInput}
          placeholder="Ask me anything about cars here…"
          rows={1}
          disabled={disabled}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: 14.5,
            color: C24.text,
            lineHeight: 1.5,
            padding: 0,
            maxHeight: 100,
            overflowY: 'auto',
          }}
        />

        {/* Voice */}
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            color: C24.textSecondary,
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
          aria-label="Voice"
        >
          <MaterialIcon name="mic" size={20} color={active ? C24.textMuted : C24.textSecondary} />
        </button>

        {/* Send */}
        <button
          onClick={send}
          disabled={!active || disabled}
          aria-label="Send"
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: 'none',
            cursor: active && !disabled ? 'pointer' : 'default',
            background: active && !disabled ? ORBIT_GRADIENT : C24.borderLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 200ms ease, box-shadow 150ms ease',
            boxShadow: active && !disabled ? '0 2px 8px rgba(0,113,188,0.35)' : 'none',
          }}
        >
          <MaterialIcon name="arrow_upward" size={18} color={active && !disabled ? '#fff' : C24.textMuted} weight={600} />
        </button>
      </div>
      <p
        style={{
          textAlign: 'center',
          fontSize: 10.5,
          color: C24.textMuted,
          margin: '6px 0 0',
          letterSpacing: -0.05,
        }}
      >
        Orbit can make mistakes · always verify before booking
      </p>
    </div>
  )
}
