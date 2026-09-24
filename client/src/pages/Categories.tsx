import { Link } from "react-router-dom";

const categories = [
  {
    name: "Laptops",
    icon: "💻",
    description: "Powerful laptops for work and play.",
  },
  { name: "Audio", icon: "🎧", description: "Headphones, speakers and more." },
  {
    name: "Accessories",
    icon: "⌨️",
    description: "Essential technology accessories.",
  },
  {
    name: "Smartphones",
    icon: "📱",
    description: "Latest smartphones and devices.",
  },
];

function Categories() {
  return (
    <div className="page-shell">
      <div className="mb-8">
        <p className="section-label">Shop by category</p>
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">
          Browse categories
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              {category.icon}
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {category.name}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {category.description}
            </p>
            <Link
              to="/products"
              className="mt-5 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
            >
              Explore
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
