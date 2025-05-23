import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, Check, Clock, Mail, MessageSquare, Phone, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { pastorAvailability } from '../data/mockData';

type FormData = {
  name: string;
  email: string;
  phone: string;
  reason: string;
};

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  // Convert the pastorAvailability data to Date objects
  const availableDates = pastorAvailability.map(item => new Date(item.date));

  // Find available times for the selected date
  const getAvailableTimes = (date: Date | null) => {
    if (!date) return [];
    
    const dateString = date.toISOString().split('T')[0];
    const dayData = pastorAvailability.find(item => item.date === dateString);
    
    return dayData ? dayData.slots : [];
  };

  const availableTimes = getAvailableTimes(selectedDate);

  const onSubmit = (data: FormData) => {
    console.log({
      ...data,
      date: selectedDate,
      time: selectedTime
    });
    
    setIsSubmitted(true);
    reset();
    setSelectedDate(null);
    setSelectedTime(null);
    
    // Reset submission status after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Book an Appointment
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule a one-on-one meeting with our pastor for spiritual guidance, counseling, or any other matters.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {isSubmitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check size={32} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">Appointment Request Submitted!</h2>
                <p className="text-gray-600">
                  Thank you for your request. We will contact you shortly to confirm your appointment.
                </p>
              </div>
            ) : (
              <div className="md:flex">
                <div className="md:w-1/2 bg-blue-700 p-8 text-white">
                  <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Select a Date & Time
                  </h2>
                  
                  <div className="mb-6">
                    <label className="block mb-2 flex items-center">
                      <Calendar size={18} className="mr-2" />
                      <span>Available Dates</span>
                    </label>
                    <ReactDatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }}
                      includeDates={availableDates}
                      inline
                      className="bg-white text-gray-800 w-full p-2 rounded"
                    />
                  </div>
                  
                  {selectedDate && (
                    <div>
                      <label className="block mb-2 flex items-center">
                        <Clock size={18} className="mr-2" />
                        <span>Available Times</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {availableTimes.map((time) => (
                          <button
                            key={time}
                            type="button"
                            className={`p-2 rounded text-center transition ${
                              selectedTime === time
                                ? 'bg-white text-blue-700 font-bold'
                                : 'bg-blue-800 hover:bg-blue-600'
                            }`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="md:w-1/2 p-8">
                  <h2 className="text-2xl font-bold text-blue-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Your Information
                  </h2>
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                      <label className="block mb-2 text-gray-700 flex items-center">
                        <User size={18} className="mr-2 text-blue-600" />
                        <span>Full Name</span>
                      </label>
                      <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your name"
                      />
                      {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    
                    <div className="mb-4">
                      <label className="block mb-2 text-gray-700 flex items-center">
                        <Mail size={18} className="mr-2 text-blue-600" />
                        <span>Email</span>
                      </label>
                      <input
                        type="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          } 
                        })}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your email"
                      />
                      {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    
                    <div className="mb-4">
                      <label className="block mb-2 text-gray-700 flex items-center">
                        <Phone size={18} className="mr-2 text-blue-600" />
                        <span>Phone</span>
                      </label>
                      <input
                        type="tel"
                        {...register('phone', { required: 'Phone number is required' })}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your phone number"
                      />
                      {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                    
                    <div className="mb-6">
                      <label className="block mb-2 text-gray-700 flex items-center">
                        <MessageSquare size={18} className="mr-2 text-blue-600" />
                        <span>Reason for Appointment</span>
                      </label>
                      <textarea
                        {...register('reason', { required: 'Please provide a reason' })}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        placeholder="Briefly describe the purpose of your appointment"
                      ></textarea>
                      {errors.reason && <p className="mt-1 text-red-500 text-sm">{errors.reason.message}</p>}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={!selectedDate || !selectedTime}
                      className={`w-full py-3 rounded-md font-bold transition ${
                        selectedDate && selectedTime
                          ? 'bg-blue-700 hover:bg-blue-800 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Request Appointment
                    </button>
                    
                    {(!selectedDate || !selectedTime) && (
                      <p className="mt-2 text-sm text-center text-red-500">
                        Please select both a date and time
                      </p>
                    )}
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Appointments;
