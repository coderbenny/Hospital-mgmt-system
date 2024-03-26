import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import PatientsView from './components/PatientsView'
import BookAppointments from './components/BookAppointments'
import  App from  './App'
function NavPatients() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element ={<App/>}></Route>
        <Route path="/patientview" element={<PatientsView />}/>
        <Route path="/bookappointments" element={<BookAppointments/>}></Route>
    </Routes>
      
    </BrowserRouter>
  )
}

export default NavPatients
