import { useContext } from "react"
import { GeoLocationContext } from "@/contexts/geolocation.context"

export function useGeolocation() {
  const context = useContext(GeoLocationContext)

  if (!context) throw new Error('Geolocation context needs a provider')
  return context
}