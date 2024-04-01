import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, redirect, useNavigate } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";


function Root() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = '/login'
    navigate(path);
  }
  return (
    <div className="App">
      <button onClick={routeChange}>AdminLogin</button>
        <Routes>
          <Route path="/">
            <Route path="login" element={<AdminLogin/>}/>
          </Route>
        </Routes>
    </div>
  )
  )
}

export default function App(){
  return (
    <BrowserRouter>
      <Root/>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

