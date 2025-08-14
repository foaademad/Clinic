import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Baby, Bone, Eye, Brain, Stethoscope, Activity, Shield, Star, MapPin, Calendar, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  // Sample doctor data - in a real app, this would come from an API
  const doctors = [
    {
      _id: "1",
      User: {
        name: "Dr. Sarah Johnson",
        imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
        email: "sarah.johnson@clinic.com"
      },
      speciality: "General Medicine",
      experience: "15 years",
      rating: 4.8,
      location: "Downtown Clinic",
      availableDays: ["Monday", "Wednesday", "Friday"]
    },
    {
      _id: "2",
      User: {
        name: "Dr. Michael Chen",
        imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
        email: "michael.chen@clinic.com"
      },
      speciality: "Cardiology",
      experience: "12 years",
      rating: 4.9,
      location: "Heart Center",
      availableDays: ["Tuesday", "Thursday", "Saturday"]
    },
    {
      _id: "3",
      User: {
        name: "Dr. Emily Rodriguez",
        imageUrl: "https://images.unsplash.com/photo-1594824475545-3a9b7f7a0c8f?w=400&h=400&fit=crop&crop=face",
        email: "emily.rodriguez@clinic.com"
      },
      speciality: "Pediatrics",
      experience: "10 years",
      rating: 4.7,
      location: "Children's Wing",
      availableDays: ["Monday", "Tuesday", "Friday"]
    },
    {
      _id: "4",
      User: {
        name: "Dr. David Kim",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        email: "david.kim@clinic.com"
      },
      speciality: "Orthopedics",
      experience: "18 years",
      rating: 4.6,
      location: "Sports Medicine Center",
      availableDays: ["Wednesday", "Thursday", "Saturday"]
    },
    {
      _id: "5",
      User: {
        name: "Dr. Lisa Thompson",
        imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
        email: "lisa.thompson@clinic.com"
      },
      speciality: "Ophthalmology",
      experience: "14 years",
      rating: 4.8,
      location: "Eye Care Center",
      availableDays: ["Monday", "Wednesday", "Friday"]
    },
    {
      _id: "6",
      User: {
        name: "Dr. Robert Wilson",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        email: "robert.wilson@clinic.com"
      },
      speciality: "Neurology",
      experience: "20 years",
      rating: 4.9,
      location: "Neurological Institute",
      availableDays: ["Tuesday", "Thursday", "Friday"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
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
            <Users className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-blue-800 bg-clip-text text-transparent">
            Our Expert Doctors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Meet our experienced medical professionals dedicated to providing exceptional healthcare with compassion and expertise.
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
              <div className="text-2xl font-bold text-emerald-600">{doctors.length}+</div>
              <div className="text-sm text-gray-500">Specialists</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">6+</div>
              <div className="text-sm text-gray-500">Specialties</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4.8</div>
              <div className="text-sm text-gray-500">Avg Rating</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Doctors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor._id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              {/* Header with image and rating */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={doctor.User.imageUrl}
                  alt={doctor.User.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Rating badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center shadow-lg">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1.5" />
                  <span className="text-sm font-bold text-gray-800">{doctor.rating}</span>
                </div>

                {/* Speciality badge */}
                <div className="absolute bottom-4 left-4 bg-emerald-500/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <span className="text-xs font-semibold text-white">{doctor.speciality}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Doctor name and title */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                    {doctor.User.name}
                  </h3>
                  <p className="text-gray-500 text-sm">Medical Specialist</p>
                </div>

                {/* Doctor info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                      <Clock className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-sm">{doctor.experience} experience</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm">{doctor.location}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Calendar className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm">Available {doctor.availableDays.length} days/week</span>
                  </div>
                </div>

                {/* Available Days */}
                <div className="mb-6">
                  <p className="text-xs text-gray-500 mb-2">Available Days:</p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.availableDays.map((day, dayIndex) => (
                      <span
                        key={dayIndex}
                        className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom section */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-left">
                    <span className="text-2xl font-bold text-emerald-600">$150</span>
                    <span className="text-gray-500 text-sm ml-1">consultation</span>
                  </div>
                  
                  <Link
                    to={`/doctors/${doctor._id}`}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-full hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            to="/doctors"
            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            View All Doctors
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
