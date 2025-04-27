import type { RouteRecordRaw } from 'vue-router'

import { indicentReportRoutes } from '@/modules/incident-report/routes/indicentReport.routes'
import type { RoutesProccessed } from '@/types/global/vueRouter'

export const routes = [
  /**
   * Unauthenticated routes
   */
  ...indicentReportRoutes,
  {
    name: '404',
    path: '/:catchAll(.*)',
    redirect: { name: 'indicent-report-overview' },
  },
] as const satisfies RouteRecordRaw[]

declare module '@wisemen/vue-core-components' {
  interface Routes extends RoutesProccessed {}
}
