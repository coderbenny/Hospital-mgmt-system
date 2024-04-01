import React from "react";

function DrFixedApts({appointments}){
    return(
        <div className="text-center mt-5 mb-16 p-2">
            <h1 className="font-semibold mb-5 text-lg tracking-wider">Your Appointments</h1>
            
            <div className="p-1 items-center border-2 border-gray-200 shadow-md">
                <div className="grid grid-cols-4">
                    <h3 className="mb-2 font-semibold">Patient Name</h3>
                    <h3 className="mb-2 font-semibold">Patient Email</h3>
                    <h3 className="mb-2 font-semibold">Appointment Date</h3>
                    <h3 className="text-center font-semibold">Completed</h3>
                </div>
                <div className="">
                    {appointments.length === 0 ? (
                        <div className="grid grid-cols-4 mb-2">
                            <p className="mr-2">N/A</p>
                            <p className="mr-2">N/A</p>
                            <p className="mr-2">N/A</p>
                            <p className="text-center">N/A</p>
                        </div>
                    ) : (
                        appointments.map((appointment, index) => (
                            <div key={index} className="grid grid-cols-4 mb-2">
                                <p className="mr-2">{appointment.patient_id}</p>
                                <p className="mr-2">{appointment.doctor_id}</p>
                                <p className="mr-2">{appointment.date}</p>
                                <button className="p-2 bg-green-500 hover:bg-green-700 text-white rounded-md">Completed</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default DrFixedApts;
