import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import HomePage from "./pages/UserPage/UserPage";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import UserPage from "./pages/UserPage/UserPage";
import Header from "./components/Header/Header";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Header />}> */}
      <Route path="" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<UserPage />} />
      {/* </Route> */}
    </Routes>
  );
}

export default App;
