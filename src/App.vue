<script setup lang="ts">
import {
  VcConfigProvider,
  VcDialogContainer,
  VcThemeProvider,
  VcToastContainer,
} from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'

import AppPageLoader from '@/components/app/loader/AppPageLoader.vue'
import { useDocumentTitle } from '@/composables/document-title/documentTitle.composable.ts'
import {
  GOOGLE_MAPS_API_KEY,
  logBuildInformation,
} from '@/constants/environment.constant.ts'

const { setTemplate } = useDocumentTitle()
const i18n = useI18n()

setTemplate('{title} | $projectName')

logBuildInformation()
</script>

<template>
  <VcConfigProvider
    :locale="i18n.locale.value"
    :google-maps-api-key="GOOGLE_MAPS_API_KEY"
    teleport-target-selector="body"
  >
    <VcThemeProvider
      theme="default"
      appearance="light"
    >
      <RouterView />

      <AppPageLoader />
      <VcDialogContainer />
      <VcToastContainer />
      <div id="teleport-target" />
    </VcThemeProvider>
  </VcConfigProvider>
</template>
