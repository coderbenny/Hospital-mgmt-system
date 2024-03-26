import React, { useState } from "react"
import "./PatientsView.css"

function PatientsView(){
    
    // Appointments state
    const[appointments, setAppointments]=useState([])

    return(
        <div className="bg-cover bg-center h-screen" style={{backgroundImage: `url('/PatientsBG.jpg')`}}>
            <h1 className="text-center font-bold text-white">Patient View</h1>
            <div className="flex justify-center items-center ">
                <button className="bg-green-600 text-center justify-center text-white w-24 h-24 rounded-full items-center">Book Appointments</button>
                <button className="bg-green-600 text-center justify-center text-white w-24 h-24 rounded-full items-center">Log Out</button>
                <button className="bg-green-600 text-center justify-center text-white w-24 h-24 rounded-full items-center" >My Profile</button>
                <button className="bg-green-600 text-center justify-center text-white w-24 h-24 rounded-full items-center">View Appointments</button>
                <button className="bg-green-600 text-center justify-center text-white w-24 h-24 rounded-full items-center">Book Appointments</button>
            </div>
        </div>
    )
}

export default PatientsView;

// Display list of Doctors and their appointments
// Button that Routes to booking appointment
// Button that Routes to updating profile
// Button for log out

