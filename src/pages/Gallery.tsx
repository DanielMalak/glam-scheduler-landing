
import { useEffect } from 'react';
import PageTransition from '../components/ui/PageTransition';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import GalleryGrid from '../components/gallery/GalleryGrid';
import { motion } from 'framer-motion';

// Sample gallery images with Instagram-style 3:4 aspect ratio
const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371',
    alt: 'Red nail art design',
    category: 'Nail Art'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1640697687154-7ff34efa24b0',
    alt: 'Minimalist nude manicure',
    category: 'Manicure'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1601055903647-ddf1ee9701b7',
    alt: 'Luxury pedicure process',
    category: 'Pedicure'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53',
    alt: 'Pink acrylic nails',
    category: 'Acrylic'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1607779097040-52e58a0de1e4',
    alt: 'Artistic nail design with stones',
    category: 'Nail Art'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1622557850710-0f7a256a9e68',
    alt: 'Elegant gel manicure',
    category: 'Manicure'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1604654895983-2b9a83233a8f',
    alt: 'Delicate floral nail art',
    category: 'Nail Art'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1636414802760-d79f0f3b9bf6',
    alt: 'Minimalist French tips',
    category: 'Manicure'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1641061960404-85da674255b0',
    alt: 'Professional foot treatment',
    category: 'Pedicure'
  }
];

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen flex flex-col">
        <Navbar />
        
        <section className="flex-grow pt-28 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-serif text-dedo-black mb-4">
                  Our Gallery
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Explore our portfolio of stunning nail designs and transformations.
                  Get inspired for your next visit.
                </p>
              </motion.div>
            </div>
            
            <GalleryGrid images={galleryImages} />
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Gallery;
