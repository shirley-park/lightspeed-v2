import { useState } from 'react'
import { SingleProduct } from './Singleproduct'
import { useFetchProducts } from './hooks/useFetchProducts'

export interface cartItem {
  id: number
  quantity: number
}

export interface cartItemWithProductData {
  id: number
  name: string
  sku: string
  picture: string
  price: number
  quantity: number
}

export function Sellscreen() {
  const allProducts = useFetchProducts()
  console.log(allProducts)

  const getProductById = (id: number) =>
    allProducts.find((item) => item.id === id)

  // sale/cart state
  const [cartArray, setCartArray] = useState([] as cartItem[])

  const cartArrayWithProductData = cartArray.map((item) => {
    const productDetails = getProductById(item.id)!
    return {
      id: item.id,
      name: productDetails.name,
      sku: productDetails.sku,
      picture: productDetails.picture,
      price: productDetails.price,
      quantity: item.quantity,
    }
  })

  const handleAddProduct = () => {
    const randomProduct =
      allProducts[Math.floor(Math.random() * allProducts.length)]

    const newCartItem = {
      id: randomProduct.id,
      quantity: 1,
    }

    // check if randomProduct exists in array,
    const checkIndex = cartArray.findIndex(
      (item) => item.id === randomProduct.id
    )
    if (checkIndex !== -1) {
      // shouldn't be mutating original array?
      // update copy of cartArray
      const copiedArray = [...cartArray]
      copiedArray[checkIndex].quantity++
      setCartArray(copiedArray)

      // cartArray[checkIndex].quantity++
      // setCartArray([...cartArray])
    } else {
      setCartArray([...cartArray, newCartItem])
    }
  }

  const handleDelete = (id: number) => {
    setCartArray(cartArray.filter((item) => item.id !== id))
  }

  const updateItemQuantity = (id: number, newQuantity: number) => {
    // update the quantity given an id and a new quantity
    // use id to find the product in the cartArray
    const updatedCartArray = cartArray.map((item) => {
      if (item.id !== id) {
        return item
      } else {
        return {
          id: id,
          quantity: newQuantity,
        }
      }
    })

    setCartArray(updatedCartArray)
  }

  const handlePay = () => {
    setCartArray([])
  }

  const cartSubTotals = cartArrayWithProductData.map((item) => {
    return item.quantity * item.price
  })

  let cartTotal = 0

  cartSubTotals.forEach((num) => {
    cartTotal += num
  })

  return (
    <>
      <div className="screenContainer">
        <div>
          {cartArrayWithProductData.map((item) => (
            <SingleProduct
              key={item.id}
              item={item}
              handleDelete={() => handleDelete(item.id)}
              updateItemQuantity={updateItemQuantity}
              // handleChange={() => handleChange()}
            />
          ))}

          {/* onClick, button will add random product to cart */}
          <button
            className="addProductButton cartButtons"
            onClick={handleAddProduct}
          >
            Add product
          </button>
        </div>

        <div className="payButtonContainer">
          <button className="payButton cartButtons" onClick={handlePay}>
            {' '}
            <div className="payButtonDiv">
              <div className="buttonLeftDiv">
                <p>Pay</p>
                <p className="totalQty">{cartArray.length} items</p>
              </div>
              <div className="buttonRightDiv">
                <p className="totalToPay">${cartTotal.toFixed(2)}</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  )
}
