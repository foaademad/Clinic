
import { User } from "../interface/authInterface";
import { api } from "../utility/api";
import { setLoading, setError, setUser } from "../slice/authSlice";
import { AppDispatch } from "../store";

export const login = async (email: string, password: string, dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await api.post("/users/login", { email, password });
        dispatch(setUser(response.data));
        dispatch(setError(null));
        return response.data;
    } catch (error: any) {
        console.error("Login failed:", error);
        dispatch(setError(error.response?.data?.message || "Invalid email or password"));
    } finally {
        dispatch(setLoading(false));
    }
}

export const register = async (user: User, dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await api.post("/users/register", user);
        dispatch(setUser(response.data));
        dispatch(setError(null));
        return true;
    } catch (error: any) {
        console.error("Register failed:", error);
        dispatch(setError(error.response?.data?.message || "Failed to register"));
        return false;
    } finally {
        dispatch(setLoading(false));    
    }
}
