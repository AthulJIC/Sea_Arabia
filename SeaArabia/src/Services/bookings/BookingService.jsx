import AxiosInstance from "../axiosService";

export const BookingApi = {
    getServiceList: async function (params1, params2) {
        return await AxiosInstance.get(`service/service-available/${params1}/${params2}/`)
    },
    updateProfileDetails : async function (params,data){
        return await AxiosInstance.put('account/users-update/'+params,data)
    }
}