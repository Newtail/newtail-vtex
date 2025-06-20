interface VtexEvent extends MessageEvent {
  data:
    | ProductViewData
    | ProductClickData
    | OrderPlacedData
    | OrderPlacedTrackedData
    | PageViewData
    | ProductImpressionData
    | AddToCartData
    | RemoveToCartData
    | CartChangedData
    | HomePageInfo
    | ProductPageInfoData
    | SearchPageInfoData
    | UserData
    | CartIdData
    | CartData
    | PromoViewData
    | PromotionClickData
}
interface PixelMessage extends MessageEvent {
  data:
    | ProductViewData
    | ProductClickData
    | OrderPlacedData
    | OrderPlacedTrackedData
    | PageViewData
    | ProductImpressionData
    | AddToCartData
    | RemoveToCartData
    | CartChangedData
    | HomePageInfo
    | ProductPageInfoData
    | SearchPageInfoData
    | UserData
    | CartIdData
    | CartData
    | PromoViewData
    | PromotionClickData
}

interface EventData {
  event: string
  eventName: string
  currency: string
}

interface PageInfoData extends EventData {
  event: 'pageInfo'
  eventName: 'vtex:pageInfo'
  accountName: string
  pageTitle: string
  pageUrl: string
}

interface UserData extends PageInfoData {
  eventType: 'userData'
  eventName: 'vtex:userData'
  firstName?: string
  lastName?: string
  document?: string
  id?: string
  email?: string
  phone?: string
  isAuthenticated: boolean
}

interface CartIdData extends PageInfoData {
  eventType: 'cartId'
  eventName: 'vtex:cartId'
  cartId: string
}

interface HomePageInfo extends PageInfoData {
  eventType: 'homeView'
}

interface ProductPageInfoData extends PageInfoData {
  eventType: 'productPageInfo'
}

interface SearchPageInfoData extends PageInfoData {
  eventType:
    | 'internalSiteSearchView'
    | 'categoryView'
    | 'departmentView'
    | 'emptySearchView'
  category?: CategoryMetaData
  department?: DepartmentMetaData
  search?: SearchMetaData
}

interface CategoryMetaData {
  id: string
  name: string
}

interface DepartmentMetaData {
  id: string
  name: string
}

interface SearchMetaData {
  term: string
  category: CategoryMetaData
  results: number
}

interface PageViewData extends EventData {
  event: 'pageView'
  eventName: 'vtex:pageView'
  pageTitle: string
  pageUrl: string
  referrer: string
}

interface AddToCartData extends EventData {
  event: 'addToCart'
  eventName: 'vtex:addToCart'
  items: CartItem[]
}

interface RemoveToCartData extends EventData {
  event: 'removeFromCart'
  eventName: 'vtex:removeFromCart'
  items: CartItem[]
}

interface CartChangedData extends EventData {
  event: 'cartChanged'
  eventName: 'vtex:cartChanged'
  items: CartItem[]
}

interface OrderPlacedData extends Order, EventData {
  event: 'orderPlaced'
  eventName: 'vtex:orderPlaced'
}

interface OrderPlacedTrackedData extends Order, EventData {
  event: 'orderPlacedTracked'
  eventName: 'vtex:orderPlacedTracked'
}

interface ProductViewData extends EventData {
  event: 'productView'
  eventName: 'vtex:productView'
  product: ProductSummary
  list?: string
}

interface ProductClickData extends EventData {
  event: 'productClick'
  eventName: 'vtex:productClick'
  product: ProductSummary
  position: number
  list?: string
}

interface ProductImpressionData extends EventData {
  event: 'productImpression'
  eventName: 'vtex:productImpression'
  impressions: Impression[]
  product?: ProductSummary // deprecated, use impressions list!
  position?: number // deprecated, use impressions list!
  list: string
}

interface CartLoadedData extends EventData {
  event: 'cartLoaded'
  eventName: 'vtex:cartLoaded'
  orderForm: OrderForm
}

interface PromoViewData extends EventData {
  event: 'promoView'
  eventType: 'vtex:promoView'
  promotions: Promotion[]
}

interface PromotionClickData extends EventData {
  event: 'promotionClick'
  eventType: 'vtex:promotionClick'
  promotions: Promotion[]
}

interface Promotion {
  id?: string
  name?: string
  creative?: string
  position?: string
}

interface CartItemAdditionalInfo {
  brandName: string
  brandId: string
}

