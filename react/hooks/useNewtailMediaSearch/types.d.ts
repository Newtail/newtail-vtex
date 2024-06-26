type NewtailMediaSearchContextData = {
  handleEvents: (e: PixelMessage) => void
}

type NewtailMediaSearchProviderProps = React.PropsWithChildren<
  {
    publisherId?: string
    sponsoredSkusAtTop?: boolean
  } & NewtailMediaSearchProps
>

type ValidVtexEvent =
  | 'vtex:productImpression'
  | 'vtex:productView'
  | 'vtex:productClick'

type GetSkusEventData = {
  'vtex:productImpression': (eventData: ProductImpressionData) => string[]
  'vtex:productView': (eventData: ProductClickData) => string[]
  'vtex:productClick': (eventData: ProductViewData) => string[]
}

type EventData = ProductImpressionData | ProductClickData | ProductViewData

type TagPosition = 'start' | 'end'

type TagPositionAction = {
  [key in TagPosition]: () => void
}
