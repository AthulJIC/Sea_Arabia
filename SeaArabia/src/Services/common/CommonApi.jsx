import AxiosInstance from "../axiosService";

export const CommonApi = {
    getComboPackages: async function () {
        return await AxiosInstance.get('service/combo-packages')
    },
    getBestDeals : async function(params){
        return await AxiosInstance.get('offer/offers/beast-deals?is_enable='+params)
    },
    getServiceList : async function(params){
        return await AxiosInstance.get('service/service-list-app?type=Service&category='+params)
    },
    getRecommendedService : async function(params){
        return await AxiosInstance.get('service/service-list-app?is_recommended=true&type=Service&category='+params)
    },
    getPremiumService : async function(params){
        return await AxiosInstance.get('service/service-list-app?type=Service&is_premium=true&category='+params)
    },
    getActivityList : async function(){
        return await AxiosInstance.get('service/service-list-app?type=Activity')
    },
    getSailActivity : async function(params){
        return await AxiosInstance.get('service/service-list-app?type=Activity&is_sail_with_activity=true')
    },
    getTopActivity : async function(){
        return await AxiosInstance.get('service/service-list-app?type=Activity&is_top_suggestion=True')
    },
    getRecommended : async function(){
        return await AxiosInstance.get('service/service-list-app?is_recommended=true&type=Activity')
    },
    getCategoryList : async function(){
        return await AxiosInstance.get('main/category-list')
    },
    getTopSuggestions: async function(){
        return await AxiosInstance.get('service/top-suggestions');
    },
    getIndividualService : async function(params){
        return await AxiosInstance.get('service/service/'+params+'/')
    },
    getExploreMore: async function(){
        return await AxiosInstance.get('service/explore-more')
    },
    getNotification:async function(params){
        return await AxiosInstance.get('account/notifications/?limit=20&offset='+params)
    },
    notificationRead :async function(){
        return await AxiosInstance.get('account/notifications/?mark_as_read=true')
    },
    getReviewCount : async function(params){
        return await AxiosInstance.get('service/review/count/'+params)
    },
   
}


 