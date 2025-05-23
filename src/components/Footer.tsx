import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 dark:bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Church Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Grace Pavilion Chapel
            </h3>
            <p className="mb-4">
              Welcoming all to experience God's grace and love in a vibrant
              community of faith.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                <Youtube size={20} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-blue-300 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-blue-300 transition">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-blue-300 transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/appointments"
                  className="hover:text-blue-300 transition"
                >
                  Book an Appointment
                </Link>
              </li>
              <li>
                <Link to="/give" className="hover:text-blue-300 transition">
                  Give Online
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <p>Dansoman Karikari, Opposite Ewit</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={20} className="flex-shrink-0" />
                <p>(555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={20} className="flex-shrink-0" />
                <p>info@gracechurch.org</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Grace Pavilion Chapel. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
