import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';

const LoginRequired: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-md w-full text-center space-y-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Lock className="w-8 h-8 text-white" />
        </motion.div>
        
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to make an appointment. Please sign in to continue.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          <Link
            to="/login"
            className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all shadow-sm"
          >
            Sign In
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/signup" className="text-emerald-600 hover:text-emerald-500 font-medium">
              Sign up
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginRequired;
