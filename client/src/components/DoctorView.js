import React from "react"
import { NavLink } from "react-router-dom";
import DrAptRequests from "./DrAptRequests";
import DrFixedApts from "./DrFixedApts";

function DoctorView(){
    return(
        <div className="flex flex-col justify-center items-center mt-5">
                <h1 className="font-bold mr-3 mb-2 tracking-wider text-xl text-center">Welcome John Doe</h1>
            
                <div className="flex">
                    <NavLink path to="/doctor_update" className="p-1 bg-green-500 text-white rounded-md mr-2 cursor-pointer hover:font-bold">Update Profile</NavLink>
                    <NavLink path to="/doctor_login" className="p-1 bg-red-500 text-white rounded-md cursor-pointer hover:font-bold">Logout</NavLink>
                </div>
            

            <div className="">
                <DrFixedApts/>
                <DrAptRequests/>
            </div>
        </div>
    )
}

export default DoctorView;