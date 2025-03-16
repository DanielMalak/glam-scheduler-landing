
import { Instagram, Facebook, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dedo-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-dedo-beige mt-0.5" />
                <span>123 Beauty Lane, Los Angeles, CA 90001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-dedo-beige" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-dedo-beige" />
                <span>hello@dedosglam.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif">Hours</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>10:00 AM - 5:00 PM</span>
              </li>
            </ul>
            <div className="pt-3">
              <Link 
                to="/booking" 
                className="inline-block bg-dedo-beige hover:bg-dedo-beige/90 text-dedo-black px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-300"
              >
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Logo and Social */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif">Dedo's<span className="font-light text-dedo-beige">Glam</span></h3>
            <p className="text-gray-300">
              Elevate your nail experience with premium treatments at Dedo's Glam.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-dedo-beige hover:text-dedo-black p-2.5 rounded-full transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-dedo-beige hover:text-dedo-black p-2.5 rounded-full transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="mailto:hello@dedosglam.com" 
                className="bg-white/10 hover:bg-dedo-beige hover:text-dedo-black p-2.5 rounded-full transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Dedo's Glam. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/" className="text-sm text-gray-400 hover:text-dedo-beige transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-sm text-gray-400 hover:text-dedo-beige transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
