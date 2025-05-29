import { useMutation } from "react-query"
import { createBlog, deleteBlog, updateBlog } from "./BlogApi"



export const useCreateBlog = ()=>{
    return useMutation((data)=>createBlog(data))
}

export const useUpdateBlog = ()=>{
    return useMutation((data)=>updateBlog(data))
}

export const useDeleteBlog = ()=>{
    return useMutation((id)=>deleteBlog(id))
}