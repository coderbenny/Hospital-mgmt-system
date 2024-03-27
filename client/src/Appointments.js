// api.add_resource(Index, '/')
// api.add_resource(ViewDoctor, '/doctors')
// api.add_resource(ViewDoctorById, '/doctors/<int:id>')
// api.add_resource(ViewPatient, '/patients')
// api.add_resource(ViewPatientById, '/patients/<int:id>')
// api.add_resource(ViewAppointment, '/appointments')
// api.add_resource(ViewAppointmentById, '/appointments/<int:id>')
// api.add_resource(Login, '/login')
// api.add_resource(Register, '/register')
// api.add_resource(Admin, '/admin')
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

