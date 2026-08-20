import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Checkout() {
  const navigate = useNavigate()

  const {
    cartItems,
    getCartTotal,
  } = useCart()

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">

        <section className="checkout-empty">

          <p className="section-label">
            CHECKOUT
          </p>

          <h1>Your cart is empty.</h1>

          <p>
            Add products to your cart before proceeding to checkout.
          </p>

          <Link to="/products">
            Continue Shopping
          </Link>

        </section>

      </main>
    )
  }

  const handleContinueToPayment = () => {
    navigate('/payment')
  }

  return (
    <main className="checkout-page">

      <section className="checkout-header">

        <p className="section-label">
          CHECKOUT
        </p>

        <h1>Complete Your Order</h1>

        <p>
          Enter your delivery details and review your order.
        </p>

      </section>

      <section className="checkout-content">

        {/* LEFT SIDE */}

        <div className="checkout-form">

          <div className="checkout-card">

            <h2>Contact Information</h2>

            <div className="form-group">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
              />

            </div>

            <div className="form-row">

              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />

              </div>

              <div className="form-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                />

              </div>

            </div>

          </div>


          <div className="checkout-card">

            <h2>Delivery Address</h2>

            <div className="form-group">

              <label htmlFor="address">
                Street Address
              </label>

              <input
                id="address"
                type="text"
                placeholder="House number, street name"
              />

            </div>

            <div className="form-row">

              <div className="form-group">

                <label htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  type="text"
                  placeholder="Enter city"
                />

              </div>

              <div className="form-group">

                <label htmlFor="state">
                  State
                </label>

                <input
                  id="state"
                  type="text"
                  placeholder="Enter state"
                />

              </div>

            </div>

            <div className="form-row">

              <div className="form-group">

                <label htmlFor="pincode">
                  PIN Code
                </label>

                <input
                  id="pincode"
                  type="text"
                  placeholder="Enter PIN code"
                />

              </div>

              <div className="form-group">

                <label htmlFor="country">
                  Country
                </label>

                <input
                  id="country"
                  type="text"
                  value="India"
                  readOnly
                />

              </div>

            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <aside className="checkout-summary">

          <h2>Order Summary</h2>

          <div className="checkout-products">

            {cartItems.map((item) => (

              <div
                className="checkout-product"
                key={item.id}
              >

                <div>

                  <strong>
                    {item.name}
                  </strong>

                  <p>
                    Qty: {item.quantity}
                  </p>

                </div>

                <strong>
                  ₹{(
                    item.price * item.quantity
                  ).toLocaleString('en-IN')}
                </strong>

              </div>

            ))}

          </div>

          <hr />

          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              ₹{getCartTotal().toLocaleString('en-IN')}
            </strong>

          </div>

          <div className="summary-row">

            <span>
              Delivery
            </span>

            <strong>
              FREE
            </strong>

          </div>

          <hr />

          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ₹{getCartTotal().toLocaleString('en-IN')}
            </strong>

          </div>

          <button
            className="continue-payment-button"
            onClick={handleContinueToPayment}
          >
            Continue to Payment
          </button>

        </aside>

      </section>

    </main>
  )
}

export default Checkout