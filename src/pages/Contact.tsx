
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Instagram, Facebook } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from '../hooks/use-toast';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (data: ContactFormData) => {
    console.log('Form submitted:', data);
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });
    reset();
  };

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
                  Get In Touch
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Have a question or need to book an appointment? Reach out to us and our team will get back to you shortly.
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white p-8 rounded-lg shadow-sm border border-dedo-cream"
              >
                <h2 className="text-2xl font-serif text-dedo-black mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input 
                      id="name"
                      type="text" 
                      {...register('name', { required: 'Name is required' })}
                      className="w-full"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input 
                      id="email"
                      type="email" 
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full"
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input 
                      id="subject"
                      type="text" 
                      {...register('subject', { required: 'Subject is required' })}
                      className="w-full"
                      placeholder="What is this about?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <Textarea 
                      id="message"
                      {...register('message', { required: 'Message is required' })}
                      className="w-full min-h-[150px]"
                      placeholder="How can we help you?"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full bg-dedo-beige hover:bg-dedo-beige/90 text-dedo-black">
                    <Send size={18} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              </motion.div>
              
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="bg-white p-8 rounded-lg shadow-sm border border-dedo-cream mb-8">
                  <h2 className="text-2xl font-serif text-dedo-black mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-dedo-light p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-dedo-beige" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-base font-medium text-dedo-black">Our Location</h3>
                        <p className="mt-1 text-gray-600">123 Beauty Lane, Los Angeles, CA 90001</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-dedo-light p-3 rounded-full">
                        <Phone className="h-6 w-6 text-dedo-beige" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-base font-medium text-dedo-black">Phone Number</h3>
                        <p className="mt-1 text-gray-600">(555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-dedo-light p-3 rounded-full">
                        <Mail className="h-6 w-6 text-dedo-beige" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-base font-medium text-dedo-black">Email Address</h3>
                        <p className="mt-1 text-gray-600">hello@dedosglam.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm border border-dedo-cream">
                  <h2 className="text-2xl font-serif text-dedo-black mb-6">Business Hours</h2>
                  
                  <ul className="space-y-3">
                    <li className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium text-dedo-black">9:00 AM - 8:00 PM</span>
                    </li>
                    <li className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium text-dedo-black">9:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium text-dedo-black">10:00 AM - 5:00 PM</span>
                    </li>
                  </ul>
                  
                  <div className="mt-8">
                    <h3 className="text-base font-medium text-dedo-black mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-dedo-light hover:bg-dedo-beige hover:text-dedo-black p-3 rounded-full transition-all duration-300"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a 
                        href="https://facebook.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-dedo-light hover:bg-dedo-beige hover:text-dedo-black p-3 rounded-full transition-all duration-300"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full h-[400px] rounded-lg overflow-hidden shadow-sm border border-dedo-cream"
            >
              <iframe 
                title="Dedo's Glam Location" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Los%20Angeles,%20CA+(Dedo's%20Glam)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
                style={{ filter: 'grayscale(0.2) contrast(1.2)' }}
              />
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Contact;
