import { getRouterManifest } from '@tanstack/start/router-manifest'
import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/start/server'
import { eventHandler, updateSession } from 'vinxi/http'

import { createRouter } from './router'
import { sessionConfig } from './utils/auth'

const tsrHandler = createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler)

export default eventHandler(async (event) => {
  /**
   * TODO: This is temporary. I think we decided
   * not to have auth, and let the user protect
   * the dashboard themselves. In that case their
   * proxy should forward the `h3` cookie or
   * `x-h3-session` header when serving the dashboard.
   * For now I'm just setting it here since I don't have a proxy
   */
  await updateSession(event, sessionConfig, {
    userId: 'some-user-set-by-proxy',
    rootKey: process.env.INTERNAL_ENDPOINTS_ROOT_SECRET,
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return tsrHandler(event)
})
