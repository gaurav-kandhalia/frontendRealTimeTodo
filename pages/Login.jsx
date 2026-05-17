import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/auth.api";
import toast from "react-hot-toast";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await loginUser(formData);

      localStorage.setItem(
        "token",
        response.data.accessToken
      );


       toast.success("Login successful");
      navigate("/dashboard");

    } catch (error) {
        toast.error(
  error.response?.data?.message || "Login failed"
);

      console.log(error.response?.data);

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-[400px] space-y-4 border p-6 rounded-xl"
      >

        <h1 className="text-2xl font-bold">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Login
        </button>

      </form>

    </div>

  );

}

export default Login;