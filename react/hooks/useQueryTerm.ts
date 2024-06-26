import { useMemo } from 'react'
import { useRuntime } from 'vtex.render-runtime'

export const useQueryTerm = () => {
  const { query: queryRaw } = useRuntime()

  return useMemo(() => queryRaw?._q ?? null, [queryRaw])
}
