
import { useEffect } from 'react';
import PageTransition from '../components/ui/PageTransition';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import GalleryGrid from '../components/gallery/GalleryGrid';
import { motion } from 'framer-motion';

// Updated gallery images with more reliable URLs
const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702',
    alt: 'Red nail art design',
    category: 'Nail Art'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b',
    alt: 'Minimalist nude manicure',
    category: 'Manicure'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1604902396830-aca29e19b067',
    alt: 'Luxury pedicure process',
    category: 'Pedicure'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1577316297646-dc4e7de68896',
    alt: 'Pink acrylic nails',
    category: 'Acrylic'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1600428877878-1a0ff561d8ae',
    alt: 'Artistic nail design with stones',
    category: 'Nail Art'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1636369826853-94922820d991',
    alt: 'Elegant gel manicure',
    category: 'Manicure'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1612462377201-d9ede8548302',
    alt: 'Delicate floral nail art',
    category: 'Nail Art'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1587496679742-bad502958fbf',
    alt: 'Minimalist French tips',
    category: 'Manicure'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1519828592571-c991116f1111',
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
