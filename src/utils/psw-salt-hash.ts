import bcrypt from 'bcrypt'

export default async function generateSaltHash(pswd: string) {
  const SALT_ROUNDS = 10
  return await bcrypt.hash(pswd, SALT_ROUNDS)
}
