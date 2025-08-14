import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext.tsx"; 
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Doctors from './pages/Doctors';
import DoctorDetail from './pages/DoctorDetail';
import Services from './components/Services';
import BookSession from './pages/BookSession';
import About from './pages/About';
import Contact from './pages/Contact';
import AppointmentPage from './pages/BookSession';
import Hero from './components/Hero.tsx';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider> 
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public routes - accessible without login */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/Home" element={<Hero />} />
              <Route path="/services" element={<Services />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctors/:id" element={<DoctorDetail />} />
              
              {/* Protected routes - require login */}
              <Route path="/book/:doctorId?" element={
                <ProtectedRoute>
                  <BookSession />
                </ProtectedRoute>
              } />
              <Route path="/appointment" element={
                <ProtectedRoute>
                  <AppointmentPage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
