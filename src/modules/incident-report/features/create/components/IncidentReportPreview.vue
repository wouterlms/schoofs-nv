<script setup lang="ts">
import type { Form } from 'formango'
import { computed } from 'vue'

import PageLayout from '@/components/layout/PageLayout.vue'
import { useLocalizedDateFormat } from '@/composables/localized-date-format/localizedDateFormat.composable'
import type { incidentReportCreateForm } from '@/modules/incident-report/models/incidentReportCreateForm'

const props = defineProps<{
  state: Form<typeof incidentReportCreateForm>['state']
}>()

const dateFormat = useLocalizedDateFormat()

const dateWithTime = computed<Date | null>(() => {
  const {
    createdDate, createdTime,
  } = props.state.value

  if (
    createdDate === undefined
    || createdDate === null
    || createdTime === undefined
    || createdTime === null
  ) {
    return null
  }

  const date = new Date(createdDate)
  const [
    hours,
    minutes,
  ] = createdTime.split(':').map(Number)

  date.setHours(hours, minutes)

  return date
})

function getFileUrl(file: File): string {
  return URL.createObjectURL(file)
}
</script>

<template>
  <PageLayout class="h-[297mm] w-[210mm]">
    <header class="mb-4xl">
      <h1 class="text-primary text-2xl font-semibold">
        Incident Rapport
      </h1>
    </header>

    <div class="gap-2xl grid grid-cols-4">
      <div>
        <span class="text-tertiary text-xs font-medium">
          Datum
        </span>

        <p
          v-if="dateWithTime !== null"
          class="text-primary text-sm"
        >
          {{ dateFormat.toDateTime(dateWithTime) }}
        </p>
      </div>

      <div>
        <span class="text-tertiary text-xs font-medium">
          Locatie
        </span>

        <p class="text-primary text-sm">
          {{ props.state.value.location }}
        </p>
      </div>

      <div>
        <span class="text-tertiary text-xs font-medium">
          Urgentie
        </span>

        <p class="text-primary text-sm">
          {{ props.state.value.urgency }}
        </p>
      </div>

      <div>
        <span class="text-tertiary text-xs font-medium">
          Verantwoordelijke
        </span>

        <p class="text-primary text-sm">
          {{ props.state.value.responsible || '-' }}
        </p>
      </div>

      <div class="col-span-2">
        <span class="text-tertiary text-xs font-medium">
          Omschrijving
        </span>

        <p
          class="text-primary text-sm whitespace-normal"
        >
          {{ props.state.value.description }}
        </p>
      </div>

      <div class="col-span-2">
        <span class="text-tertiary text-xs font-medium">
          Oorzaak
        </span>

        <ul class="gap-y-md mt-md flex flex-col">
          <li
            v-for="(cause, causeIndex) of props.state.value.causes?.filter(
              (cause) => cause !== 'Andere',
            ) ?? []"
            :key="cause"
            class="text-primary text-sm whitespace-normal"
          >
            {{ causeIndex + 1 }}.  {{ cause }}
          </li>

          <li
            v-if="props.state.value.otherCause"
            class="text-primary text-sm"
          >
            {{ props.state.value.causes!.length }}.  {{ props.state.value.otherCause }}
          </li>
        </ul>
      </div>
    </div>

    <div class="gap-2xl mt-6xl grid grid-cols-2 items-start">
      <img
        v-for="image of props.state.value.images! ?? []"
        :key="(image as File).name"
        :src="getFileUrl((image as File))"
        style="width: 300px; height: auto;"
        alt=""
        class="object-contain"
      >
    </div>
  </PageLayout>
</template>
