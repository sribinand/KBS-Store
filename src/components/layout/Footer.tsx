import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">
              <span className="text-accent">KBS</span> Traders
            </h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
              Serving pure spices and premium dry fruits since 1970. 
              Quality you can taste, tradition you can trust.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-accent transition-colors">Spices</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Dry Fruits</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Dates</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Gifting</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span>SH15, opp. Govt HS School, Kannankulangara, Thrippunithura, Ernakulam, Kerala 682301</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <a href="tel:+917907828468" className="hover:text-accent transition-colors">
                  +91 7907828468
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <a href="mailto:info@kbstraders.com" className="hover:text-accent transition-colors">
                  info@kbstraders.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-sm text-primary-foreground/50">
          <p>© 2026 KBS Traders. All rights reserved.</p>
          <p>Created by Creacodes Innovation</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
