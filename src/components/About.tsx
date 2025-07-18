import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock, CheckCircle } from 'lucide-react';

const About = () => {
  const achievements = [
    { icon: <Award className="w-6 h-6" />, title: "25+ Years", subtitle: "Medical Excellence" },
    { icon: <Users className="w-6 h-6" />, title: "50,000+", subtitle: "Satisfied Patients" },
    { icon: <Clock className="w-6 h-6" />, title: "24/7", subtitle: "Emergency Services" },
    { icon: <CheckCircle className="w-6 h-6" />, title: "99%", subtitle: "Success Rate" }
  ];

  const features = [
    "State-of-the-art medical equipment",
    "Experienced and certified doctors",
    "Comprehensive health screenings",
    "Advanced surgical procedures",
    "Personalized treatment plans",
    "Emergency care available 24/7"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Committed to Your Health & Well-being
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                At Medisch Healthcare Center, we combine medical expertise with compassionate care to provide exceptional healthcare services. Our team of experienced professionals is dedicated to helping you achieve optimal health and wellness.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-6"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-blue-50 rounded-2xl p-6 text-center cursor-pointer"
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mx-auto mb-4 text-white"
                  >
                    {achievement.icon}
                  </motion.div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                    className="text-2xl font-bold text-gray-900"
                  >
                    {achievement.title}
                  </motion.div>
                  <div className="text-blue-600 font-medium">{achievement.subtitle}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Why Choose Medisch?</h3>
              <div className="grid grid-cols-1 gap-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.img
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                  src="https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Medical consultation"
                  className="rounded-2xl shadow-lg cursor-pointer"
                />
                <motion.img
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  transition={{ duration: 0.3 }}
                  src="https://images.pexels.com/photos/4173350/pexels-photo-4173350.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Medical equipment"
                  className="rounded-2xl shadow-lg cursor-pointer"
                />
              </div>
              <div className="space-y-4 mt-8">
                <motion.img
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                  src="https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Doctor with patient"
                  className="rounded-2xl shadow-lg cursor-pointer"
                />
                <motion.img
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  transition={{ duration: 0.3 }}
                  src="https://images.pexels.com/photos/4173352/pexels-photo-4173352.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Medical team"
                  className="rounded-2xl shadow-lg cursor-pointer"
                />
              </div>
            </div>
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-32 h-32 bg-blue-200 rounded-full opacity-20"
            ></motion.div>
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.25, 0.2]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-4 -left-4 w-24 h-24 bg-green-200 rounded-full opacity-20"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;