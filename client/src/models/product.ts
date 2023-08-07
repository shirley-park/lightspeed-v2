export interface product {
  id: number
  name: string
  sku: string
  picture: string
  price: number
}

export interface productInSale extends product {
  quantity: number
}
