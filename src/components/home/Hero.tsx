
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-dedo-beige/10"></div>
        <div 
          className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"
          style={{ mixBlendMode: 'overlay' }}
        ></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-dedo-black leading-tight tracking-tight mb-6">
              Elevate Your <br />
              <span className="font-light text-dedo-beige">Nail Experience</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              A premium nail salon offering excellence in every detail.
              Book your appointment today for a transformative experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link
              to="/booking"
              className="w-full sm:w-auto bg-dedo-black text-white hover:bg-black px-8 py-4 rounded-md text-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg text-center"
            >
              Book Appointment
            </Link>
            <Link
              to="/gallery"
              className="w-full sm:w-auto border-2 border-dedo-black text-dedo-black hover:bg-dedo-black hover:text-white px-8 py-3.5 rounded-md text-lg font-medium transition-all duration-300 text-center"
            >
              View Gallery
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              delay: 1.2,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.5
            }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center mt-20"
          >
            <span className="text-sm text-gray-500 mb-2">Scroll Down</span>
            <div className="w-0.5 h-8 bg-dedo-beige/50"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
