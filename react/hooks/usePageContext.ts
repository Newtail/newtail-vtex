/* eslint-disable no-console */
import { useMemo } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { useProduct } from 'vtex.product-context'

const AdContextKeys = {
  home: 'home',
  category: 'category',
  search: 'search',
  product_page: 'product_page',
  brand_page: 'brand_page',
} as { [key in AdContext]: AdContext }

export const usePageContext = () => {
  const { query: queryRaw, route } = useRuntime()

  const debug = useMemo(() => queryRaw?.debug ?? null, [queryRaw])

  const type = route?.pageContext?.type as PageDataContextType
  const pageContextId = route?.pageContext?.id as string

  const canonicalPathNormalized = useMemo(
    () => route?.canonicalPath?.split('/').pop()?.replace(/-|\//g, ' ') ?? null,
    [route.canonicalPath]
  )

  const isCustomPage =
    type === 'route' && pageContextId.includes('store.custom')

  // const customPageAs = AdContextKeys.category
  const customPageAs = AdContextKeys.search

  const term = useMemo(() => {
    if (isCustomPage && customPageAs === AdContextKeys.search) {
      return canonicalPathNormalized
    }

    return queryRaw?._q ?? null
  }, [isCustomPage, customPageAs, queryRaw?._q, canonicalPathNormalized])

  /**
   * GET Sku ID from product context
   */
  const productContext = useProduct()
  const firstProductSKU = productContext?.product?.items?.[0]?.itemId
  const productSKU = (route?.queryString?.skuId || firstProductSKU) as string

  const queryStringMap = route?.queryString?.map as string

  const context = useMemo(() => {
    const isHome = pageContextId === 'store.home'
    const isSearch = pageContextId === 'search'
    const isCategorySearch = isSearch && queryStringMap === 'category-1'

    switch (type) {
      case 'brand':
        return term ? AdContextKeys.search : AdContextKeys.brand_page

      case 'product':
        return AdContextKeys.product_page

      case 'subcategory':
        return AdContextKeys.category

      case 'department':
        return AdContextKeys.category

      // canonicalPath: "/listas/ar-e-refrigeracao"
      // case 'route':
      // return AdContextKeys.search

      default:
        if (isHome) return AdContextKeys.home
        if (isCategorySearch) return AdContextKeys.category
        if (isCustomPage) return customPageAs

        return type in AdContextKeys
          ? (type as AdContext)
          : AdContextKeys.search
    }
  }, [customPageAs, isCustomPage, pageContextId, queryStringMap, term, type])

  const categoryName = useMemo(() => {
    if (isCustomPage && customPageAs === AdContextKeys.category) {
      return canonicalPathNormalized
    }

    const departmentRaw = route.params?.department || route.params?.term
    const categoryRaw = route?.params?.category
    const subcategoryRaw = route?.params?.subcategory
    const isMissingCategory =
      !route?.params?.subcategory && queryStringMap === 'category-1,category-3'

    const categoryPath = () => {
      let path = ''

      if (departmentRaw) {
        path = departmentRaw.replace(/-/g, ' ')

        if (categoryRaw && !isMissingCategory) {
          path += ` > ${categoryRaw.replace(/-/g, ' ')}`

          if (subcategoryRaw) {
            path += ` > ${subcategoryRaw.replace(/-/g, ' ')}`
          }
        }

        if (isMissingCategory && categoryRaw) {
          path += ` > Undefined category`

          if (categoryRaw) {
            path += ` > ${categoryRaw.replace(/-/g, ' ')}`
          }
        }
      }

      return path
    }

    return categoryPath() || null
  }, [route, queryStringMap])

  if (debug === 'newtail') {
    console.log(
      '%c 🚧 🚧 🚧 🚧  NewtailMedia :: usePageContext :: Context 🚧 🚧 🚧 🚧',
      'color:#3c3584;background:#ffb450;',
      route?.pageContext
    )

    console.log(
      '%c 🚧 🚧 🚧 🚧  NewtailMedia :: usePageContext :: Route 🚧 🚧 🚧 🚧',
      'color:#3c3584;background:#ffb450;',
      route
    )

    console.log(
      `%c 🚧 🚧 🚧 🚀 NewtailMedia :: usePageContext :: Formatted category`,
      'color:#3c3584;background:#ffb450;',
      categoryName
    )
  }

  const brandName = useMemo(() => route?.params?.brand || null, [route])

  return { context, term, brandName, categoryName, productSKU }
}
