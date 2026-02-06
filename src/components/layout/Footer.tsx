import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, MessageCircle } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        
        {/* --- MAP SECTION (Top Full Width) --- */}
        <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden border border-primary-foreground/10 mb-12">
          <iframe
            title="KBS Traders Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.3461816033578!2d76.34724677450792!3d9.943071674012783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08739935274861%3A0x37776d0fc870fc5a!2sKBS%20TRADERS!5e1!3m2!1sen!2sin!4v1770401656623!5m2!1sen!2sin"
            className="w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>

        {/* --- 4 COLUMN LINKS SECTION --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          
          {/* Column 1: Brand & Social */}
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-bold uppercase tracking-widest">KBS TRADERS</h1>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@kbstraders.com">info@kbstraders.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+919946601888">+91 9946601888</a>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="leading-relaxed">
                  SH15, opp. Govt HS School, Kannankulangara, Thrippunithura, Kerala 682301
                </span>
              </li>
            </ul>
 

<div className="flex gap-4 mt-2">
  <a href="https://www.instagram.com/kbstraders.in/" className="hover:text-accent transition-colors"><Instagram className="h-5 w-5" /></a>
  <a href="https://www.facebook.com/profile.php?id=61579892137344" className="hover:text-accent transition-colors"><Facebook className="h-5 w-5" /></a>
  <a href="https://www.linkedin.com/company/kbstraderskerala/" className="hover:text-accent transition-colors"><Linkedin className="h-5 w-5" /></a>
  {/* WhatsApp Icon Added */}
  <a href="https://wa.me/919946601888" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
  <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5" />
</a>
</div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="font-bold text-sm uppercase mb-6 tracking-widest">CATEGORIES</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><a href="#categories" className="hover:text-accent">Dates</a></li>
              <li><a href="#categories" className="hover:text-accent">Nuts</a></li>
              <li><a href="#categories" className="hover:text-accent">Dry Fruits</a></li>
              <li><a href="#categories" className="hover:text-accent">Chocolates</a></li>
              <li><a href="#categories" className="hover:text-accent">Spices</a></li>
              <li><a href="#categories" className="hover:text-accent">Seeds</a></li>
            </ul>
          </div>

          {/* Column 3: Know Us */}
          <div>
            <h4 className="font-bold text-sm uppercase mb-6 tracking-widest">KNOW US</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
             <li><Link to="/about-us" className="hover:text-accent">About Us</Link></li>
              <li><a href="" className="hover:text-accent">Contact Us</a></li>
              <li><a href="" className="hover:text-accent">Blog</a></li>
              <li><a href="" className="hover:text-accent">Delivery Status</a></li>

            </ul>
          </div>

          {/* Column 4: Policies */}
          <div>
            <h4 className="font-bold text-sm uppercase mb-6 tracking-widest">POLICIES</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-accent">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-accent">Privacy & Policy</a></li>
              <li><a href="#" className="hover:text-accent">Return Policy</a></li>
              <li><a href="#" className="hover:text-accent">Refund Policy</a></li>
              <li><a href="#" className="hover:text-accent">Shipping Policy</a></li>

            </ul>
          </div>

        </div>

        {/* --- BOTTOM COPYRIGHT --- */}
        <div className="border-t border-primary-foreground/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-primary-foreground/50">
          <p>© 2026 KBS Traders. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;