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
            <table>
                <caption> APPOINTMENTS </caption>
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Appointment ID</th>
                        <th className="px-4 py-2 border-b">Doctor Id</th>
                        <th className="px-4 py-2 border-b">Patient Id</th>
                        <th className="px-4 py-2 border-b">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td className="px-4 py-2 border-b">{appointment.id}</td>
                            <td className="px-4 py-2 border-b">{appointment.date}</td>
                            <td className="px-4 py-2 border-b">{appointment.patient_id}</td>
                            <td className="px-4 py-2 border-b">{appointment.doctor_id}</td>
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

