import axios from 'axios';
import { baseURL } from '../config';
const allActivityUrl=baseURL+'service/service-list'

export const Activity={
    AllActivityList: async function (data) {
        console.log(data)
        try {
          const response = await axios.get(allActivityUrl,{params:data});
          console.log("AllActivityList response ",response.data)
          return response.data;
        } catch (error) {
          console.log("erorr AllActivity List",error );
        }
      },
}