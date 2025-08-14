import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { doctorsApi } from '../store/api/doctorsApi.ts';
import authReducer from './slice/authSlice';
import bookingReducer from './slice/bookingSlice';
import doctorsReducer from './slice/doctorSlice';
import doctorDetailReducer from './slice/doctorDetailSlice';
import servicesReducer from './slice/servicesSlice';
import testimonialsReducer from './slice/testimonialsSlice';
import { useDispatch } from 'react-redux';

// Configure persistence for auth state
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token'], // Only persist user and token
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    booking: bookingReducer,
    doctors: doctorsReducer,
    doctorDetail: doctorDetailReducer,
    services: servicesReducer,
    testimonials: testimonialsReducer,
    [doctorsApi.reducerPath]: doctorsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(doctorsApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();