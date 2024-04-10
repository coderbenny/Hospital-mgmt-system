import React from "react";
import RegisteredPatients from "./RegisteredPatients.js";
import Appointments from "./AdminApppoint.js";
import RegisteredDoctors from "./RegisteredDoctors";
import { Link } from "react-router-dom";
import "./admin.css"



function Admin(){
    
    return (
        <div class='admin-page'>
            <div class="container">
                <h2 class="admin">Welcome Admin</h2>
                <div class="links">
                    <Link to="/RegisteredDoctors" className="logout-btn">Doctors</Link>
                    <Link to="/Appointments" className="logout-btn">Appointments</Link>
                    <Link to="/RegisteredPatients" className="logout-btn">Patients</Link>
                    <button className="logout-btn" onClick={()=>window.location.href="/"}>Log Out</button>
                </div>
            </div>
        </div>
    );
}

export default Admin;