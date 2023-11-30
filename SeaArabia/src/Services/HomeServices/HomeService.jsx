import axios from 'axios';
import { baseURL } from '../config';
//url
const categoryUrl =baseURL+'service/category-list';


//Category Listing
export const getCategoryList = async () => {
  try {
    const response = await axios.get(categoryUrl);
    // console.log("response main",response)
    return response.data;
  } catch (error) {
    console.log("erorr category list",error );
  }
};
