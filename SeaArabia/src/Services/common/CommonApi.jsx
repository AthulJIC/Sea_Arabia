import AxiosInstance from "../axiosService";

export const CommonApi = {
    getComboPackages: async function () {
        return await AxiosInstance.get('service/combopackages')
    },
    getBestDeals : async function(params){
        return await AxiosInstance.get('offer/offers/beastdeals?is_enable='+params)
    },
    getServiceList : async function(params1,params2,params3){
        return await AxiosInstance.get(`service/service-listapp?type=Service&category=${params1}&is_premium=${params2}&is_recommended=${params3}`)
    },
    getActivityList : async function(){
        return await AxiosInstance.get('service/service-listapp?type=Activity')
    },
    getSailActivity : async function(params){
        return await AxiosInstance.get('service/service-listapp?type=Activity&is_sail_with_activity=true')
    },
    getTopActivity : async function(params){
        return await AxiosInstance.get('service/service-listapp?type=Activity&is_top_suggestion=true')
    },
    getRecommended : async function(){
        return await AxiosInstance.get('service/service-listapp?is_recommended=true&type=Activity')
    },
    getCategoryList : async function(){
        return await AxiosInstance.get('service/category-list')
    },
   
}


 