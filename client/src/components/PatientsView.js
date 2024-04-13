import React, { useState } from "react";
import "./PatientsView.css";

function PatientsView() {
  // Appointments state
  const [appointments, setAppointments] = useState([]);
  //UserInfo state
  const [user,setUser] = useState({}) 

  //GET logged in user info
  const UserInfo= async  () =>{
    let response = await fetch("http://127.0.0.1:5555/@me")
    console.log(response)
    setUser(response)
  }

  return (
    <div className="bg-cover bg-center h-screen" style={{backgroundImage: `url('/PatientsBG.jpg')`}}>
      <h1 className="text-center font-bold text-white">Patient View</h1>
      {/* <p className="text-center font-bold text-white items-center h-full justify-center">John Kamau</p> */}
      <div className="flex flex-col justify-center items-center h-full">
      {/* <p className="text-center font-bold text-white ">John Kamau</p> */}
        <div className="circle">
          <button className="bg-green-600 text-center text-white w-24 h-24 rounded-full mb-6" onClick={()=>window.location.href="/bookappointments"}>Book Appointments</button>
          <button className="bg-green-600 text-center text-white w-24 h-24 rounded-full mb-6" onClick={()=>window.location.href="/"}>Log Out</button>
          <button className="bg-green-600 text-center text-white w-24 h-24 rounded-full mb-6" onClick={()=>window.location.href="/patientsprofile"}>My Profile</button>
          <button className="bg-green-600 text-center text-white w-24 h-24 rounded-full mb-6" onClick={()=>window.location.href="/patientappointments"}>View Appointments</button>
          {/* <button className="bg-green-600 text-center text-white w-24 h-24 rounded-full mb-6" onClick={()=>window.location.href="/"}>Book Appointments</button>
          <button className="bg-green-600 text-center text-white w-24 h-24 rounded-full mb-6" onClick={()=>window.location.href="/"}>New button</button> */}
        </div>
      </div>
    </div>
  );
}

export default PatientsView;
