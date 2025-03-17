
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Book Now', path: '/booking' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/admin', icon: LayoutDashboard }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen 
          ? 'bg-white bg-opacity-90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link to="/" className="text-xl md:text-2xl font-serif text-dedo-black">
              Dedo's<span className="font-light text-dedo-beige">Glam</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Link
                  to={link.path}
                  className={`transition-colors duration-300 text-sm tracking-wide flex items-center gap-1 ${
                    location.pathname === link.path
                      ? 'text-dedo-black font-medium'
                      : 'text-gray-600 hover:text-dedo-black'
                  }`}
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="h-0.5 bg-dedo-beige mt-1"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                to="/booking"
                className="bg-dedo-beige hover:bg-dedo-beige/90 text-dedo-black px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-300 shadow-sm"
              >
                Book Appointment
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-dedo-black" />
            ) : (
              <Menu className="w-6 h-6 text-dedo-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white"
      >
        <div className="px-4 py-5 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-2 py-2 text-base ${
                location.pathname === link.path
                  ? 'text-dedo-black font-medium'
                  : 'text-gray-600'
              }`}
            >
              {link.icon && <link.icon className="h-4 w-4" />}
              {link.name}
            </Link>
          ))}
          <Link
            to="/booking"
            className="block w-full text-center bg-dedo-beige hover:bg-dedo-beige/90 text-dedo-black px-6 py-3 rounded-md text-base font-medium transition-all duration-300"
          >
            Book Appointment
          </Link>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;
