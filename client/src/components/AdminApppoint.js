import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./admin.css"


export default function Appointments(){
    const [appointments, setAppointments] = useState([]);

    const handleDelete= (id) => {
        fetch(`http://127.0.0.1:5555/appointments/${id}`, {
            method: "DELETE",
        })
        .then(() => {
            setAppointments((prevAppointments) => prevAppointments.filter(appointment => appointment.id !== id));
        })
        .catch((error) => {
            console.error("Error deleting appointment:", error);
        });
    };

    useEffect(() => {
        fetch("http://127.0.0.1:5555/appointments")
            .then((response) => response.json())
            .then((data) => {
                setAppointments(data);
            })
            .catch((error) => {
                console.error("Error fetching appointments:", error);
            });
    }, []); 

    return (
        <div class="tble-cont">
            <Link to="/admin" className="logout-btn">Back</Link>
            <table class="app-table">
                <caption class="title"> APPOINTMENTS </caption>
                <thead>
                    <tr>
                        <th class="column-header">Appointment ID</th>
                        <th class="column-header">Doctor Id</th>
                        <th class="column-header">Patient Id</th>
                        <th class="column-header">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td class="cell">{appointment.id}</td>
                            <td class="cell">{appointment.date}</td>
                            <td class="cell">{appointment.patient_id}</td>
                            <td class="cell">{appointment.doctor_id}</td>
                            <td>
                                <button class="delete" onClick={() => handleDelete(appointment.id)}>x</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
