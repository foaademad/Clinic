import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doctors as doctorData } from "../../data/doctors"; // adjust path if needed

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  location: string;
  consultationFee: number;
  image: string;
}

interface DoctorState {
  doctors: Doctor[];
  searchTerm: string;
  selectedSpecialty: string;
}

const initialState: DoctorState = {
  doctors: doctorData,
  searchTerm: '',
  selectedSpecialty: '',
};

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setSelectedSpecialty(state, action: PayloadAction<string>) {
      state.selectedSpecialty = action.payload;
    },
    setDoctors(state, action: PayloadAction<Doctor[]>) {
      state.doctors = action.payload;
    },
  },
});

export const { setSearchTerm, setSelectedSpecialty, setDoctors } = doctorSlice.actions;
export default doctorSlice.reducer;
