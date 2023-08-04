import axios from "axios";

export const baseAxios = axios.create({
    baseURL: window.env.API_BASE_URL
});