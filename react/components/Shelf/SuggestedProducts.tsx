import React from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'

interface Props {
  title?: string
  products: Product[]
}

const SuggestedProducts = ({ title, products }: Props) => {
  function sumAvailableQuantity(items: Item[]) {
    let totalQuantity = 0

    items.forEach((item) => {
      item.sellers.forEach((seller) => {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        totalQuantity += seller.commertialOffer.AvailableQuantity || 0
      })
    })

    return totalQuantity
  }

  const filteredProducts = products.filter(
    (item) => !!sumAvailableQuantity(item.items)
  )

  return (
    <div>
      {title && <span>{title}</span>}

      {!!filteredProducts?.length && (
        <ExtensionPoint
          id="list-context.product-list-static"
          products={filteredProducts}
          hideUnavailableItems
        />
      )}
    </div>
  )
}

export default SuggestedProducts
