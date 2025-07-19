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
    } catch (error) {
        console.error("Login failed:", error);
        dispatch(setError("Invalid email or password"));
    } finally {
        dispatch(setLoading(false));
    }



}

export const register = async (user: User, dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await api.post("/users/register", user);
        return response.data;
    } catch (error) {
        console.error("Register failed:", error);
        dispatch(setError("Invalid user data"));
    } finally {
        dispatch(setLoading(false));    
    }
}