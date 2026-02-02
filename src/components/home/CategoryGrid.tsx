import { Link } from 'react-router-dom';
import { useCategories } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';

const CategoryGrid = () => {
  const { data: categories, isLoading, error } = useCategories();

  if (error) {
    return (
      <section id="categories" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <p className="text-center text-destructive">Failed to load categories</p>
        </div>
      </section>
    );
  }

  return (
    <section id="categories" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Explore our carefully curated collection of premium spices, nuts, and dry fruits
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 stagger-children">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] rounded-lg overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </div>
              ))
            : categories?.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="group relative aspect-[4/5] rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300"
                >
                  {/* Image */}
                  <img
                    src={category.image_url || '/placeholder.svg'}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-2">
                      {category.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gold text-sm font-medium opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <span>Explore</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
