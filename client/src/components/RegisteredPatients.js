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
            <table className="table-auto border-collapse border border-gray-400">
                <caption> PATIENTS </caption>
                <thead>
                    <tr>
                        <th className="border border-green-400 px-4 py-2">Patient ID</th>
                        <th className="border border-green-400 px-4 py-2">Name</th>
                        <th className="border border-green-400 px-4 py-2">Age</th>
                        <th className="border border-green-400 px-4 py-2">Disease</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patients) => (
                        <tr key={patients.id}>
                            <td className="border border-gray-400 px-4 py-2">{patients.id}</td>
                            <td className="border border-gray-400 px-4 py-2">{patients.name}</td>
                            <td className="border border-gray-400 px-4 py-2">{patients.age}</td>
                            <td className="border border-gray-400 px-4 py-2">{patients.disease}</td>
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
