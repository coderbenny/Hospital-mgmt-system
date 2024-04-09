import React, {useState} from "react"
import { NavLink } from "react-router-dom";
import httpsClient from "./httpsClient";

function DoctorReg(){

    // State for password error
    const[pwdMatchError, setPwdMatchError]=useState(false)

    // State for registration details
    const[regDetails, setRegDetails]=useState({
        'name':'',
        'speciality':'',
        'email':'',
        'password':'',
        'role_id':''
    })

    // Handling input change
    function handleInputChange(e){        
        setRegDetails({
            ...regDetails,
            [e.target.name]:e.target.value
        })
    }

    // Handle password-match logic
    const pwdMatchLogic = (regDetails) =>{
        if (regDetails.password != regDetails.password2){
            setPwdMatchError(true)
        }else{
            setPwdMatchError(false)
        }
    }


    // Async function for submitting the form to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        const pwdMatch = pwdMatchLogic(regDetails)
    
        if (pwdMatch){
            return;
        }
        try {
            const response = await httpsClient.post('http://127.0.0.1:5555/doctor', regDetails);
            console.log(response.data); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    console.log(regDetails)

    return(
        <div className="flex justify-center mt-5">

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-3xl font-bold mb-5">Doctor Registration Form</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-1">Full Name</label>
                    <input type="text" name="username" onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-1">email</label>
                    <input type="email" name="email" onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-1">Role ID</label>
                    <input type="number" name="role_id" onChange={handleInputChange} min="1" max="3" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-1">Login Password</label>
                    <input type="password" name="password" onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-1">Repeat Password</label>
                    <input type="password" name="password2" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
                {pwdMatchError && <p className="text-red-500 text-xs italic">Passwords don't match</p>}
                </div>
                
                <div className='flex justify-between mb-4 '>
                    <div className='mt-4 text-center'>
                            <NavLink to="/doctor_login" className='text-blue-800 font-semibold hover:underline' >Back to Login page</NavLink>
                    </div>
                {/* <button type="submit" className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline" >Register</button> */}
                <input type="submit" value="Register" className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline" />
                </div>
                       
            </form>
        </div>
    )
}

export default DoctorReg;