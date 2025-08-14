// testimonialsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../store/utility/api";
import { staticTestimonials } from "../../data/reviews";
import { Testimonial } from "../../types";

interface TestimonialsState {
  items: Testimonial[];
  loading: boolean;
  error: string | null;
}

const initialState: TestimonialsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchTestimonials = createAsyncThunk<Testimonial[]>(
  "testimonials/fetchTestimonials",
  async () => {
    try {
      const res = await api.get("/api/testimonials");
      return res.data;
    } catch (error) {
      console.warn("Using static reviews due to API error");
      return staticTestimonials;
    }
  }
);

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load testimonials";
      });
  },
});

export default testimonialSlice.reducer;
