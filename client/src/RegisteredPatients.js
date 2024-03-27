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

export default function RegisteredPatients(){

    const [patients, setPatients] = useState([]);

    const handleDelete= (id) => {
        fetch(`./patients/${id}`, {
            method: "DELETE",
        })
        .then(() => {
            setPatients((prevPatients) => prevPatients.filter(patient => patient.id !== id));
        })
        .catch((error) => {
            console.error("Error deleting appointment:", error);
        });
    };

    useEffect(()=>{
        fetch("./patients")
            .then((r) => r.json())
            .then((data) => {
                setPatients(data)
            })
            .catch((error) => {
                console.error("Error fetching appointments:", error);
            });
    }, [])
    return (
        <div>
            <p>Registered Patients</p>
            <table>
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Disease</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patients) => (
                        <tr key={patients.id}>
                            <td>{patients.id}</td>
                            <td>{patients.name}</td>
                            <td>{patients.age}</td>
                            <td>{patients.disease}</td>
                            <td>
                                <button onClick={() => handleDelete(patients.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
