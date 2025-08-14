import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestimonials } from '../store/slice/testimonialsSlice';
import { AppDispatch, RootState } from '../store/store';

const Testimonials = () => {
  const dispatch = useDispatch<AppDispatch>();
  const testimonials = useSelector((state: RootState) => state.testimonials.items);
  const loading = useSelector((state: RootState) => state.testimonials.loading);
  const error = useSelector((state: RootState) => state.testimonials.error);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0, opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        
    
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Hear From Our Patients
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your trust means everything to us — here’s what patients are saying about our care.
          </p>
        </motion.div>

        {loading && <div className="text-center py-10 text-lg">Loading testimonials...</div>}
        {error && testimonials.length === 0 && (
          <div className="text-center py-10 text-red-500">
            Unable to fetch testimonials. Showing offline content.
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all"
            >
              <div className="flex items-center mb-6">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={t.image}
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 ring-4 ring-blue-100"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <motion.div key={i} whileHover={{ rotate: 360 }} transition={{ duration: 0.4 }}>
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </div>

              <div className="relative">
                <Quote className="w-8 h-8 text-blue-200 absolute -top-2 -left-2" />
                <p className="text-gray-700 leading-relaxed pl-6">{t.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-20"
        >
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-lg inline-block">
            <div className="flex items-center justify-center space-x-10">
              
              <div>
                <div className="text-4xl font-extrabold text-blue-600">4.9</div>
                <div className="flex justify-center my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-gray-500">Average Rating</div>
              </div>

              <div className="w-px h-16 bg-gray-300"></div>

              <div>
                <div className="text-4xl font-extrabold text-blue-600">2,500+</div>
                <div className="text-gray-500 mt-2">Reviews</div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
