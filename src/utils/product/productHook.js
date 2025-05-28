import { useMutation } from "react-query"
import { createProduct, deleteProduct, updateProduct } from "./productApi"

export const useCreateProduct = () => {
  return useMutation((data) => createProduct(data))
}

export const useUpdateProduct = () => {
  return useMutation((data) => updateProduct(data))
}

export const useDeleteProduct = () => {
  return useMutation((id) => deleteProduct(id))
}
