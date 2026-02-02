import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/CartContext';
import { CheckoutForm } from '@/types/store';
import { cn } from '@/lib/utils';

const CartSidebar = () => {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart, clearCart, itemCount } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    name: '',
    phone: '',
    address: '',
  });

  const handleWhatsAppCheckout = () => {
    const orderLines = cart.items.map(
      (item) =>
        `• ${item.product.title} (${item.weight}) x${item.quantity} = ₹${(
          item.price * item.quantity
        ).toLocaleString('en-IN')}`
    );

    const message = `🛒 *New Order from KBS Traders*

*Customer Details:*
Name: ${checkoutForm.name}
Phone: ${checkoutForm.phone}
Address: ${checkoutForm.address}

*Order Details:*
${orderLines.join('\n')}

*Subtotal: ₹${cart.total.toLocaleString('en-IN')}*

Thank you for your order!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919876543210?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    closeCart();
    setShowCheckout(false);
    setCheckoutForm({ name: '', phone: '', address: '' });
  };

  const isFormValid = checkoutForm.name.trim() && checkoutForm.phone.trim() && checkoutForm.address.trim();

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-50 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md bg-card z-50 transform transition-transform duration-300 ease-out flex flex-col',
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="font-display text-xl font-semibold text-foreground">
              Your Cart {itemCount > 0 && `(${itemCount})`}
            </h2>
          </div>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button variant="gold" className="mt-4" onClick={closeCart}>
                Continue Shopping
              </Button>
            </div>
          ) : showCheckout ? (
            /* Checkout Form */
            <div className="p-4 space-y-4 animate-fade-in">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={checkoutForm.name}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={checkoutForm.phone}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="address"
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                  placeholder="Enter your full address"
                  className="mt-1 min-h-[100px]"
                />
              </div>
            </div>
          ) : (
            /* Cart Items */
            <div className="p-4 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={`${item.product.id}-${item.weight}`}
                  className="flex gap-4 p-3 bg-muted rounded-lg animate-fade-in"
                >
                  <img
                    src={item.product.image_url || '/placeholder.svg'}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">
                      {item.product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.weight}</p>
                    <p className="text-sm font-semibold text-foreground mt-1">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.product.id, item.weight, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.product.id, item.weight, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive ml-auto"
                        onClick={() => removeFromCart(item.product.id, item.weight)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-foreground">Subtotal</span>
              <span className="text-xl font-bold text-foreground">
                ₹{cart.total.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Action Buttons */}
            {showCheckout ? (
              <div className="space-y-2">
                <Button
                  className="w-full"
                  variant="gold"
                  onClick={handleWhatsAppCheckout}
                  disabled={!isFormValid}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Place Order via WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowCheckout(false)}
                >
                  Back to Cart
                </Button>
              </div>
            ) : (
              <Button
                className="w-full"
                variant="gold"
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
