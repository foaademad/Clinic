import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Baby, Bone, Eye, Brain, Stethoscope, Activity, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "General Medicine",
      description: "Comprehensive primary care services for all ages with preventive care and health maintenance.",
      color: "bg-blue-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Cardiology",
      description: "Advanced heart care including diagnostics, treatment, and preventive cardiology services.",
      color: "bg-red-500"
    },
    {
      icon: <Baby className="w-8 h-8" />,
      title: "Pediatrics",
      description: "Specialized medical care for infants, children, and adolescents in a friendly environment.",
      color: "bg-pink-500"
    },
    {
      icon: <Bone className="w-8 h-8" />,
      title: "Orthopedics",
      description: "Expert treatment for bone, joint, and muscle conditions with advanced surgical options.",
      color: "bg-orange-500"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Ophthalmology",
      description: "Complete eye care services including vision correction and advanced eye surgery.",
      color: "bg-green-500"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Neurology",
      description: "Specialized care for nervous system disorders with state-of-the-art diagnostic tools.",
      color: "bg-purple-500"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Emergency Care",
      description: "24/7 emergency services with rapid response and critical care capabilities.",
      color: "bg-red-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Preventive Care",
      description: "Comprehensive health screenings and preventive services to maintain optimal health.",
      color: "bg-teal-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Medical Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive healthcare services with experienced specialists and state-of-the-art facilities to ensure the best possible care for our patients.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <motion.div 
                className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
              <motion.button 
                whileHover={{ x: 5 }}
                className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
              >
                Learn More →
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Services
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;