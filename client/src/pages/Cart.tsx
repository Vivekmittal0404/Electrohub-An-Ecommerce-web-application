import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getCartTotal,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <section className="cart-empty">
          <p className="section-label">YOUR CART</p>

          <h1>Your cart is empty.</h1>

          <p>Add some products to your cart and they will appear here.</p>

          <Link to="/products">Continue Shopping</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <section className="cart-header">
        <p className="section-label">YOUR CART</p>

        <h1>Shopping Cart</h1>

        <p>Review your products before checkout.</p>
      </section>

      <section className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-item-image">
                <span>{item.category}</span>
              </div>

              <div className="cart-item-info">
                <h2>{item.name}</h2>

                <p>{item.category}</p>

                <p>₹{item.price.toLocaleString("en-IN")}</p>
              </div>

              <div className="cart-quantity">
                <button onClick={() => decreaseQuantity(item.id)}>−</button>

                <span>{item.quantity}</span>

                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>

              <div className="cart-item-total">
                <strong>
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </strong>

                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div>
            <span>Subtotal</span>

            <strong>₹{getCartTotal().toLocaleString("en-IN")}</strong>
          </div>

          <div>
            <span>Delivery</span>

            <strong>FREE</strong>
          </div>

          <hr />

          <div>
            <span>Total</span>

            <strong>₹{getCartTotal().toLocaleString("en-IN")}</strong>
          </div>

          <button onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </aside>
      </section>
    </main>
  );
}

export default Cart;
