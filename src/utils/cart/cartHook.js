import { useMutation } from "react-query"
import { CreateQuantity,createCart,deleteCart,updateCart} from "./cartApi";

export const useCreateQuantity = () => {
  return useMutation((data) => CreateQuantity(data))
}

export const useCreateCart = () => {
  return useMutation((data) => createCart(data))
}

export const useUpdateCart = () => {
  return useMutation((data) => updateCart(data))
}

export const useDeleteCart = () => {
  return useMutation((id) => deleteCart(id))
}
