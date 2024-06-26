import { useMemo } from 'react'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'

export const useSearchPageContext = () => {
  const { searchQuery } = useSearchPage()

  const products: ContextProduct[] = useMemo(
    () => searchQuery.data?.productSearch?.products,
    [searchQuery.data?.productSearch?.products]
  )

  return { products }
}
