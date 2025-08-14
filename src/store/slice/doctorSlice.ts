import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DoctorState {
  searchTerm: string;
  selectedSpecialty: string;
}

const initialState: DoctorState = {
  searchTerm: '',
  selectedSpecialty: '',
};

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedSpecialty: (state, action: PayloadAction<string>) => {
      state.selectedSpecialty = action.payload;
    },
  },
});

export const { setSearchTerm, setSelectedSpecialty } = doctorSlice.actions;
export default doctorSlice.reducer;