import axios from "axios";

const API = axios.create({
  baseURL: 'http://localhost:5000'
})

export const signIn = (formdata) => API.post('/signin', formdata);
export const allStudents = () => API.get('/list');
export const addStudent = (formData) => API.post('/add-student', formData);
export const updateStudent = (formData) => API.put(`/update-student/${formData._id}`, formData);
export const studentById = (formData) => API.get(`/${formData}`);
export const deleteStudent = (formData) => API.put(`/delete-student/${formData}`);
