import axios from "axios";

const url = `http://localhost:5555/todo`

export const GetAllTodoAPI = async() =>{
    return await axios.get(url)
}

export const CreateTodoAPI = async(data)=>{
    return await axios.post(url, data)
}

export const UpdateTodoAPI = async(id, data)=>{
    return await axios.put(url+`/${id}`, data)
}

export const DeleteTodoAPI = async(id)=>{
    return await axios.delete(url+`/${id}`)
}