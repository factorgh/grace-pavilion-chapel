import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Megaphone,
  Pin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { announcementsData } from "../data/mockData";
import { format } from "date-fns";

const Home = () => {
  // Weekly activities data
  const weeklyActivities = [
    {
      day: "Sunday",
      activities: [
        "9:00 AM - Sunday School",
        "11:00 AM - Morning Worship",
        "6:00 PM - Evening Service",
      ],
    },
    { day: "Monday", activities: ["7:00 PM - Men's Bible Study"] },
    { day: "Tuesday", activities: ["10:00 AM - Women's Prayer Group"] },
    {
      day: "Wednesday",
      activities: [
        "6:00 PM - Family Dinner",
        "7:00 PM - Midweek Service",
        "7:00 PM - Youth Group",
      ],
    },
    { day: "Thursday", activities: ["6:30 PM - Choir Practice"] },
    { day: "Friday", activities: ["7:00 PM - Young Adults Fellowship"] },
    {
      day: "Saturday",
      activities: ["9:00 AM - Community Outreach", "10:00 AM - Prayer Meeting"],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1666816/pexels-photo-1666816.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Church"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 "></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Welcome to Grace Pavilion Chapel
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Join us as we grow together in faith, hope, and love
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Link
              to="/about"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300"
            >
              Learn More
            </Link>
            <Link
              to="/events"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold py-3 px-6 rounded-md transition duration-300"
            >
              Upcoming Events
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Weekly Activities Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-3xl font-bold text-blue-900 mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Weekly Activities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join us throughout the week for worship, fellowship, and spiritual
              growth
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {weeklyActivities.map((day) => (
              <motion.div
                key={day.day}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                variants={itemVariants}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-blue-800 text-white py-4 px-6">
                  <h3 className="text-xl font-bold">{day.day}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {day.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="flex items-start">
                        <Clock
                          size={18}
                          className="text-blue-600 mt-1 mr-2 flex-shrink-0"
                        />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-3xl font-bold text-blue-900 mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Church Announcements
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news and important information from
              our church
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {announcementsData.map((announcement) => (
              <motion.div
                key={announcement.id}
                className="bg-gray-50 rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                variants={itemVariants}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-blue-800 flex items-center">
                        {announcement.isPinned && (
                          <Pin
                            size={16}
                            className="text-red-500 mr-2 flex-shrink-0"
                          />
                        )}
                        {announcement.title}
                      </h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        <span>
                          {format(new Date(announcement.date), "MMMM d, yyyy")}
                          {announcement.date !== announcement.endDate &&
                            ` - ${format(
                              new Date(announcement.endDate),
                              "MMMM d, yyyy"
                            )}`}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {announcement.category}
                    </span>
                  </div>
                  <p className="text-gray-600">{announcement.content}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <Megaphone size={16} className="mr-2" />
              Contact us for more information about these announcements
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl font-bold mb-6"
            style={{ fontFamily: "Playfair Display, serif" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Join Us This Sunday
          </motion.h2>

          <motion.div
            className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center">
              <Calendar size={24} className="mr-2" />
              <span>Every Sunday</span>
            </div>
            <div className="flex items-center">
              <Clock size={24} className="mr-2" />
              <span>9:00 AM & 11:00 AM</span>
            </div>
            <div className="flex items-center">
              <MapPin size={24} className="mr-2" />
              <span>123 Faith Avenue, Grace City</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center bg-white text-blue-900 hover:bg-blue-100 font-bold py-3 px-6 rounded-md transition duration-300"
            >
              Contact Us
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
