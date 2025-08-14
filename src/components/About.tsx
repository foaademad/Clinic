import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Clock, CheckCircle } from "lucide-react";

const About = () => {
  const achievements = [
    { icon: <Award className="w-6 h-6" />, title: "25+ Years", subtitle: "Medical Excellence" },
    { icon: <Users className="w-6 h-6" />, title: "50,000+", subtitle: "Happy Patients" },
    { icon: <Clock className="w-6 h-6" />, title: "24/7", subtitle: "Emergency Care" },
    { icon: <CheckCircle className="w-6 h-6" />, title: "99%", subtitle: "Success Rate" }
  ];

  const features = [
    "Cutting-edge diagnostic tools",
    "Highly qualified medical specialists",
    "Preventive & wellness programs",
    "Minimally invasive surgeries",
    "Personalized patient care",
    "Round-the-clock support"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Your Health, <span className="text-blue-600">Our Priority</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mt-4">
                At Medisch Healthcare Center, we merge advanced technology with compassionate care to deliver exceptional medical services. Your well-being is at the heart of everything we do.
              </p>
            </motion.div>

            {/* Achievements */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
              {achievements.map((a, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white shadow-md rounded-2xl p-6 text-center cursor-pointer hover:shadow-xl transition-all"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mx-auto mb-4 text-white"
                  >
                    {a.icon}
                  </motion.div>
                  <div className="text-2xl font-bold text-gray-900">{a.title}</div>
                  <div className="text-blue-600 font-medium">{a.subtitle}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Features */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Why Choose Us?</h3>
              <div className="grid grid-cols-1 gap-3">
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-3 cursor-pointer hover:text-blue-600"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{f}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Images */}
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
                  src="https://images.pexels.com/photos/7659572/pexels-photo-7659572.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Doctor consulting patient"
                  className="rounded-2xl shadow-lg cursor-pointer"
                />
                <motion.img
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  transition={{ duration: 0.3 }}
                  src="https://images.pexels.com/photos/6129688/pexels-photo-6129688.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Modern medical equipment"
                  className="rounded-2xl shadow-lg cursor-pointer"
                />
              </div>
              <div className="space-y-4 mt-8">
                <motion.img
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                  src="https://images.pexels.com/photos/6749772/pexels-photo-6749772.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Doctor smiling"
                  className="rounded-2xl shadow-lg cursor-pointer"
                />
                <motion.img
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  transition={{ duration: 0.3 }}
                  src="https://images.pexels.com/photos/8460034/pexels-photo-8460034.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Team of doctors"
                  className="rounded-2xl shadow-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Decorative Circles */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-32 h-32 bg-blue-200 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 w-24 h-24 bg-green-200 rounded-full"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
