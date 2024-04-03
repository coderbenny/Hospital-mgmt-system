import React from "react";
import { useEffect, useState } from "react";

export default function RegisteredDoctors(){

    const [doctors, setDoctors] = useState([]);

    const handleDelete= (id) => {
        fetch(`http://127.0.0.1:5555/doctors/${id}`, {
            method: "DELETE",
        })
        .then(() => {
            setDoctors((prevDoctors) => prevDoctors.filter(doctor => doctor.id !== id));
        })
        .catch((error) => {
            console.error("Error deleting appointment:", error);
        });
    };

    useEffect(()=>{
        fetch("http://127.0.0.1:5555/doctors")
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
            <table className="table-auto w-full bg-white border border-gray-300">
                <caption> DOCTORS </caption>
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Doctor ID</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Speciality</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctors) => (
                        <tr key={doctors.id}>
                            <td>{doctors.id}</td>
                            <td>{doctors.name}</td>
                            <td>{doctors.speciality}</td>
                            <td>
                                <button onClick={() => handleDelete(doctors.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}