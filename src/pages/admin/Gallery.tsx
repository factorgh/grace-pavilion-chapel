import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, Plus, Trash, X } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import { galleryImages } from '../../data/mockData';

const AdminGallery = () => {
  const { isLoggedIn } = useAdmin();
  const [images, setImages] = useState(galleryImages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImage, setNewImage] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: ''
  });

  // Redirect if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/admin" />;
  }

  const handleAddImage = () => {
    setIsModalOpen(true);
  };

  const handleDeleteImage = (id: number) => {
    setImages(images.filter(img => img.id !== id));
  };

  const handleSaveImage = () => {
    if (newImage.title && newImage.imageUrl && newImage.category) {
      const newImageWithId = {
        ...newImage,
        id: images.length + 1
      };
      setImages([...images, newImageWithId]);
      setIsModalOpen(false);
      setNewImage({
        title: '',
        description: '',
        imageUrl: '',
        category: ''
      });
    }
  };

  // Get unique categories
  const categories = [...new Set(images.map(img => img.category))];

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
                Manage Gallery
              </h1>
            </div>
            <button
              onClick={handleAddImage}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Add Image
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <div key={category} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                {category}
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-4">Gallery Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={image.imageUrl} 
                    alt={image.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{image.title}</h3>
                      <span className="text-sm text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                        {image.category}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm">{image.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                Add New Image
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
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newImage.title}
                  onChange={(e) => setNewImage({...newImage, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Image title"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={newImage.category}
                  onChange={(e) => setNewImage({...newImage, category: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="E.g., Worship, Youth, Outreach"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={newImage.description}
                  onChange={(e) => setNewImage({...newImage, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded"
                  rows={3}
                  placeholder="Brief description of the image"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={newImage.imageUrl}
                  onChange={(e) => setNewImage({...newImage, imageUrl: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="https://example.com/image.jpg"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Image should be in landscape format for best display
                </div>
              </div>
              
              {newImage.imageUrl && (
                <div className="mt-2">
                  <div className="h-40 rounded overflow-hidden">
                    <img 
                      src={newImage.imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Preview';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveImage}
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 flex items-center"
                disabled={!newImage.title || !newImage.imageUrl || !newImage.category}
              >
                <Image size={18} className="mr-2" />
                Add to Gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminGallery;
