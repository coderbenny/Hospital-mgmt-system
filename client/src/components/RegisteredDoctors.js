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
                console.log(data)
            })
            .catch((error) => {
                console.error("Error fetching appointments:", error);
            });
    }, [])

    return (
        <div>
            <table class="doctor-table">
                <caption class="title"> DOCTORS </caption>
                <thead>
                    <tr>
                        <th class="column-header">Doctor ID</th>
                        <th class="column-header">Name</th>
                        <th class="column-header">Speciality</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctors) => (
                        <tr key={doctors.id}>
                            <td class="cell">{doctors.id}</td>
                            <td class="cell">{doctors.name}</td>
                            <td class="cell">{doctors.speciality}</td>
                            <td class="cell">
                                <button class="delete" onClick={() => handleDelete(doctors.id)}>x</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}