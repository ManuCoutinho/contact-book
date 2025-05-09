'use server'
import { ApiException } from "@/utils";

export default async function getGeoLocation(address: string) {

  if (!address) throw new ApiException('Missing address', 400)
  const geocodeRes = await fetch(
    `${process.env.MAPBOX_URL}/${encodeURIComponent(
      address
    )}.json?access_token=${process.env.MAPBOX_KEY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'My Contact/0.1(contato@email.com)'
    }
  }
  )

  const geo = await geocodeRes.json()

  if (geo.features.length > 0) {
    const [lng, lat] = geo.features[0].center

    return `${lat},${lng}`
  } else {
    throw new ApiException('Error in return geo location from address', geocodeRes.status)
  }
}