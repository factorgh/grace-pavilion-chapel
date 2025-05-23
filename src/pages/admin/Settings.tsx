import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Check, Save } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext";

const AdminSettings = () => {
  const { isLoggedIn } = useAdmin();
  const [isSaved, setIsSaved] = useState(false);
  const [settings, setSettings] = useState({
    churchName: "Grace Pavilion Chapel",
    pastorName: "Alvin",
    pastorTitle: "Senior Pastor",
    churchEmail: "info@gracechurch.org",
    churchPhone: "(555) 123-4567",
    churchAddress: "Dansoman Karikari,Opposite Ewit",
  });

  // Redirect if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/admin" />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log("Saving settings:", settings);
    setIsSaved(true);

    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
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
              <Link
                to="/admin"
                className="text-blue-600 dark:text-blue-400 hover:underline mb-2 inline-block"
              >
                &larr; Back to Dashboard
              </Link>
              <h1
                className="text-3xl font-bold text-blue-900 dark:text-blue-100"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Site Settings
              </h1>
            </div>
            <div className="flex items-center">
              {isSaved && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="mr-4 text-green-600 dark:text-green-400 flex items-center"
                >
                  <Check size={20} className="mr-1" />
                  <span>Saved</span>
                </motion.div>
              )}
              <button
                onClick={handleSave}
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md flex items-center"
              >
                <Save size={20} className="mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center text-blue-900 dark:text-blue-100">
                <SettingsIcon
                  size={24}
                  className="mr-2 text-blue-600 dark:text-blue-400"
                />
                General Settings
              </h2>

              <div className="grid gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Church Name
                  </label>
                  <input
                    type="text"
                    name="churchName"
                    value={settings.churchName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                      Pastor Name
                    </label>
                    <input
                      type="text"
                      name="pastorName"
                      value={settings.pastorName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                      Pastor Title
                    </label>
                    <input
                      type="text"
                      name="pastorTitle"
                      value={settings.pastorTitle}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Church Email
                  </label>
                  <input
                    type="email"
                    name="churchEmail"
                    value={settings.churchEmail}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Church Phone
                  </label>
                  <input
                    type="tel"
                    name="churchPhone"
                    value={settings.churchPhone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Church Address
                  </label>
                  <input
                    type="text"
                    name="churchAddress"
                    value={settings.churchAddress}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 text-blue-900">
                Appearance
              </h2>

              <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="font-bold mb-2 text-blue-900">Theme Preview</h3>
                <div className="flex flex-col space-y-2">
                  <div className="p-2 bg-white border border-gray-200 rounded">
                    Background
                  </div>
                  <div className="p-2 bg-blue-100 text-blue-900 rounded">
                    Primary Color
                  </div>
                  <div className="p-2 bg-gray-100 text-gray-900 rounded">
                    Secondary Color
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminSettings;
