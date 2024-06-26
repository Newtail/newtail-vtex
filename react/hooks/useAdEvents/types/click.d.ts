interface ProductClickEvent {
  currency: string
  eventName: 'vtex:productClick'
  event: 'productClick'
  product: Product
  query: string
  map: string
  position: number
  list: string
}

interface Product {
  cacheId: string
  productId: string
  description: string
  productName: string
  productReference: string
  linkText: string
  brand: string
  brandId: number
  link: string
  categories: string[]
  categoryId: string
  releaseDate: string
  priceRange: PriceRange
  specificationGroups: SpecificationGroup[]
  skuSpecifications: any[]
  productClusters: any[]
  clusterHighlights: any[]
  properties: Property[]
  __typename: string
  advertisement: null
  items: Item[]
  selectedProperties: null
  rule: null
  sku: Sku
}

interface Sku {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  variations: any[]
  referenceId: ReferenceId
  measurementUnit: string
  unitMultiplier: number
  images: Image[]
  __typename: string
  sellers: Seller[]
  seller: Seller
  image: Image
}

interface Item {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  variations: any[]
  referenceId: ReferenceId[]
  measurementUnit: string
  unitMultiplier: number
  images: Image[]
  __typename: string
  sellers: Seller[]
}

interface Seller {
  sellerId: string
  sellerName: string
  sellerDefault: boolean
  __typename: string
  commertialOffer: CommertialOffer
}

interface CommertialOffer {
  discountHighlights: any[]
  teasers: any[]
  Price: number
  ListPrice: number
  Tax: number
  taxPercentage: number
  spotPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  __typename: string
  Installments: any[]
}

interface Image {
  cacheId: string
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string
  __typename: string
}

interface ReferenceId {
  Key: string
  Value: string
  __typename: string
}

interface Property {
  name: string
  values: string[]
  __typename: string
}

interface SpecificationGroup {
  name: string
  originalName: string
  specifications: Specification[]
  __typename: string
}

interface Specification {
  name: string
  originalName: string
  values: string[]
  __typename: string
}

interface PriceRange {
  sellingPrice: SellingPrice
  listPrice: SellingPrice
  __typename: string
}

interface SellingPrice {
  highPrice: number
  lowPrice: number
  __typename: string
}
