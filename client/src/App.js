import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './components/Home';
import DoctorLogin from './components/DoctorLogin';
import AdminLogin from './components/AdminLogin';
import PatientLogin from './components/PatientLogin';
import RegisterPatient from './components/RegisterPatient';

function App() {
  return (
    <div className=''>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='doctor_login' element={<DoctorLogin/>}></Route>
                <Route path='patient_login' element={<PatientLogin/>}></Route>
                <Route path='admin_login' element={<AdminLogin/>}></Route>
                <Route path='register_patient' element={<RegisterPatient/>}></Route>
                <Route path="/doctor_view"></Route>
                <Route path="/doctor_registration"></Route>
                <Route path="/doctor_update"></Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;