import axios from "./axios.jsx";

export const registerRequest = (user) => axios.post(`/signup`, user);
export const loginRequest = (user) => axios.post(`/login`, user);
export const verityTokenRequest = () => axios.get("/verify");
export const deleteAccountRequest = (user) => axios.delete(`/delete`, user);
