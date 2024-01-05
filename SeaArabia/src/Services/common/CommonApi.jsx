import AxiosInstance from "../axiosService";

export const CommonApi = {
    getComboPackages: async function () {
        return await AxiosInstance.get('service/combopackages')
    },
    getBestDeals : async function(params){
        return await AxiosInstance.get('offer/offers/beastdeals?is_enable='+params)
    },
    getServiceList : async function(params){
        return await AxiosInstance.get('service/service-listapp?type=Service&category='+params)
    },
    getRecommendedService : async function(params){
        return await AxiosInstance.get('service/service-listapp?is_recommended=true&type=Service&category='+params)
    },
    getPremiumService : async function(params){
        return await AxiosInstance.get('service/service-listapp?type=Service&is_premium=true&category='+params)
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
    getTopSuggestions: async function(){
        return await AxiosInstance.get('service/top-suggestions');
    },
    getIndividualService : async function(params){
        return await AxiosInstance.get('service/service/'+params+'/')
    },
    getExploreMore: async function(){
        return await AxiosInstance.get('service/explore-more')
    }
   
}


 