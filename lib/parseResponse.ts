import type { StructuredPayload } from '@/lib/types'

const DELIMITER = '---STRUCTURED---'

export function parseResponse(raw: string): { text: string; structured: StructuredPayload | null } {
  const delimIdx = raw.indexOf(DELIMITER)

  if (delimIdx === -1) {
    return { text: raw.trim(), structured: null }
  }

  const text = raw.slice(0, delimIdx).trim()
  const jsonPart = raw.slice(delimIdx + DELIMITER.length).trim()

  // Extract first JSON object/array block
  const jsonStart = jsonPart.indexOf('{')
  if (jsonStart === -1) {
    return { text, structured: null }
  }

  // Find balanced closing brace
  let depth = 0
  let jsonEnd = -1
  for (let i = jsonStart; i < jsonPart.length; i++) {
    if (jsonPart[i] === '{') depth++
    else if (jsonPart[i] === '}') {
      depth--
      if (depth === 0) { jsonEnd = i; break }
    }
  }

  if (jsonEnd === -1) {
    return { text, structured: null }
  }

  try {
    const structured = JSON.parse(jsonPart.slice(jsonStart, jsonEnd + 1)) as StructuredPayload
    return { text, structured }
  } catch {
    return { text, structured: null }
  }
}
