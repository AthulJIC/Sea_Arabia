import AxiosInstance from "../axiosService";

export const SignupApi = {

    postSignup : async function(data){
        console.log(data);
        return await AxiosInstance.post('account/users-signup/', data)
    },
}


 