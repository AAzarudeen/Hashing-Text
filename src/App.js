import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import MainPage from "./pages/MainPage";
import Saved from "./pages/saved";

function App() {

      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/saved" element={<Saved />} />
          </Routes>
        </BrowserRouter>
      );
    
    }

export default App;