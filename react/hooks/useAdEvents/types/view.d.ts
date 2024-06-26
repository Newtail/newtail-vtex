interface ProductViewEvent {
  currency: string
  eventName: 'vtex:productView'
  event: 'productView'
  product: Product
  list: string
}

interface Product {
  detailUrl: string
  brand: string
  brandId: number
  productReference: string
  linkText: string
  categoryId: string
  categories: string[]
  categoryTree: CategoryTree[]
  productId: string
  productName: string
  items: Item[]
  selectedSku: Item
}

interface Item {
  itemId: string
  name: string
  ean: string
  referenceId: ReferenceId[]
  imageUrl: string
  sellers: Seller[]
}

interface Seller {
  sellerId: string
  sellerName: string
  sellerDefault: boolean
  commertialOffer: CommertialOffer
}

interface CommertialOffer {
  Price: number
  ListPrice: number
  AvailableQuantity: number
  PriceWithoutDiscount: number
}

interface ReferenceId {
  Key: string
  Value: string
  __typename: string
}

interface CategoryTree {
  id: number
  name: string
  href: string
  __typename: string
}
