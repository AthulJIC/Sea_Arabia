import AxiosInstance from "../axiosService";

export const ForgetPasswordApi = {
    requestOtp: async function (data) {
        return await AxiosInstance.post('account/request-otp/', data)
    },
    verifyOtp: async function (data) {
        return await AxiosInstance.post('account/verify-otp/', data)
    },
    resetpassword: async function (data) {
        return await AxiosInstance.post('account/reset-password-new-password/', data)
    },
 
}