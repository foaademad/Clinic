import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Stethoscope, Syringe, HeartPulse, Info } from "lucide-react";

const ModernHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 120 },
    },
  };

  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-sky-100 via-white to-sky-50 overflow-hidden"
    >



  
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-10 left-10 w-40 h-40 bg-sky-300 rounded-full opacity-30 blur-3xl"
      ></motion.div>
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-56 h-56 bg-emerald-300 rounded-full opacity-20 blur-3xl"
      ></motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative container mx-auto px-4 py-20 lg:py-28"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <motion.h1
              variants={itemVariants}
              className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900"
            >
              Advanced Medical Care{" "}
              <motion.span
                className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                For Everyone
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-gray-600 leading-relaxed"
            >
              Your health deserves nothing less than the best — meet our
              world-class doctors, cutting-edge facilities, and personalized
              care.
            </motion.p>

      
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/appointment"
                  className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                >
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Book Appointment
                </Link>
              </motion.div>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(14,165,233,0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-sky-500 text-sky-500 px-8 py-4 rounded-full font-semibold hover:bg-sky-500 hover:text-white transition-all flex items-center"
              >
                <Info className="w-5 h-5 mr-2" />
                Learn More
              </motion.button>
            </motion.div>

        
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {[
                { icon: HeartPulse, title: "99%", subtitle: "Patient Satisfaction" },
                { icon: Syringe, title: "10k+", subtitle: "Successful Treatments" },
                { icon: Stethoscope, title: "150+", subtitle: "Specialist Doctors" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={statsVariants}
                  whileHover={{ scale: 1.1 }}
                  className="text-center bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-md"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-sky-100 rounded-full mx-auto mb-3 text-sky-600">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.title}</div>
                  <div className="text-gray-500 text-sm">{stat.subtitle}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10">
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                src="https://images.pexels.com/photos/5206954/pexels-photo-5206954.jpeg
"
                 
                alt="Doctors in hospital"
                className="rounded-3xl shadow-1xl border border-sky-100"
              />
            </div>
           
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border-4 border-sky-300 rounded-3xl opacity-30"
            ></motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ModernHero;
