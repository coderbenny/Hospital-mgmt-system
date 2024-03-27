import './App.css';
import DoctorLogin from './components/DoctorLogin';
import PatientLogin from './components/PatientLogin';
import AdminLogin from './components/AdminLogin';
import {  BrowserRouter, Route,Routes } from 'react-router-dom';
import RegisterPatient from './components/RegisterPatient';
import Home from './components/Home';


function App() {
  return (
    <div className="App">

      <h1 className='font-bold text-2xl text-center color-green'>Hospital Management System</h1>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='doctor_login' element={<DoctorLogin/>}></Route>
            <Route path='patient_login' element={<PatientLogin/>}></Route>
            <Route path='admin_login' element={<AdminLogin/>}></Route>
            <Route path='register_patient' element={<RegisterPatient/>}></Route>
          </Routes>
          </BrowserRouter>
       
    </div>
  );
}

export default App;
