import React, { useState } from "react";

function PatientProfile(){

    // State for patient Profile
    const[patientProfile, setPatientProfile]=useState({})

    return(
        <div className="">
            <h1 className="font-bold text-2xl">Patient Profile</h1>     
            
            <div className="flex flex-col">
                <h2>Name</h2>
                <p className="">John Doe</p>
                <h2>Age</h2>
                <p className="">18 years</p>
                <h2>Email</h2>
                <p>johndoe@mail.com</p>
                <h2>Address</h2>
                <p>Nairobi</p>
                <div className="flex justify-between">
                    <button className="">Update Profile</button>
                    <button className="">Back</button>                
                </div>
            </div>
        </div>
    )
}

export default PatientProfile;