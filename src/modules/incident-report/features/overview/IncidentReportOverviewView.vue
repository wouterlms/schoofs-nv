<script setup lang="ts">
import { useFileDialog } from '@vueuse/core'
import {
  useVcDialog,
  VcButton,
} from '@wisemen/vue-core-components'
import { watch } from 'vue'

import PageLayout from '@/components/layout/PageLayout.vue'

const fileDialog = useFileDialog({
  accept: 'image/*',
  capture: 'environment',
  multiple: true,
  reset: true,
})

const indicentReportCreateDialog = useVcDialog({ component: () => import('@/modules/incident-report/features/create/views/IndicentReportCreateDialog.vue') })

watch(fileDialog.files, (files) => {
  if (files === null || files.length === 0) {
    return null
  }

  const images = Array.from(files)

  indicentReportCreateDialog.open({ images })
})
</script>

<template>
  <PageLayout class="flex h-dvh flex-col justify-between">
    <h1 class="text-primary text-2xl font-semibold">
      Nieuw incident rapporteren
    </h1>

    <VcButton
      icon-left="plus"
      size="lg"
      @click="fileDialog.open()"
    >
      Incident rapporteren
    </VcButton>
  </PageLayout>
</template>
