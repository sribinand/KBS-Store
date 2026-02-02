import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gold/20 border border-gold/30 animate-fade-in">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-gold">Since 1985 • Trusted Quality</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Pure Spices &<br />
            <span className="text-gold">Premium Dry Fruits</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
            Experience the authentic taste of tradition. Hand-selected spices and the finest 
            dry fruits from around the world, delivered fresh to your doorstep.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button asChild variant="gold" size="lg" className="group">
              <Link to="#categories">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-emerald-light">
              <Link to="/category/spices">
                Explore Spices
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-primary-foreground/10 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">100%</div>
              <div className="text-sm text-primary-foreground/60">Pure & Natural</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">500+</div>
              <div className="text-sm text-primary-foreground/60">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">40+</div>
              <div className="text-sm text-primary-foreground/60">Years of Trust</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
