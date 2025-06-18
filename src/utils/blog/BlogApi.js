import { apiClient } from "../api";


export const getBlog = () => {
    return apiClient.get('blogApi/')
}

 export const createBlog = (data) => {
    return apiClient.post('/blogApi/', data,{
        headers:{
            "Content-Type":"multipart/formdata"
        }
    })
 }


export const updateBlog = (data) => {
  return apiClient.put(`/blogApi/${data.id}`, data.data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}



export const deleteBlog = (id) => {
    return apiClient.delete(`/blogApi/${id}`)
}



