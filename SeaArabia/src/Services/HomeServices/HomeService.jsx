import axios from 'axios';
import { baseURL } from '../config';
//url
const categoryUrl =baseURL+'service/category-list';
const exploreMoreURL=baseURL+'service/explore-more'

//API
export const HomeApi = {
  GetCategoryList: async function (data) {
    try {
      const response = await axios.get(categoryUrl);
      return response.data;
    } catch (error) {
      console.log("erorr category list",error );
    }
  },
  ExploreMoreList: async function (data) {
      try {
          const response =  await axios.get(exploreMoreURL);
         console.log(response.data, "ExploreMore Listing response");
          return response;
      } catch (error) {
          console.error('Error in ExploreMore Listing:', error);
          throw error;
      }
  },
};
