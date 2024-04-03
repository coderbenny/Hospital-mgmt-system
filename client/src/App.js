import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './components/Home';
import DoctorLogin from './components/DoctorLogin';
import AdminLogin from './components/AdminLogin';
import PatientLogin from './components/PatientLogin';
import RegisterPatient from './components/RegisterPatient';
import PatientsView from './components/PatientsView';
import  Appointment from  './components/Appointment';
import BookAppointments from './components/BookAppointments'
import DoctorView from './components/DoctorView'
import DoctorUpdate from './components/DoctorUpdate'
import DoctorReg from './components/DoctorReg';
import Admin from './components/Admin'

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
                <Route path="/doctor_view" element={<DoctorView/>}></Route>
                <Route path="/doctor_registration" element={<DoctorReg/>}></Route>
                <Route path="/doctor_update" element={<DoctorUpdate/>}></Route>
                <Route path="/patientview" element={<PatientsView/>}></Route>
                <Route path="/patientappointments" element={<Appointment/>}></Route>
                <Route path="/bookappointments" element={<BookAppointments/>}></Route>
                <Route path="admin" element={<Admin/>}/>                
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
