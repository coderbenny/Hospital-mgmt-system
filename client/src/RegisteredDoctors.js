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

import React from "react";
import { useEffect, useState } from "react";

export default function RegisteredDoctors(){

    const [doctors, setDoctors] = useState([]);

    useEffect(()=>{
        fetch("./doctors")
            .then((r) => r.json())
            .then((data) => {
                setDoctors(data)
            })
            .catch((error) => {
                console.error("Error fetching appointments:", error);
            });
    }, [])
    return (
        <div>
            <p>Registered Doctors</p>
            <table>
                <thead>
                    <tr>
                        <th>Doctor ID</th>
                        <th>Name</th>
                        <th>Speciality</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctors) => (
                        <tr key={doctors.id}>
                            <td>{doctors.id}</td>
                            <td>{doctors.name}</td>
                            <td>{doctors.speciality}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
