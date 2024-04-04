import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Home';
import DoctorLogin from './components/DoctorLogin';
import AdminLogin from './components/AdminLogin';
import PatientLogin from './components/PatientLogin';
import RegisterPatient from './components/RegisterPatient';
import PatientsView from './components/PatientsView';
import Appointment from './components/Appointment';
import BookAppointments from './components/BookAppointments'
import DoctorView from './components/DoctorView'
import DoctorUpdate from './components/DoctorUpdate'
import DoctorReg from './components/DoctorReg';
import Admin from './components/Admin'


function App() {

  const [Log_in, setLog_in] = useState(false)

  const handleSubmit = async (event, roleId) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
      email: formData.get('email'),
      role_id: roleId,
    };
    console.log(data)

    try {
      const response = await fetch('http://127.0.0.1:5555/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin' : '*',
        },
        body: JSON.stringify(data),
      });
      console.log(response)

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        console.log('Login successful');
        setLog_in(true);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>

          <Route path='doctor_login'
            element={<DoctorLogin
              handleSubmit={(e) => handleSubmit(e, 2)}
              log_in={Log_in} />}>
          </Route>

          <Route path='patient_login' 
            element={<PatientLogin 
              handleSubmit={(e) => handleSubmit(e, 1)} 
              log_in={Log_in} 
            />}>
          </Route>

          <Route path='admin_login' 
            element={<AdminLogin 
              handleSubmit={(e) => handleSubmit(e, 3)} 
              log_in={Log_in} 
            />}>
          </Route>
          
          <Route path='register_patient' element={<RegisterPatient />}></Route>
          <Route path="/doctor_view" element={<DoctorView />}></Route>
          <Route path="/doctor_registration" element={<DoctorReg />}></Route>
          <Route path="/doctor_update" element={<DoctorUpdate />}></Route>
          <Route path="/patientview" element={<PatientsView />}></Route>
          <Route path="/patientappointments" element={<Appointment />}></Route>
          <Route path="/bookappointments" element={<BookAppointments />}></Route>
          <Route path="admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
