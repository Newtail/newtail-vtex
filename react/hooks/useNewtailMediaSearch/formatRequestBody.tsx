import { useMemo } from 'react'

import { useDeviceType } from '../useDeviceType'
import { useSessionData } from '../useSessionData'
import { usePageContext } from '../usePageContext'

type FormatRequestBodyProps = {
  skus?: string[]
  placement: string
  mediaSize?: string
  quantityAds?: number
  adType?: AdTypes
}

type FormatRequestBody = (props: FormatRequestBodyProps) => null | RequestBody

type ContextData = {
  category: CategoryContextData
  brand_page: BrandPageContextData
  search: SearchContextData
  home: HomeContextData
  product_page: ProductPageContextData
}

const adTypesKeys = {
  product: 'product',
  banner: 'banner',
} as { [key in AdTypes]: AdTypes }

export const useRequestBody: FormatRequestBody = ({
  skus,
  placement = 'search',
  quantityAds = 20,
  mediaSize,
  adType = 'product',
}) => {
  const { sessionId, userId } = useSessionData()
  const { context, term, brandName, categoryName } = usePageContext()
  const device = useDeviceType()

  const contextData: ContextData = useMemo(
    () => ({
      category: {
        context: 'category',
        category_name: categoryName || '',
      },
      brand_page: {
        context: 'brand_page',
        brand_name: brandName || '',
      },
      search: {
        context: 'search',
        term,
        skus,
      },
      home: {
        context: 'home',
      },
      product_page: {
        context: 'product_page',
        product_sku: '',
      },
    }),
    [brandName, categoryName, skus, term]
  )

  const placementData = useMemo(
    () => ({
      [adTypesKeys.banner]: {
        size: mediaSize,
        quantity: quantityAds,
        types: [adTypesKeys.banner],
      },
      [adTypesKeys.product]: {
        quantity: quantityAds,
        types: [adTypesKeys.product],
      },
    }),
    [mediaSize, quantityAds]
  )

  const body = useMemo(
    () =>
      !sessionId
        ? null
        : ({
            device,
            term,
            user_id: userId,
            session_id: sessionId,
            placements: {
              [placement]: placementData[adType],
            },
            ...contextData?.[context],
          } as RequestBody),
    [
      adType,
      context,
      contextData,
      device,
      placement,
      placementData,
      sessionId,
      term,
      userId,
    ]
  )

  return body
}
