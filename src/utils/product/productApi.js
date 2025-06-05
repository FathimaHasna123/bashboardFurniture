import { apiClient } from "../api"

export const getProduct = () => {
  return apiClient.get('/productApi/')
}

export const createProduct = (data) => {
  return apiClient.post('/productApi/', data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const updateProduct = (data) => {
  return apiClient.put(`/productApi/${data.id}`, data.data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const deleteProduct = (id) => {
  return apiClient.delete(`/productApi/${id}`)
}
