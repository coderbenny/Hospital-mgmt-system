// import './App.css';
// import Login from "./Login"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";

// function App() {

//   return (

//   );
// }

export default function App() {
  return (
    <div className="App">
      <h1>Hospital Management System</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

