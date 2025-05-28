import { apiClient } from "../api"



export const getUser =() =>{
    return apiClient.get('/userApi/')
}