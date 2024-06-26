import React from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'

interface Props {
  title?: string
  products: Product[]
  onProductClick: (product: Product) => void
}

const SuggestedProductsWithVideo = ({
  title,
  products,
  onProductClick,
}: Props) => {
  return (
    <div>
      {title && <span>{title}</span>}

      <ExtensionPoint
        id="list-context.product-list-static"
        products={products || []}
        actionOnProductClick={onProductClick}
      />
    </div>
  )
}

export default SuggestedProductsWithVideo
