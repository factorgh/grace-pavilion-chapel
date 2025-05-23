import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  Image,
  LogOut,
  Megaphone,
  Settings,
  Users,
} from "lucide-react";
import { useAdmin } from "../../contexts/AdminContext";

const AdminDashboard = () => {
  const { isLoggedIn, logout } = useAdmin();
  const [loggingOut, setLoggingOut] = useState(false);

  // Redirect if not logged in
  if (!isLoggedIn) {
    return <AdminLogin />;
  }

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      logout();
    }, 500);
  };

  const adminModules = [
    {
      title: "Manage Events",
      description: "Add, edit, or remove upcoming church events",
      icon: <Calendar size={36} className="text-blue-600" />,
      link: "/admin/events",
    },
    {
      title: "Manage Announcements",
      description: "Add, edit, or remove church announcements",
      icon: <Megaphone size={36} className="text-blue-600" />,
      link: "/admin/announcements",
    },
    {
      title: "Manage Gallery",
      description: "Upload new photos and manage the gallery",
      icon: <Image size={36} className="text-blue-600" />,
      link: "/admin/gallery",
    },
    {
      title: "View Appointments",
      description: "See and manage pastor appointment requests",
      icon: <Users size={36} className="text-blue-600" />,
      link: "/admin/appointments",
    },
    {
      title: "Site Settings",
      description: "Manage website configuration and content",
      icon: <Settings size={36} className="text-blue-600" />,
      link: "/admin",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: loggingOut ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 py-12"
    >
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <h1
              className="text-3xl font-bold text-blue-900"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-800 transition"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {adminModules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={module.link}
                className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
              >
                <div className="flex items-start">
                  <div className="bg-blue-100 p-4 rounded-md mr-4">
                    {module.icon}
                  </div>
                  <div>
                    <h2
                      className="text-xl font-bold text-blue-800 mb-2"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {module.title}
                    </h2>
                    <p className="text-gray-600">{module.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Admin Login Component
const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (login(username, password)) {
      // Login successful
    } else {
      setError("Invalid credentials. Try admin/church123");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1
          className="text-3xl font-bold text-blue-900 text-center mb-6"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Admin Login
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-md transition duration-300"
          >
            Login
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Hint: Username: admin, Password: church123
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
