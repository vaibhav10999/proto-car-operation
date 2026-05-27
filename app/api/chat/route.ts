import { NextRequest } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import { getAnthropicClient } from '@/lib/anthropic'
import { buildSystemPrompt } from '@/lib/systemPrompt'
import type { Car, HubMetrics, Booking } from '@/lib/types'

export const runtime = 'nodejs'

const DATA_DIR = join(process.cwd(), 'data')
const cars: Car[] = JSON.parse(readFileSync(join(DATA_DIR, 'cars.json'), 'utf-8'))
const metrics: HubMetrics = JSON.parse(readFileSync(join(DATA_DIR, 'hubMetrics.json'), 'utf-8'))
const booking: Booking = JSON.parse(readFileSync(join(DATA_DIR, 'booking.json'), 'utf-8'))
const hubsRaw: { id: string; name: string }[] = JSON.parse(readFileSync(join(DATA_DIR, 'hubs.json'), 'utf-8'))

const hubNameMap: Record<string, string> = {}
hubsRaw.forEach(h => { hubNameMap[h.id] = h.name })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages, hubId, remoteMode } = body as {
      messages: { role: string; text: string }[]
      hubId?: string
      remoteMode?: boolean
    }

    // 'NONE' signals no hub selected — system prompt handles discovery-only mode
    const resolvedHubName = hubId ? (hubNameMap[hubId] ?? 'Cars24 Hub') : 'NONE'
    const isRemote = remoteMode ?? false

    const systemPrompt = buildSystemPrompt(cars, metrics, booking, resolvedHubName, isRemote)

    const anthropicMessages = messages
      .filter(m => m.text.trim())
      .map(m => ({ role: m.role as 'user' | 'assistant', content: m.text }))

    const client = getAnthropicClient()
    const stream = client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: [{ type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } }],
      messages: anthropicMessages,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }
        } catch (err) {
          console.error('Stream error:', err)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (err) {
    console.error('Chat API error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
