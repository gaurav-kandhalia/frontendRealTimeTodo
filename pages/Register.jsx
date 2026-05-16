import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../api/auth.api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      const response = await registerUser(formData);

      localStorage.setItem(
        "token",
        response.data.accessToken
      );

      navigate("/dashboard");

    } catch (error) {

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
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

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
          Register
        </button>

      </form>

    </div>

  );

}

export default Register;