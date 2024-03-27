import React, { useState, useEffect } from 'react';
import httpsClient from './httpsClient';

function Appointment() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    try {
      const resp = await httpsClient.get("http://127.0.0.1:5555/appointments");
      setAppointments(resp.data);
    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        alert("Invalid Credentials");
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className='flex flex-col justify-center items-center'>
      <h3 className='font-bold text-center mb-4 text-xl'>Your Appointments</h3>
      <div className="overflow-x-auto rounded-md shadow-xl bg-opacity-50">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-green-500 text-center text-white">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b" >Patient ID</th>
              <th className="px-4 py-2 border-b">Doctor ID</th>
              <th className="px-4 py-2 boarder-b">Appointment Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index} className="text-black-900 ">
                <td className="px-4 py-2 border-b">{appointment.id}</td>
                <td className="px-4 py-2 border-b">{appointment.patient_id}</td>
                <td className="px-4 py-2 border-b">{appointment.doctor_id}</td>
                <td className="px-4 py-2 border-b">{appointment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointment;
