import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Mail, MapPin, MessageSquare, Phone, Send, User } from 'lucide-react';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    setIsSubmitted(true);
    reset();
    
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
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out with any questions, prayer requests, or to learn more about our church.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={32} className="text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Our Location
              </h3>
              <p className="text-gray-600">123 Faith Avenue, Grace City, GC 12345</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={32} className="text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Phone
              </h3>
              <p className="text-gray-600">(555) 123-4567</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={32} className="text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Email
              </h3>
              <p className="text-gray-600">info@gracechurch.org</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-bold text-blue-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Service Times
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock size={20} className="mt-1 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-800">Sunday Services</h3>
                    <p className="text-gray-600">9:00 AM - Sunday School</p>
                    <p className="text-gray-600">11:00 AM - Morning Worship</p>
                    <p className="text-gray-600">6:00 PM - Evening Service</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock size={20} className="mt-1 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-800">Wednesday</h3>
                    <p className="text-gray-600">6:00 PM - Family Dinner</p>
                    <p className="text-gray-600">7:00 PM - Midweek Service</p>
                    <p className="text-gray-600">7:00 PM - Youth Group</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin size={20} className="mt-1 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-800">Office Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Saturday: Closed</p>
                    <p className="text-gray-600">Sunday: 8:30 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-bold text-blue-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Send a Message
              </h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Check size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-600 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">
                    Thank you for your message. We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label className="block mb-2 text-gray-700 flex items-center">
                      <User size={18} className="mr-2 text-blue-600" />
                      <span>Your Name</span>
                    </label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block mb-2 text-gray-700 flex items-center">
                      <Mail size={18} className="mr-2 text-blue-600" />
                      <span>Email Address</span>
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
                      placeholder="johndoe@example.com"
                    />
                    {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block mb-2 text-gray-700 flex items-center">
                      <MessageSquare size={18} className="mr-2 text-blue-600" />
                      <span>Subject</span>
                    </label>
                    <input
                      type="text"
                      {...register('subject', { required: 'Subject is required' })}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="General Inquiry"
                    />
                    {errors.subject && <p className="mt-1 text-red-500 text-sm">{errors.subject.message}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label className="block mb-2 text-gray-700 flex items-center">
                      <MessageSquare size={18} className="mr-2 text-blue-600" />
                      <span>Message</span>
                    </label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Your message here..."
                    ></textarea>
                    {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center w-full"
                  >
                    Send Message
                    <Send size={18} className="ml-2" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
