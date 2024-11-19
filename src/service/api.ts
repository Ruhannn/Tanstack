import axios from "axios"
import { Todo } from "../@types/todo"
import { Project } from "../@types/project"


const BASE_URL = 'http://localhost:3000'
const api = axios.create({ baseURL: BASE_URL, })

export const getTodosIds = async () => {
    return (await api.get<Todo[]>("/todos")).data.map((todo) => todo.id)
}

export const getTodo = async (id: number) => {
    return (await api.get<Todo>(`/todos/${id}`)).data
}

export const createTodo = async (data: Todo) => {
    return (await api.post(`/todos`, data))
}

export const updateTodo = async (data: Todo) => {
    return (await api.put(`/todos/${data.id}`, data))
}

export const deleteTodo = async (id: number) => {
    return (await api.delete(`/todos/${id}`))
}

export const getProjects = async (page = 1, perPage = 3): Promise<Project> => {
    return (await api.get(`projects?_page=${page}&_per_page=${perPage}`)).data;
};