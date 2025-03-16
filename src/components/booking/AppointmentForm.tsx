
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Clock, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', 
  '5:00 PM', '6:00 PM', '7:00 PM'
];

const packages = [
  {
    id: 'basic-mani',
    name: 'Basic Manicure',
    description: 'File, shape, cuticle care, hand massage, and polish.',
    price: '$25'
  },
  {
    id: 'gel-mani',
    name: 'Gel Manicure',
    description: 'Basic manicure plus gel polish for longer wear.',
    price: '$35'
  },
  {
    id: 'deluxe-mani',
    name: 'Deluxe Manicure',
    description: 'Basic manicure plus exfoliation, extended massage, and paraffin treatment.',
    price: '$40'
  },
  {
    id: 'basic-pedi',
    name: 'Basic Pedicure',
    description: 'Foot soak, scrub, file, shape, cuticle care, and polish.',
    price: '$35'
  },
  {
    id: 'deluxe-pedi',
    name: 'Deluxe Pedicure',
    description: 'Basic pedicure plus callus removal, extended massage, and exfoliation.',
    price: '$50'
  },
  {
    id: 'mani-pedi',
    name: 'Mani-Pedi Combo',
    description: 'Basic manicure and pedicure service.',
    price: '$55'
  },
  {
    id: 'gel-mani-pedi',
    name: 'Gel Mani-Pedi Combo',
    description: 'Gel manicure and deluxe pedicure service.',
    price: '$75'
  },
  {
    id: 'nail-art',
    name: 'Nail Art',
    description: 'Custom nail art per nail or full set.',
    price: 'From $5 per nail'
  }
];

const AppointmentForm = () => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const goToNextStep = () => {
    if (step === 1 && !date) {
      toast({
        title: "Please select a date",
        description: "You must choose a date for your appointment.",
        variant: "destructive",
      });
      return;
    }

    if (step === 2 && !timeSlot) {
      toast({
        title: "Please select a time",
        description: "You must choose a time slot for your appointment.",
        variant: "destructive",
      });
      return;
    }

    if (step === 3 && !selectedPackage) {
      toast({
        title: "Please select a package",
        description: "You must choose a service package for your appointment.",
        variant: "destructive",
      });
      return;
    }

    if (step < 4) {
      setStep(step + 1);
    }
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would submit the form data to your backend here
    
    toast({
      title: "Appointment Booked!",
      description: `Your appointment for ${selectedPackage && packages.find(p => p.id === selectedPackage)?.name} on ${date ? format(date, 'MMMM do, yyyy') : ''} at ${timeSlot} has been confirmed.`,
    });

    // Reset form
    setDate(undefined);
    setTimeSlot(undefined);
    setSelectedPackage(undefined);
    setFormData({
      name: '',
      email: '',
      phone: '',
      notes: ''
    });
    setStep(1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-serif text-dedo-black">Select a Date</h3>
              <p className="text-gray-500 mt-1">Choose a day for your appointment</p>
            </div>
            
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border p-3 pointer-events-auto"
                disabled={(date) => {
                  // Disable past dates and Sundays
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today || date.getDay() === 0;
                }}
                initialFocus
              />
            </div>

            {date && (
              <div className="text-center text-sm text-dedo-beige mt-2">
                <p>You selected: {format(date, 'EEEE, MMMM do, yyyy')}</p>
              </div>
            )}
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-serif text-dedo-black">Select a Time</h3>
              <p className="text-gray-500 mt-1">Choose a time slot for your appointment on {date ? format(date, 'MMMM do, yyyy') : ''}</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-md mx-auto">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant="outline"
                  className={`flex items-center justify-center space-x-2 px-3 py-6 h-auto transition-all ${
                    timeSlot === time
                      ? 'bg-dedo-beige text-dedo-black border-dedo-beige'
                      : 'hover:border-dedo-beige'
                  }`}
                  onClick={() => setTimeSlot(time)}
                >
                  <Clock className="w-4 h-4" />
                  <span>{time}</span>
                </Button>
              ))}
            </div>

            {timeSlot && (
              <div className="text-center text-sm text-dedo-beige mt-2">
                <p>You selected: {timeSlot}</p>
              </div>
            )}
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-serif text-dedo-black">Select a Package</h3>
              <p className="text-gray-500 mt-1">Choose a service package for your appointment</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`border rounded-md p-4 cursor-pointer transition-all ${
                    selectedPackage === pkg.id
                      ? 'border-dedo-beige bg-dedo-beige/10'
                      : 'hover:border-dedo-beige'
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium">{pkg.name}</h4>
                    <span className="text-dedo-black font-medium">{pkg.price}</span>
                  </div>
                  <p className="text-sm text-gray-600">{pkg.description}</p>
                </div>
              ))}
            </div>
            
            {selectedPackage && (
              <div className="text-center text-sm text-dedo-beige mt-2">
                <p>You selected: {packages.find(p => p.id === selectedPackage)?.name}</p>
              </div>
            )}
          </motion.div>
        );
      
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-serif text-dedo-black">Your Details</h3>
              <p className="text-gray-500 mt-1">Complete your booking by providing your information</p>
            </div>
            
            <div className="space-y-4 max-w-md mx-auto">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder="Enter your phone number" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Special Requests (Optional)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any special requests or information we should know" 
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md max-w-md mx-auto">
              <h4 className="font-medium text-lg mb-3">Appointment Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{date ? format(date, 'MMMM do, yyyy') : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-medium">{packages.find(p => p.id === selectedPackage)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">{packages.find(p => p.id === selectedPackage)?.price}</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="bg-gray-50 pt-6 px-6">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center relative w-full">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10
                  ${step >= stepNumber 
                    ? 'bg-dedo-beige text-dedo-black' 
                    : 'bg-gray-200 text-gray-500'
                  } transition-colors duration-300`}
              >
                {stepNumber}
              </div>
              
              {stepNumber < 4 && (
                <div 
                  className={`h-1 absolute top-5 left-10 right-0
                    ${step > stepNumber ? 'bg-dedo-beige' : 'bg-gray-200'}
                    transition-colors duration-300`}
                ></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 pb-6">
          <span>Date</span>
          <span>Time</span>
          <span>Package</span>
          <span>Details</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {renderStepContent()}
        
        <div className="mt-10 flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={goToPreviousStep}
            disabled={step === 1}
            className="border-dedo-black text-dedo-black hover:bg-dedo-black hover:text-white"
          >
            Back
          </Button>
          
          {step < 4 ? (
            <Button
              type="button"
              onClick={goToNextStep}
              className="bg-dedo-black text-white hover:bg-black"
            >
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-dedo-beige text-dedo-black hover:bg-dedo-beige/90"
            >
              Confirm Booking
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
