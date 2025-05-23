import { motion } from 'framer-motion';
import { BookOpen, Globe, HandCoins, Heart, Music, UserRound } from 'lucide-react';
import { churchInfo } from '../data/mockData';

const About = () => {
  const icons: Record<string, React.ReactNode> = {
    BookOpen: <BookOpen size={36} className="text-blue-600" />,
    Music: <Music size={36} className="text-blue-600" />,
    Heart: <Heart size={36} className="text-blue-600" />,
    Helping: <UserRound size={36} className="text-blue-600" />,
    HandCoins: <HandCoins size={36} className="text-blue-600" />,
    Globe: <Globe size={36} className="text-blue-600" />
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative py-24 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            About Grace Pavilion Chapel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            {churchInfo.slogan}
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold text-blue-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">{churchInfo.mission}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold text-blue-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">{churchInfo.vision}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do as a church community
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {churchInfo.values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-8 rounded-lg shadow-md text-center"
              >
                <div className="flex justify-center mb-4">
                  {icons[value.icon] || <UserRound size={36} className="text-blue-600" />}
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-700" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Our Leadership
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated team that serves our church
            </p>
          </motion.div>

          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto"
            >
              <div className="md:w-1/3">
                <div className="rounded-full overflow-hidden w-48 h-48 mx-auto border-4 border-blue-100">
                  <img 
                    src={churchInfo.pastorBio.image} 
                    alt={churchInfo.pastorBio.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3 text-center md:text-left">
                <h3 className="text-2xl font-bold text-blue-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {churchInfo.pastorBio.name}
                </h3>
                <h4 className="text-lg text-blue-600 mb-4">{churchInfo.pastorBio.title}</h4>
                <p className="text-gray-700">{churchInfo.pastorBio.bio}</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {churchInfo.staff.map((staff, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4 border-2 border-blue-100">
                  <img 
                    src={staff.image} 
                    alt={staff.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {staff.name}
                </h3>
                <h4 className="text-blue-600 mb-3">{staff.title}</h4>
                <p className="text-gray-600 text-sm">{staff.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
