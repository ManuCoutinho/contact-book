import { compare } from 'bcrypt'

export default async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await compare(password, hash)
}