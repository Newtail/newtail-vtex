/* eslint-disable no-fallthrough */
/* eslint-disable no-console */
import { canUseDOM } from 'vtex.render-runtime'

import push from './push'

// export default function () {
//   return null
// } // no-op for extension point

export function handleEvents(e: PixelMessage) {
  if (e.data.eventName) {
    console.log('handleEvents', e.data.eventName, { ...e.data })
  }

  switch (e.data.eventName) {
    case 'vtex:productImpression': {
      // console.log('🔮 vtex:productImpression', e.data)
      const { currency, list, impressions } = e.data

      const parsedImpressions = (impressions || []).map(
        getProductImpressionObjectData(list)
      )

      const data = {
        event: 'productImpression',
        ecommerce: {
          currencyCode: currency,
          impressions: parsedImpressions,
        },
      }

      push(data, 'productImpression')

      return
    }

    case 'vtex:productView': {
      const { selectedSku, productName, brand, categories } = e.data.product

      let price

      try {
        price = e.data.product.items[0].sellers[0].commertialOffer.Price
      } catch {
        price = undefined
      }

      const data = {
        ecommerce: {
          detail: {
            products: [
              {
                brand,
                category: getCategory(categories),
                id: selectedSku.itemId,
                name: productName,
                variant: selectedSku.name,
                price,
              },
            ],
          },
        },
        event: 'productDetail',
      }

      push(data)

      return
    }

    case 'vtex:productClick': {
      const { productName, brand, categories, sku } = e.data.product

      let price

      try {
        price = e.data.product.items[0].sellers[0].commertialOffer.Price
      } catch {
        price = undefined
      }

      const data = {
        event: 'productClick',
        ecommerce: {
          click: {
            products: [
              {
                brand,
                category: getCategory(categories),
                id: sku.itemId,
                name: productName,
                variant: sku.name,
                price,
              },
            ],
          },
        },
      }

      push(data)
    }

    default:
      break
  }
}

function getCategory(rawCategories: string[]) {
  if (!rawCategories || !rawCategories.length) {
    return
  }

  return removeStartAndEndSlash(rawCategories[0])
}

// Transform this: "/Apparel & Accessories/Clothing/Tops/"
// To this: "Apparel & Accessories/Clothing/Tops"
function removeStartAndEndSlash(category?: string) {
  return category?.replace(/^\/|\/$/g, '')
}

function getProductImpressionObjectData(list: string) {
  return ({ product, position }: Impression) => ({
    brand: product.brand,
    category: getCategory(product.categories),
    id: product.productId, // Product id
    variant: product.sku.itemId, // SKU id
    list,
    name: product.productName,
    position,
    price: `${product?.sku?.seller?.commertialOffer.Price}`,
    dimension1: product.productReference ?? '',
    dimension2: product.sku.referenceId?.Value ?? '',
    dimension3: product.sku.name, // SKU name (variation only)
  })
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
