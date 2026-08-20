import type { Product } from '../types/product'
import { useCart } from '../context/CartContext'

function ProductCard({
  id,
  name,
  price,
  category,
  rating,
}: Product) {

  const { addToCart } = useCart()

  const product: Product = {
    id,
    name,
    price,
    category,
    rating,
  }

  return (
    <article className="product-card">

      <div className="product-image">
        <span>{category}</span>
      </div>

      <div className="product-info">

        <h3>{name}</h3>

        <p className="product-rating">
          ⭐ {rating}
        </p>

        <p className="product-price">
          ₹{price.toLocaleString('en-IN')}
        </p>

        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>

      </div>

    </article>
  )
}

export default ProductCard