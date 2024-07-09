const extractSkusFromItems = (data: Item[] | ItemSummary[]) =>
  data.map((item: Item | ItemSummary) => item.itemId)

const extractSkus = {
  impressions: (data: ProductImpressionData) => {
    const products = data.impressions.map((impression) => ({
      ...impression.product,
    }))

    const items = products.reduce(
      (acc, product) => [...acc, ...product.items],
      [] as ItemSummary[]
    )

    return extractSkusFromItems(items)
  },
  clicks: (data: ProductClickData) => extractSkusFromItems(data.product.items),
  clicksOnShelf: (data: OnProductClickData) => extractSkusFromItems(data.items),
  views: (data: ProductViewData) => extractSkusFromItems(data.product.items),
}

export const getSkusEventData: GetSkusEventData = {
  'vtex:productImpression': (data) => extractSkus.impressions(data),
  'vtex:productView': (data) => extractSkus.views(data),
  'vtex:productClick': (data) => extractSkus.clicks(data),
  'vtex:productClickOnShelf': (data) => extractSkus.clicksOnShelf(data),
}

const validEvents: ValidVtexEvent[] = Object.keys(
  getSkusEventData
) as ValidVtexEvent[]

export const eventIsValid = (eventName: ValidVtexEvent | string) =>
  validEvents.includes(eventName as ValidVtexEvent)

/**
 * Handle quantity ads
 */
export const handleQuantityAds = ({
  quantity,
  quantityAdmin,
  defaultValue,
}: {
  quantity?: string | number
  quantityAdmin?: string | number
  defaultValue: number
}) => {
  const validQuantity = (value?: string | number) =>
    !Number.isNaN(Number(value)) && Number(value) > 0

  const validQuantityAdmin = (value?: string | number) =>
    !Number.isNaN(Number(value)) && Number(value) > 0

  if (validQuantityAdmin(quantityAdmin)) return Number(quantityAdmin)

  if (validQuantity(quantity)) return Number(quantity)

  return defaultValue
}
