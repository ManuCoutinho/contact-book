export default function phoneMask(phone: string | undefined | null) {
  if (!phone) return ''
  const cleanPhone = phone.replace(/\D/g, '')
  const phoneCount = cleanPhone.split('').length

  if (phoneCount < 10) {
    return cleanPhone.replace(/(\d{4})(\d)/, '$1-$2')
  }
  if (phoneCount === 10) {
    return cleanPhone
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }

  if (phoneCount > 10) {
    return cleanPhone
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
  }
}
