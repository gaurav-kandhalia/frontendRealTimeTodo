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


export const inviteCollaborator = async (
  listId,
  data
) => {

  const response = await axiosInstance.post(
    `/lists/${listId}/invite`,
    data
  );

  return response.data;

};



export const removeCollaborator = async (
  listId,
  userId
) => {

  const response = await axiosInstance.delete(
    `/lists/${listId}/collaborators/${userId}`
  );

  return response.data;

};


export const getSingleList = async (id) => {

  const response = await axiosInstance.get(
    `/lists/${id}`
  );

  return response.data;

};