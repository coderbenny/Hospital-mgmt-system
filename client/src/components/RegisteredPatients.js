import React from "react";
import { useEffect, useState } from "react";

export default function RegisteredPatients(){

    const [patients, setPatients] = useState([]);

    const handleDelete= (id) => {
        fetch(`http://127.0.0.1:5555/patients/${id}`, {
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
        fetch("http://127.0.0.1:5555/patients")
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
            <table class="patient-table">
                <caption class="title"> PATIENTS </caption>

                <thead>
                    <tr>
                        <th class="column-header">Patient ID</th>
                        <th class="column-header">Name</th>
                        <th class="column-header">Age</th>
                        <th class="column-header">Disease</th>
                    </tr>
                </thead>

                <tbody>
                    {patients.map((patients) => (
                        <tr key={patients.id}>
                            <td class="cell">{patients.id}</td>
                            <td class="cell">{patients.name}</td>
                            <td class="cell">{patients.age}</td>
                            <td class="cell">{patients.disease}</td>

                            <td>
                                <button class="delete" onClick={() => handleDelete(patients.id)}>x</button>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}