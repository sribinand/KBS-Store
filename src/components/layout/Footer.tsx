import { MapPin, Phone, Clock, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">KBS Traders</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Legacy Spice & Dry Fruit Store. Premium quality spices, nuts, and dry fruits 
              sourced from the finest origins around the world.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-gold">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-gold" />
                <span className="text-primary-foreground/80">
                  123 Spice Market, Old City<br />
                  Mumbai, Maharashtra 400001
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold" />
                <span className="text-primary-foreground/80">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold" />
                <span className="text-primary-foreground/80">hello@kbstraders.com</span>
              </div>
            </div>
          </div>

          {/* Store Hours */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-gold">Store Hours</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gold" />
                <div className="text-primary-foreground/80">
                  <p>Mon - Sat: 9:00 AM - 9:00 PM</p>
                  <p>Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-emerald-light">
          <p className="text-center text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} KBS Traders. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
