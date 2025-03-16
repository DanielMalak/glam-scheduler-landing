
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import { CalendarCheck, Watch, Sparkles, Image } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen flex flex-col">
        <Navbar />
        
        <Hero />
        
        {/* About Section */}
        <section className="py-20 bg-dedo-light" id="about">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <div className="aspect-[4/5] rounded-lg overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1599206676935-a5a6a57477e8" 
                        alt="Nail salon interior" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg w-32 h-32 flex items-center justify-center">
                      <span className="text-2xl font-serif text-dedo-black text-center leading-tight">5+ Years Experience</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-3xl md:text-4xl font-serif text-dedo-black mb-6">
                      Crafting Beauty <br />
                      <span className="text-dedo-beige">One Nail at a Time</span>
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      At Dedo's Glam, we believe in creating more than just beautiful nails. 
                      We provide an experience where attention to detail meets personalized care. 
                      Our team of skilled technicians brings creativity and precision to every service.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Using only premium products and maintaining the highest standards of hygiene, 
                      we ensure that each client leaves our salon feeling refreshed, confident, and 
                      completely satisfied.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-dedo-beige/20 rounded-md">
                        <Sparkles className="h-5 w-5 text-dedo-beige" />
                      </div>
                      <div>
                        <h3 className="font-medium text-dedo-black">Premium Products</h3>
                        <p className="text-sm text-gray-500">Only the best for your nails</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-dedo-beige/20 rounded-md">
                        <Watch className="h-5 w-5 text-dedo-beige" />
                      </div>
                      <div>
                        <h3 className="font-medium text-dedo-black">Attention to Detail</h3>
                        <p className="text-sm text-gray-500">Precision in every service</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        <Services />
        
        {/* Gallery Preview Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-serif text-dedo-black mb-4">
                  Our Latest Work
                </h2>
                <p className="text-gray-600">
                  A glimpse of our artistry and craftsmanship. Browse through our gallery to find inspiration for your next visit.
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group relative aspect-[3/4] overflow-hidden rounded-lg"
                >
                  <img
                    src={`https://images.unsplash.com/photo-${index === 1 ? '1607779097040-52e58a0de1e4' : index === 2 ? '1604654894610-df63bc536371' : '1622557850710-0f7a256a9e68'}`}
                    alt={`Gallery preview ${index}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-serif mb-2">
                        {index === 1 ? 'Nail Art & Design' : index === 2 ? 'Color Perfection' : 'Elegant Solutions'}
                      </h3>
                      <p className="text-sm text-white/80 mb-4">
                        {index === 1 ? 'Artistic expressions for every occasion' : index === 2 ? 'Find your perfect shade' : 'Classic styles reimagined'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                to="/gallery"
                className="inline-flex items-center space-x-2 bg-white border-2 border-dedo-black text-dedo-black hover:bg-dedo-black hover:text-white px-6 py-3 rounded-md text-lg font-medium transition-all duration-300"
              >
                <Image className="w-5 h-5" />
                <span>View Full Gallery</span>
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Book Now CTA Section */}
        <section className="py-20 bg-dedo-beige/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-serif text-dedo-black">
                      Ready to Transform <br />
                      <span className="text-dedo-beige">Your Nails?</span>
                    </h2>
                    <p className="text-gray-600">
                      Book your appointment today and experience the Dedo's Glam difference. 
                      Our skilled technicians are ready to bring your nail vision to life.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-dedo-beige/20 rounded-full flex items-center justify-center">
                          <CalendarCheck className="w-4 h-4 text-dedo-beige" />
                        </div>
                        <span className="text-gray-700">Easy online scheduling</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-dedo-beige/20 rounded-full flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-dedo-beige" />
                        </div>
                        <span className="text-gray-700">Premium service guarantee</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Link
                        to="/booking"
                        className="inline-block bg-dedo-black text-white hover:bg-black px-8 py-3.5 rounded-md text-lg font-medium transition-all duration-300 shadow-sm"
                      >
                        Book Your Appointment
                      </Link>
                    </div>
                  </motion.div>
                </div>
                
                <div className="hidden md:block relative">
                  <div className="absolute inset-0 bg-dedo-black/10"></div>
                  <img
                    src="https://images.unsplash.com/photo-1600020037141-33ad569a5f61"
                    alt="Nail services"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </PageTransition>
  );
};

export default Index;
