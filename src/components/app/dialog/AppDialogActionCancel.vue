<script setup lang="ts">
import {
  VcButton,
  VcDialogCloseButton,
  VcKeyboardKey,
} from '@wisemen/vue-core-components'

import AppGroup from '@/components/app/group/AppGroup.vue'

const props = withDefaults(defineProps<{
  isDisabled?: boolean
  label: string
}>(), { isDisabled: false })
</script>

<template>
  <VcDialogCloseButton>
    <VcButton
      :is-disabled="isDisabled"
      variant="tertiary"
      class="w-full"
    >
      <AppGroup>
        {{ props.label }}

        <VcKeyboardKey
          keyboard-key="escape"
          class="border-tertiary bg-secondary text-tertiary"
        />
      </AppGroup>
    </VcButton>
  </VcDialogCloseButton>
</template>
