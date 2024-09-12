import { createServerFn } from '@tanstack/start'
import { getSession, SessionConfig } from 'vinxi/http'

export interface SessionData {
  rootKey: string
  userId: string
}

export const sessionConfig = {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, turbo/no-undeclared-env-vars
  password: process.env.COOKIE_SECRET!,
} satisfies SessionConfig

export const getSessionData = async () => {
  const session = await getSession<SessionData>(sessionConfig)
  return session.data
}

export const getCurrentUser = createServerFn('GET', async () => {
  const session = await getSessionData()
  return session.userId
})
