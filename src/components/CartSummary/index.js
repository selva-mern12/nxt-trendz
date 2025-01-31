import './index.css'

const CartSummary = props => {
  const {totalQuantity, totalAmount} = props
  return (
    <div className="cart-summary">
      <h1>
        Order Total: <span className="amount">{totalAmount}</span>
      </h1>
      <p className="summary-quantity">{totalQuantity} Items in cart</p>
      <button className="checkout-button" type="button">
        Checkout
      </button>
    </div>
  )
}
export default CartSummary
