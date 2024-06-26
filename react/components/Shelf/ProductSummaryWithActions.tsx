import React, { useCallback, useMemo, useRef } from 'react'
import { useProduct } from 'vtex.product-context'

import type { ProductContextValue } from '../../typings/ProductContextValue'
import { useOnView } from '../../hooks/useOnView'
import { useNewtailMedia } from '../../hooks/useNewtailMedia'

const ProductSponsoredTag: StorefrontFunctionComponent = () => {
  const adRef = useRef<HTMLDivElement | null>(null)

  const { handleEvents } = useNewtailMedia()

  const productContextValue = useProduct() as
    | Partial<ProductContextValue>
    | undefined

  const itemId = useMemo(
    () => productContextValue?.product?.sku?.itemId ?? null,

    [productContextValue]
  )

  const onView = useCallback(() => {
    if (itemId) {
      handleEvents({ type: 'product', event: 'impression', itemId })
    }
  }, [handleEvents, itemId])

  useOnView({
    ref: adRef,
    onView,
    once: true,
    initializeOnInteraction: true,
  })

  return (
    <small className="product-item-label" ref={adRef}>
      patrocinado
    </small>
  )
}

export default ProductSponsoredTag
