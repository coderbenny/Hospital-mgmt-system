import React from "react";

function DrAptRequests(){
    return(
        <div className="text-center mb-16 p-2">
                <h1 className="font-semibold mb-5 text-lg tracking-wider">Appointment Requests</h1>
                
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
                        <h3 className="font-semibold">Approve/Delete</h3>
                        <div className="flex justify-center">
                            <button className=" mr-5 p-2 bg-green-500 text-white rounded-md">Approve</button>
                            <button className=" p-2 px-4 bg-red-500 text-white rounded-md">Delete</button>
                        </div>
                    </div>

                </div>
            </div>
    )
}

export default DrAptRequests;