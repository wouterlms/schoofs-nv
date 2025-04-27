import { defineComponentVariant } from '@wisemen/vue-core-components'

export const primaryButtonVariant = defineComponentVariant({
  config: { root: 'text-black bg-brand-500 border-brand-500' },
  target: {
    prop: 'variant',
    value: 'primary',
  },
  component: 'button',
})
