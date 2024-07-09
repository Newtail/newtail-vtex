/* eslint-disable no-console */
import React, {
  useEffect,
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react'
// import axios from 'axios'
import { useDevice } from 'vtex.device-detector'
import { useRenderSession } from 'vtex.session-client'
import { useRuntime } from 'vtex.render-runtime'

import { getNewtailMedia, postNewtailMediaConversionURL } from '../../services'
import type { SessionSuccess } from '../../typings/vtex.session-client'
import { getUserIdByEmail } from '../../helpers/getUserId'
import { useAdsEvents } from '../useAdEvents'
import { getSkusEventData } from '../useNewtailMediaSearch/utils'

const NewtailMediaContext = createContext<NewtailMediaContextData | null>(
  {} as NewtailMediaContextData
)

const AdTypesKeys = {
  product: 'product',
  banner: 'banner',
} as { [key in AdTypes]: AdTypes }

// home, category, search, product_page, brand_page

const AdContextKeys = {
  home: 'home',
  category: 'category',
  search: 'search',
  product_page: 'product_page',
  brand_page: 'brand_page',
} as { [key in AdContext]: AdContext }

type NewtailMediaProviderType = {
  adType: AdTypes | 'conversion'
} & NewtailMediaBannerProps

const NewtailMediaProvider: React.FC<NewtailMediaProviderType> = ({
  adType,
  children,
  placementName,
  placementNameAdmin,
  size,
  sizeAdmin,
  quantity,
  quantityAdmin,
}) => {
  const publisherId = window?.newtailMedia?.publisherId

  const placement = placementNameAdmin || placementName || adType || 'placement'
  const mediaSize = size || sizeAdmin || 'desktop'
  const quantityAds = Number(quantityAdmin) || quantity || 1

  const [loading, setLoading] = useState(true)

  const [products, setProducts] = useState<ProductAd[] | null>(null)
  const [skuProducts, setSkuProducts] = useState<string[] | null>(null)
  const [banners, setBanners] = useState<BannerAd[] | null>(null)

  /**
   * Handle session and user id
   */
  const {
    session,
    // loading: loadingSession,
    // error: errorSession,
  } = useRenderSession() as {
    session: SessionSuccess
    loading: boolean
    error: boolean
  }

  const sessionId = useMemo(() => session?.id || null, [session])

  const userId = useMemo(
    () => session?.namespaces?.profile?.id?.value || null,
    [session]
  )

  /**
   * Handle device type
   */
  const { isMobile } = useDevice()

  const device = useMemo(() => (isMobile ? 'mobile' : 'desktop'), [isMobile])

  /**
   * Handle term
   */

  const { query: queryRaw, route } = useRuntime()

  // console.log(route)

  const term = useMemo(() => queryRaw?._q ?? null, [queryRaw])
  const categoryName = useMemo(() => route?.params?.category || null, [route])
  const brandName = useMemo(() => route?.params?.brand || null, [route])

  /**
   * Handle context
   */

  const context = useMemo(() => {
    const type = route?.pageContext?.type as AdContext | 'brand' | 'product'

    if (type in AdContextKeys) {
      return type
    }

    if (type === 'brand' && term) {
      return AdContextKeys.search
    }

    if (type === 'brand') {
      return AdContextKeys.brand_page
    }

    if (type === 'product') {
      return AdContextKeys.product_page
    }

    return AdContextKeys.search
  }, [route, term])

  /**
   * Handle request payload
   */
  const adTypes = AdTypesKeys

  const placements = useMemo(
    () => ({
      [adTypes.product]: {
        [placement]: {
          quantity: quantityAds,
          types: ['product'],
        },
      },
      [adTypes.banner]: {
        [placement]: {
          quantity: quantityAds,
          size: mediaSize,
          types: ['banner'],
        },
      },
    }),
    [adTypes.banner, adTypes.product, mediaSize, placement, quantityAds]
  )

  const requestBody = useMemo(
    () =>
      ({
        context,
        term,
        device,
        user_id: userId,
        session_id: sessionId,
        placements: placements[adType],
        category_name:
          context === AdContextKeys.category ? categoryName : undefined,
        brand_name:
          context === AdContextKeys.brand_page ? brandName : undefined,
      } as RequestBody),
    [
      context,
      term,
      device,
      userId,
      sessionId,
      placements,
      adType,
      categoryName,
      brandName,
    ]
  )

  const handleRequestAds = useCallback(async () => {
    if (!sessionId || adType === 'conversion') {
      return
    }

    try {
      setLoading(true)

      // console.log('🚨 Request Body:', requestBody)

      const { data } = await getNewtailMedia({
        publisherId,
        body: requestBody,
      })

      const response = data?.[placement]

      if (!response) return

      if (adType === 'product') {
        const adsData = response as ProductAd[]

        setProducts(adsData)
        setSkuProducts(adsData.map((item) => item.product_sku) || null)
      }

      if (adType === 'banner') {
        const adsData = response as BannerAd[]

        setBanners(adsData)
      }

      // console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [adType, placement, publisherId, requestBody, sessionId])

  useEffect(() => {
    if (adType !== 'conversion') {
      handleRequestAds()
    }
  }, [handleRequestAds, adType])

  /**
   * Handle events
   * @function handleEvents()
   */

  const fireEvent = useCallback(
    ({ url }) => {
      const body = {
        session_id: sessionId,
      } as {
        session_id: string
        user_id: string
      }

      if (userId) {
        body.user_id = userId
      }

      navigator.sendBeacon(url, new URLSearchParams(body))
    },
    [sessionId, userId]
  )

  /**
   * Handle banner events
   * @function handleBannerClick()
   * @function handleBannrImpression()
   * @function handleBannerView()
   */

  const handleEvents = useCallback(
    ({ type, event, adId, itemId }: HandleEvents) => {
      // console.log('handleEvents', type, event, adId, itemId)

      let adData = null
      let url = null
      const eventKey = `${event}_url` as keyof EventsUrl

      if (type === 'banner') {
        adData = banners?.find((item) => item.ad_id === adId)
      }

      if (type === 'product') {
        adData = products?.find((item) => item.product_sku === itemId)
      }

      url = adData?.[eventKey]

      !!url && fireEvent({ url })
    },
    [banners, fireEvent, products]
  )

  /**
   * Handle product events
   */

  const { handleAdsEvents } = useAdsEvents()

  const handleProductClickOnShelf = useCallback(
    (data: OnProductClickData) => {
      const eventName = 'vtex:productClickOnShelf'

      const skusEventData = getSkusEventData?.[eventName]?.(data)

      const adsData = products?.filter((ad) =>
        skusEventData.includes(ad.product_sku)
      )

      handleAdsEvents({ ads: adsData, event: eventName })
    },
    [handleAdsEvents, products]
  )

  /**
   * Handle conversion
   */

  const handleConversion = useCallback(
    async (data: Order) => {
      if (!sessionId) {
        return
      }

      let verifiedUserId: string | null = userId

      const [email] = data.visitorContactInfo

      if (!userId) {
        await getUserIdByEmail(email)
          .then((responseUserId) => {
            verifiedUserId = responseUserId
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      }

      const formatItens = (listProducts: ProductOrder[]) =>
        listProducts.map((item) => ({
          sku: item.sku,
          quantity: item.quantity,
          price: item.price,
          promotional_price: item.sellingPrice,
        })) as ConversionItem[]

      const body = {
        publisher_id: publisherId,
        user_id: verifiedUserId || email,
        session_id: sessionId,
        order_id: data.ordersInOrderGroup?.[0] || data.orderGroup,
        items: formatItens(data.transactionProducts),
        created_at: data.transactionDate,
        channel: 'ecommerce',
      } as ConversionBody

      const jsonData = JSON.stringify(body)
      const blobData = new Blob([jsonData], { type: 'application/json' })

      navigator.sendBeacon(postNewtailMediaConversionURL, blobData)
    },
    [publisherId, sessionId, userId]
  )

  return (
    <NewtailMediaContext.Provider
      value={{
        loading,
        products,
        skuProducts,
        banners,
        placement,
        handleEvents,
        handleProductClickOnShelf,
        handleConversion,
      }}
    >
      {children}
    </NewtailMediaContext.Provider>
  )
}

function useNewtailMedia(): NewtailMediaContextData {
  const context = useContext(NewtailMediaContext)

  if (!context) {
    throw new Error(
      'useNewtailMedia must be used within an NewtailMediaProvider'
    )
  }

  return context
}

export { NewtailMediaContext, NewtailMediaProvider, useNewtailMedia }
