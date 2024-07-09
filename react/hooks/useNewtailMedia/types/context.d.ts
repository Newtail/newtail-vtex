type PlacementName = string

type NewtailMediaContextData = {
  loading: boolean
  placement: PlacementName
  skuProducts: string[] | null
  products: ProductAd[] | null
  banners: BannerAd[] | null
  handleConversion(data: Order): void
  handleEvents(data: HandleEvents): void
  handleProductClickOnShelf: (data: OnProductClickData) => void
}
