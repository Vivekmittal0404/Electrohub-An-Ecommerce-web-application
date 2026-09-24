import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/client";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch {
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="page-shell text-center text-slate-600">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-shell">
        <div className="mx-auto max-w-lg rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
          {error || "Product not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="mb-6">
        <Link
          to="/products"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to products
        </Link>
      </div>

      <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-8">
        <div className="flex min-h-80 items-center justify-center rounded-3xl bg-linear-to-br from-slate-100 to-blue-50 text-5xl font-black text-slate-800">
          {product.category}
        </div>

        <div>
          <p className="section-label">Product details</p>
          <h1 className="text-3xl font-black text-slate-900 md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            ⭐ {product.rating ?? 4.5}
          </p>
          <p className="mt-4 text-3xl font-black text-slate-900">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>
          <p className="mt-4 text-slate-600">
            {product.description ||
              "Premium device with excellent value and reliable performance."}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => addToCart(product)}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Add to cart
            </button>
            <Link
              to="/checkout"
              className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
            >
              Buy now
            </Link>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-slate-500">Category</p>
              <p className="mt-1 font-semibold text-slate-900">
                {product.category}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-slate-500">Stock</p>
              <p className="mt-1 font-semibold text-slate-900">
                {product.stock ?? 25} available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
