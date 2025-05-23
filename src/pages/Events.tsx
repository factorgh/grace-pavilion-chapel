import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { eventsData } from '../data/mockData';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
            Upcoming Events
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us for these upcoming events and activities. We'd love to see you there!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {eventsData.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              className={`bg-white rounded-lg shadow-md overflow-hidden ${
                selectedEvent === event.id ? 'lg:col-span-2' : ''
              }`}
              onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
            >
              <div className="md:flex">
                <div className={`md:w-2/5 ${selectedEvent === event.id ? 'md:w-1/3' : ''}`}>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className={`p-6 md:w-3/5 ${selectedEvent === event.id ? 'md:w-2/3' : ''}`}>
                  <h2 className="text-2xl font-bold text-blue-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {event.title}
                  </h2>
                  
                  <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-2 text-blue-600" />
                      <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={18} className="mr-2 text-blue-600" />
                      <span>{format(new Date(event.date), 'h:mm a')} - {format(new Date(event.endDate), 'h:mm a')}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={18} className="mr-2 text-blue-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className={`text-gray-600 ${selectedEvent === event.id ? '' : 'line-clamp-3'}`}>
                    {event.description}
                  </p>
                  
                  {selectedEvent !== event.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event.id);
                      }}
                      className="mt-4 text-blue-600 font-medium hover:underline"
                    >
                      Read More
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Events;
