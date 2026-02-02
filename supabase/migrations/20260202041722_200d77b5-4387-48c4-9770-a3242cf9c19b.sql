-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  image_url TEXT,
  price_250g DECIMAL(10,2),
  price_500g DECIMAL(10,2),
  price_1kg DECIMAL(10,2),
  is_sold_out BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public read access for categories (everyone can browse)
CREATE POLICY "Categories are viewable by everyone" 
ON public.categories 
FOR SELECT 
USING (true);

-- Public read access for products (everyone can browse)
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Insert default categories
INSERT INTO public.categories (name, slug, image_url, display_order) VALUES
('Dates', 'dates', 'https://images.unsplash.com/photo-1593001872095-b73d5f13b5f4?w=400', 1),
('Nuts', 'nuts', 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400', 2),
('Spices', 'spices', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400', 3),
('Dry Fruits', 'dry-fruits', 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?w=400', 4),
('Chocolates', 'chocolates', 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400', 5),
('Seeds', 'seeds', 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400', 6);

-- Insert sample products
INSERT INTO public.products (title, description, category_id, image_url, price_250g, price_500g, price_1kg) VALUES
('Medjool Dates', 'Premium quality Medjool dates, naturally sweet and soft', (SELECT id FROM public.categories WHERE slug = 'dates'), 'https://images.unsplash.com/photo-1593001872095-b73d5f13b5f4?w=400', 299, 549, 999),
('Ajwa Dates', 'Sacred Ajwa dates from Madinah, rich and soft texture', (SELECT id FROM public.categories WHERE slug = 'dates'), 'https://images.unsplash.com/photo-1596097635121-14b63a7b3f19?w=400', 549, 999, 1849),
('California Almonds', 'Premium raw California almonds, crunchy and fresh', (SELECT id FROM public.categories WHERE slug = 'nuts'), 'https://images.unsplash.com/photo-1574570173583-35987a63cc6a?w=400', 249, 449, 849),
('Cashew Nuts', 'Whole cashew nuts, creamy and delicious', (SELECT id FROM public.categories WHERE slug = 'nuts'), 'https://images.unsplash.com/photo-1604339454148-1c3d3e4dc tried?w=400', 299, 549, 1049),
('Kashmir Saffron', 'Pure Kashmiri saffron threads, aromatic and authentic', (SELECT id FROM public.categories WHERE slug = 'spices'), 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400', 499, 899, 1699),
('Black Pepper', 'Whole black peppercorns, freshly sourced', (SELECT id FROM public.categories WHERE slug = 'spices'), 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400', 99, 179, 329),
('Golden Raisins', 'Sweet and plump golden raisins', (SELECT id FROM public.categories WHERE slug = 'dry-fruits'), 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?w=400', 149, 279, 499),
('Dried Apricots', 'Soft and tangy Turkish apricots', (SELECT id FROM public.categories WHERE slug = 'dry-fruits'), 'https://images.unsplash.com/photo-1597595825771-c34ab8afef68?w=400', 199, 369, 699),
('Belgian Dark Chocolate', 'Rich 70% dark chocolate from Belgium', (SELECT id FROM public.categories WHERE slug = 'chocolates'), 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400', 349, 649, 1199),
('Chia Seeds', 'Organic chia seeds, superfood for health', (SELECT id FROM public.categories WHERE slug = 'seeds'), 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400', 179, 329, 599),
('Pumpkin Seeds', 'Roasted pumpkin seeds, lightly salted', (SELECT id FROM public.categories WHERE slug = 'seeds'), 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=400', 199, 369, 699);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();