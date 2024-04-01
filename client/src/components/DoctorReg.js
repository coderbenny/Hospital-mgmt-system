import React, {useState} from "react"
import { NavLink } from "react-router-dom";
import httpsClient from "./httpsClient";

function DoctorReg(){

    // State for registration details
    const[regDetails, setRegDetails]=useState({
        'name':'',
        'speciality':''
    })

    // Handling input change
    function handleInputChange(e){        
        setRegDetails({
            ...regDetails,
            [e.target.name]:e.target.value
        })
    }

    // Async function for submitting the form to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await httpsClient.post('http://127.0.0.1:5555/doctors', regDetails);
            console.log(response.data); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    console.log(regDetails)

    return(
        <div className="flex justify-center mt-5">

            <form onSubmit={handleSubmit} className="flex flex-col w-[500px] p-3 rounded-md shadow-md items-center">
            <h1 className="text-center font-bold text-xl tracking-wide mb-5">Doctor Registration</h1>
                {/* <label>Name</label> */}
                <input type="text" name="name" placeholder="enter your name here..." onChange={handleInputChange} className="mb-2 px-2 w-[250px] border-2 border-gray-150" />
                {/* <label>Speciality</label> */}
                <input type="text" name="speciality" placeholder="enter your speciality here..." onChange={handleInputChange} className="mb-3 px-2 w-[250px] border-2 border-gray-150" />
                <input type="submit" value="Register" className="p-1 mb-1 bg-green-500 text-white hover:font-bold w-[250px]"/>
                <NavLink path to="/" className="p-1 text-center bg-red-700 text-white hover:font-bold w-[250px]">Cancel</NavLink>
            </form>
        </div>
    )
}

export default DoctorReg;