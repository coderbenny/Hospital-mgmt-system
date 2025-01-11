import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

function DoctorReg() {
    const [doctorDetails, setDoctorDetails] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'), 
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const handleInputChange = (e) => {
        setDoctorDetails({
            ...doctorDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(doctorDetails, { abortEarly: false });

            const response = await axios.post('http://127.0.0.1:5555/register', {
                ...doctorDetails,
                role_id: 1
            });

            console.log(response.data);
            alert('Registration successful!');
        } catch (error) {
            if (error.inner) {
                const newErrors = {};
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
                setErrors(newErrors);
            } else {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold mb-5">Doctor Registration Form</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={doctorDetails.username}
                            onChange={handleInputChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''}`}                        />
                        {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            value={doctorDetails.email}
                            onChange={handleInputChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`} />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">Login Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={doctorDetails.password}
                            onChange={handleInputChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>
                    <div className='flex justify-between mb-4 '>
                        <div className='mt-4 text-center'>
                            <Link to="/patient_login" className='text-blue-800 font-semibold hover:underline' >Back to Login page</Link>
                        </div>
                        <button type="submit" className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DoctorReg;