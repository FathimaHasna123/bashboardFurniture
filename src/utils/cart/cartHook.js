import { useMutation } from "react-query"
import { CreateQuantity } from "./cartApi"


export const useCreateQuantity = ()=>{
    return useMutation((data)=>CreateQuantity(data))
}