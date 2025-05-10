export default function jwtDecoder<T>(token: string): T | null {
  if (token) {
    const decoder = Buffer.from(token.split('.')[1], 'base64').toString()
    return JSON.parse(decoder) as T
  }
  return null
}
