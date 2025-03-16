
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const services = [
  {
    id: 1,
    name: 'Signature Manicure',
    price: '$40',
    description: 'Our classic manicure includes nail shaping, cuticle care, hand massage, and polish of your choice.',
    time: '45 min'
  },
  {
    id: 2,
    name: 'Luxury Spa Pedicure',
    price: '$65',
    description: 'Indulge in our premium pedicure featuring exfoliation, callus removal, extended massage, and polish.',
    time: '60 min'
  },
  {
    id: 3,
    name: 'Gel Polish Manicure',
    price: '$55',
    description: 'Long-lasting, chip-free gel polish with all the benefits of our signature manicure.',
    time: '60 min'
  },
  {
    id: 4,
    name: 'Nail Art & Design',
    price: 'from $20',
    description: 'Express yourself with custom nail art, from simple designs to intricate hand-painted masterpieces.',
    time: 'varies'
  },
  {
    id: 5,
    name: 'Acrylic Full Set',
    price: '$85',
    description: 'Complete acrylic nail extension service with strengthening overlay and regular polish.',
    time: '90 min'
  },
];

const Services = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-20 bg-white" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-dedo-black">Our Premium Services</h2>
          <p className="text-gray-600">
            Discover our range of luxurious treatments designed to pamper and perfect.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-6"
            >
              <div 
                onClick={() => toggleExpanded(service.id)}
                className={`
                  bg-white border-l-4 border-dedo-beige rounded-md shadow-sm px-6 py-5
                  transition-all duration-300 hover:shadow-md
                  ${expandedId === service.id ? 'shadow-md' : ''}
                  cursor-pointer
                `}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-xl font-medium text-dedo-black">{service.name}</h3>
                    <span className="text-dedo-beige font-medium">{service.price}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">{service.time}</span>
                    <button 
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label={expandedId === service.id ? "Collapse" : "Expand"}
                    >
                      {expandedId === service.id ? (
                        <Minus className="w-5 h-5 text-dedo-black" />
                      ) : (
                        <Plus className="w-5 h-5 text-dedo-black" />
                      )}
                    </button>
                  </div>
                </div>
                
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: expandedId === service.id ? 'auto' : 0,
                    opacity: expandedId === service.id ? 1 : 0,
                    marginTop: expandedId === service.id ? 16 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden text-gray-600"
                >
                  <p>{service.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <a
              href="/booking"
              className="bg-dedo-beige hover:bg-dedo-beige/90 text-dedo-black px-8 py-3 rounded-md text-lg font-medium transition-all duration-300 shadow-sm"
            >
              Book Your Appointment
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
