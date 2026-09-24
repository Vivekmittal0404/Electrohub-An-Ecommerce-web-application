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
      <main className="page-shell">
        <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="section-label">Your cart</p>
          <h1 className="text-3xl font-black text-slate-900">
            Your cart is empty.
          </h1>
          <p className="mt-3 text-slate-600">
            Add some products to your cart and they will appear here.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Continue shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="mb-8">
        <p className="section-label">Your cart</p>
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">
          Shopping cart
        </h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          {cartItems.map((item) => {
            const itemId = (item._id || item.id || item.name).toString();

            return (
              <article
                key={itemId}
                className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"
              >
                <div className="flex h-24 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-blue-50 text-sm font-bold text-slate-700 sm:w-28">
                  {item.category}
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-900">
                    {item.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                  <p className="mt-2 text-lg font-bold text-slate-900">
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-center">
                  <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-2 py-2">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(itemId)}
                      className="h-8 w-8 rounded-full bg-slate-900 text-lg font-bold text-white transition hover:bg-blue-600"
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center font-semibold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(itemId)}
                      className="h-8 w-8 rounded-full bg-slate-900 text-lg font-bold text-white transition hover:bg-blue-600"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(itemId)}
                    className="text-sm font-semibold text-red-600 transition hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <p className="text-lg font-black text-slate-900 sm:min-w-28 sm:text-right">
                  ₹
                  {(Number(item.price) * item.quantity).toLocaleString("en-IN")}
                </p>
              </article>
            );
          })}
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-bold text-slate-900">Order summary</h2>

          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <strong className="text-slate-900">
                ₹{getCartTotal().toLocaleString("en-IN")}
              </strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <strong className="text-slate-900">Free</strong>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
              <span>Total</span>
              <span>₹{getCartTotal().toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Proceed to checkout
          </button>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
