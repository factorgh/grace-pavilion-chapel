import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal = ({ onClose }: WelcomeModalProps) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg max-w-md w-full p-6 relative"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        
        <div className="text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-600">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
              alt="Pastor James"
              className="w-full h-full object-cover"
            />
          </div>
          
          <h2 className="text-2xl font-bold mb-2 text-blue-800" style={{ fontFamily: 'Playfair Display, serif' }}>
            Welcome to Grace Pavilion Chapel
          </h2>
          
          <h3 className="text-lg font-medium text-gray-700 mb-4">Pastor James Williams</h3>
          
          <p className="text-gray-600 mb-6">
            "We're delighted you've visited our website. At Grace Community Church, we believe in fostering a welcoming environment where everyone can experience God's love and grace. We hope to see you at our next service!"
          </p>
          
          <div className="text-sm text-gray-500">
            Sunday Services: 9:00 AM & 11:00 AM
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeModal;
