import axios from "axios";
import { User } from "../interface/authInterface";
import { api } from "../utility/api";
import { setLoading, setError, setUser, setToken } from "../slice/authSlice";
import { AppDispatch } from "../store";

export const login = async (email: string, password: string, dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.post("/api/users/login", { email, password });
    dispatch(setUser(response.data?.user ?? null));
    if (response.data?.token) dispatch(setToken(response.data.token));
    dispatch(setError(null));
    return response.data;
  } catch (error: any) {
    // Fallbacks on server/network errors
    try {
      const fallback = await axios.post(
        "https://clinic-gules-theta.vercel.app/api/users/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      dispatch(setUser(fallback.data?.user ?? null));
      if (fallback.data?.token) dispatch(setToken(fallback.data.token));
      dispatch(setError(null));
      return fallback.data;
    } catch (innerError: any) {
      // Final fallback: try legacy path
      try {
        const legacy = await axios.post(
          "https://clinic-gules-theta.vercel.app/login",
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );
        dispatch(setUser(legacy.data?.user ?? null));
        if (legacy.data?.token) dispatch(setToken(legacy.data.token));
        dispatch(setError(null));
        return legacy.data;
      } catch (finalError: any) {
        console.error("Login failed:", finalError);
        dispatch(
          setError(
            finalError.response?.data?.error ||
              finalError.response?.data?.message ||
              "Invalid email or password"
          )
        );
      }
    }
  } finally {
    dispatch(setLoading(false));
  }
};

export const register = async (user: User, dispatch: AppDispatch, file?: File) => {
  try {
    dispatch(setLoading(true));
    // If a file is provided, send multipart form-data (field name: "file")
    let response;
    if (file) {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      formData.append("password", user.password);
      formData.append("age", String(user.age));
      formData.append("role", user.role);
      formData.append("file", file);
      response = await api.post("/api/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else if (user.imageUrl) {
      // If an image URL is provided, try to fetch and upload it as a file
      try {
        const res = await fetch(user.imageUrl);
        const blob = await res.blob();
        const filename = user.imageUrl.split("/").pop() || "image.jpg";
        const imageFile = new File([blob], filename, { type: blob.type || "image/jpeg" });
        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("phone", user.phone);
        formData.append("password", user.password);
        formData.append("age", String(user.age));
        formData.append("role", user.role);
        formData.append("file", imageFile);
        response = await api.post("/api/users/register", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (_) {
        // If fetching image fails, fall back to JSON payload
        const payload = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          password: user.password,
          age: user.age,
          role: user.role,
        };
        response = await api.post("/api/users/register", payload);
      }
    } else {
      // Otherwise send JSON payload
      const payload = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        age: user.age,
        role: user.role,
      };
      response = await api.post("/api/users/register", payload);
    }
    dispatch(setUser(response.data?.user ?? null));
    if (response.data?.token) dispatch(setToken(response.data.token));
    dispatch(setError(null));
    return true;
  } catch (error: any) {
    // Fallback to alternate host on server/network errors
    try {
      let fallbackResponse;
      if (file) {
        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("phone", user.phone);
        formData.append("password", user.password);
        formData.append("age", String(user.age));
        formData.append("role", user.role);
        formData.append("file", file);
        fallbackResponse = await axios.post(
          "https://clinic-gules-theta.vercel.app/api/users/register",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        const payload = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          password: user.password,
          age: user.age,
          role: user.role,
        };
        fallbackResponse = await axios.post(
          "https://clinic-gules-theta.vercel.app/api/users/register",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
      }
      dispatch(setUser(fallbackResponse.data?.user ?? null));
      if (fallbackResponse.data?.token) dispatch(setToken(fallbackResponse.data.token));
      dispatch(setError(null));
      return true;
    } catch (innerError: any) {
      // Final fallback: try legacy path
      try {
        let legacyRes;
        if (file) {
          const formData = new FormData();
          formData.append("name", user.name);
          formData.append("email", user.email);
          formData.append("phone", user.phone);
          formData.append("password", user.password);
          formData.append("age", String(user.age));
          formData.append("role", user.role);
          formData.append("file", file);
          legacyRes = await axios.post("https://clinic-gules-theta.vercel.app/register", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } else {
          legacyRes = await axios.post(
            "https://clinic-gules-theta.vercel.app/register",
            {
              name: user.name,
              email: user.email,
              phone: user.phone,
              password: user.password,
              age: user.age,
              role: user.role,
            },
            { headers: { "Content-Type": "application/json" } }
          );
        }
        dispatch(setUser(legacyRes.data?.user ?? null));
        if (legacyRes.data?.token) dispatch(setToken(legacyRes.data.token));
        dispatch(setError(null));
        return true;
      } catch (finalError: any) {
        console.error("Register failed:", finalError);
        dispatch(
          setError(
            finalError.response?.data?.error ||
              finalError.response?.data?.message ||
              "Failed to register"
          )
        );
        return false;
      }
    }
  } finally {
    dispatch(setLoading(false));
  }
};
