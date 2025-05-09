import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signIn } from '@/services'

export const config = {
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email'
        },
        password: {
          label: 'password',
          type: 'password'
        }
      },
      async authorize(credentials) {
        const user = await signIn(credentials.email as string, credentials.password as string)

        if (!user) throw new Error("Invalid credentials.")

        return user ?? null
      }
    })
  ],
  // this is required
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/logout'
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        token.userId = user.id
        token.email = user.email
        token.accessToken = user.token
      }

      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          accessToken: token.accessToken as string
        },
        error: token.error
      }
    }
  },
  debug: process.env.NODE_ENV === 'development'
} satisfies NextAuthConfig
export const { auth, handlers } = NextAuth(config)