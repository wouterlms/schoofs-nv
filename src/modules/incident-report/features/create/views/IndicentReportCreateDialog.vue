<script setup lang="ts">
import {
  VcDialogCloseButton,
  VcDialogContent,
  VcDialogDescription,
  VcDialogOverlay,
  VcDialogOverlayTransition,
  VcDialogRoot,
  VcDialogTitle,
} from '@wisemen/vue-core-components'
import { useForm } from 'formango'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { Motion } from 'motion-v'
import { ref } from 'vue'

import AppGroup from '@/components/app/group/AppGroup.vue'
import IncidentReportCreateForm from '@/modules/incident-report/features/create/components/IncidentReportCreateForm.vue'
import IncidentReportPreview from '@/modules/incident-report/features/create/components/IncidentReportPreview.vue'
import { incidentReportCreateForm } from '@/modules/incident-report/models/incidentReportCreateForm'

const props = defineProps<{
  images: File[]
}>()

const form = useForm({
  initialState: () => ({
    createdDate: null,
    createdTime: null,
    causes: null,
    description: null,
    images: props.images,
    location: null,
    otherCause: null,
    responsible: null,
    urgency: null,
  }),
  schema: incidentReportCreateForm,
  onSubmit: async () => {
    await generatePDF()
  },
})

const pdfContent = ref<InstanceType<typeof IncidentReportPreview> | null>(null)

async function generatePDF(): Promise<void> {
  const element = pdfContent.value?.$el ?? null

  if (element === null) {
    return
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  })
  const imgData = canvas.toDataURL('image/png')

  // eslint-disable-next-line new-cap
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  pdf.save('job-safety-form.pdf')
}
</script>

<template>
  <VcDialogRoot
    :class-config="{
      content: 'translate-y-0 top-auto bottom-0 w-full h-[95dvh] rounded-b-none rounded-t-3xl',
    }"
  >
    <VcDialogOverlay>
      <VcDialogOverlayTransition />
    </VcDialogOverlay>

    <VcDialogContent>
      <Motion
        :initial="{ y: '100%' }"
        :animate="{ y: '0%' }"
        :exit="{ y: '100%' }"
        :transition="{
          type: 'spring',
          bounce: 0.1,
          duration: 0.6,
        }"
      >
        <IncidentReportPreview
          ref="pdfContent"
          :state="form.state"
          class="sr-only"
          tabindex="-1"
        />

        <div class="h-full overflow-auto">
          <header class="py-4xl px-3xl bg-primary sticky top-0 z-1">
            <AppGroup justify="between">
              <VcDialogTitle>
                <h1 class="text-primary text-2xl font-semibold">
                  Incident rapporteren
                </h1>
              </VcDialogTitle>

              <VcDialogCloseButton />
            </AppGroup>

            <VcDialogDescription class="sr-only">
              <p>
                Nieuw rapport aanmaken
              </p>
            </VcDialogDescription>
          </header>

          <div
            class="px-3xl pb-4xl"
          >
            <IncidentReportCreateForm :form="form" />
          </div>
        </div>
      </Motion>
    </VcDialogContent>
  </VcDialogRoot>
</template>
