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

type RequestBody =
  | {
      session_id: string
      user_id?: string
      device: 'mobile' | 'desktop'
      context: T
      term?: string
      category_name?: string
      product_sku?: string
      brand_name?: string
    }
  | {
      context: 'search'
      term: string
    }
  | {
      context: 'category'
      category_name: string
    }
  | {
      context: 'product'
      product_sku: string
    }
  | {
      context: 'brand'
      brand_name: string
    }

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
