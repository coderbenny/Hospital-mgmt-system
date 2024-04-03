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
