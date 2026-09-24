import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import type { Order } from "../types";

function Orders() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    api
      .get("/orders")
      .then((response) => setOrders(response.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="page-shell">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="section-label">Orders</p>
          <h1 className="text-3xl font-bold text-slate-900">
            Login to view your orders
          </h1>
          <Link
            to="/login"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-shell text-center text-slate-600">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="section-label">Your orders</p>
          <h1 className="text-3xl font-bold text-slate-900">Order history</h1>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          You have no orders yet.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Order ID</p>
                  <p className="font-semibold text-slate-900">
                    {order._id.slice(-8)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <p className="font-semibold text-blue-600">{order.status}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="font-semibold text-slate-900">
                    ₹{order.total.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                {order.items.map((item) => (
                  <div
                    key={`${order._id}-${item.productId}`}
                    className="flex items-center justify-between py-2 text-sm text-slate-600"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
