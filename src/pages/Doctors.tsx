import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Search, Filter, Users, Award, Heart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSearchTerm, setSelectedSpecialty } from '../store/slice/doctorSlice';
import { useGetDoctorsQuery } from '../store/api/doctorsApi';
import { useAppDispatch } from '../store/store';
import DoctorCard from '../components/doctorCard.tsx';

const Doctors = () => {
  const dispatch = useAppDispatch();
  const { searchTerm, selectedSpecialty } = useSelector((state: RootState) => state.doctors);

  // Fetch doctors using RTK Query
  const { data: doctors = [], isLoading, error } = useGetDoctorsQuery();

  // Extract unique specialties
  const specialties = [...new Set(doctors.map((doctor) => doctor.speciality))];

  // Filter doctors
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.User.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === '' || doctor.speciality === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // Skeleton for loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="animate-pulse bg-gray-200 h-12 w-3/4 mx-auto rounded-2xl mb-6"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-1/2 mx-auto rounded-xl"></div>
          </motion.div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100 mb-16"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="animate-pulse bg-gray-200 h-14 rounded-2xl"></div>
              <div className="animate-pulse bg-gray-200 h-14 rounded-2xl"></div>
            </div>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 mb-2 rounded-xl"></div>
                    <div className="h-4 bg-gray-200 mb-3 rounded-xl"></div>
                    <div className="space-y-3 mb-6">
                      <div className="h-4 bg-gray-200 rounded-xl"></div>
                      <div className="h-4 bg-gray-200 rounded-xl"></div>
                      <div className="h-4 bg-gray-200 rounded-xl"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded-2xl"></div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-12 text-center">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Heart className="w-12 h-12 text-red-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">We couldn't load the doctors list. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <Users className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-blue-800 bg-clip-text text-transparent">
            Our Medical Experts
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Meet our team of experienced healthcare professionals dedicated to providing exceptional medical care with compassion and expertise.
          </p>
          
          {/* Stats */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center items-center gap-8 mt-8"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{doctors.length}+</div>
              <div className="text-sm text-gray-500">Specialists</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">15+</div>
              <div className="text-sm text-gray-500">Specialties</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4.8</div>
              <div className="text-sm text-gray-500">Avg Rating</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100 mb-16"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Find Your Perfect Doctor</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className="pl-12 w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedSpecialty}
                onChange={(e) => dispatch(setSelectedSpecialty(e.target.value))}
                className="pl-12 w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm appearance-none cursor-pointer"
              >
                <option value="">All Specialties</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-gray-600">
            Showing <span className="font-semibold text-emerald-600">{filteredDoctors.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{doctors.length}</span> doctors
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </motion.div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all specialties.</p>
            <button
              onClick={() => {
                dispatch(setSearchTerm(''));
                dispatch(setSelectedSpecialty(''));
              }}
              className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition-all duration-300"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Doctors;