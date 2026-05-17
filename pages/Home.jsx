import { Link, Navigate } from "react-router-dom";

function Home() {

  const token = localStorage.getItem("token");


  // IF USER LOGGED IN

  if (token) {
    return <Navigate to="/dashboard" />;
  }


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-lg text-center w-[500px]">

        <h1 className="text-5xl font-bold mb-5">

          SyncTask

        </h1>


        <p className="text-gray-600 text-lg mb-10">

          Realtime collaborative todo management
          system for teams.

        </p>


        <div className="flex gap-5 justify-center">

          <Link
            to="/login"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Login
          </Link>


          <Link
            to="/register"
            className="border border-black px-6 py-3 rounded-lg"
          >
            Register
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Home;