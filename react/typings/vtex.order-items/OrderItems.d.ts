type DataUpdate = {
  uniqueId: string
  quantity: number
}

declare module 'vtex.order-items/OrderItems' {
  export const useOrderItems: () => { updateQuantity(data: DataUpdate): void }
}
