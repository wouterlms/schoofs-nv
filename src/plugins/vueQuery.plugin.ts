import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import {
  QueryCache,
  QueryClient,
  VueQueryPlugin,
} from '@tanstack/vue-query'
import type { App } from 'vue'

import { LoggerUtil } from '@/utils/logger.util.ts'

export const queryClient = new QueryClient()

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error): void => {
        LoggerUtil.logError(error)
      },
    }),
  },
}

export const vueQueryPlugin: {
  install: (app: App) => void
} = {
  install: (app: App): void => {
    app.use(VueQueryPlugin, vueQueryPluginOptions)
  },
}
