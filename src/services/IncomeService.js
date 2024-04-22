import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = 'http://localhost:8080/api/incomes';


axios.interceptors.request.use(function (config) {

  config.headers['Authorization'] = getToken();

  return config;
}, function (error) {
 
  return Promise.reject(error);
});


export const getUserIncome = () => axios.get(BASE_REST_API_URL)

export const saveIncomeAPI = (income) => axios.post(BASE_REST_API_URL, income)