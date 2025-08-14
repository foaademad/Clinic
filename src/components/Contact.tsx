import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Calendar, Send, MessageCircle, Building2, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
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

  const formVariants = {
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
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <MessageCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-blue-800 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to take the next step in your healthcare journey? Contact us today to schedule an appointment or learn more about our services.
          </p>
          
          {/* Stats */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center items-center gap-8 mt-8"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">24/7</div>
              <div className="text-sm text-gray-500">Support</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">15min</div>
              <div className="text-sm text-gray-500">Response Time</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-gray-500">Satisfaction</div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Information */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Address",
                    content: ["123 Healthcare Boulevard", "Medical District, NY 10001"],
                    color: "bg-emerald-100 text-emerald-600"
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    content: ["Main: +1 (555) 123-4567", "Emergency: +1 (555) 911-0000"],
                    color: "bg-blue-100 text-blue-600"
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content: ["info@medisch.com", "appointments@medisch.com"],
                    color: "bg-purple-100 text-purple-600"
                  },
                  {
                    icon: Clock,
                    title: "Hours",
                    content: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM", "Sun: Emergency Only"],
                    color: "bg-orange-100 text-orange-600"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="flex items-start space-x-4 cursor-pointer group"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`${item.color} p-3 rounded-2xl group-hover:shadow-lg transition-all duration-300`}
                    >
                      <item.icon className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-900">{item.title}</h4>
                      <div className="text-gray-600">
                        {item.content.map((line, i) => (
                          <p key={i} className="leading-relaxed">{line}</p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Appointment Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-8 rounded-3xl cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Book an Appointment</h3>
                  <p className="text-emerald-100">Schedule your consultation today</p>
                </div>
              </div>
              <p className="text-emerald-100 mb-6 leading-relaxed">
                Schedule your consultation with our experienced medical professionals. Quick and easy booking process.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-emerald-600 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Now
              </motion.button>
            </motion.div>

            {/* Additional Info Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Modern Facility</h4>
                <p className="text-sm text-gray-600">State-of-the-art medical equipment and facilities</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Expert Team</h4>
                <p className="text-sm text-gray-600">Experienced healthcare professionals</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div 
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h3>
              <p className="text-gray-600">We'll get back to you within 15 minutes</p>
            </div>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {['First Name', 'Last Name'].map((label, index) => (
                  <motion.div
                    key={label}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <label className="block text-sm font-medium mb-2 text-gray-700">{label}</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder={index === 0 ? "John" : "Doe"}
                    />
                  </motion.div>
                ))}
              </div>
              
              {[
                { label: "Email", type: "email", placeholder: "john@example.com" },
                { label: "Phone", type: "tel", placeholder: "+1 (555) 123-4567" }
              ].map((field, index) => (
                <motion.div
                  key={field.label}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index + 2) * 0.1, duration: 0.5 }}
                >
                  <label className="block text-sm font-medium mb-2 text-gray-700">{field.label}</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type={field.type}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder={field.placeholder}
                  />
                </motion.div>
              ))}
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <label className="block text-sm font-medium mb-2 text-gray-700">Subject</label>
                <motion.select 
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm appearance-none cursor-pointer"
                >
                  <option>General Inquiry</option>
                  <option>Appointment Request</option>
                  <option>Medical Records</option>
                  <option>Insurance Question</option>
                  <option>Emergency Contact</option>
                </motion.select>
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <label className="block text-sm font-medium mb-2 text-gray-700">Message</label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
                  placeholder="How can we help you today? Please provide details about your inquiry..."
                ></motion.textarea>
              </motion.div>
              
              <motion.button
                type="submit"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-2xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;