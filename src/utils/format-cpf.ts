export default function formatCPF(cpf: string | undefined | null) {
  if (cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  return ' - '
}