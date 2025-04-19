import {
  describe,
  expect,
  it,
} from 'vitest'

import { useDebounceSearch } from '@/composables/debounce-search/debounceSearch.composable'

describe('useDebounceSearch', () => {
  it('should be defined', () => {
    let actualValue = ''

    const debounceSearch = useDebounceSearch({
      defaultValue: '',
      onDebounceSearch: (value: string) => {
        actualValue = value
      },
    })

    expect(debounceSearch).toBeDefined()
    expect(actualValue).toBe('')
  })
})
