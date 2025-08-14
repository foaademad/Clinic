import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Calendar, Award, Phone } from 'lucide-react';
import { Doctor } from '../store/api/doctorsApi'; 

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  // Temporary profile pictures for doctors
  const getTempImage = (name: string) => {
    const images = [
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1594824475545-3a9b7f7a0c8f?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1594824475545-3a9b7f7a0c8f?w=400&h=400&fit=crop&crop=face"
    ];
    // Use name hash to consistently assign images
    const hash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return images[hash % images.length];
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const rating = (4.0 + Math.random() * 1.0).toFixed(1);
  

  const experienceYears = Math.floor(Math.random() * 20) + 5;
  
  const consultationFee = Math.floor(Math.random() * 200) + 100;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
    >
      {/* Header with image and rating */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={getTempImage(doctor.User.name)}
          alt={doctor.User.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Rating badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center shadow-lg">
          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1.5" />
          <span className="text-sm font-bold text-gray-800">{rating}</span>
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
            <span className="text-sm">{experienceYears} years experience</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm">Downtown Medical Center</span>
          </div>

          <div className="flex items-center text-gray-600">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-sm">Available Mon-Fri</span>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-left">
            <span className="text-2xl font-bold text-emerald-600">${consultationFee}</span>
            <span className="text-gray-500 text-sm ml-1">consultation</span>
          </div>
          
          <Link
            to={`/doctors/${doctor.User._id}`}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-full hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View Profile
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;