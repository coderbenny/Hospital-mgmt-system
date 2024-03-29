import React from "react";

function DrFixedApts(){
    return(
            <div className="text-center mt-5 mb-16 p-2">
                <h1 className="font-semibold mb-5 text-lg tracking-wider">Your Appointments</h1>
                
                <div className="grid grid-cols-4 p-1 items-center border-2 border-gray-200 shadow-md">
                    
                    <div className="items-center">
                        <h3 className="mb-2 font-semibold">Patient Name</h3>
                        <p className="">John Doe</p>
                    </div>

                    <div className="items-center">
                        <h3 className="mb-2 font-semibold">Patient Email</h3>
                        <p className="">johndoe@mail.com</p>
                    </div>

                    <div className="items-center">
                        <h3 className="mb-2 font-semibold">Appointment Date</h3>
                        <p className="">2024-12-12</p>
                    </div>

                    <div className="items-center">
                        <h3 className="text-center font-semibold">Completed</h3>
                        <button className="p-2 bg-green-500 hover:font-bold text-white rounded-md">Completed</button>                        
                        </div>
                    </div>

                </div>
    )
}

export default DrFixedApts;