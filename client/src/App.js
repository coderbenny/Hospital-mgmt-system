import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import PatientsView from './components/PatientsView'
import BookAppointments from './components/BookAppointments'
import  App from  './App'
import PatientProfile from './components/PatientProfile'
import NotFound from './components/NotFound'
import Appointment from './components/Appointment'
function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element ={<App/>}></Route>
        <Route path="/patientview" element={<PatientsView />}/>
        <Route path="/bookappointments" element={<BookAppointments/>}/>
        <Route path="/patientsprofile" element={<PatientProfile/>}/>
        <Route path="/patientappointments" element={<Appointment/>}/>
        <Route path="*" element={<NotFound/>}/>
    </Routes>
      
    </BrowserRouter>
  )
}

export default App
