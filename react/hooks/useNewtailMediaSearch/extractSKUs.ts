type HandleProductsProps = {
  products: ContextProduct[]
  onlyFirstSKU?: boolean
}

type HandleProducts = (props: HandleProductsProps) => string[]

export const extractSKUs: HandleProducts = ({
  products,
  onlyFirstSKU = false,
}) => {
  if (!products?.length) return []

  const filteredSKUs = products.reduce((acc, item) => {
    const itemIds = onlyFirstSKU
      ? [item.items[0].itemId]
      : item.items.map((product) => product.itemId)

    return [...acc, ...itemIds]
  }, [] as string[])

  return filteredSKUs
}
