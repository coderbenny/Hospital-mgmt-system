import React from "react"
import DrAptRequests from "./DrAptRequests";
import DrFixedApts from "./DrFixedApts";

function DoctorView(){
    return(
        <div className="flex flex-col justify-center items-center mt-5">
                <h1 className="font-bold mr-3 text-2xl text-center">Welcome John Doe</h1>
            
                <div className="flex">
                    <button className="p-1 bg-green-500 text-white rounded-md mr-2 cursor-pointer hover:font-bold">Update Profile</button>
                    <button className="p-1 bg-red-500 text-white rounded-md cursor-pointer hover:font-bold">Logout</button>
                </div>
            

            <div className="">
                <DrFixedApts/>
                <DrAptRequests/>
            </div>
        </div>
    )
}

export default DoctorView;