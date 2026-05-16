import axiosInstance from "./axios";



export const registerUser = async (data) => {

  const response = await axiosInstance.post(
    "/user/register",
    data
  );

  return response.data;

};



export const loginUser = async (data) => {

  const response = await axiosInstance.post(
    "/user/login",
    data
  );

  return response.data;

};