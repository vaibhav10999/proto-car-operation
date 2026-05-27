'use client'

import type { Card, Car } from '@/lib/types'
import CarCard from './CarCard'
import MetricCard from './MetricCard'
import LocateCard from './LocateCard'
import ScanCard from './ScanCard'
import PINCard from './PINCard'
import BookingCard from './BookingCard'
import CompareCard from './CompareCard'
import { useHub } from '@/components/HubContext'
import carsData from '@/data/cars.json'

const carsMap: Record<string, Car> = {}
;(carsData as Car[]).forEach(c => { carsMap[c.id] = c })

interface CardRendererProps {
  card: Card
  onSend: (text: string) => void
  onScanComplete?: (plate: string) => void
}

export default function CardRenderer({ card, onSend, onScanComplete }: CardRendererProps) {
  const { hub, remoteMode, openPicker } = useHub()
  const noHub = !hub  // no hub selected at all (neither at hub nor remote)

  switch (card.type) {
    case 'car': {
      const car = carsMap[card.carId]
      if (!car) return null
      return <CarCard car={car} onSend={onSend} remoteMode={remoteMode || noHub} />
    }
    case 'metric':
      return <MetricCard title={card.title} body={card.body} />
    case 'locate': {
      if (noHub) return <SelectHubBlock label="Locate car" onSelectHub={openPicker} />
      if (remoteMode) return <RemoteFeatureBlock label="Locate car" onSend={onSend} />
      const car = carsMap[card.carId]
      return (
        <LocateCard
          carId={card.carId}
          bay={card.bay}
          lat={card.lat}
          lng={card.lng}
          etaMin={card.etaMin}
          carName={car ? `${car.make} ${car.model} ${car.variant}` : undefined}
        />
      )
    }
    case 'scan':
      if (noHub) return <SelectHubBlock label="Scan number plate" onSelectHub={openPicker} />
      if (remoteMode) return <RemoteFeatureBlock label="Scan number plate" onSend={onSend} />
      return (
        <ScanCard
          onScanComplete={payload => {
            if (onScanComplete) {
              // Forward full "PLATE::CAR_ID" payload to parent for precise lookup
              onScanComplete(payload)
            } else {
              const [plate, carId] = payload.includes('::') ? payload.split('::') : [payload, '']
              onSend(carId
                ? `I scanned plate ${plate}. Car id is "${carId}". Show me full details and inspection summary.`
                : `I scanned plate ${plate}. Find this car and show me details.`)
            }
          }}
        />
      )
    case 'pin':
      return <PINCard pin={card.pin} label={card.label} />
    case 'booking':
      return <BookingCard booking={card.booking} onSend={onSend} />
    case 'compare': {
      const [idA, idB] = card.carIds
      const carA = carsMap[idA]
      const carB = carsMap[idB]
      if (!carA || !carB) return null
      return <CompareCard carA={carA} carB={carB} onSend={onSend} />
    }
    default:
      return null
  }
}

function RemoteFeatureBlock({ label, onSend }: { label: string; onSend: (t: string) => void }) {
  const { hub } = useHub()
  return (
    <div style={{
      background: '#FFF9F0',
      border: '1px solid #F7931E30',
      borderRadius: 12,
      padding: '12px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    }}>
      <span style={{ fontSize: 20 }}>📍</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0B1F2A', marginBottom: 3 }}>
          {label} needs hub presence
        </div>
        <div style={{ fontSize: 12, color: '#5E6B78' }}>
          You're browsing remotely. Visit a hub to use this feature.
        </div>
      </div>
      <button
        onClick={() => onSend(`How do I get to ${hub?.name ?? 'the nearest Cars24 hub'}?`)}
        style={{
          background: '#0071BC',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '7px 12px',
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
          flexShrink: 0,
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        Directions
      </button>
    </div>
  )
}

function SelectHubBlock({ label, onSelectHub }: { label: string; onSelectHub: () => void }) {
  return (
    <div style={{
      background: '#EEF4FF',
      border: '1px solid #0071BC30',
      borderRadius: 12,
      padding: '12px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    }}>
      <span style={{ fontSize: 20 }}>📍</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0B1F2A', marginBottom: 3 }}>
          Select your hub to {label.toLowerCase()}
        </div>
        <div style={{ fontSize: 12, color: '#5E6B78', fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
          Tell us which Cars24 hub you're at and we'll enable this feature.
        </div>
      </div>
      <button
        onClick={onSelectHub}
        style={{
          background: '#0071BC',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '8px 12px',
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
          flexShrink: 0,
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        Select hub
      </button>
    </div>
  )
}
