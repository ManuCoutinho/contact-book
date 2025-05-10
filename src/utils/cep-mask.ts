export default function cepMask(cep: string | null | undefined) {
  if (!cep) return ''

  return cep.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2')
}
