import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  className="remove-all"
                  type="button"
                  onClick={() => removeAllCartItems()}
                  data-testid="remove"
                >
                  Remove All
                </button>
                <CartListView />
                <CartSummary
                  totalQuantity={cartList.length}
                  totalAmount={cartList.reduce(
                    (total, item) => total + item.quantity * item.price,
                    0,
                  )}
                />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
