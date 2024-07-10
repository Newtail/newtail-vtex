type AdTypes = 'product' | 'banner'

type AdContext = 'home' | 'category' | 'search' | 'product_page' | 'brand_page'

type AdsResponse<T = string> =
  | {
      [key in T]: ProductAd[]
    }
  | {
      [key in T]: BannerAd[]
    }

interface EventsUrl {
  click_url: string
  impression_url?: string
  view_url: string
}
type ProductAd = {
  ad_id: string
  product_sku: string
} & EventsUrl

type BannerAd = {
  ad_id: string
  media_url: string
  destination_url: string
} & EventsUrl

interface AdsRequest {
  publisherId: string
  body: RequestBody
}

type PageDataContextType =
  | AdContext
  | 'brand'
  | 'product'
  | 'category'
  | 'subcategory'
  | 'department'

type CategoryContextData = {
  context: 'category'
  category_name: string | null
}

type BrandPageContextData = {
  context: 'brand_page'
  brand_name: string | null
}

type SearchContextData = {
  context: 'search'
  term: string | null
}

type HomeContextData = {
  context: 'home'
}

type ProductPageContextData = {
  context: 'product_page'
  product_sku: string
}

type RequestBody =
  | {
      skus?: string[]
      session_id: string
      user_id?: string
      device: 'mobile' | 'desktop'
      placements: {
        [key: string]:
          | {
              quantity: number
              types: ['product']
            }
          | {
              size: string
              quantity: number
              types: ['banner']
            }
      }
    } & (
      | CategoryContextData
      | BrandPageContextData
      | SearchContextData
      | HomeContextData
      | ProductPageContextData
    )

/**
 * Conversão
 */

type ConversionItem = {
  sku: string
  quantity: number
  price: number
  promotional_price: number
}

type ConversionBody = {
  publisher_id: string
  user_id: string
  session_id: string
  order_id: string
  items: ConversionItem[]
  created_at: string
  channel: 'ecommerce'
}
interface ConversionPost {
  body: ConversionBody
}

/**
 * Response event
 */
type ResponseEvent = {
  messages: string[]
}
