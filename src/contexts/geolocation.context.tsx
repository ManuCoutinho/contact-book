'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import setUrlParams from '@/utils/set-url-params'
import { useSearchParams } from 'next/navigation'

type Location = { lat: number; lng: number }
type GeolocationContextType = {
  location: Location
  setGeolocation: (loc: string) => void
}
export const GeoLocationContext = createContext<GeolocationContextType>(
  {} as GeolocationContextType
)

export function GeoLocationProvider({
  children
}: {
  children: React.ReactNode
}) {
  const searchParams = useSearchParams()
  const [location, setLocation] = useState<Location>({
    lat: -22.97241,
    lng: -43.186913
  })
  const locQuery = searchParams.get('location')
  const setGeolocation = useCallback((loc: string) => {
    if (loc) {
      const lat = Number(loc.split(',')[0])
      const lng = Number(loc.split(',')[1])
      setLocation({ lat, lng })
      setUrlParams([{ key: 'location', value: loc }])
    }
  }, [])

  useEffect(() => {
    if (locQuery) {
      setGeolocation(locQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <GeoLocationContext.Provider value={{ location, setGeolocation }}>
      {children}
    </GeoLocationContext.Provider>
  )
}
