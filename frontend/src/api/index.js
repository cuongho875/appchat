import axios from "axios";
import Cookies from 'js-cookie';

const token = Cookies.get('accessToken')?Cookies.get('accessToken'):'';
const api = axios.create({
    baseURL:"http://localhost:8080/api/",
    headers:{
        'Access-Control-Allow-Origin':'http://localhost:3000/',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',
        'Authorization':`Bearer ${token}`,
        Accept: '*',
        'Content-Type':'application/json'
    },
    withCredentials:true
})
export default api