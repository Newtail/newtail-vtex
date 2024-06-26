type ExtendEventType =
  | {
      type: 'product'
      itemId: string
    }
  | {
      type: 'banner'
      adId: string
    }

type HandleEvents = {
  type: AdTypes
  event: 'view' | 'impression' | 'click'
  itemId?: string
  adId?: string
  ad?: ProductAd | BannerAd | null | undefined
} & ExtendEventType
