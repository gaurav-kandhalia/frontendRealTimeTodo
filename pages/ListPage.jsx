import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import {
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo,
} from "../api/todo.api";

import {
    inviteCollaborator,
    removeCollaborator,
    getSingleList,
} from "../api/list.api";

import socket from "../socket/socket";




function ListPage() {

    const { id } = useParams();

    const [todos, setTodos] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
    });

    const [list, setList] = useState(null);

    const [email, setEmail] = useState("");


    // FETCH TODOS

    const fetchTodos = async () => {

        try {

            const response = await getTodos(id);

            setTodos(response.data);

        } catch (error) {

            console.log(error);

        }

    };


useEffect(() => {

  fetchTodos();

  fetchList();

  socket.emit("join-list", id);

  return () => {

    socket.emit("leave-list", id);

  };

}, [id]);

  useEffect(() => {

  socket.on("todo-created", (newTodo) => {

    setTodos((prev) => [newTodo, ...prev]);

  });


  socket.on("todo-updated", (updatedTodo) => {

    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === updatedTodo._id
          ? updatedTodo
          : todo
      )
    );

  });


  socket.on("todo-deleted", ({ todoId }) => {

    setTodos((prev) =>
      prev.filter((todo) => todo._id !== todoId)
    );

  });


  // REALTIME NOTIFICATIONS

  socket.on("notification", (data) => {

    toast.success(data.message);

  });


  return () => {

    socket.off("todo-created");

    socket.off("todo-updated");

    socket.off("todo-deleted");

    socket.off("notification");

  };

}, []);


    // HANDLE CHANGE

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    // CREATE TODO

    const handleCreateTodo = async (e) => {

        e.preventDefault();

        try {

            await createTodo(id, formData);

            toast.success("Todo created");

            setFormData({
                title: "",
                description: "",
                priority: "medium",
                dueDate: "",
            });



        } catch (error) {

            toast.error(
                error.response?.data?.message
            );

        }

    };


    // DELETE TODO

    const handleDelete = async (todoId) => {

        try {

            await deleteTodo(todoId);

            toast.success("Todo deleted");


        } catch (error) {

            toast.error("Delete failed");

        }

    };


    // TOGGLE STATUS

    const handleToggle = async (todo) => {

        try {

            await updateTodo(todo._id, {
                status:
                    todo.status === "pending"
                        ? "done"
                        : "pending",
            });



        } catch (error) {

            console.log(error);

        }

    };

    const fetchList = async () => {

  try {

    const response = await getSingleList(id);

    setList(response.data);

  } catch (error) {

    console.log(error);

  }

};

const handleInvite = async (e) => {

  e.preventDefault();

  try {

    await inviteCollaborator(id, { email });

    toast.success("Collaborator invited");

    setEmail("");

    fetchList();

  } catch (error) {

    toast.error(
      error.response?.data?.message
    );

  }

};


const handleRemove = async (userId) => {

  try {

    await removeCollaborator(id, userId);

    toast.success("Collaborator removed");

    fetchList();

  } catch (error) {

    toast.error(
      error.response?.data?.message
    );

  }

};

    return (

        <div className="min-h-screen p-10">

            <h1 className="text-3xl font-bold mb-10">
                Todos
            </h1>
               
               <div className="border rounded-xl p-6 mb-10">

  <h2 className="text-2xl font-bold mb-5">
    Collaborators
  </h2>


  {/* INVITE */}

  <form
    onSubmit={handleInvite}
    className="flex gap-4 mb-6"
  >

    <input
      type="email"
      placeholder="Enter collaborator email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="border p-3 rounded w-[300px]"
    />

    <button
      type="submit"
      className="bg-black text-white px-5 rounded"
    >
      Invite
    </button>

  </form>


  {/* LIST */}

  <div className="space-y-3">

    {list?.collaborators?.map((user) => (

      <div
        key={user._id}
        className="flex items-center justify-between border p-3 rounded"
      >

        <div>

          <p className="font-semibold">
            {user.name}
          </p>

          <p className="text-sm text-gray-500">
            {user.email}
          </p>

        </div>


        <button
          onClick={() => handleRemove(user._id)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Remove
        </button>

      </div>

    ))}

  </div>

</div>

            {/* CREATE TODO FORM */}

            <form
                onSubmit={handleCreateTodo}
                className="space-y-4 border p-6 rounded-xl mb-10"
            >

                <input
                    type="text"
                    name="title"
                    placeholder="Todo title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                >

                    <option value="low">
                        Low
                    </option>

                    <option value="medium">
                        Medium
                    </option>

                    <option value="high">
                        High
                    </option>

                </select>


                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />


                <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded"
                >
                    Create Todo
                </button>

            </form>


            {/* TODOS */}

            <div className="space-y-5">

                {todos.map((todo) => (

                    <div
                        key={todo._id}
                        className="border rounded-xl p-5"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-xl font-semibold">
                                    {todo.title}
                                </h2>

                                <p className="text-gray-600 mt-2">
                                    {todo.description}
                                </p>

                            </div>


                            <div className="flex gap-3">

                                <button
                                    onClick={() => handleToggle(todo)}
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    {todo.status === "pending"
                                        ? "Mark Done"
                                        : "Pending"}
                                </button>


                                <button
                                    onClick={() => handleDelete(todo._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>


                        <div className="flex gap-5 mt-5 text-sm">

                            <p>
                                Priority:
                                {" "}
                                <span className="font-semibold">
                                    {todo.priority}
                                </span>
                            </p>


                            <p>
                                Status:
                                {" "}
                                <span className="font-semibold">
                                    {todo.status}
                                </span>
                            </p>


                            <p>
                                Due:
                                {" "}
                                {new Date(todo.dueDate)
                                    .toLocaleDateString()}
                            </p>


                            {todo.isOverdue && (

                                <span className="text-red-500 font-bold">

                                    Overdue

                                </span>

                            )}

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default ListPage;