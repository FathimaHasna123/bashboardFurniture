import { apiClient } from "../api"

export const getCart = () => {
  return apiClient.get('/cartApi/')
}

export const getQuantity = () => {
  return apiClient.get('/quantityApi/')
}

export const CreateQuantity = (data) => {
  return apiClient.post(`/quantityApi/${data.id}`, data)
}





