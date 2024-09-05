import { useMemo } from 'react'
import { useRuntime } from 'vtex.render-runtime'

const AdContextKeys = {
  home: 'home',
  category: 'category',
  search: 'search',
  product_page: 'product_page',
  brand_page: 'brand_page',
} as { [key in AdContext]: AdContext }

export const usePageContext = () => {
  const { query: queryRaw, route } = useRuntime()

  const term = useMemo(() => queryRaw?._q ?? null, [queryRaw])

  const type = route?.pageContext?.type as PageDataContextType
  const pageContextId = route?.pageContext?.id as string
  const productSKU = route?.queryString?.skuId as string

  const context = useMemo(() => {
    const isHome = pageContextId === 'store.home'

    switch (type) {
      case 'brand':
        return term ? AdContextKeys.search : AdContextKeys.brand_page

      case 'product':
        return AdContextKeys.product_page

      case 'subcategory':
        return AdContextKeys.category

      case 'department':
        return AdContextKeys.category

      default:
        if (isHome) return AdContextKeys.home

        return type in AdContextKeys
          ? (type as AdContext)
          : AdContextKeys.search
    }
  }, [pageContextId, term, type])

  const categoryName = useMemo(() => {
    const categoryRaw = route?.params?.category || route.params?.department

    return categoryRaw?.replace(/-/g, ' ') || null
  }, [route])

  const brandName = useMemo(() => route?.params?.brand || null, [route])

  return { context, term, brandName, categoryName, productSKU }
}
