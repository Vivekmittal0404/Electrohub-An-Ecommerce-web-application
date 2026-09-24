import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [formState, setFormState] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="page-shell">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="section-label">Checkout</p>
          <h1 className="text-3xl font-bold text-slate-900">
            Your cart is empty.
          </h1>
          <p className="mt-3 text-slate-600">
            Add products to your cart before proceeding to checkout.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (field: string, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      setError("Please log in before placing an order.");
      return;
    }

    if (Object.values(formState).some((value) => !String(value).trim())) {
      setError("Please complete all delivery details.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        items: cartItems.map((item) => ({
          productId: item._id || item.id,
          quantity: item.quantity,
        })),
        shippingAddress: { ...formState },
        paymentMethod: "COD",
      };

      await api.post("/orders", payload);
      clearCart();
      navigate("/orders");
    } catch (err) {
      const message =
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data
          ? String(err.response.data.message)
          : err instanceof Error
            ? err.message
            : "Unable to place your order right now.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="mb-8">
        <p className="section-label">Checkout</p>
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">
          Complete your order
        </h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Contact information
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input
                  value={formState.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formState.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Delivery address
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Street address
                </label>
                <input
                  value={formState.street}
                  onChange={(e) => handleChange("street", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="House number, street name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  City
                </label>
                <input
                  value={formState.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Bengaluru"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  State
                </label>
                <input
                  value={formState.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Karnataka"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  PIN code
                </label>
                <input
                  value={formState.postalCode}
                  onChange={(e) => handleChange("postalCode", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="560001"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Country
                </label>
                <input
                  value={formState.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-bold text-slate-900">Order summary</h2>

          <div className="mt-5 space-y-4">
            {cartItems.map((item) => (
              <div
                key={(item._id || item.id || item.name).toString()}
                className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3"
              >
                <div>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-slate-900">
                  ₹
                  {(Number(item.price) * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-slate-200 pt-4 text-sm text-slate-600">
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
            <div className="flex items-center justify-between text-base font-bold text-slate-900">
              <span>Total</span>
              <span>₹{getCartTotal().toLocaleString("en-IN")}</span>
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Placing order..." : "Place order"}
          </button>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
