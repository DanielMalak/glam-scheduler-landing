
import { useEffect } from 'react';
import PageTransition from '../components/ui/PageTransition';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AppointmentForm from '../components/booking/AppointmentForm';
import { motion } from 'framer-motion';
import { Calendar, Clock, PhoneCall } from 'lucide-react';

const Booking = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen flex flex-col">
        <Navbar />
        
        <section className="flex-grow pt-28 pb-20 bg-gradient-to-b from-dedo-light to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-serif text-dedo-black mb-4">
                  Book Your Appointment
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Schedule your visit to Dedo's Glam Nail Salon. Your perfect nails are just a few clicks away.
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-dedo-cream flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 bg-dedo-light rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-dedo-beige" />
                </div>
                <h3 className="text-xl font-serif text-dedo-black mb-2">Simple Booking</h3>
                <p className="text-gray-600">Choose your preferred date and time with our easy-to-use booking system.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-dedo-cream flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 bg-dedo-light rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-dedo-beige" />
                </div>
                <h3 className="text-xl font-serif text-dedo-black mb-2">Flexible Hours</h3>
                <p className="text-gray-600">We offer extended hours to accommodate your busy schedule.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-dedo-cream flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 bg-dedo-light rounded-full flex items-center justify-center mb-4">
                  <PhoneCall className="h-6 w-6 text-dedo-beige" />
                </div>
                <h3 className="text-xl font-serif text-dedo-black mb-2">Need Assistance?</h3>
                <p className="text-gray-600">Call us at (555) 123-4567 for help with your booking or special requests.</p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <AppointmentForm />
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Booking;
