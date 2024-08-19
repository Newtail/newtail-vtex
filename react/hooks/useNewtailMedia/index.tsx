/* eslint-disable no-console */
import React, {
  useEffect,
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react'
import { useRenderSession } from 'vtex.session-client'

import { getNewtailMedia, postNewtailMediaConversionURL } from '../../services'
import type { SessionSuccess } from '../../typings/vtex.session-client'
import { getUserIdByEmail } from '../../helpers/getUserId'
import { useAdsEvents } from '../useAdEvents'
import { getSkusEventData } from '../useNewtailMediaSearch/utils'
import { useRequestBody } from '../useNewtailMediaSearch/formatRequestBody'

const NewtailMediaContext = createContext<NewtailMediaContextData | null>(
  {} as NewtailMediaContextData
)

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
  sizeMobile,
  sizeMobileAdmin,
  quantity,
  quantityAdmin,
  categoryName: categoryNameProps,
  categoryNameAdmin,
}) => {
  const publisherId = window?.newtailMedia?.publisherId

  const placement = placementNameAdmin || placementName || adType || 'placement'
  const mediaSize = sizeAdmin || size || 'desktop'
  const categoryName = categoryNameAdmin || categoryNameProps
  const mobileMediaSize = sizeMobileAdmin || sizeMobile
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
   * Handle request payload
   */

  const requestBody = useRequestBody({
    placement,
    adType: adType as AdTypes,
    mediaSize,
    mobileMediaSize,
    quantityAds,
    categoryName,
  })

  const handleResponse = useCallback(
    (data: AdsResponse) => {
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
    },
    [adType, placement]
  )

  const handleRequestAds = useCallback(async () => {
    if (!sessionId || adType === 'conversion') return

    try {
      setLoading(true)

      if (!requestBody) return

      const { data } = await getNewtailMedia({
        publisherId,
        body: requestBody,
      })

      handleResponse(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [adType, handleResponse, publisherId, requestBody, sessionId])

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
