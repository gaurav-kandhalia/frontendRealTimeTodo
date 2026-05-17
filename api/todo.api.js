import axiosInstance from "./axios";



// GET TODOS

export const getTodos = async (listId) => {

  const response = await axiosInstance.get(
    `/todos/${listId}`
  );

  return response.data;

};



// CREATE TODO

export const createTodo = async (
  listId,
  data
) => {

  const response = await axiosInstance.post(
    `/todos/${listId}`,
    data
  );

  return response.data;

};



// UPDATE TODO

export const updateTodo = async (
  id,
  data
) => {

  const response = await axiosInstance.patch(
    `/todos/update/${id}`,
    data
  );

  return response.data;

};



// DELETE TODO

export const deleteTodo = async (id) => {

  const response = await axiosInstance.delete(
    `/todos/delete/${id}`
  );

  return response.data;

};