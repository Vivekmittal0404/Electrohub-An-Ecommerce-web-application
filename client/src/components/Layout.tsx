import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Layout({ children }: { children: React.ReactNode }) {
  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-2xl font-black tracking-tight text-slate-900"
          >
            ElectroHub
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`
              }
            >
              Categories
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`
                }
              >
                Orders
              </NavLink>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <NavLink
              to="/products"
              className="hidden rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-600 sm:inline-flex"
            >
              Search
            </NavLink>
            <NavLink
              to="/cart"
              className="relative inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Cart
              <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-blue-500 px-1.5 text-xs font-bold text-white">
                {cartCount}
              </span>
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink
                  to="/profile"
                  className="hidden rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-600 sm:inline-flex"
                >
                  {user?.name?.split(" ")[0] || "Profile"}
                </NavLink>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  className="rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}

export default Layout;
