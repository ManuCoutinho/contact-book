import { hash } from 'bcrypt'

export default async function generateSaltHash(pswd: string) {
  const SALT_ROUNDS = 10;
  return await hash(pswd, SALT_ROUNDS)
}