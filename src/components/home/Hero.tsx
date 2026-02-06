import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImage from "@/assets/hero-spices.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
     <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      </div>

      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gold/20 border border-gold/30 animate-fade-in">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-gold">Since 1970 • Trusted Quality</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Pure & Authentic Foods <br />
            <span className="text-gold">From Trusted Sources to Your Table</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
        Experience world-class quality with our carefully curated Dates, Nuts, Dry fruits, Spices, Chocolates and luxury gift hampers, delivered fresh to your doorstep.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button asChild variant="gold" size="lg" className="group">
              <a href="#categories">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="
  bg-transparent backdrop-blur-sm
  border border-primary-foreground/30
  text-primary-foreground
  hover:bg-primary-foreground/10
  transition-all duration-300 hover:scale-105
"><Link to="/about-us">
  About Us
</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          {/* <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-primary-foreground/10 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">100%</div>
              <div className="text-sm text-primary-foreground/60">Pure & Natural</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">500+</div>
              <div className="text-sm text-primary-foreground/60">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">50+</div>
              <div className="text-sm text-primary-foreground/60">Years of Trust</div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
