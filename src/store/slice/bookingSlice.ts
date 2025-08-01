import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookingState {
  selectedDate: string;
  selectedTime: string;
  selectedDoctor: string;
  appointmentType: string;
  notes: string;
  isSubmitting: boolean;
  isBooked: boolean;
}

const initialState: BookingState = {
  selectedDate: '',
  selectedTime: '',
  selectedDoctor: '',
  appointmentType: 'consultation',
  notes: '',
  isSubmitting: false,
  isBooked: false,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    setSelectedTime(state, action: PayloadAction<string>) {
      state.selectedTime = action.payload;
    },
    setSelectedDoctor(state, action: PayloadAction<string>) {
      state.selectedDoctor = action.payload;
    },
    setAppointmentType(state, action: PayloadAction<string>) {
      state.appointmentType = action.payload;
    },
    setNotes(state, action: PayloadAction<string>) {
      state.notes = action.payload;
    },
    setIsSubmitting(state, action: PayloadAction<boolean>) {
      state.isSubmitting = action.payload;
    },
    setIsBooked(state, action: PayloadAction<boolean>) {
      state.isBooked = action.payload;
    },
    resetBooking(state) {
      state.selectedDate = '';
      state.selectedTime = '';
      state.selectedDoctor = '';
      state.appointmentType = 'consultation';
      state.notes = '';
      state.isSubmitting = false;
      state.isBooked = false;
    },
  },
});

export const {
  setSelectedDate,
  setSelectedTime,
  setSelectedDoctor,
  setAppointmentType,
  setNotes,
  setIsSubmitting,
  setIsBooked,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
