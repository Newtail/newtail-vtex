export interface ProductContextValue {
  loadingItem: boolean
  product: Product
  selectedItem: Item
  selectedQuantity: number
  skuSelector: SkuSelector
  buyButton: BuyButton
  assemblyOptions: AssemblyOptions
}

interface AssemblyOptions {
  items: Items
  inputValues: Items
  areGroupsValid: Items
}

interface BuyButton {
  clicked: boolean
}

interface SkuSelector {
  selectedImageVariationSKU?: string
  isVisible: boolean
  areAllVariationsSelected: boolean
}

interface Product {
  brand: string
  brandId: number
  cacheId: string
  categoryTree: CategoryTree[]
  description: string
  items: string[]
  link: string
  linkText: string
  priceRange: PriceRange
  productClusters: ProductCluster[]
  productId: string
  productName: string
  productReference: string
  properties: string[]
  specificationGroups: string[]
  __typename: string
  sku: Sku
}

interface Sku {
  images: Image[]
  itemId: string
  measurementUnit: string
  name: string
  sellers: Seller[]
  unitMultiplier: number
  variations: string[]
  __typename: string
  seller: Seller
  referenceId: ReferenceId
  image: Image
}

interface ReferenceId {
  Value: string
}

interface ProductCluster {
  id: string
  name: string
  __typename: string
}

interface PriceRange {
  listPrice: ListPrice
  sellingPrice: ListPrice
  __typename: string
}

interface ListPrice {
  highPrice: number
  lowPrice?: number
  __typename: string
}

interface Item {
  images: Image[]
  itemId: string
  measurementUnit: string
  name: string
  sellers: Seller[]
  unitMultiplier: number
  variations: string[]
  __typename: string
}

interface Seller {
  commertialOffer: CommertialOffer
  sellerId: string
  __typename: string
}

interface CommertialOffer {
  AvailableQuantity: number
  Installments: Installment[]
  ListPrice: number
  Price: number
  PriceWithoutDiscount: number
  Tax: number
  discountHighlights: DiscountHighlight[]
  taxPercentage: number
  teasers: string[]
  __typename: string
}

interface DiscountHighlight {
  name: string
  __typename: string
}

interface Installment {
  InterestRate: number
  Name: string
  NumberOfInstallments: number
  TotalValuePlusInterestRate: number
  Value: number
  __typename: string
}

interface Image {
  imageLabel: string
  imageTag: string
  imageUrl: string
  __typename: string
}

interface CategoryTree {
  slug: string
  __typename: string
}
