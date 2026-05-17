import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import ListPage from "./pages/ListPage";
import Home from './pages/Home'



function App() {

  return (

    <Routes>

      <Route path="/" element={<Home/>} />

      <Route path="/login" element={<Login/>} />

      <Route path="/register" element={<Register/>} />

      <Route path="/dashboard" element={
         <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
        } />

      <Route path="/list/:id" element={ <ProtectedRoute>
      <ListPage />
    </ProtectedRoute>} />

    </Routes>

  );

}

export default App;