import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, CheckCircle2 } from 'lucide-react';
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
  const [isOrdered, setIsOrdered] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    name: '',
    phone: '',
    address: '',
  });

  const handleWhatsAppCheckout = () => {
    // 1. Order Lines create cheyyunnu
    const orderLines = cart.items.map(
      (item) =>
        `• ${item.product.title} (${item.weight}) x${item.quantity} = ₹${(
          item.price * item.quantity
        ).toLocaleString('en-IN')}`
    );

    // 2. Message format cheyyunnu
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
    const whatsappUrl = `https://wa.me/919946601888?text=${encodedMessage}`;
    
    // 3. WhatsApp open cheyyunnu
    window.open(whatsappUrl, '_blank');

    // 4. Success state kaanikunnu
    setIsOrdered(true);

    // 5. Short delay-kku shesham reset cheyyunnu
    setTimeout(() => {
      clearCart();
      setIsOrdered(false);
      setShowCheckout(false);
      setCheckoutForm({ name: '', phone: '', address: '' });
      closeCart();
    }, 2000);
  };

  const isFormValid = checkoutForm.name.trim() && checkoutForm.phone.trim() && checkoutForm.address.trim();

  return (
    <>
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-50 transition-opacity"
          onClick={closeCart}
        />
      )}

      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md bg-card z-50 transform transition-transform duration-300 ease-out flex flex-col',
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
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

        <div className="flex-1 overflow-y-auto">
          {isOrdered ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-12 w-12 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Order Placed!</h3>
              <p className="text-muted-foreground">Sending details to WhatsApp...</p>
            </div>
          ) : cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button variant="gold" className="mt-4" onClick={closeCart}>
                Continue Shopping
              </Button>
            </div>
          ) : showCheckout ? (
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
                  placeholder="+91 9946601888"
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
            <div className="p-4 space-y-4">
              {cart.items.map((item) => (
                <div key={`${item.product.id}-${item.weight}`} className="flex gap-4 p-3 bg-muted rounded-lg">
                  <img src={item.product.image_url || '/placeholder.svg'} className="w-20 h-20 object-cover rounded-md" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{item.product.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.weight}</p>
                    <p className="text-sm font-semibold mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.weight, item.quantity - 1)}><Minus className="h-3 w-3" /></Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.weight, item.quantity + 1)}><Plus className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive ml-auto" onClick={() => removeFromCart(item.product.id, item.weight)}><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.items.length > 0 && !isOrdered && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Subtotal</span>
              <span className="text-xl font-bold">₹{cart.total.toLocaleString('en-IN')}</span>
            </div>

            {showCheckout ? (
              <div className="space-y-2">
                <Button
                  className="w-full bg-gold hover:bg-gold/90 text-white"
                  onClick={handleWhatsAppCheckout}
                  disabled={!isFormValid}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Place Order via WhatsApp
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setShowCheckout(false)}>Back to Cart</Button>
              </div>
            ) : (
              <Button className="w-full bg-gold hover:bg-gold/90 text-white" onClick={() => setShowCheckout(true)}>Proceed to Checkout</Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;