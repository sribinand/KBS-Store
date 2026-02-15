export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  display_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  title: string;
  description: string | null;
  category_id: string | null;
  image_url: string | null;
  price_250g: number | null;
  price_500g: number | null;
  price_1kg: number | null;
  pcs: number | null;  
  nos: number | null;   
  pac: number | null;
  is_sold_out: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export type WeightOption = '250g' | '500g' | '1kg' | 'pcs' | 'nos' | 'pac';

export interface CartItem {
  product: Product;
  weight: WeightOption;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface CheckoutForm {
  name: string;
  phone: string;
  address: string;
}
