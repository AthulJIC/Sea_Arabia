
import { baseURL } from "../config"
import AxiosInstance from "../axiosService";
import axios from "axios";

export const LoginApi = {
    userLogin: async function (data) {
        try {
            const response = await AxiosInstance.post('api/token/', data);
            // console.log(response.data, "login response");
            return response;
        } catch (error) {
            console.error('Error Login:', error);
            throw error;
        }
    },
    userLogOut: async function (data) {
        try {
            const response = await AxiosInstance.post('api/token/blacklist/', data);
            // console.log(response.data, "login response");
            return response;
        } catch (error) {
            console.error('Error Login:', error);
            throw error;
        }
    },
};