import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogOut, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useCategories, useProducts } from '@/hooks/useProducts';
import { toast } from 'sonner';
import { Product } from '@/types/store';

const ADMIN_PASSWORD = 'kbs2024'; // Simple password protection

const AdminPage = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const { data: categories } = useCategories();
  const { data: products, refetch: refetchProducts } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    image_url: '',
    price_250g: '',
    price_500g: '',
    price_1kg: '',
    is_sold_out: false,
    is_featured: false,
  });

  useEffect(() => {
    const saved = sessionStorage.getItem('kbs_admin');
    if (saved === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('kbs_admin', 'true');
      toast.success('Welcome, Admin!');
    } else {
      toast.error('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('kbs_admin');
    navigate('/');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category_id: '',
      image_url: '',
      price_250g: '',
      price_500g: '',
      price_1kg: '',
      is_sold_out: false,
      is_featured: false,
    });
    setEditingProduct(null);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description || '',
      category_id: product.category_id || '',
      image_url: product.image_url || '',
      price_250g: product.price_250g?.toString() || '',
      price_500g: product.price_500g?.toString() || '',
      price_1kg: product.price_1kg?.toString() || '',
      is_sold_out: product.is_sold_out,
      is_featured: product.is_featured,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      title: formData.title,
      description: formData.description || null,
      category_id: formData.category_id || null,
      image_url: formData.image_url || null,
      price_250g: formData.price_250g ? parseFloat(formData.price_250g) : null,
      price_500g: formData.price_500g ? parseFloat(formData.price_500g) : null,
      price_1kg: formData.price_1kg ? parseFloat(formData.price_1kg) : null,
      is_sold_out: formData.is_sold_out,
      is_featured: formData.is_featured,
    };

    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        
        if (error) throw error;
        toast.success('Product updated!');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        
        if (error) throw error;
        toast.success('Product added!');
      }
      
      setIsDialogOpen(false);
      resetForm();
      refetchProducts();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      toast.success('Product deleted!');
      refetchProducts();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete product');
    }
  };

  const toggleSoldOut = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_sold_out: !product.is_sold_out })
        .eq('id', product.id);
      
      if (error) throw error;
      toast.success(product.is_sold_out ? 'Product is now available' : 'Product marked as sold out');
      refetchProducts();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update product');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-emerald p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button type="submit" variant="gold" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-primary text-primary-foreground py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="font-display text-xl font-bold">KBS Traders Admin</h1>
          <Button variant="ghost" onClick={handleLogout} className="text-primary-foreground hover:bg-emerald-light">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Add Product Button */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground">Products</h2>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button variant="gold">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-display">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="price_250g">Price (250g)</Label>
                    <Input
                      id="price_250g"
                      type="number"
                      value={formData.price_250g}
                      onChange={(e) => setFormData({ ...formData, price_250g: e.target.value })}
                      placeholder="₹"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price_500g">Price (500g)</Label>
                    <Input
                      id="price_500g"
                      type="number"
                      value={formData.price_500g}
                      onChange={(e) => setFormData({ ...formData, price_500g: e.target.value })}
                      placeholder="₹"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price_1kg">Price (1kg)</Label>
                    <Input
                      id="price_1kg"
                      type="number"
                      value={formData.price_1kg}
                      onChange={(e) => setFormData({ ...formData, price_1kg: e.target.value })}
                      placeholder="₹"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_sold_out"
                      checked={formData.is_sold_out}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_sold_out: checked })}
                    />
                    <Label htmlFor="is_sold_out">Sold Out</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                    />
                    <Label htmlFor="is_featured">Featured</Label>
                  </div>
                </div>
                <Button type="submit" variant="gold" className="w-full">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Products Table */}
        <div className="bg-card rounded-lg shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground">Product</th>
                  <th className="text-left p-4 font-semibold text-foreground hidden md:table-cell">Category</th>
                  <th className="text-left p-4 font-semibold text-foreground hidden sm:table-cell">Price (250g)</th>
                  <th className="text-center p-4 font-semibold text-foreground">Status</th>
                  <th className="text-right p-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products?.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image_url || '/placeholder.svg'}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <span className="font-medium text-foreground">{product.title}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">
                      {product.category?.name || '-'}
                    </td>
                    <td className="p-4 text-foreground hidden sm:table-cell">
                      {product.price_250g ? `₹${product.price_250g}` : '-'}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleSoldOut(product)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          product.is_sold_out
                            ? 'bg-destructive/10 text-destructive'
                            : 'bg-emerald/10 text-emerald'
                        }`}
                      >
                        {product.is_sold_out ? 'Sold Out' : 'In Stock'}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(product)}
                          className="h-8 w-8"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
