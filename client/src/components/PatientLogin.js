import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import * as Yup from 'yup';

const PatientLogin = ({ handleSubmit, log_in }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        remember_me: false
    });

    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
        email: Yup.string().email('Invalid email address').required('Email is required')
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: inputValue
        });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            handleSubmit(formData);
        } catch (error) {
            const newErrors = {};
            error.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    };

    if (log_in) {
        return <Navigate to='/patientview' />;
    }

    return (
        <div className='flex justify-center mt-5'>
            <form onSubmit={handleSubmitForm} action="" className='flex flex-col w-[500px] p-3 rounded-md shadow-md items-center'>
                <h1 className='font-bold text-2xl mb-4'>Patient Login</h1>
                <div className='items-center mb-1'>
                    <label className='font-semibold mr-2'>Username</label>
                    <input
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={handleInputChange}
                        className={`px-2 border-2 border-gray-150 ${errors.username ? 'border-red-500' : ''}`}
                    />
                    {errors.username && <p className='text-red-500 text-xs italic'>{errors.username}</p>}
                </div>
                <div className='items-center mb-1'>
                    <label className='font-semibold mr-2 px-4'>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`px-2 border-2 border-gray-150 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className='text-red-500 text-xs italic'>{errors.email}</p>}
                </div>
                <div className='items-center mb-1'>
                    <label className='font-semibold mr-3'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`px-2 border-2 border-gray-150 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && <p className='text-red-500 text-xs italic'>{errors.password}</p>}
                </div>
                <div className='items-center mb-1'>
                    <label className='font-semibold mr-2'>Remember Me</label>
                    <input
                        type='checkbox'
                        name='remember_me'
                        checked={formData.remember_me}
                        onChange={handleInputChange}
                        className='border-2 border-gray-150'
                    />
                </div>
                <div className='flex mb-2'>
                    <p className='mr-1'>New Patient?</p>
                    <Link to='/register_patient' className='text-blue-800 font-semibold hover:underline'>Create an account</Link>
                </div>
                <button type='submit' className='bg-green-500 text-white hover:shadow-md p-1 mb-3 hover:font-bold w-[280px]'>Login</button>
                <Link to='/' className='bg-red-500 text-white hover:shadow-md p-1 mb-3 hover:font-bold w-[280px] flex justify-center'>Cancel</Link>
            </form>
        </div>
    );
};

export default PatientLogin;
