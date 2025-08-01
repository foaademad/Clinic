// src/redux/slice/doctorDetailSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DoctorDetailState {
  selectedDay: string;
}

const initialState: DoctorDetailState = {
  selectedDay: 'Monday',  // default day
};

const doctorDetailSlice = createSlice({
  name: "doctorDetail",
  initialState,
  reducers: {
    setSelectedDay: (state, action: PayloadAction<string>) => {
      state.selectedDay = action.payload;
    },
    resetSelectedDay: (state) => {
      state.selectedDay = 'Monday';
    },
  },
});

export const { setSelectedDay, resetSelectedDay } = doctorDetailSlice.actions;
export default doctorDetailSlice.reducer;
