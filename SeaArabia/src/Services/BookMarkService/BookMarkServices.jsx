import axios from 'axios';
import { baseURL } from '../config';
const BookMarkAddURL=baseURL+'account/bookmark-create/'

export const BookMarkLink={
    BookMarkAdd:async function (data){
        console.log("BookMarkAdd data,",data)
        try {
            const response = await axios.post(BookMarkAddURL,data);
            console.log("api call response",response)
            return response;
          } catch (error) {
            console.log("erorr BookMark Add",error );
          }
    }
}