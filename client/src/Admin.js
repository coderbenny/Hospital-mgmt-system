import React, { useState, useEffect } from "react";
import RegisteredPatients from "./RegisteredPatients";
import Appointments from "./Appointments";


function Admin(){
    return (
        <div>
            <h2>Welcome Admin</h2>
            <Appointments />
            <RegisteredPatients/>
        </div>
    );
}

export default Admin;
