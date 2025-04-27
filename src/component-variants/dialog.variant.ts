import { defineComponentVariant } from '@wisemen/vue-core-components'

export const defaultDialogVariant = defineComponentVariant({
  config: { closeButton: { root: 'bg-tertiary rounded-full' } },
  component: 'dialog',
})
