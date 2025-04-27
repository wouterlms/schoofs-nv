import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const indicentReportRoutes = [
  {
    path: '/indicent-reports',
    children: [
      {
        name: 'indicent-report-overview',
        path: '',
        component: (): Component => import('@/modules/incident-report/features/overview/IncidentReportOverviewView.vue'),
      },
    ],
  },
] as const satisfies RouteRecordRaw[]
