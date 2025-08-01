// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import bookingReducer from './slice/bookingSlice';  
import doctorsReducer from '../store/slice/doctorSlice';  
import doctorDetailReducer from "./slice/doctorDetailSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,     
    doctors: doctorsReducer,
    doctorDetail: doctorDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
