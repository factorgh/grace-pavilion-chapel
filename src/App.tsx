import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AdminProvider } from './contexts/AdminContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';

// Pages
import Home from './pages/Home';
import Events from './pages/Events';
import About from './pages/About';
import Appointments from './pages/Appointments';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Payments from './pages/Payments';
import AdminDashboard from './pages/admin/Dashboard';
import AdminEvents from './pages/admin/Events';
import AdminGallery from './pages/admin/Gallery';
import AdminAppointments from './pages/admin/Appointments';
import AdminSettings from './pages/admin/Settings';
import AdminAnnouncements from './pages/admin/Announcements';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WelcomeModal from './components/WelcomeModal';

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show modal after a short delay on first load
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Ensure light mode
    document.documentElement.classList.remove('dark');

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <AdminProvider>
          <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Lato, sans-serif' }}>
          <Navbar />
          
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/about" element={<About />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/give" element={<Payments />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/events" element={<AdminEvents />} />
                <Route path="/admin/gallery" element={<AdminGallery />} />
                <Route path="/admin/appointments" element={<AdminAppointments />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/announcements" element={<AdminAnnouncements />} />
              </Routes>
            </AnimatePresence>
          </main>
          
          <Footer />
          
          <AnimatePresence>
            {showModal && <WelcomeModal onClose={() => setShowModal(false)} />}
          </AnimatePresence>
        </div>
      </AdminProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
