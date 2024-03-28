import './App.css';
import {  BrowserRouter, Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import DoctorLogin from './components/DoctorLogin';
import PatientLogin from './components/PatientLogin';
import AdminLogin from './components/AdminLogin';
import RegisterPatient from './components/RegisterPatient';
import PatientsView from './components/PatientsView'
import BookAppointments from './components/BookAppointments'
import PatientProfile from './components/PatientProfile'
import NotFound from './components/NotFound'
import Appointment from './components/Appointment'


function App() {
  return (
    <div className="App">
      <h1 className='font-bold text-2xl text-center color-green'>Hospital Management System</h1>
      <BrowserRouter>
        <Route path='/' element={<Home/>}></Route>
        <Route path='doctor_login' element={<DoctorLogin/>}></Route>
        <Route path='patient_login' element={<PatientLogin/>}></Route>
        <Route path='admin_login' element={<AdminLogin/>}></Route>
        <Route path='register_patient' element={<RegisterPatient/>}></Route>
        <Route path="/patientview" element={<PatientsView />}/>
        <Route path="/bookappointments" element={<BookAppointments/>}/>
        <Route path="/patientsprofile" element={<PatientProfile/>}/>
        <Route path="/patientappointments" element={<Appointment/>}/>
        <Route path="*" element={<NotFound/>}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
