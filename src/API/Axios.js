import axios from "axios";
import { BaseURL } from "./API";
import Cookies from "universal-cookie";
const cookie = new Cookies()
const token = cookie.get("ecommerce_jivara")

export const Axios = axios.create({
    baseURL: BaseURL,
    headers: {
        Authorization: "Bearer " + token
    },
    withCredentials:true
})