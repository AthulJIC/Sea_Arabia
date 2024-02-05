import AxiosInstance from "../axiosService";

export const ProfileApi = {
    getProfileDetails: async function () {
        return await AxiosInstance.get('account/users-profile/')
    },
    updateProfileDetails : async function (params,data){
        return await AxiosInstance.put('account/users-update/'+params,data)
    }
}