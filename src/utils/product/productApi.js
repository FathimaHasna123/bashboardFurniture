import { apiClient } from "../api"

export const getProduct = () => {
  return apiClient.get('/productApi/')
}

export const createProduct = (data) => {
  return apiClient.post('/productApi/', data)
}

export const updateProduct = (data) => {
  return apiClient.put(`/productApi/${data.id}`, data.data)
}

export const deleteProduct = (id) => {
  return apiClient.delete(`/productApi/${id}`)
}
