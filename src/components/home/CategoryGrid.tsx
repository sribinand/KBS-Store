import { Link } from 'react-router-dom';
import { useCategories } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';

const CategoryGrid = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: categories, isLoading, error } = useCategories();

  if (error) {
    return (
      <section id="categories" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-destructive">Failed to load categories</p>
        </div>
      </section>
    );
  }

  // --- Logic to separate the categories ---
  const priorityNames = ['EXCLUSIVE', 'COMBOS', 'GIFTING', 'OFFERS'];
  
  const priorityCategories = categories?.filter(cat => 
    priorityNames.includes(cat.name.toUpperCase())
  ).sort((a, b) => priorityNames.indexOf(a.name.toUpperCase()) - priorityNames.indexOf(b.name.toUpperCase()));

  const mainCategories = categories?.filter(cat => 
    !priorityNames.includes(cat.name.toUpperCase())
  ).sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

  // Reusable Card Component to keep code clean
  const CategoryCard = ({ category }) => (
    <Link
      key={category.id}
      to={`/category/${category.slug}`}
      className="group flex flex-col items-center transition-all duration-300"
    >
      <div className="relative w-30 h-30 md:w-36 md:h-36 flex items-center justify-center bg-white rounded-xl overflow-hidden group-hover:shadow-md transition-all">
        <img
          src={category.image_url || '/placeholder.svg'}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-sm md:text-base font-bold text-gray-800 group-hover:text-primary transition-colors uppercase tracking-tight">
          {category.name}
        </h3>
      </div>
    </Link>
  );

  return (
    <section id="categories" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        
        {/* 1. TOP SECTION: Exclusive, Combos, Gifting, Offers */}
        {!isLoading && priorityCategories?.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 mb-16 justify-center">
            {priorityCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}

        {/* 2. SECTION HEADER */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Explore our premium collection of dry fruits, spices, and more
          </p>
        </div>

        {/* 3. MAIN CATEGORY GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8 stagger-children">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <Skeleton className="w-28 h-28 md:w-36 md:h-36 rounded-xl" />
                  <Skeleton className="w-20 h-4 mt-4" />
                </div>
              ))
            : mainCategories?.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;