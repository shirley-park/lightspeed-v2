import request from 'superagent'
import { product } from '../models/product'

export function getProducts(): Promise<product[]> {
  return request
    .get('https://otx0e1z2lg.execute-api.us-west-2.amazonaws.com/products')
    .then((res) => {
      return res.body
    })
    .catch((err) => {
      console.log('Err message:' + err)
    })
}

// const productsUrl = '/api/v1/products'

// export function getProducts(): Promise<product[]> {
//   return request.get(productsUrl).then((res) => res.body)
// }
