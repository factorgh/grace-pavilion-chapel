import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Megaphone, Pencil, Pin, Plus, Trash, X } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import { format } from 'date-fns';
import { announcementsData } from '../../data/mockData';

const AdminAnnouncements = () => {
  const { isLoggedIn } = useAdmin();
  const [announcements, setAnnouncements] = useState(announcementsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState<any>(null);

  // Redirect if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/admin" />;
  }

  const handleEditAnnouncement = (announcement: any) => {
    setCurrentAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleAddAnnouncement = () => {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 14); // Default 2 weeks duration
    
    setCurrentAnnouncement({
      id: announcements.length + 1,
      title: '',
      date: today.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      content: '',
      isPinned: false,
      category: 'General'
    });
    setIsModalOpen(true);
  };

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
  };

  const handleTogglePin = (id: number) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id 
        ? { ...announcement, isPinned: !announcement.isPinned } 
        : announcement
    ));
  };

  const handleSaveAnnouncement = (updatedAnnouncement: any) => {
    if (announcements.find(a => a.id === updatedAnnouncement.id)) {
      setAnnouncements(announcements.map(a => a.id === updatedAnnouncement.id ? updatedAnnouncement : a));
    } else {
      setAnnouncements([...announcements, updatedAnnouncement]);
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
                Manage Announcements
              </h1>
            </div>
            <button
              onClick={handleAddAnnouncement}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Add Announcement
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Announcement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Range</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {announcements.map((announcement) => (
                <motion.tr 
                  key={announcement.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Megaphone size={18} className="text-blue-600 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 flex items-center">
                          {announcement.isPinned && <Pin size={14} className="text-red-500 mr-2" />}
                          {announcement.title}
                        </div>
                        <div className="text-gray-500 truncate max-w-xs">{announcement.content.substring(0, 50)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-blue-600 mr-2" />
                      <span>{format(new Date(announcement.date), 'MMM d, yyyy')}</span>
                      {announcement.date !== announcement.endDate && (
                        <span> - {format(new Date(announcement.endDate), 'MMM d, yyyy')}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {announcement.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      announcement.isPinned 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {announcement.isPinned ? 'Pinned' : 'Regular'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleTogglePin(announcement.id)}
                        className={`p-1 rounded ${
                          announcement.isPinned 
                            ? 'text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100' 
                            : 'text-gray-600 hover:text-gray-800 bg-gray-50 hover:bg-gray-100'
                        }`}
                        title={announcement.isPinned ? 'Unpin announcement' : 'Pin announcement'}
                      >
                        <Pin size={16} />
                      </button>
                      <button
                        onClick={() => handleEditAnnouncement(announcement)}
                        className="p-1 rounded text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100"
                        title="Edit announcement"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                        className="p-1 rounded text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100"
                        title="Delete announcement"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Announcement Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                {currentAnnouncement.id ? 'Edit Announcement' : 'Add New Announcement'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Announcement Title</label>
                <input
                  type="text"
                  value={currentAnnouncement.title}
                  onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Enter announcement title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={currentAnnouncement.date}
                    onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={currentAnnouncement.endDate}
                    onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, endDate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  value={currentAnnouncement.category}
                  onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, category: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded"
                >
                  <option value="General">General</option>
                  <option value="Event">Event</option>
                  <option value="Fundraising">Fundraising</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Education">Education</option>
                  <option value="Mission">Mission</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Announcement Content</label>
                <textarea
                  value={currentAnnouncement.content}
                  onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, content: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded"
                  rows={5}
                  placeholder="Enter announcement details"
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPinned"
                  checked={currentAnnouncement.isPinned}
                  onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, isPinned: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="isPinned" className="text-gray-700 cursor-pointer flex items-center">
                  <Pin size={16} className="mr-2 text-red-500" />
                  Pin this announcement (important announcements appear first)
                </label>
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
                onClick={() => handleSaveAnnouncement(currentAnnouncement)}
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
                disabled={!currentAnnouncement.title || !currentAnnouncement.content}
              >
                Save Announcement
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminAnnouncements;
