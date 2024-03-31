import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import AdminLogin from "./components/AdminLogin";


export default function App() {
  return (
    <div className="App">
      <Link to="/login">Login</Link>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<AdminLogin/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

