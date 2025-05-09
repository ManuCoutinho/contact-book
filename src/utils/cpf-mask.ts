

export default function cpfMask(cpf: string | undefined | null) {
  if (!cpf) return

  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}