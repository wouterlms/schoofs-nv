<script setup lang="ts" generic="TPagination extends BasePagination">
import type {
  BasePagination,
  Pagination,
} from '@wisemen/vue-core-components'
import { watch } from 'vue'

import AppSearchInputField from '@/components/app/search/AppSearchInputField.vue'
import { useDebounceSearch } from '@/composables/debounce-search/debounceSearch.composable'

const props = withDefaults(defineProps<{
  isDisabled?: boolean
  isLoading: boolean
  disableKeyboardCommand?: boolean
  pagination: Pagination<TPagination>
  placeholder?: string | null
}>(), {
  isDisabled: false,
  disableKeyboardCommand: false,
  placeholder: null,
})

const {
  isDebouncing, search,
} = useDebounceSearch({
  onDebounceSearch: (value) => {
    props.pagination.handleSearchChange(value)
  },
})

watch(() => props.pagination.paginationOptions.value.search, (value) => {
  search.value = value ?? ''
})
</script>

<template>
  <AppSearchInputField
    v-model="search"
    :is-disabled="props.isDisabled"
    :disable-keyboard-command="props.disableKeyboardCommand"
    :placeholder="props.placeholder"
    :is-loading="props.isLoading || isDebouncing"
    class="w-64"
  />
</template>
