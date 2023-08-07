import { cartItemWithProductData } from './Sellscreen'
import { ChangeEvent } from 'react'

interface singleItem {
  item: cartItemWithProductData
  // function takes in id, returns nothing
  handleDelete: (id: number) => void
  updateItemQuantity: (id: number, quantity: number) => void
}

// ;<SingleProduct properties/props="abc" />
// export function SingleProduct(props: singleItem) {
export function SingleProduct(props: singleItem) {
  // const properties/props = props.properties/props
  const item = props.item
  const handleDelete = props.handleDelete

  const updateItemQuantity = props.updateItemQuantity

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // use id to find the product in the cartArray
    updateItemQuantity(item.id, parseInt(e.target.value))

    // move into parent
    // const updatedCartArray = cartArray.map((item) => {
    //   if (item.id !== id) {
    //     return item
    //   } else {
    //     return {
    //       id: id,
    //       quantity: parseInt(e.target.value),
    //     }
    //   }
    // })

    // setCartArray(updatedCartArray)
  }

  return (
    <div key={item.id}>
      <div className="productContainer">
        <div className="containerLeft">
          <input
            className="productQty"
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) => handleChange(e)}
            // onBlur so that total updates with input not in focus
            onBlur={(e) => handleChange(e)}
          />
          <p>{item.name}</p>
        </div>
        <div className="containerRight">
          <p>{(item.price * item.quantity).toFixed(2)}</p>

          <button
            className="deleteButton"
            onClick={() => handleDelete(item.id)}
          >
            <span className="material-symbols-outlined">delete</span>{' '}
          </button>
        </div>
      </div>
    </div>
  )
}
