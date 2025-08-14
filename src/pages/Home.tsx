import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Calendar, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import Services from '../pages/Services';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

const Home = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Hero />
          <Services />
      <About />
      <Testimonials />
    
      
      {!user && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-16 bg-gradient-to-r from-emerald-50 to-blue-50"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              viewport={{ once: true }}
              className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <User className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of patients who trust us with their healthcare. 
              Create an account to book appointments, view doctors, and access our services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Already have an account? Sign In
              </Link>
            </div>
          </div>
        </motion.section>
      )}
      
  
    </>
  );
};

export default Home;