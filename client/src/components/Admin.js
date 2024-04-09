import React from "react";
import RegisteredPatients from "./RegisteredPatients.js";
import Appointments from "./AdminApppoint.js";
import RegisteredDoctors from "./RegisteredDoctors";



function Admin(){
    
    return (
        <div>
            <h2>Welcome Admin</h2>
            <Appointments />
            <RegisteredPatients/>
            <RegisteredDoctors/>
            <button className="" onClick={()=>window.location.href="/"}>Log Out</button>
        </div>
    );
}

export default Admin;