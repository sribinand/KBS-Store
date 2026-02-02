import { Link } from 'react-router-dom';
import { useCategories } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

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
            Explore our premium collection of dry fruits, spices, and more
          </p>
        </div>

        {/* Category Grid - 12 കാറ്റഗറികൾക്ക് അനുയോജ്യമായ രീതിയിൽ മാറ്റിയത് */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8 stagger-children">
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full" />
                  <Skeleton className="w-20 h-4 mt-4" />
                </div>
              ))
            : categories?.sort((a, b) => (a.display_order || 0) - (b.display_order || 0)).map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="group flex flex-col items-center transition-all duration-300"
                >
                  {/* Circle Image Container */}
                  <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-md transition-all">
                    <img
                      src={category.image_url || '/placeholder.svg'}
                      alt={category.name}
                      className="w-3/4 h-3/4 object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content - Text below */}
                  <div className="mt-4 text-center">
                    <h3 className="text-sm md:text-base font-bold text-gray-800 group-hover:text-primary transition-colors uppercase tracking-tight">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;