import React, { useState } from "react"

function PatientView(){
    
    // Appointments state
    const[appointments, setAppointments]=useState([])

    return(
        <div className="">
            <h1 className="">Patient View</h1>
        </div>
    )
}

export default PatientView;

// Display list of Doctors and their appointments
// Button that Routes to booking appointment
// Button that Routes to updating profile
// Button for log out

