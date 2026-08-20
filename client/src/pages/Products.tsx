import ProductGrid from '../components/ProductGrid'

function Products() {
  return (
    <main className="products-page">
      <div className="products-header">
        <p>EXPLORE</p>
        <h1>All Products</h1>
        <span>Discover the latest products on ElectroHub.</span>
      </div>

      <ProductGrid />
    </main>
  )
}

export default Products