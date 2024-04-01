import React, { useState } from "react";
import "./PatientsView.css";

function PatientsView() {
  // Appointments state
  const [appointments, setAppointments] = useState([]);

  return (
    <div className="bg-cover bg-center h-screen" style={{backgroundImage: `url('/PatientsBG.jpg')`}}>
      <h1 className="text-center font-bold text-white">Patient View</h1>
      <div className="flex justify-center items-center h-full">
        <div className="circle">
          <button className="bg-green-600 text-center text-white w-24 h-24 rounded-full mb-6" onClick={()=>window.location.href="/bookappointments"}>Book Appointments</button>
          <button className="bg-green-600 text-center text-white w-24 h-24 rounded-full mb-6" onClick={()=>window.location.href="/"}>Log Out</button>
          <button className="bg-green-600 text-center text-white w-24 h-24 rounded-full mb-6" onClick={()=>window.location.href="/patientsprofile"}>My Profile</button>
          <button className="bg-green-600 text-center text-white w-24 h-24 rounded-full mb-6" onClick={()=>window.location.href="/patientappointments"}>View Appointments</button>
          <button className="bg-green-600 text-center text-white w-24 h-24 rounded-full mb-6" onClick={()=>window.location.href="/"}>Book Appointments</button>
          <button className="bg-green-600 text-center text-white w-24 h-24 rounded-full mb-6" onClick={()=>window.location.href="/"}>New button</button>
        </div>
      </div>
    </div>
  );
}

export default PatientsView;
