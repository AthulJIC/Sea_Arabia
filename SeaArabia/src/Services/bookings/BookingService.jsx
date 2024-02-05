import AxiosInstance from "../axiosService";

export const BookingApi = {
    getServiceList: async function (params1, params2) {
        return await AxiosInstance.get(`service/service-available/${params1}/${params2}/`)
    },
    updateProfileDetails : async function (params,data){
        return await AxiosInstance.put('account/users-update/'+params,data)
    },
    getCouponList: async function(){
        return await AxiosInstance.get('offer/offers/list');
    },
    createBooking : async function(data){
        return await AxiosInstance.post('booking/bookings/create/',data);
    },
    paymentInitiate: async function(params){
        return await AxiosInstance.post('booking/payment-initialization/'+ params);
    },    
    getBookingList : async function(params){
        return await AxiosInstance.get('booking/bookings/user/?status='+params);
    },
    cancelBooking :async function(params, data){
        return await AxiosInstance.put('booking/booking-cancellation/'+params + '/', data);
    },
    reviewComments:  async function(){
        return await AxiosInstance.get('service/review-comment-list');
    },
    reviewCreation :  async function(data){
        return await AxiosInstance.post('service/service-review-create',data);
    },
}