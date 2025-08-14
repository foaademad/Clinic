import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Calendar, ChevronDown, User, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { logout } from '../store/slice/authSlice';
import { persistor } from '../store/store';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    dispatch(logout());
    await persistor.purge(); // Clear all persisted state
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' }
  ];

  const servicesLinks = ['General Medicine', 'Cardiology', 'Pediatrics', 'Orthopedics'];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white shadow-md sticky top-0 z-50 backdrop-blur-md"
    >
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="hidden md:flex justify-between items-center py-2 text-sm text-gray-500 border-b border-gray-100"
        >
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-500" /> +1 (555) 123-4567
            </span>
            <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-medium">Emergency: +1 (555) 911-0000</span>
            {!user && (
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition"
              >
                Portal Login
              </Link>
            )}
          </div>
        </motion.div>

        {/* Main header */}
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link to="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md"
              >
                M
              </motion.div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-900">Medisch</h1>
                <p className="text-sm text-gray-500">Healthcare Center</p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="hidden lg:flex items-center gap-8"
          >
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`transition-colors px-3 py-2 rounded-md font-medium ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative">
              <motion.button
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
                className={`flex items-center gap-1 px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive('/services')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Services <ChevronDown className="w-4 h-4" />
              </motion.button>
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2"
                  >
                    <Link
                      to="/services"
                      className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      All Services
                    </Link>
                    {servicesLinks.map((service) => (
                      <Link
                        key={service}
                        to="/services"
                        className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                      >
                        {service}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.nav>

          {/* User & Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden md:block">{user.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/appointments"
                        className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                      >
                        My Appointments
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-md transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Book Appointment Button - Only show if logged in */}
            {user && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.3, type: 'spring' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-green-600 transition"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <Link to="/book">Book Appointment</Link>
              </motion.button>
            )}

            {/* Mobile menu toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden py-4 border-t border-gray-100 overflow-hidden"
            >
              <nav className="flex flex-col gap-4">
                {/* Public navigation items */}
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-4 py-2 rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Protected navigation items - only show if logged in */}
                {user && (
                  <>
                    <Link
                      to="/book"
                      className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-green-600 transition text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Book Appointment
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </>
                )}
                
                {/* Authentication links */}
                {!user && (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-gray-700 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-2 text-gray-700 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
