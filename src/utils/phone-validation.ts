export default function phoneIsValid(
  phone: string | null | undefined
): boolean {
  if (!phone) return false

  const onlyDigits = phone.replace(/\D/g, '').split('')
  if (onlyDigits.length >= 10) return true
  return false
}
