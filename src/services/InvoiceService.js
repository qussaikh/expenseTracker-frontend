import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = 'http://localhost:8080/api/invoice';

// export function getAllTodos(){
//     return axios.get(BASE_REST_API_URL);
// }

// Add a request interceptor
axios.interceptors.request.use(function (config) {

  config.headers['Authorization'] = getToken();

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


export const getAllInvoice = () => axios.get(BASE_REST_API_URL)

export const saveInvoice = (invoice) => axios.post(BASE_REST_API_URL, invoice)

export const getInvoice = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const updateInvoice = (id, invoice) => axios.put(BASE_REST_API_URL + '/' + id, invoice)

export const deleteInvoice = (id) => axios.delete(BASE_REST_API_URL + '/' + id)

export const completeInvoice = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/complete')

export const inCompleteInvoice = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/in-complete')

export const getTotalAmount = () => get(BASE_REST_API_URL)



