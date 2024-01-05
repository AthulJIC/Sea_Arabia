// import axios from 'axios';
// import { baseURL } from '../config';
// const BookMarkAddURL=baseURL+'account/bookmark-create/'

// export const BookMarkLink={
//     BookMarkAdd:async function (data){
//         console.log("BookMarkAdd data,",data)
//         try {
//             const response = await axios.post(BookMarkAddURL,data);
//             console.log("api call response",response)
//             return response;
//           } catch (error) {
//             console.log("erorr BookMark Add",error );
//           }
//     }
// }

import AxiosInstance from "../axiosService";

export const BookmarkApi = {
  getBookMarkList: async function () {
      return await AxiosInstance.get('account/bookmark-list/')
  },
  addBookMark : async function(data){
      return await AxiosInstance.post('account/bookmark-create/',data)
  },
  deleteBookMark: async function(params){
      console.log("delete params",params)
      return await AxiosInstance.delete('account/bookmarks/delete/'+params+'/')
  },
}