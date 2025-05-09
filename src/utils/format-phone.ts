export default function formatPhone(phone: string | undefined | null) {
  if (phone) {
    const validPhone = phone.replace(/\D/g, '').split('')
    if (validPhone.length > 11) {
      return phone
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d{2})(\d{5})(\d{4})$/, '+$1 $2 $3-$4')
    }
    if (validPhone.length <= 11) {
      return phone
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d)(\d{4})$/, '$1-$2')
    }
    return phone.trim()
  }
  return ' - '
}