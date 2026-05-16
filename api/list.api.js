import axiosInstance from "./axios";



export const createList = async (data) => {

  const response = await axiosInstance.post(
    "/lists",
    data
  );

  return response.data;

};



export const getLists = async () => {

  const response = await axiosInstance.get(
    "/lists"
  );

  return response.data;

};



export const deleteList = async (id) => {

  const response = await axiosInstance.delete(
    `/lists/${id}`
  );

  return response.data;

};