import React, { useState, useEffect } from "react";

export default function Appointments(){
    const [appointments, setAppointments] = useState([]);

    const handleDelete= (id) => {
        fetch(`./appointments/${id}`, {
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
        fetch("./appointments")
            .then((response) => response.json())
            .then((data) => {
                setAppointments(data);
            })
            .catch((error) => {
                console.error("Error fetching appointments:", error);
            });
    }, []); 

    return (
        <div>
            <p>Appointments</p>
            <table>
                <thead>
                    <tr>
                        <th>Appointment ID</th>
                        <th>Date</th>
                        <th>Patient Id</th>
                        <th>Doctor Id</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.id}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.patient_id}</td>
                            <td>{appointment.doctor_id}</td>
                            <td>
                                <button onClick={() => handleDelete(appointment.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

