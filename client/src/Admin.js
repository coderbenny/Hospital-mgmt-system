import React, { useState, useEffect } from "react";
import RegisteredPatients from "./RegisteredPatients";
import Appointments from "./Appointments";
import RegisteredDoctors from "./RegisteredDoctors";


function Admin(){
    return (
        <div>
            <h2>Welcome Admin</h2>
            <Appointments />
            <RegisteredPatients/>
            <RegisteredDoctors/>
        </div>
    );
}

export default Admin;
