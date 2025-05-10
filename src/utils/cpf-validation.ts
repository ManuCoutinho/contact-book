function validateDV(digits: string[], dv: string): boolean {
  const factors = [10, 9, 8, 7, 6, 5, 4, 3, 2]
  const total = digits.reduce((total, digit, i) => {
    return total + +digit * factors[i]
  }, 0)

  const rest = total % 11
  const dvCalculated = rest < 2 ? 0 : 11 - rest
  return dvCalculated === +dv
}
export default function cpfValidation(doc: string | undefined | null): boolean {
  if (!doc) return false

  const nums = doc.replace(/\D/g, '').split('')
  if (nums.length !== 11) return false

  const dv1 = validateDV(nums.slice(0, 9), nums[9])
  const dv2 = validateDV(nums.slice(1, 10), nums[10])
  return dv1 && dv2
}
