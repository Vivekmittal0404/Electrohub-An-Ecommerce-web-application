import ProductCard from './ProductCard'
import type { Product } from '../types/product'

const products: Product[] = [
  {
    id: 1,
    name: 'MacBook Air',
    price: 99999,
    category: 'Laptop',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Sony Headphones',
    price: 12999,
    category: 'Audio',
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    price: 4999,
    category: 'Keyboard',
    rating: 4.5,
  },
  {
    id: 4,
    name: 'Wireless Mouse',
    price: 2499,
    category: 'Mouse',
    rating: 4.4,
  },
]

function ProductGrid() {
  return (
    <section className="products-section">
      <div className="section-heading">
        <p>OUR PRODUCTS</p>
        <h2>Featured Products</h2>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
            rating={product.rating}
          />
        ))}
      </div>
    </section>
  )
}

export default ProductGrid