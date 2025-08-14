import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Baby, Bone, Eye, Brain, Stethoscope, Activity, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    { icon: <Stethoscope size={28} />, title: "General Medicine", description: "Comprehensive primary care for all ages with preventive health focus.", gradient: "from-blue-400 to-blue-600" },
    { icon: <Heart size={28} />, title: "Cardiology", description: "Heart diagnostics, treatment & preventive care with advanced technology.", gradient: "from-pink-500 to-red-500" },
    { icon: <Baby size={28} />, title: "Pediatrics", description: "Gentle, expert care for infants, children, and adolescents.", gradient: "from-pink-400 to-pink-600" },
    { icon: <Bone size={28} />, title: "Orthopedics", description: "Bone, joint & muscle treatments with advanced surgical expertise.", gradient: "from-orange-400 to-orange-600" },
    { icon: <Eye size={28} />, title: "Ophthalmology", description: "Complete vision care, correction & eye surgeries.", gradient: "from-green-400 to-green-600" },
    { icon: <Brain size={28} />, title: "Neurology", description: "Nervous system disorder diagnosis & treatment.", gradient: "from-purple-400 to-purple-600" },
    { icon: <Activity size={28} />, title: "Emergency Care", description: "24/7 emergency services with rapid response.", gradient: "from-red-500 to-red-700" },
    { icon: <Shield size={28} />, title: "Preventive Care", description: "Health screenings to maintain optimal wellness.", gradient: "from-teal-400 to-teal-600" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Our Medical Services
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Experience world-class care with our expert doctors and modern facilities.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)"
              }}
              className="backdrop-blur-lg bg-white/70 border border-gray-100 rounded-2xl p-8 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center text-white mb-6 shadow-lg`}>
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">{service.description}</p>
              <motion.button
                whileHover={{ x: 5 }}
                className="mt-4 inline-block text-blue-600 font-medium hover:text-blue-800 transition"
              >
                Learn More →
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            View All Services
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
