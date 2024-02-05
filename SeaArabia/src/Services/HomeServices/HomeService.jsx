import axios from 'axios';
import { baseURL } from '../config';
//url
const categoryUrl =baseURL+'main/category-list';
const exploreMoreURL=baseURL+'service/explore-more'
const topSuggestionURL=baseURL+'service/top-suggestions'

//API
//Home Page
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
        //  console.log(response.data, "ExploreMore Listing response");
          return response;
      } catch (error) {
          console.error('Error in ExploreMore Listing:', error);
          throw error;
      }
  },
  TopSuggestionList: async function (data){
        try{
          const response=await axios.get(topSuggestionURL)
          return response;
        }catch(erorr){
          console.error('Error in TopSuggestion Listing:', erorr);
          throw erorr;
      }
   }
}
