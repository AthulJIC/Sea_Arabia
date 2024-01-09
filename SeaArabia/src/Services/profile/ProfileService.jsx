import AxiosInstance from "../axiosService";

export const ProfileApi = {
    getProfileDetails: async function (params) {
        return await AxiosInstance.get('account/users-update/'+params)
    },
    updateProfileDetails : async function (params,data){
        return await AxiosInstance.put('account/users-update/'+params,data)
    }
}