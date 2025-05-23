import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Pencil, MapPin, Plus, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { Link, Navigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import { eventsData } from '../../data/mockData';

const AdminEvents = () => {
  const { isLoggedIn } = useAdmin();
  const [events, setEvents] = useState(eventsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<any>(null);

  // Redirect if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/admin" />;
  }

  const handleEditEvent = (event: any) => {
    setCurrentEvent(event);
    setIsModalOpen(true);
  };

  const handleAddEvent = () => {
    setCurrentEvent({
      id: events.length + 1,
      title: '',
      date: new Date().toISOString(),
      endDate: new Date().toISOString(),
      description: '',
      location: '',
      image: 'https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    });
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleSaveEvent = (updatedEvent: any) => {
    if (events.find(e => e.id === updatedEvent.id)) {
      setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    } else {
      setEvents([...events, updatedEvent]);
    }
    setIsModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 py-12"
    >
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <Link to="/admin" className="text-blue-600 hover:underline mb-2 inline-block">
                &larr; Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-blue-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                Manage Events
              </h1>
            </div>
            <button
              onClick={handleAddEvent}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Add Event
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <motion.tr 
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden mr-4">
                        <img src={event.image} alt={event.title} className="h-10 w-10 object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{event.title}</div>
                        <div className="text-gray-500 truncate max-w-xs">{event.description.substring(0, 50)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-blue-600 mr-2" />
                      <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock size={16} className="text-blue-600 mr-2" />
                      <span>{format(new Date(event.date), 'h:mm a')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin size={16} className="text-blue-600 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Modal - In a real app, this would be a separate component */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              {currentEvent.id ? 'Pencil Event' : 'Add New Event'}
            </h2>
            
            <div className="grid gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Event Title</label>
                <input
                  type="text"
                  value={currentEvent.title}
                  onChange={(e) => setCurrentEvent({...currentEvent, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Start Date & Time</label>
                  <input
                    type="datetime-local"
                    value={new Date(currentEvent.date).toISOString().slice(0, 16)}
                    onChange={(e) => setCurrentEvent({...currentEvent, date: new Date(e.target.value).toISOString()})}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">End Date & Time</label>
                  <input
                    type="datetime-local"
                    value={new Date(currentEvent.endDate).toISOString().slice(0, 16)}
                    onChange={(e) => setCurrentEvent({...currentEvent, endDate: new Date(e.target.value).toISOString()})}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={currentEvent.location}
                  onChange={(e) => setCurrentEvent({...currentEvent, location: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={currentEvent.description}
                  onChange={(e) => setCurrentEvent({...currentEvent, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded"
                  rows={4}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={currentEvent.image}
                  onChange={(e) => setCurrentEvent({...currentEvent, image: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveEvent(currentEvent)}
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
              >
                Save Event
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminEvents;
