import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  icon: string;
  price: string;
  duration: string;
  features: string[];
}

interface ServicesState {
  services: Service[];
}

const initialState: ServicesState = {
  services: [],
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
    addService: (state, action: PayloadAction<Service>) => {
      state.services.push(action.payload);
    },
    clearServices: (state) => {
      state.services = [];
    },
  },
});

export const { setServices, addService, clearServices } = servicesSlice.actions;
export default servicesSlice.reducer;
