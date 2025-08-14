import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Users, Heart, Calendar } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store'; 
import { setUser, setLoading, setError } from '../store/slice/authSlice'; 
import { login as loginApi } from '../store/api/authApi';

const inputVariant = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading: isLoading, error, user, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user && token) {
      navigate('/');
    }
  }, [user, token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      const result = await loginApi(email, password, dispatch);
      if (result?.user) {
        navigate('/');
      }
      if (!result?.user) {
        dispatch(setError('Invalid email or password'));
      }
    } catch (err: any) {
      dispatch(setError(err?.response?.data?.error || err?.response?.data?.message || 'Login failed'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Welcome Content with Features */}
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
            Welcome back
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Sign in to continue
          </p>

          {/* Features Section */}
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

          {/* Stats Section */}
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

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-2xl border border-gray-100"
        >
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <motion.div variants={inputVariant} initial="initial" animate="animate">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm placeholder:text-gray-400"
                  placeholder="you@example.com"
                  aria-label="Email address"
                />
              </div>
            </motion.div>

            <motion.div variants={inputVariant} initial="initial" animate="animate">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-12 w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm placeholder:text-gray-400"
                  placeholder="••••••••"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-700 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-500">
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </motion.button>

            <div className="text-center pt-4">
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/signup" className="text-emerald-600 hover:text-emerald-500 font-medium transition-colors">
                Sign up
              </Link>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
