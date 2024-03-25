import React, { useState } from "react";

function ScheduleApt(){

    // State for appointment details
    const[appointment, setAppointment]=useState({
        'doctor_name':'',
        'date':''
    })

    return(
        <div className="">
            <h1 className="">Schedule Appointment</h1>
            
            <form className="" method="POST" action="/appointments">
                <input type="text" name="doctor_name"/>
                <input type="date" name=""/>
                <input type="submit" value="Submit Request"/>
            </form>
        </div>
    )
}

export default ScheduleApt;