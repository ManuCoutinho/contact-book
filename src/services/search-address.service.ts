'use server'
import type { Address } from '@/types'
import { ApiException } from '@/utils'

/**
 * @description searching service in viacep API
 * @param arg: string
 * @returns Cep interface
 * @see https://viacep.com.br/
 */
export default async function searchAddress(arg: string) {
  const cepUrl = process.env.CEP_API_URL
  if (arg) {
    const res = await fetch(`${cepUrl}/${encodeURIComponent(arg)}/json/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    if (res.status === 400)
      throw new ApiException('Error in CEP api search ', res.status)
    const data = await res.json()
    if (data.erro) {
      throw new ApiException('Error in CEP api search ', res.status)
    }
    return data as Address
  }
}
