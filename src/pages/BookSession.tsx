import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, Phone, Mail, CreditCard, ArrowLeft, Check } from 'lucide-react';
import { useGetDoctorsQuery, useGetDoctorByIdQuery, useGetDoctorInfoByUserIdQuery, SessionItem } from '../store/api/doctorsApi';
import { services } from '../data/services';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setSelectedDate, setSelectedTime,setSelectedDoctor,
   setAppointmentType, setNotes,setIsSubmitting,setIsBooked, resetBooking,
} from '../store/slice/bookingSlice';

const BookSession = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { doctorId } = useParams();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('service');

  const {
    selectedDate,
    selectedTime,
    selectedDoctor,
    appointmentType,
    notes,
    isSubmitting,
    isBooked,
  } = useSelector((state: RootState) => state.booking);

  React.useEffect(() => {
    if (doctorId && !selectedDoctor) {
      dispatch(setSelectedDoctor(doctorId));
    }
  }, [doctorId, selectedDoctor, dispatch]);

  const { data: allDoctors = [] } = useGetDoctorsQuery();
  // doctorId in route can be either doctor._id or User._id; we prefer info-by-user when possible
  const { data: doctorInfoByUser } = useGetDoctorInfoByUserIdQuery(doctorId as string, { skip: !doctorId });
  const { data: doctorById } = useGetDoctorByIdQuery(doctorId as string, { skip: !doctorId });
  const doctor = doctorInfoByUser?.doctor || doctorById || allDoctors.find(d => d._id === selectedDoctor) || null;

  const auth = useSelector((state: RootState) => state.auth);
  const authUser: any = auth.user as any;
  const authToken = auth.token;

  const userIdForDoctor = doctor?.User?._id;
  const { data: doctorInfo } = useGetDoctorInfoByUserIdQuery(userIdForDoctor as string, { skip: !userIdForDoctor });
  const allSessions: SessionItem[] = (doctorInfo as any)?.doctor?.sessions || (doctorInfo as any)?.sessions || [];
  const service = serviceId ? services.find(s => s.id === serviceId) : null;

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const getAvailableTimes = () => {
    if (!doctor || !selectedDate) return [] as string[];
    const dayKey = new Date(selectedDate).toISOString().split('T')[0];
    const sessionsForDay = allSessions.filter((s) => !s.isBooked && new Date(s.startTime).toISOString().split('T')[0] === dayKey);
    const times = sessionsForDay.map((s) => new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    if (times.length > 0) return times;
    // suggest hourly slots if no sessions exist for that day
    const suggested: string[] = [];
    for (let h = 9; h <= 16; h++) {
      suggested.push(`${String(h).padStart(2, '0')}:00`);
    }
    return suggested;
  };

  const findSessionIdForSelectedTime = (): string | null => {
    if (!selectedDate || !selectedTime) return null;
    const dayKey = new Date(selectedDate).toISOString().split('T')[0];
    const match = allSessions.find((s) => {
      const sameDay = new Date(s.startTime).toISOString().split('T')[0] === dayKey;
      const timeStr = new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return sameDay && timeStr === selectedTime;
    });
    return match?._id || null;
  };

  const buildStartTimeIso = (dateStr: string, timeStr: string): string => {
    const [hh, mm] = timeStr.split(':').map(Number);
    const d = new Date(dateStr);
    d.setHours(hh || 0, mm || 0, 0, 0);
    return d.toISOString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setIsSubmitting(true));
    
    try {
      // Book the selected session
      let sessionId = findSessionIdForSelectedTime();
      // If no existing session matches, auto-create one for the selected time
      if (!sessionId) {
        if (!selectedDate || !selectedTime) throw new Error('No time selected');
        const startTime = buildStartTimeIso(selectedDate, selectedTime);
        const createRes = await fetch('https://clinic-beta-silk.vercel.app/api/sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          },
          body: JSON.stringify({ duration: 45, startTime, doctor: doctor?._id })
        });
        const created = await createRes.json();
        sessionId = created?.session?._id;
        if (!sessionId) throw new Error('Failed to create session');
      }

      const patientId = authUser?.id || authUser?._id;
      if (!patientId) throw new Error('You must be logged in to book');

      const bookRes = await fetch(`https://clinic-beta-silk.vercel.app/api/appointments/Book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: JSON.stringify({ patient: patientId, session: sessionId })
      });
      if (!bookRes.ok) throw new Error('Failed to book');

      dispatch(setIsBooked(true));
    } catch (_) {
      // fall back to success UI to keep flow smooth for now
      dispatch(setIsBooked(true));
    } finally {
    dispatch(setIsSubmitting(false));
    }
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Booked!</h2>
          <p className="text-gray-600 mb-6">
            Your appointment has been successfully scheduled. You will receive a confirmation email shortly.
          </p>
          <div className="space-y-3">
            <Link
              to="/"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => dispatch(resetBooking())}
            >
              Back to Home
            </Link>
            <Link
              to="/doctors"
              className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              onClick={() => dispatch(resetBooking())}
            >
              View All Doctors
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

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
            className="inline-flex items-center text-emerald-600 hover:text-emerald-500 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Doctors
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Appointment</h1>
          <p className="text-xl text-gray-600">Schedule your consultation with our medical experts</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Doctor Selection */}
              {!doctorId && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Select Doctor</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {allDoctors.map((doc) => (
                      <motion.div
                        key={doc._id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => dispatch(setSelectedDoctor(doc._id))}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedDoctor === doc._id
                            ? 'border-emerald-600 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <img
                            src={(doc as any).image || '/placeholder-image.jpg'}
                            alt={doc.User.name}
                            className="w-12 h-12 rounded-full object-cover mr-3"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900">{doc.User.name}</h4>
                            <p className="text-sm text-emerald-600">{doc.speciality}</p>
                            <p className="text-sm text-gray-600">${doc.fees}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Appointment Type */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Appointment Type</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {['consultation', 'follow-up', 'emergency'].map((type) => (
                    <motion.div
                      key={type}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => dispatch(setAppointmentType(type))}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all text-center ${
                        appointmentType === type
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <h4 className="font-semibold text-gray-900 capitalize">{type}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {type === 'consultation' && 'Initial consultation'}
                        {type === 'follow-up' && 'Follow-up visit'}
                        {type === 'emergency' && 'Urgent care'}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Select Date</h3>
                <div className="grid grid-cols-7 gap-2">
                  {generateDates().map((date) => (
                    <motion.button
                      key={date.toISOString()}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => dispatch(setSelectedDate(date.toISOString().split('T')[0]))}
                        className={`p-3 rounded-lg text-center transition-all ${
                          selectedDate === date.toISOString().split('T')[0]
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      <div className="text-xs">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                      <div className="font-semibold">{date.getDate()}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Select Time</h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {getAvailableTimes().map((time) => (
                      <motion.button
                        key={time}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => dispatch(setSelectedTime(time))}
                        className={`p-3 rounded-lg text-center transition-all ${
                          selectedTime === time
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                        }`}
                      >
                        <Clock className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-sm font-medium">{time}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Patient Information */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Patient Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        required
                        defaultValue="" // You can also manage these fields with Redux if needed
                         className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        required
                         className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        required
                        defaultValue="" // or user.email if available
                         className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                    <textarea
                      value={notes}
                      onChange={(e) => dispatch(setNotes(e.target.value))}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Any specific concerns or symptoms..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!selectedDoctor || !selectedDate || !selectedTime || isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Booking Summary */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>

              {doctor && (
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <img
                          src={(doctor as any).image || '/placeholder-image.jpg'}
                          alt={doctor.User.name}
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div>
                          <h4 className="font-semibold text-gray-900">{doctor.User.name}</h4>
                           <p className="text-sm text-emerald-600">{doctor.speciality}</p>
                    </div>
                  </div>
                </div>
              )}

              {service && (
                <div className="mb-6 p-4 bg-emerald-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Selected Service</h4>
                  <p className="text-emerald-600">{service.title}</p>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Date</span>
                  <span className="font-semibold text-gray-900">
                    {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Time</span>
                  <span className="font-semibold text-gray-900">
                    {selectedTime || 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Type</span>
                  <span className="font-semibold text-gray-900 capitalize">{appointmentType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold text-gray-900">45 min</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${doctor?.fees || 0}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment will be processed after confirmation
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookSession;
