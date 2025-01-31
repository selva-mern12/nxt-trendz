import {useState} from 'react'
import {Popup} from 'reactjs-popup'
import './index.css'

const paymentMethods = [
  {id: 'pm-101', name: 'Credit Card'},
  {id: 'pm-202', name: 'Debit Card'},
  {id: 'pm-303', name: 'PayPal'},
  {id: 'pm-404', name: 'Apple Pay'},
  {id: 'pm-505', name: 'Google Pay'},
  {id: 'pm-606', name: 'Amazon Pay'},
  {id: 'pm-707', name: 'UPI'},
  {id: 'pm-808', name: 'Net Banking'},
  {id: 'pm-909', name: 'Cash on Delivery'},
  {id: 'pm-111', name: 'Cryptocurrency'},
  {id: 'pm-222', name: 'Gift Card'},
  {id: 'pm-333', name: 'EMI (Installments)'},
  {id: 'pm-444', name: 'Wallet Balance'},
]

const CartSummary = props => {
  const {totalQuantity, totalAmount} = props
  const [selectedPayment, setSelectedPayment] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleOrderConfirm = close => {
    setOrderPlaced(true)
    // Close the popup after showing the message
    setTimeout(() => {
      setOrderPlaced(false)
      close() // Close the popup after the success message
    }, 3000) // Adjust the time for how long the popup stays open after confirmation
  }

  return (
    <div className="cart-summary">
      <h1>
        Order Total: <span className="amount">{totalAmount}</span>
      </h1>
      <p className="summary-quantity">{totalQuantity} Items in cart</p>
      <Popup
        modal
        trigger={
          <button className="button" type="button">
            Checkout
          </button>
        }
      >
        {close => (
          <div className="popup-bg-container">
            <div className="popup-container">
              {orderPlaced ? (
                <h3 className="success-message">
                  ✅ Your order has been placed successfully!
                </h3>
              ) : (
                <>
                  <h5>Payment Methods</h5>
                  <ul className="payment-list">
                    {paymentMethods.map(payment => (
                      <li
                        key={payment.id}
                        className={
                          payment.id === 'pm-909' ? 'list active' : 'list'
                        }
                      >
                        <input
                          type="radio"
                          value={payment.name}
                          id={payment.id}
                          className={
                            payment.id === 'pm-909' ? 'input active' : 'input'
                          }
                          disabled={payment.id !== 'pm-909'}
                          checked={selectedPayment === payment.name}
                          onChange={event =>
                            setSelectedPayment(event.target.value)
                          }
                        />
                        <label
                          htmlFor={payment.id}
                          className={
                            payment.id === 'pm-909' ? 'label active' : 'label'
                          }
                        >
                          {payment.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <button
                      type="button"
                      className="button"
                      onClick={() => close()}
                    >
                      Order Cancel
                    </button>
                    <button
                      type="button"
                      className="button"
                      onClick={() => handleOrderConfirm(close)}
                    >
                      Order Confirm
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </Popup>
    </div>
  )
}

export default CartSummary
