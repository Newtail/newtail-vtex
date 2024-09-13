/* eslint-disable no-console */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import { getNewtailMedia } from '../../services'
import { useSearchPageContext } from '../useSearchPageContext'
import { extractSKUs } from './extractSKUs'
import { useRequestBody } from './formatRequestBody'
import { useAdsEvents } from '../useAdEvents'
import { handleQuantityAds, eventIsValid, getSkusEventData } from './utils'
// Default settings
import * as D from '../../settings'

const NewtailMediaSearchContext =
  createContext<NewtailMediaSearchContextData | null>(
    {} as NewtailMediaSearchContextData
  )

const NewtailMediaSearchProvider: React.FC<NewtailMediaSearchProviderProps> = ({
  children,
  onlyFirstSKU = false,
  onlyFirstSKUAdmin = false,
  parentSearchSelector,
  parentSearchSelectorAdmin,
  placementName,
  placementNameAdmin,
  tagClassname,
  tagClassnameAdmin,
  tagPositionAdmin,
  tagPosition,
  tagText,
  tagTextAdmin,
  quantity,
  quantityAdmin,
  // Sponsored Skus at the beginning
  // do not use if using infinite scrolling
  sponsoredSkusAtTop = true,
}) => {
  const { query: queryRaw } = useRuntime()

  const debug = useMemo(() => queryRaw?.debug ?? null, [queryRaw])

  /**
   * Handle settings
   */

  const i18n = useIntl()

  const quantityAds = handleQuantityAds({
    quantityAdmin,
    quantity,
    defaultValue: 20,
  })

  const publisherId = window?.newtailMedia?.publisherId
  const placement =
    placementNameAdmin || placementName || `placement_search_default`

  const parentSelector =
    parentSearchSelectorAdmin || parentSearchSelector || D.searchSelectorDefault

  const HTMLElementTag = 'small'
  const tagPositionElement: TagPosition =
    tagPositionAdmin || tagPosition || 'start'

  const onlyFirstSKUInner = onlyFirstSKUAdmin || onlyFirstSKU || false

  const classNameTag =
    tagClassnameAdmin || tagClassname || D.tagClassnameDefault

  const labelTag =
    tagTextAdmin ||
    tagText ||
    i18n.formatMessage({
      id: 'admin/newtailpartnerbr-newtail-media.search.tagText.default',
      defaultMessage: 'Patrocinado',
    })

  // Handle states hook

  const [productAds, setProductAds] = useState<ProductAd[] | null>(null)
  const [skusProductAds, setSkusProductAds] = useState<string[] | null>(null)

  /**
   * Get search result
   */
  const { products } = useSearchPageContext()

  const skus = useMemo(
    () => extractSKUs({ products, onlyFirstSKU: onlyFirstSKUInner }),
    [onlyFirstSKUInner, products]
  )

  /**
   * Handle request ads
   */

  const requestBody = useRequestBody({ skus, placement, quantityAds, forceSearchContext: true, })

  const handleRequestAds = useCallback(async () => {
    if (!requestBody) return

    try {
      const body = {
        publisherId,
        body: requestBody,
      }

      if (debug === 'newtail') {
        console.log(
          `%c 🚧 🚧 🚧 🚀 NewtailMediaSearchProvider :: Request :: ${placement}`,
          'color:white;background:#3c3584;',
          body
        )
      }

      const { data } = await getNewtailMedia(body)

      if (debug === 'newtail') {
        console.log(
          `%c 🚧 🚧 🚧 🚀 NewtailMediaSearchProvider :: Response :: ${placement}`,
          'color:white;background:#3c3584;',
          data
        )
      }

      const response = data?.[placement] as ProductAd[]

      if (!response) return

      const responseSkus = response?.map((item) => item.product_sku) || null

      setProductAds(response)
      setSkusProductAds(responseSkus)
    } catch (error) {
      console.error(error)
    }
  }, [debug, placement, publisherId, requestBody])

  useEffect(() => {
    if (products?.length && requestBody) {
      handleRequestAds()
    }
  }, [handleRequestAds, products, requestBody])

  /**
   * Handle sponsored SKUs
   */
  const sponsoredSkus = useMemo(
    () =>
      skusProductAds
        ? skus.filter((sku) => skusProductAds.includes(sku))
        : null,
    [skus, skusProductAds]
  )

  /**
   * Handle sponsored tags
   */
  const handleSponsoredTag = useCallback(() => {
    const container = document.querySelector(parentSelector)

    if (!skusProductAds || !container || !sponsoredSkus?.length) return

    sponsoredSkus.forEach((item) => {
      const searchResultItem = products.find((product) =>
        product.items.some((productItem) => productItem.itemId === item)
      )

      if (!searchResultItem) return

      const getItemElements = () => {
        const byLink = container.querySelectorAll(
          `a[href*='${searchResultItem.link}']`
        )

        if (byLink.length) {
          return byLink
        }

        const byLinkText = container.querySelectorAll(
          `a[href*='${searchResultItem.linkText}']`
        )

        return byLinkText
      }

      const itemElements = getItemElements()

      itemElements.forEach((element) => {
        if (sponsoredSkusAtTop) {
          // handle product summary container
          // div.vtex-search-result-3-x-galleryItem > section.vtex-product-summary-2-x-container
          const sectionParent = element?.parentElement

          const containerParent = sectionParent?.parentElement

          if (containerParent) {
            containerParent.classList.add(`sponsored-product-container`)
            containerParent.style.order = '-1'
          }
        }

        if (element.querySelector(`.${classNameTag}`)) {
          return
        }

        const sponsoredTag = document.createElement(HTMLElementTag)

        sponsoredTag.textContent = labelTag
        sponsoredTag.className = classNameTag

        const insertActions: TagPositionAction = {
          start: () => element.prepend(sponsoredTag),
          end: () => element.appendChild(sponsoredTag),
          // custom: () => customHandle()
        }

        insertActions?.[tagPositionElement]?.()
      })
    })
  }, [
    parentSelector,
    skusProductAds,
    sponsoredSkus,
    products,
    sponsoredSkusAtTop,
    classNameTag,
    labelTag,
    tagPositionElement,
  ])

  useEffect(() => {
    handleSponsoredTag()
  }, [handleSponsoredTag])

  /**
   * Handle events
   */

  const { handleAdsEvents } = useAdsEvents()

  const handleEvents = useCallback(
    (e: PixelMessage) => {
      const eventName = e?.data?.eventName as ValidVtexEvent

      if (!eventName || !eventIsValid(eventName)) return

      const eventData: EventData = e.data

      const skusEventData = getSkusEventData?.[eventName]?.(eventData as any)

      const adsData = productAds?.filter((ad) =>
        skusEventData.includes(ad.product_sku)
      )

      handleAdsEvents({ ads: adsData, event: eventName })
    },
    [handleAdsEvents, productAds]
  )

  return (
    <NewtailMediaSearchContext.Provider
      value={{
        handleEvents,
      }}
    >
      {children}
    </NewtailMediaSearchContext.Provider>
  )
}

function useNewtailMediaSearch(): NewtailMediaSearchContextData {
  const context = useContext(NewtailMediaSearchContext)

  if (!context) {
    throw new Error(
      'useNewtailMediaSearch must be used within an NewtailMediaSearchProvider'
    )
  }

  return context
}

export {
  NewtailMediaSearchContext,
  NewtailMediaSearchProvider,
  useNewtailMediaSearch,
}