interface CartItem {
  id: string
  productCategories: Record<string, string> | null
  additionalInfo: CartItemAdditionalInfo | null
  brand: string
  ean: string
  category: string
  detailUrl: string
  imageUrl: string
  name: string
  skuName: string
  price: number
  priceIsInt?: boolean
  sellingPrice: number
  productId: string
  productRefId: string
  quantity: number
  skuId: string
  referenceId: string // SKU reference id
  variant: string
}

interface Totalizer {
  id: string
  name: string
  value: number
}

interface Seller {
  id: string
  name: string
  logo: string
}

interface ClientProfileData {
  email: string
  firstName: string
  lastName: string
}

interface Address {
  addressId: string
  postalCode: string
  street: string
  number: string
  neighborhood: string
  complement: string
  city: string
  state: string
}

interface DeliveryOption {
  id: string
  price: number
  estimate: string
  isSelected: boolean
}

interface Shipping {
  selectedAddress: Address
  deliveryOptions?: DeliveryOption[]
}

interface MarketingData {
  coupon: string
  utmCampaign: string
  utmSource: string
  utmMedium: string
  utmiCampaign: string
  utmiPage: string
  utmiPart: string
}

interface OrderForm {
  id: string
  totalizers: Totalizer[]
  sellers: Seller[]
  salesChannel: string
  items: CartItem[]
  canEditData: boolean
  loggedIn: boolean
  clientProfileData?: ClientProfileData
  shipping?: Shipping
  value: number
  marketingData?: MarketingData
}

interface Order {
  accountName: string
  corporateName: string
  coupon: string
  currency: string
  openTextField: string
  orderGroup: string
  ordersInOrderGroup: string[]
  salesChannel: string
  visitorAddressCity: string
  visitorAddressComplement: string
  visitorAddressCountry: string
  visitorAddressNeighborhood: string
  visitorAddressNumber: string
  visitorAddressPostalCode: string
  visitorAddressState: string
  visitorAddressStreet: string
  visitorContactInfo: string[]
  visitorContactPhone: string
  visitorType: string
  transactionId: string
  transactionDate: string
  transactionAffiliation: string
  transactionTotal: number
  transactionShipping: number
  transactionSubtotal: number
  transactionDiscounts: number
  transactionTax: number
  transactionCurrency: string
  transactionPaymentType: PaymentType[]
  transactionShippingMethod: ShippingMethod[]
  transactionLatestShippingEstimate: Date
  transactionProducts: ProductOrder[]
  transactionPayment: {
    id: string
  }
}

interface Impression {
  product: ProductSummary
  position: number
}

interface PaymentType {
  group: string
  paymentSystemName: string
  installments: number
  value: number
}

interface ShippingMethod {
  itemId: string
  selectedSla: string
}

interface ProductOrder {
  id: string
  name: string
  sku: string
  skuRefId: string
  skuName: string
  productRefId: string
  ean: string
  slug: string
  brand: string
  brandId: string
  seller: string
  sellerId: string
  category: string
  categoryId: string
  categoryTree: string[]
  categoryIdTree: string[]
  priceTags: PriceTag[]
  originalPrice: number
  price: number
  sellingPrice: number
  tax: number
  quantity: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: any[]
  measurementUnit: string
  unitMultiplier: number
}

interface PriceTag {
  identifier: string
  isPercentual: boolean
  value: number
}

interface Product {
  brand: string
  brandId: string
  categories: string[]
  categoryId: string
  categoryTree: Array<{ id: string; name: string }>
  detailUrl: string
  items: Item[]
  linkText: string
  productId: string
  productName: string
  productReference: string
  selectedSku: Item
}

interface ProductSummary {
  brand: string
  brandId: string
  categories: string[]
  items: ItemSummary[]
  linkText: string
  productId: string
  productName: string
  productReference: string
  sku: ItemSummary
}

type Item = ItemSummary

interface ItemSummary {
  itemId: string
  ean: string
  name: string
  referenceId: { Key: string; Value: string }
  seller?: Seller
  sellers: Seller[]
  imageUrl?: string
}

interface Seller {
  commertialOffer: CommertialOffer
  sellerId: string
  sellerDefault: boolean
}

interface CommertialOffer {
  Price: number
  ListPrice: number
  AvailableQuantity: number
}

type ProductViewReferenceId = Array<Item['referenceId']>
