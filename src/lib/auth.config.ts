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
        let user = null
        user = await signIn(
          credentials.email as string,
          credentials.password as string
        )

        if (!user) throw new Error('Invalid credentials.')

        return user
      }
    })
  ],
  // this is required
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/'  
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id
        token.email = user.email
        token.accessToken = user.token
      }

      if (token.error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { refreshToken, ...rest } = token
        return rest
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
