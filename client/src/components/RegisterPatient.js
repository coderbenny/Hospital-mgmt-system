import React, { Component } from 'react';
import axios from 'axios';
import  {Link}  from 'react-router-dom';

class RegisterPatient extends Component {
    state = {
        firstName: '',
        lastName: '',
        dob: '',
        phoneNumber: '',
        address: '',
        password: ''

    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/patients', this.state);
            console.log(response.data); // Assuming the backend returns some data
            // Reset state or perform any other action upon successful registration
        } catch (error) {
            console.error('Error:', error);
            // Handle error response
        }
    };

    render() {
        return (
            <div className="flex justify-center mt-10">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-5">Patient Registration Form</h1>
                    <form onSubmit={this.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1">First Name</label>
                            <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
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
                            <label className="block text-gray-700 text-sm font-bold mb-1">Address</label>
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
                        <button type="submit" className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline" >Register</button>
                        </div>
                           
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterPatient;


