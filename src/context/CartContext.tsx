import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CartItem, Product, WeightOption, Cart } from '@/types/store';

interface CartContextType {
  cart: Cart;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, weight: WeightOption) => void;
  removeFromCart: (productId: string, weight: WeightOption) => void;
  updateQuantity: (productId: string, weight: WeightOption, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const getPrice = (product: Product, weight: WeightOption): number => {
  switch (weight) {
    case '250g':
      return product.price_250g || 0;
    case '500g':
      return product.price_500g || 0;
    case '1kg':
      return product.price_1kg || 0;
    default:
      return 0;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const calculateTotal = useCallback((items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const addToCart = useCallback((product: Product, weight: WeightOption) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.items.findIndex(
        (item) => item.product.id === product.id && item.weight === weight
      );

      let newItems: CartItem[];

      if (existingIndex >= 0) {
        newItems = prevCart.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const price = getPrice(product, weight);
        newItems = [
          ...prevCart.items,
          { product, weight, quantity: 1, price },
        ];
      }

      return { items: newItems, total: calculateTotal(newItems) };
    });
    openCart();
  }, [calculateTotal, openCart]);

  const removeFromCart = useCallback((productId: string, weight: WeightOption) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter(
        (item) => !(item.product.id === productId && item.weight === weight)
      );
      return { items: newItems, total: calculateTotal(newItems) };
    });
  }, [calculateTotal]);

  const updateQuantity = useCallback(
    (productId: string, weight: WeightOption, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId, weight);
        return;
      }

      setCart((prevCart) => {
        const newItems = prevCart.items.map((item) =>
          item.product.id === productId && item.weight === weight
            ? { ...item, quantity }
            : item
        );
        return { items: newItems, total: calculateTotal(newItems) };
      });
    },
    [calculateTotal, removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCart({ items: [], total: 0 });
  }, []);

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
