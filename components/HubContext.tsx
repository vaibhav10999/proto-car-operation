'use client'

import { createContext, useContext } from 'react'
import type { Hub } from '@/lib/types'

interface HubContextValue {
  hub: Hub | null
  remoteMode: boolean
  openPicker: () => void
}

export const HubContext = createContext<HubContextValue>({
  hub: null,
  remoteMode: false,
  openPicker: () => {},
})

export function useHub() {
  return useContext(HubContext)
}
