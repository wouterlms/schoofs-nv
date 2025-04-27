<script setup lang="ts">
import { useFileDialog } from '@vueuse/core'
import {
  VcBadge,
  VcDateField,
  VcFormField,
  VcIcon,
  VcRadioGroup,
  VcRadioGroupItemControl,
  VcRadioGroupItemRoot,
  VcSelect,
  VcSelectItem,
  VcTextarea,
  VcTextField,
  VcTimeField,
} from '@wisemen/vue-core-components'
import dayjs from 'dayjs'
import type { Form } from 'formango'
import {
  ref,
  watch,
} from 'vue'

import AppForm from '@/components/form/AppForm.vue'
import FormLayout from '@/components/form/FormLayout.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import type { incidentReportCreateForm } from '@/modules/incident-report/models/incidentReportCreateForm'
import { toFormField } from '@/utils/formango.util'

const props = defineProps<{
  form: Form<typeof incidentReportCreateForm>
}>()

const fileDialog = useFileDialog({
  accept: 'image/*',
  capture: 'environment',
  multiple: true,
  reset: true,
})

const now = new Date()

const images = props.form.register('images', [])

const createdDate = props.form.register('createdDate', now)
const createdTime = props.form.register('createdTime', dayjs(now).format('HH:mm'))

const location = props.form.register('location')
const description = props.form.register('description')
const causes = props.form.register('causes', [])
const otherCause = props.form.register('otherCause')
const urgency = props.form.register('urgency')
const responsible = props.form.register('responsible')

function getFileUrl(file: File): string {
  return URL.createObjectURL(file)
}

function onRemoveImage(imageIndex: number): void {
  images.modelValue.value.splice(imageIndex, 1)
}

function onRemoveCause(causeIndex: number): void {
  causes.modelValue.value.splice(causeIndex, 1)
}

watch(fileDialog.files, (files) => {
  if (files === null || files.length === 0) {
    return null
  }

  images.value.value.push(...Array.from(files))
})

const cause = ref<string | null>(null)

const causeOptions = [
  'Onoplettendheid / afleiding tijdens het werk',
  'Onvoldoende opleiding of ervaring voor de taak',
  'Geen of verkeerd gebruik van persoonlijke beschermingsmiddelen (PBM)',
  'Defect of slecht onderhouden gereedschap / machines',
  'Slechte housekeeping (rommel, puin, losliggend materiaal)',
  'Ontbrekende of onjuiste valbeveiliging bij werk op hoogte',
  'Beschadigde elektrische kabels, stekkers of verdeelkasten',
  'Overbelasting of verkeerde aanslagtechniek bij hijsen en tillen',
  'Onduidelijke communicatie of taakverdeling tussen ploegen / onderaannemers',
  'Plannings- of tijdsdruk waardoor procedures worden overgeslagen',
  'Gevaarlijke stoffen onjuist opgeslagen of gelabeld',
  'Onvoldoende ventilatie bij gebruik van chemische producten',
  'Slechte verlichting of beperkt zicht op de werkplek',
  'Niet-afgeschermde gaten, openingen of randen in vloeren / platforms',
  'Andere',
]

const urgencyOptions = [
  'Laag',
  'Gemiddeld',
  'Hoog',
]

watch(cause, (v) => {
  if (v === null) {
    return
  }

  causes.value.value.push(v)

  cause.value = null
})
</script>

<template>
  <AppForm
    :form="form"
    :can-exit-when-dirty="true"
  >
    <FormLayout>
      <ul class="gap-x-md flex overflow-x-auto">
        <li>
          <button
            class="
              bg-tertiary flex size-24 shrink-0 items-center justify-center
              rounded-lg duration-200 outline-none
              active:scale-95
            "
            type="button"
            @click="fileDialog.open()"
          >
            <VcIcon
              icon="plus"
              class="text-tertiary size-5"
            />
          </button>
        </li>

        <li
          v-for="(image, imageIndex) of images.modelValue.value"
          :key="imageIndex"
          class="shrink-0"
        >
          <button
            class="
              duration-200 outline-none
              active:scale-95
            "
            type="button"
            @click="onRemoveImage(imageIndex)"
          >
            <img
              :src="getFileUrl((image))"
              alt=""
              class="size-24 rounded-lg object-contain"
            >
          </button>
        </li>
      </ul>

      <VcDateField
        v-bind="toFormField(createdDate)"
        label="Datum"
      />

      <VcTimeField
        v-bind="toFormField(createdTime)"
        label="Tijd"
      />

      <VcTextField
        v-bind="toFormField(location)"
        label="Locatie"
        placeholder="Locatie van het incident"
      />

      <VcTextarea
        v-bind="toFormField(description)"
        :class-config="{
          input: 'min-h-24',
        }"
        label="Omschrijving"
        placeholder="Omschrijving van het incident"
      />

      <div>
        <VcFormField
          for="cause"
          v-bind="toFormField(causes)"
        >
          <VcSelect
            id="cause"
            v-model="cause"
            :display-fn="cause => cause"
            :clear-search-term-on-select="true"
            placeholder="Selecteer een oorzaak"
          >
            <VcSelectItem
              v-for="option of causeOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </VcSelectItem>
          </VcSelect>
        </VcFormField>

        <ul class="gap-y-md mt-md flex flex-col">
          <li
            v-for="(selectedCause, causeIndex) of causes.value.value"
            :key="selectedCause"
          >
            <VcBadge
              :is-removable="true"
              color="gray"
              variant="translucent"
              class="w-full overflow-hidden"
              size="lg"
              @remove="onRemoveCause(causeIndex)"
            >
              <VcTextField
                v-if="selectedCause === 'Andere'"
                v-bind="toFormField(otherCause)"
                :class-config="{
                  root: 'border-none shadow-none bg-transparent h-7 outline-none',
                  input: 'px-0',
                }"
                placeholder="Vul een oorzaak in"
                class="w-full"
              />

              <div
                v-else
                class="w-full truncate"
              >
                {{ selectedCause }}
              </div>
            </VcBadge>
          </li>
        </ul>
      </div>

      <!-- <VcTextField
        v-bind="toFormField(urgency)"
        label="Urgentie"
        placeholder="Urgentie"
      /> -->

      <VcRadioGroup
        v-bind="toFormField(urgency)"
        label="Urgentie"
      >
        <div class="">
          <VcRadioGroupItemRoot
            v-for="option of urgencyOptions"
            :key="option"
            :value="option"
            class="
              border-primary px-xl py-lg gap-x-md flex w-full items-center
              border border-solid text-sm font-medium
              first:rounded-t-lg first:border-b-0
              last:rounded-b-lg last:border-t-0
            "
          >
            <VcRadioGroupItemControl class="shrink-0" />

            {{ option }}
          </VcRadioGroupItemRoot>
        </div>
      </VcRadioGroup>

      <VcTextField
        v-bind="toFormField(responsible)"
        label="Verantwoordelijke (optioneel)"
        placeholder="Wie is verantwoordelijk voor het incident?"
      />

      <div class="py-xl sticky bottom-0">
        <FormSubmitButton
          :form="form"
          label="Rapport genereren"
          class=""
        />
      </div>
    </FormLayout>
  </AppForm>
</template>
