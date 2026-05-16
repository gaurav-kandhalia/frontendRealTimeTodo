import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createList,
  getLists,
  deleteList,
} from "../api/list.api";



function Dashboard() {

  const navigate = useNavigate();

  const [lists, setLists] = useState([]);

  const [title, setTitle] = useState("");


  // FETCH LISTS

  const fetchLists = async () => {

    try {

      const response = await getLists();

      setLists(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {

    fetchLists();

  }, []);


  // CREATE LIST

  const handleCreateList = async (e) => {

    e.preventDefault();

    try {

      await createList({ title });

      setTitle("");

      fetchLists();

    } catch (error) {

      console.log(error);

    }

  };


  // DELETE LIST

  const handleDelete = async (id) => {

    try {

      await deleteList(id);

      fetchLists();

    } catch (error) {

      console.log(error);

    }

  };


  // LOGOUT

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };


  return (

    <div className="min-h-screen p-10">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-10">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>


      {/* CREATE LIST */}

      <form
        onSubmit={handleCreateList}
        className="flex gap-4 mb-10"
      >

        <input
          type="text"
          placeholder="Enter list title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 rounded w-[300px]"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 rounded"
        >
          Create List
        </button>

      </form>


      {/* LISTS */}

      <div className="grid grid-cols-3 gap-6">

        {lists.map((list) => (

          <div
            key={list._id}
            className="border rounded-xl p-6 space-y-4"
          >

            <h2 className="text-xl font-semibold">
              {list.title}
            </h2>


            <div className="flex gap-3">

              <button
                onClick={() => navigate(`/list/${list._id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Open
              </button>


              <button
                onClick={() => handleDelete(list._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Dashboard;