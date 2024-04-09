import React from "react";
import RegisteredPatients from "./RegisteredPatients.js";
import Appointments from "./AdminApppoint.js";
import RegisteredDoctors from "./RegisteredDoctors";
import "./admin.css"
import { Link } from "react-router-dom";



function Admin(){
    
    return (
        <div>
            <h2 class="admin">Welcome Admin</h2>

            <Link>Doctors</Link>
            <Link>Patients</Link>
            <Link>Appointments</Link>

            <RegisteredDoctors/>
            <Appointments /> 
            <RegisteredPatients/>
            <button className="" onClick={()=>window.location.href="/"}>Log Out</button>
        </div>
    );
}

export default Admin;