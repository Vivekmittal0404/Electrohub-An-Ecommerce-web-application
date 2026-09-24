import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";

function ProductCard({
  _id,
  id,
  name,
  price,
  category,
  rating,
  description,
}: Product) {
  const { addToCart } = useCart();

  const product: Product = {
    _id,
    id,
    name,
    price,
    category,
    rating,
    description,
  };

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50">
        <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
          {category}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{name}</h3>
          <p className="mt-1 text-sm text-slate-500">⭐ {rating ?? 4.5}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-2xl font-black text-slate-900">
            ₹{price.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/products/${_id ?? id}`}
            className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-center text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
          >
            View
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
