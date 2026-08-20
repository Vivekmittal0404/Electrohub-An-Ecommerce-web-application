import CategoryCard from './CategoryCard'

interface Category {
  id: number
  name: string
  icon: string
  description: string
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Laptops',
    icon: '💻',
    description: 'Powerful laptops for work and play',
  },
  {
    id: 2,
    name: 'Audio',
    icon: '🎧',
    description: 'Headphones, speakers and more',
  },
  {
    id: 3,
    name: 'Accessories',
    icon: '⌨️',
    description: 'Essential tech accessories',
  },
  {
    id: 4,
    name: 'Smartphones',
    icon: '📱',
    description: 'Latest smartphones and devices',
  },
]

function CategoryGrid() {
  return (
    <section className="categories-section">
      <div className="section-heading">
        <p>EXPLORE</p>
        <h2>Shop by Category</h2>
      </div>

      <div className="category-grid">
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
  )
}

export default CategoryGrid