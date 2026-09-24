import ProductCard from "./ProductCard";
import type { Product } from "../types";

const products: Product[] = [
  {
    id: 1,
    name: "MacBook Air",
    price: 99999,
    category: "Laptop",
    rating: 4.8,
    description: "Lightweight premium laptop for work and creativity.",
  },
  {
    id: 2,
    name: "Sony Headphones",
    price: 12999,
    category: "Audio",
    rating: 4.6,
    description: "Deep immersive sound with all-day comfort.",
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: 4999,
    category: "Keyboard",
    rating: 4.5,
    description: "Responsive keys and premium build quality.",
  },
  {
    id: 4,
    name: "Wireless Mouse",
    price: 2499,
    category: "Mouse",
    rating: 4.4,
    description: "Smooth tracking and ergonomic design.",
  },
];

function ProductGrid() {
  return (
    <section className="page-shell py-12 md:py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="section-label">Our products</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Featured products
          </h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id ?? product._id}
            _id={product._id}
            id={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
            rating={product.rating}
            description={product.description}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;
