/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { type JWTPayloadSpec } from '@elysiajs/jwt'
import Elysia from 'elysia'
import { prisma } from '../lib/prisma'

const secret = process.env.JWT_SECRET

export default function apiAuth(app: Elysia) {
  if (!secret) {
    throw new Error('JWT_SECRET is not defined')
  }
  return app
    .use(
      jwt({
        name: 'jwt',
        secret,
      })
    )
    .derive(async ({ cookie, headers, jwt }) => {
      let token: string | undefined

      if (cookie?.token?.value) {
        token = cookie.token.value as any
      }
      if (headers['x-token']?.startsWith('Bearer ')) {
        token = (headers['x-token'] as string).slice(7)
      }
      if (headers['authorization']?.startsWith('Bearer ')) {
        token = (headers['authorization'] as string).slice(7)
      }

      let user: null | Awaited<ReturnType<typeof prisma.user.findUnique>> = null
      if (token) {
        try {
          const decoded = (await jwt.verify(token)) as JWTPayloadSpec
          if (decoded.sub) {
            user = await prisma.user.findUnique({
              where: { id: decoded.sub as string },
            })
          }
        } catch (err) {
          console.warn('[SERVER][apiAuth] Invalid token', err)
        }
      }

      return { user }
    })
    .onBeforeHandle(({ user, set }) => {
      if (!user) {
        set.status = 401
        return { error: 'Unauthorized' }
      }
    })
}
