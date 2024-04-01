import React, { useState } from "react";
import httpsClient from "./httpsClient";


function BookAppointments() {
    // State for appointment details
    const [Appointment, setAppointment] = useState({
        "patient_id": "", 
        "doctor_id": "", 
        "date": "", 
    });
    const create_appointment =async () =>{
        try {
        const resp= await httpsClient.post("http://127.0.0.1:5555/appointments",{
        patient_id: Appointment.patient_id ,
        doctor_id: Appointment.doctor_id ,
        date: Appointment.date
        })
        alert("Appointment created successfully!");
        console.log(resp);
    } catch (error) {
        if (error && error.response && error.response.status === 401) {
          alert("Invalid Credentials");
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    };
    const handleSubmit= (event)=>{ 
        event.preventDefault();
        create_appointment();
        
    }
    const onChange =(e)=>setAppointment({...Appointment,[e.target.name]: e.target.value});
    const HandleDate=(e)=>{ 
        let chosendate = new Date(e.target.value);
        let today =  new Date();
    
        if (chosendate  > today ) {
           return onChange(e)
        }
        else{
           return alert( " Please enter a future date")
        }
      }
    

    const Home = () =>{window.location.href='http://localhost:3000/patientview'}
    
    return (
        <div className="flex flex-col items-center justify-center h-screen" >
            <h1 className="text-3xl font-bold mb-8">Book an Appointment</h1>
            <form className="bg-white shadow-md rounded-4xl px-8 pt-6 pb-8 mb-4 w-full max-w-xs"
            onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-black-700 text-sm font-bold mb-2" htmlFor="doctor_id">Doctor's ID:</label>
                    <input 
                        type="number" 
                        name="doctor_id" 
                        id="doctor_id" 
                        className="appearance-none border rounded-full w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter doctor's id"
                        value={Appointment.doctor_id}
                        onChange={onChange}
                        min={1}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black-700 text-sm font-bold mb-2" htmlFor="patient_id">Patient ID:</label>
                    <input 
                        type="number" 
                        name="patient_id" 
                        id="patient_id" 
                        className="appearance-none border rounded-full w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={Appointment.patient_id}
                        onChange={onChange}
                        placeholder="Enter your patient's id"
                        min={1}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black-700 text-sm font-bold mb-2" htmlFor="date">Date:</label>
                    <input 
                        type="date" 
                        name="date" 
                        id="date" 
                        className="appearance-none border rounded-full w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={Appointment.date}
                        onChange={HandleDate}
                        placeholder="Choose a date"
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                >
                    Book now
                </button>
                <button 
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    onClick={Home}
                    type="submit"
                    style={{ marginLeft: '60px' }}
                >
                    🏠
                </button>
            </form>
        </div>
    );
}

export default BookAppointments;
