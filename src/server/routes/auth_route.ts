/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwt as jwtPlugin, type JWTPayloadSpec } from '@elysiajs/jwt'
import Elysia, { t, type Cookie, type HTTPHeaders, type StatusMap } from 'elysia'
import { type ElysiaCookie } from 'elysia/cookies'

import { prisma } from '@/server/lib/prisma'
import type { User } from 'generated/prisma'

const secret = process.env.JWT_SECRET
if (!secret) {
  throw new Error('Missing JWT_SECRET in environment variables')
}

const isProd = process.env.NODE_ENV === 'production'
const NINETY_YEARS = 60 * 60 * 24 * 365 * 90

type JWT = {
  sign(data: Record<string, string | number> & JWTPayloadSpec): Promise<string>
  verify(
    jwt?: string
  ): Promise<false | (Record<string, string | number> & JWTPayloadSpec)>
}

type COOKIE = Record<string, Cookie<string | undefined>>

type SET = {
  headers: HTTPHeaders
  status?: number | keyof StatusMap
  redirect?: string
  cookie?: Record<string, ElysiaCookie>
}

async function issueToken({
  jwt,
  cookie,
  userId,
  role,
  expiresAt,
}: {
  jwt: JWT
  cookie: COOKIE
  userId: string
  role: 'host' | 'user'
  expiresAt: number
}) {
  const token = await jwt.sign({
    sub: userId,
    aud: role,
    exp: expiresAt,
  })

  cookie.token?.set({
    value: token,
    httpOnly: true,
    secure: isProd, // aktifkan hanya di production (HTTPS)
    sameSite: 'strict',
    maxAge: NINETY_YEARS,
    path: '/',
  })

  return token
}

async function login({
  body,
  cookie,
  set,
  jwt,
}: {
  body: { email: string; password: string }
  cookie: COOKIE
  set: SET
  jwt: JWT
}) {
  try {
    const { email, password } = body

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      set.status = 401
      return { message: 'User not found' }
    }

    if (user.password !== password) {
      set.status = 401
      return { message: 'Invalid password' }
    }

    const token = await issueToken({
      jwt,
      cookie,
      userId: user.id,
      role: 'user',
      expiresAt: Math.floor(Date.now() / 1000) + NINETY_YEARS,
    })
    return { token }
  } catch (error) {
    console.error('Error logging in:', error)
    return {
      message: 'Login failed',
      error:
        error instanceof Error ? error.message : JSON.stringify(error ?? null),
    }
  }
}

const Auth = new Elysia({
  prefix: '/auth',
  detail: { description: 'Auth API', summary: 'Auth API', tags: ['auth'] },
})
  .use(
    jwtPlugin({
      name: 'jwt',
      secret,
    })
  )
  .post(
    '/login',
    async ({ jwt, body, cookie, set }) => {
      return await login({
        jwt: jwt as JWT,
        body,
        cookie: cookie as any,
        set: set as any,
      })
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
      detail: {
        description: 'Login with phone; auto-register if not found',
        summary: 'login',
      },
    }
  )
  .delete(
    '/logout',
    ({ cookie }) => {
      cookie.token?.remove()
      return { message: 'Logout successful' }
    },
    {
      detail: {
        description: 'Logout (clear token cookie)',
        summary: 'logout',
      },
    }
  )

export default Auth