import { api } from "./api";

export const getTestimonials = async () => {
  const response = await api.get("/api/testimonials");
  return response.data;
};
