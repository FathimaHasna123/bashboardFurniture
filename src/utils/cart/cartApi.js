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

export const createCart = (data) => {
  return apiClient.post('/cartApi', data)
}

export const updateCart = (data) => {
  return apiClient.put(`/cartApi${data.id}`, data.data)
}

export const deleteCart = (id) => {
  return apiClient.delete(`cartApi/${id}`)
}
