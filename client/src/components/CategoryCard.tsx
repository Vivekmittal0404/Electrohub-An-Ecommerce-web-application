import { Link } from "react-router-dom";

interface CategoryCardProps {
  name: string;
  icon: string;
  description: string;
}

function CategoryCard({ name, icon, description }: CategoryCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-slate-900">{name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>

      <Link
        to="/products"
        className="mt-5 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
      >
        Explore
      </Link>
    </article>
  );
}

export default CategoryCard;
