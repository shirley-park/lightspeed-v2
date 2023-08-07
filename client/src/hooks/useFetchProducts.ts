import { getProducts } from '../api'
import { useState, useEffect } from 'react'
import { product } from '../models/product'

export function useFetchProducts() {
  const [products, setProducts] = useState([] as product[])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    getProducts().then((productArr) => {
      setProducts(productArr)
    })
  }

  return products
}
