import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { galleryImages } from '../data/mockData';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  // Extract unique categories
  const categories = ['All', ...new Set(galleryImages.map(img => img.category))];
  
  // Filter images based on selected category
  const filteredImages = filter && filter !== 'All'
    ? galleryImages.filter(img => img.category === filter)
    : galleryImages;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
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
            Our Gallery
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Browse through moments of worship, fellowship, and service from our church community
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category === 'All' ? null : category)}
                className={`px-4 py-2 rounded-full transition ${
                  (category === 'All' && !filter) || category === filter
                    ? 'bg-blue-700 text-white'
                    : 'bg-white text-blue-700 hover:bg-blue-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="cursor-pointer relative group rounded-lg overflow-hidden shadow-md"
              onClick={() => setSelectedImage(image.id)}
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-64 object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold">{image.title}</h3>
                <p className="text-white text-sm opacity-80">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white z-10 bg-black bg-opacity-50 rounded-full p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            
            {galleryImages.find(img => img.id === selectedImage) && (
              <>
                <img
                  src={galleryImages.find(img => img.id === selectedImage)?.imageUrl}
                  alt={galleryImages.find(img => img.id === selectedImage)?.title}
                  className="w-full rounded-lg"
                />
                <div className="bg-black bg-opacity-70 text-white p-4 rounded-b-lg">
                  <h2 className="text-xl font-bold">
                    {galleryImages.find(img => img.id === selectedImage)?.title}
                  </h2>
                  <p className="text-gray-300">
                    {galleryImages.find(img => img.id === selectedImage)?.description}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Gallery;
