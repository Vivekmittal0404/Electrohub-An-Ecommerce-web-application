import CategoryCard from "./CategoryCard";

interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Laptops",
    icon: "💻",
    description: "Powerful laptops for work and play",
  },
  {
    id: 2,
    name: "Audio",
    icon: "🎧",
    description: "Headphones, speakers and more",
  },
  {
    id: 3,
    name: "Accessories",
    icon: "⌨️",
    description: "Essential tech accessories",
  },
  {
    id: 4,
    name: "Smartphones",
    icon: "📱",
    description: "Latest smartphones and devices",
  },
];

function CategoryGrid() {
  return (
    <section className="page-shell py-12 md:py-16">
      <div className="mb-8">
        <p className="section-label">Explore</p>
        <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
          Shop by Category
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            icon={category.icon}
            description={category.description}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryGrid;
