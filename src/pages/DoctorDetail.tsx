import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Clock, Calendar, Globe, Award, ArrowLeft } from 'lucide-react';
import { doctors } from '../data/doctors';

const DoctorDetail = () => {
  const { id } = useParams();
  const doctor = doctors.find(d => d.id === id);
  const [selectedDay, setSelectedDay] = useState('Monday');

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Doctor not found</h1>
          <Link to="/doctors" className="text-blue-600 hover:text-blue-500">
            Back to Doctors
          </Link>
        </div>
      </div>
    );
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/doctors"
            className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Doctors
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row gap-6">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-48 h-48 object-cover rounded-2xl mx-auto md:mx-0"
                />
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <h1 className="text-3xl font-bold text-gray-900 mr-4">{doctor.name}</h1>
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">{doctor.rating}</span>
                    </div>
                  </div>
                  <p className="text-xl text-blue-600 font-semibold mb-4">{doctor.specialty}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Award className="w-5 h-5 mr-3 text-blue-600" />
                      <div>
                        <p className="font-semibold">{doctor.experience} Years</p>
                        <p className="text-sm">Experience</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                      <div>
                        <p className="font-semibold">Location</p>
                        <p className="text-sm">{doctor.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-5 h-5 mr-3 text-blue-600" />
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="text-sm">{doctor.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-5 h-5 mr-3 text-blue-600" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-sm">{doctor.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {doctor.languages.map((language, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        <Globe className="w-3 h-3 inline mr-1" />
                        {language}
                      </span>
                    ))}
                  </div>

                  <div className="text-center md:text-left">
                    <span className="text-3xl font-bold text-gray-900">${doctor.consultationFee}</span>
                    <span className="text-gray-600 ml-2">per consultation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Dr. {doctor.name.split(' ')[1]}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{doctor.about}</p>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
                <p className="text-gray-700">{doctor.education}</p>
              </div>
            </motion.div>

            {/* Availability Calendar */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Schedule</h2>
              
              <div className="grid grid-cols-7 gap-2 mb-6">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      selectedDay === day
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Available Times - {selectedDay}
                </h3>
                {doctor.availability[selectedDay].length > 0 ? (
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {doctor.availability[selectedDay].map((time, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="bg-green-50 border border-green-200 rounded-lg p-3 text-center cursor-pointer hover:bg-green-100 transition-colors"
                      >
                        <Clock className="w-4 h-4 mx-auto mb-1 text-green-600" />
                        <span className="text-sm font-medium text-green-800">{time}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No available times on {selectedDay}</p>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Booking Sidebar */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Book Appointment</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="font-bold text-gray-900">${doctor.consultationFee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-bold text-gray-900">45 min</span>
                </div>
              </div>

              <Link
                to={`/book/${doctor.id}`}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Link>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full text-left text-blue-600 hover:text-blue-500 py-2">
                    View Reviews
                  </button>
                  <button className="w-full text-left text-blue-600 hover:text-blue-500 py-2">
                    Ask a Question
                  </button>
                  <button className="w-full text-left text-blue-600 hover:text-blue-500 py-2">
                    Share Profile
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;