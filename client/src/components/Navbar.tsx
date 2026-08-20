import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <h2>
        <Link to="/">ElectroHub</Link>
      </h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  )
}

export default Navbar