
import React, { useState} from 'react';
import axios from 'axios';
import   {Link}  from 'react-router-dom';

function RegisterPatient(){ 
    
    const [patientDetails, setPatientDetails] = useState({
        'firstName': '',
        'lastName': '',
        'dob': '',
        'phoneNumber': '',
        'address': '',
        'password': ''

    });
   
    const handleInputChange = (e) => {
        setPatientDetails({
            ...patientDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const username = `${patientDetails.firstName} ${patientDetails.lastName}`;
       
             const requestData = {
            ...patientDetails,
            username: username
             };

            const response = await axios.post('http://127.0.0.1:5555/register', setPatientDetails);
            console.log(response.data); 
            
        } catch (error) {
            console.error('Error:', error);
        }

       

    };

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold mb-5">Patient Registration Form</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1">First Name</label>
                        <input type="text" name="firstName" value={patientDetails.firstName} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1">Last Name</label>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1">Date of Birth</label>
                        <input type="date" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1">Phone Number</label>
                        <input type="tel" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1">Email Address</label>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1">Login Password</label>
                        <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    
                    <div className='flex justify-between mb-4 '>
                        <div className='mt-4 text-center'>
                             <Link to="/patient_login" className='text-blue-800 font-semibold hover:underline' >Back to Login page</Link>
                        </div>
                    {/* <button type="submit" className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline" >Register</button> */}
                    <Link to="/patientview" className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline">
                            Register
                    </Link>
                    </div>
                       
                </form>
            </div>
        </div>
    );
}

export default RegisterPatient;





