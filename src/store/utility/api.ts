import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:4010/api/users/register",
    headers: {
        "Content-Type": "application/json",
    },
});

 