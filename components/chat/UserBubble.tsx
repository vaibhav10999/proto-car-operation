import { C24 } from '@/components/tokens'

interface UserBubbleProps {
  text: string
}

export default function UserBubble({ text }: UserBubbleProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '2px 0' }}>
      <div
        style={{
          background: '#F1F3F7',
          color: C24.text,
          borderRadius: '18px 18px 4px 18px',
          padding: '10px 14px',
          maxWidth: '80%',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: 14,
          lineHeight: 1.5,
          letterSpacing: -0.1,
          animation: 'orbitFadeUp 200ms ease',
        }}
      >
        {text}
      </div>
    </div>
  )
}
