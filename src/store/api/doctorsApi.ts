import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store/store';
import { API_BASE_URL } from '../utility/api';

// Define the Doctor interface based on the API response
export interface Doctor {
  _id: string;
  User: {
    _id: string;
    name: string;
    email: string;
    age: number;
    role: string;
    phone: string;
    id: string;
  };
  isComplete: boolean;
  degrees: string[];
  speciality: string;
  fees: number;
  experience: string[];
  __v: number;
  id: string;
}

export interface SessionItem {
  _id: string;
  duration: number;
  startTime: string; 
  doctor: string;
  isBooked: boolean;
}

type DoctorsResponse = { doctors: Doctor[] } | Doctor[];

export const doctorsApi = createApi({
  reducerPath: 'doctorsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDoctors: builder.query<Doctor[], void>({
      query: () => 'doctors',
      transformResponse: (response: DoctorsResponse) => {
        if (Array.isArray(response)) return response;
        return response?.doctors ?? [];
      },
    }),
    getDoctorById: builder.query<Doctor, string>({
      query: (id) => `doctors/${id}`,
    }),
    getDoctorInfoByUserId: builder.query<{ doctor: any; sessions: SessionItem[] }, string>({
      query: (userId) => `doctors/info/${userId}`,
    }),
  }),
});

export const { useGetDoctorsQuery, useGetDoctorByIdQuery, useGetDoctorInfoByUserIdQuery } = doctorsApi;