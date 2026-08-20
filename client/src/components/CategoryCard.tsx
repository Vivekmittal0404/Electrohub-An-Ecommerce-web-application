interface CategoryCardProps {
  name: string
  icon: string
  description: string
}

function CategoryCard({
  name,
  icon,
  description,
}: CategoryCardProps) {
  return (
    <article className="category-card">
      <div className="category-icon">
        {icon}
      </div>

      <h3>{name}</h3>

      <p>{description}</p>

      <button>Explore</button>
    </article>
  )
}

export default CategoryCard