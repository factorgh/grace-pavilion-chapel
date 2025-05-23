import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Check, Clock, Mail, Phone, User, X } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAdmin } from '../../contexts/AdminContext';
import { pastorAvailability } from '../../data/mockData';
import AvailabilityManager from '../../components/AvailabilityManager';

const AdminAppointments = () => {
  const { isLoggedIn } = useAdmin();
  const [availability, setAvailability] = useState(pastorAvailability);
  
  // Mock appointment requests
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 123-4567",
      date: "2023-07-12",
      time: "10:00 AM",
      reason: "Marriage counseling",
      status: "pending"
    },
    {
      id: 2,
      name: "Michael Brown",
      email: "mbrown@example.com",
      phone: "(555) 987-6543",
      date: "2023-07-14",
      time: "11:00 AM",
      reason: "Spiritual guidance",
      status: "confirmed"
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "(555) 456-7890",
      date: "2023-07-17",
      time: "9:00 AM",
      reason: "Baptism preparation",
      status: "pending"
    }
  ]);

  // Redirect if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/admin" />;
  }

  const handleUpdateStatus = (id: number, newStatus: string) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? {...appointment, status: newStatus} : appointment
    ));
  };

  const handleUpdateAvailability = (newAvailability: typeof pastorAvailability) => {
    setAvailability(newAvailability);
    // In a real app, this would update the database
    console.log('Updated availability:', newAvailability);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12"
    >
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <Link to="/admin" className="text-blue-600 dark:text-blue-400 hover:underline mb-2 inline-block">
                &larr; Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-100" style={{ fontFamily: 'Playfair Display, serif' }}>
                Appointment Requests
              </h1>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-blue-50 dark:bg-blue-900 border-b border-blue-100 dark:border-blue-800">
                <h2 className="text-lg font-bold text-blue-900 dark:text-blue-100">Appointment Requests</h2>
              </div>
              {appointments.length === 0 ? (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  No appointment requests yet.
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {appointments.map((appointment) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="p-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <User size={18} className="text-blue-600 dark:text-blue-400 mr-2" />
                            <h3 className="font-bold text-gray-900 dark:text-gray-100">{appointment.name}</h3>
                            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                              appointment.status === 'confirmed' 
                                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' 
                                : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100'
                            }`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-1">
                            <Mail size={16} className="mr-2" />
                            {appointment.email}
                          </div>
                          
                          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-1">
                            <Phone size={16} className="mr-2" />
                            {appointment.phone}
                          </div>
                          
                          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-1">
                            <Calendar size={16} className="mr-2" />
                            {format(new Date(appointment.date), 'MMMM d, yyyy')}
                            <span className="mx-1">•</span>
                            <Clock size={16} className="mr-1" />
                            {appointment.time}
                          </div>
                          
                          <div className="mt-2 text-gray-700 dark:text-gray-300">
                            <strong>Reason:</strong> {appointment.reason}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          {appointment.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(appointment.id, 'confirmed')}
                                className="flex items-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                              >
                                <Check size={16} className="mr-1" />
                                Confirm
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(appointment.id, 'cancelled')}
                                className="flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                              >
                                <X size={16} className="mr-1" />
                                Cancel
                              </button>
                            </>
                          )}
                          {appointment.status === 'confirmed' && (
                            <button
                              onClick={() => handleUpdateStatus(appointment.id, 'cancelled')}
                              className="flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                            >
                              <X size={16} className="mr-1" />
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <AvailabilityManager 
              initialAvailability={availability}
              onSave={handleUpdateAvailability}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminAppointments;
