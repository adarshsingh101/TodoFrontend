import axios from 'axios';

const API_URL = 'https://todobackend-588l.onrender.com/api/todos/';

const api = axios.create({
  baseURL: API_URL,
});

export const getTodos = () => api.get('/');
export const createTodo = (todoData) => api.post('/', todoData);
export const updateTodo = (id, todoData) => api.put(`/${id}`, todoData);
export const deleteTodo = (id) => api.delete(`/${id}`);

export default api;