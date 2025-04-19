import type { RouteRecordRaw } from 'vue-router'

import type { RoutesProccessed } from '@/types/global/vueRouter'

export const routes = [
  /**
   * Unauthenticated routes
   */
  {
    name: '404',
    path: '/:catchAll(.*)',
    redirect: { name: 'index' },
  },
] as const satisfies RouteRecordRaw[]

declare module '@wisemen/vue-core-components' {
  interface Routes extends RoutesProccessed {}
}
