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

  const context = useMemo(() => {
    const type = route?.pageContext?.type as PageDataContextType

    switch (type) {
      case 'brand':
        return term ? AdContextKeys.search : AdContextKeys.brand_page

      case 'product':
        return AdContextKeys.product_page

      case 'subcategory':
        return AdContextKeys.category

      case 'department':
        return AdContextKeys.category

      case 'route':
          return AdContextKeys.home

      default:
        return type in AdContextKeys
          ? (type as AdContext)
          : AdContextKeys.search
    }
  }, [route, term])

  const categoryName = useMemo(() => {
    const categoryRaw = route?.params?.category || route.params?.department

    return categoryRaw?.replace(/-/g, ' ') || null
  }, [route])

  const brandName = useMemo(() => route?.params?.brand || null, [route])

  return { context, term, brandName, categoryName }
}
