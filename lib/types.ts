export interface CarLocation {
  lat: number
  lng: number
  bay: string
  lastSeenMin: number
}

export interface Car {
  id: string
  make: string
  model: string
  variant: string
  year: number
  price: number
  emi: number
  km: number
  owner: number
  fuel: 'Petrol' | 'Diesel' | 'CNG' | 'Electric'
  transmission: 'Manual' | 'Automatic'
  bodyType: 'Hatchback' | 'Sedan' | 'SUV' | 'Sports' | 'MUV'
  inspectionScore: number
  condition: string
  popularity: { testDrives14d: number; shortlists14d: number }
  availability: 'available' | 'on_test_drive' | 'sold'
  testDriveReady: boolean
  location: CarLocation
  tags: string[]
  imageColor: string
  hubId: string
}

export interface HubMetrics {
  [key: string]: string
}

export interface Booking {
  bookingId: string
  carId: string
  userId: string
  status: 'Booked' | 'Key handed over' | 'Test drive started' | 'Completed' | 'Cancelled'
  startPIN: string
  endPIN?: string
  bookedAt: string
  slotTime?: string
  hubId?: string
  notes?: string
}

export type CardType = 'car' | 'metric' | 'locate' | 'scan' | 'pin' | 'booking'

export interface CarCard {
  type: 'car'
  carId: string
}

export interface MetricCard {
  type: 'metric'
  title: string
  body: string
}

export interface LocateCard {
  type: 'locate'
  carId: string
  bay: string
  lat: number
  lng: number
  etaMin: number
}

export interface ScanCard {
  type: 'scan'
}

export interface PINCard {
  type: 'pin'
  pin: string
  label: string
}

export interface BookingCard {
  type: 'booking'
  booking: Booking
}

export interface CompareCard {
  type: 'compare'
  carIds: [string, string]
}

export type Card = CarCard | MetricCard | LocateCard | ScanCard | PINCard | BookingCard | CompareCard

export interface StructuredPayload {
  cards: Card[]
  suggestions: string[]
}

export interface Hub {
  id: string
  name: string
  shortName: string
  distance: string
  availableCars: number
  isNearest?: boolean
  remote?: boolean
  lat?: number
  lng?: number
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  text: string
  cards?: Card[]
  suggestions?: string[]
  streaming?: boolean
}
