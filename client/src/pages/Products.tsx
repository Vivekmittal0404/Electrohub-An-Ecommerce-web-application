import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("relevance");

  const categories = useMemo(
    () => [
      "All",
      "Laptops",
      "Smartphones",
      "Audio",
      "Accessories",
      "Keyboards",
      "Monitors",
      "Gaming",
      "Storage",
    ],
    [],
  );

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/products", {
          params: {
            search: search.trim(),
            category: selectedCategory !== "All" ? selectedCategory : undefined,
            sort,
          },
        });

        setProducts(response.data);
      } catch {
        setError("Unable to load products right now.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [search, selectedCategory, sort]);

  return (
    <div className="page-shell">
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label">Explore</p>
            <h1 className="text-3xl font-black text-slate-900 md:text-4xl">
              All products
            </h1>
          </div>

          <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 outline-none transition focus:border-blue-500"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                selectedCategory === category
                  ? "border-blue-500 bg-blue-600 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600">
          Loading products...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center text-red-700">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          No products found. Try another search term or select a different
          category.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product._id ?? product.id}
              _id={product._id}
              id={product.id}
              name={product.name}
              price={product.price}
              category={product.category}
              rating={product.rating}
              description={product.description}
              stock={product.stock}
              images={product.images}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
