import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (

    <Routes>

      <Route path="/" element={<h1>Home</h1>} />

      <Route path="/login" element={<Login/>} />

      <Route path="/register" element={<Register/>} />

      <Route path="/dashboard" element={<h1>Dashboard</h1>} />

      <Route path="/list/:id" element={<h1>List Page</h1>} />

    </Routes>

  );

}

export default App;