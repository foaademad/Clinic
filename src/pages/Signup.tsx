import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone, Image as ImageIcon, ArrowRight, Shield, Users, Heart, Calendar } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store.ts";
import { setError } from "../store/slice/authSlice";
import { register } from "../store/api/authApi";  
import { Link } from "react-router-dom";

const inputVariant = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    age: "",
    role: "patient",
    imageUrl: "", 
  });

  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user && !error) {
      setSuccess("Account created successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        age: "",
        role: "patient",
        imageUrl: "",
      });
    } else if (error) {
      setSuccess(null);
    }
  }, [user, error]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.role === 'doctor' && !selectedFile) {
      dispatch(setError('Please upload a profile image for doctor signup'));
      return;
    }
    await register(
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        age: Number(formData.age || 0),
        role: formData.role,
        imageUrl: formData.imageUrl || undefined,
      },
      dispatch,
      selectedFile || undefined
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left relative"
        >
    
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-3xl flex items-center justify-center mx-auto lg:mx-0 mb-6 shadow-xl"
          >
            <span className="text-white font-bold text-3xl">M</span>
          </motion.div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-blue-800 bg-clip-text text-transparent">
            Join Our Community
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Create your account and start your healthcare journey with our expert medical professionals.
          </p>

          <div className="space-y-4 mb-8">
            {[
              { icon: Shield, text: "Secure & Private", color: "text-emerald-600" },
              { icon: Users, text: "Expert Care Team", color: "text-blue-600" },
              { icon: Heart, text: "Personalized Care", color: "text-purple-600" },
              { icon: Calendar, text: "Easy Booking", color: "text-orange-600" }
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="flex items-center gap-3 justify-center lg:justify-start"
              >
                <div className={`w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center`}>
                  <feature.icon className={`w-4 h-4 ${feature.color}`} />
                </div>
                <span className="text-gray-700 font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 max-w-xs mx-auto lg:mx-0"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">10K+</div>
              <div className="text-sm text-gray-500">Patients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-500">Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">99%</div>
              <div className="text-sm text-gray-500">Satisfaction</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-2xl border border-gray-100"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join and book appointments easily</p>
          </div>

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name and Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div variants={inputVariant} initial="initial" animate="animate">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User size={16} className="inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
              </motion.div>

              <motion.div variants={inputVariant} initial="initial" animate="animate">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <motion.div variants={inputVariant} initial="initial" animate="animate">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+1234567890"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
              </motion.div>

              <motion.div variants={inputVariant} initial="initial" animate="animate">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  placeholder="25"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
              </motion.div>
            </div>

            <motion.div variants={inputVariant} initial="initial" animate="animate">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm appearance-none cursor-pointer"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              <motion.div variants={inputVariant} initial="initial" animate="animate">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ImageIcon size={16} className="inline mr-2" />
                  Image URL (optional)
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
              </motion.div>

              <motion.div variants={inputVariant} initial="initial" animate="animate">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ImageIcon size={16} className="inline mr-2" />
                  Profile Image
                  {formData.role === 'doctor' && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
              </motion.div>
            </div>

            <motion.div variants={inputVariant} initial="initial" animate="animate">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock size={16} className="inline mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                <span className="flex items-center justify-center">
                  Create Account
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              )}
            </motion.button>

            {/* Error and Success Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-700 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 text-sm text-center"
              >
                {success}
              </motion.div>
            )}

            <div className="text-center pt-4">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-emerald-600 hover:text-emerald-500 font-medium transition-colors">
                Sign in
              </Link>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
