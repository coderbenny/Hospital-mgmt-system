import React, { useState, useEffect } from "react"
import { NavLink, Navigate } from "react-router-dom";
import DrAptRequests from "./DrAptRequests";
import DrFixedApts from "./DrFixedApts";
// import httpsClient from './httpsClient';
import axios from "axios";


function DoctorView(){

    const [user, setUser] = useState({});
    const [appointments, setAppointments] = useState([]);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get("/@me");
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    }

    const fetchDoctorAppointments = async (doctorId) => {
        try {
            const response = await axios.get(`/doctors/${doctorId}`);
            if (response.status === 200) {
                setAppointments(response.data.appointments);
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    }

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (user && user.id && user.role_id === 1) {
            fetchDoctorAppointments(user.id);
        }
    }, [user]);

    // if (!user || !user.id || user.role_id !== 1) {
    //     return <Navigate to="/doctor_login" replace/>;
    // }

    console.log(user)

    return(
        <div className="flex flex-col justify-center items-center mt-5">
                <h1 className="font-bold mr-3 mb-2 tracking-wider text-xl text-center">Welcome John Doe</h1>
            
                <div className="flex">
                    <NavLink path to="/doctor_update" className="p-1 bg-green-500 text-white rounded-md mr-2 cursor-pointer hover:font-bold">Update Profile</NavLink>
                    <NavLink path to="/doctor_login" className="p-1 bg-red-500 text-white rounded-md cursor-pointer hover:font-bold">Logout</NavLink>
                </div>
            

            <div className="">
                <DrFixedApts appointments={appointments}/>
                <DrAptRequests/>
            </div>
        </div>
    )
}

export default DoctorView;