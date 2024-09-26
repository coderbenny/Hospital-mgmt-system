import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';

class DoctorLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false
        };
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            'username': formData.get('username'),
            'password': formData.get('password'),
            'email': formData.get('email'),
        };
        // console.log(data)

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Origin' : '*',
                },
                body: JSON.stringify(data),
            });
            // console.log(response)

            if (response.status !== 200){
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                console.log('Login successful');
                this.setState({ login: true });
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    render() {
        if (this.state.login){
            return < Navigate to = '/doctor_view'/>
        }       

        return (
        
            <div className='flex justify-center mt-5'>
                 
                <form onSubmit={this.handleSubmit} action='' className='flex flex-col w-[500px] p-3 rounded-md shadow-md items-center'>
                <h1 className='font-bold text-2xl mb-4'>Doctor Login</h1>

                    <div className='items-center mb-1'>
                        <label className='font-semibold mr-2'>Username</label>
                        <input type='username' name='username' className='px-2 border-2 border-gray-150' />
                    </div>
                    <div className='items-center mb-1'>
                        <label className='font-semibold mr-3'>Password</label>
                        <input type='password' name='password' className='px-2 border-2 border-gray-150' />
                    </div>
                    <div className='items-center mb-1'>
                        <label className='font-semibold mr-3'>Email</label>
                        <input type='email' name='email' className='px-2 border-2 border-gray-150' />
                    </div>                                     
                    <div className='items-center'>
                        <label className='font-semibold mr-2'>Remember Me</label>
                        <input type='checkbox' name='remember_me' className='border-2 border-gray-150' id='' />
                    </div>
                    <div className='flex mb-2'>
                    <p className='mr-1'>New Doctor?</p>
                    <Link to='/doctor_registration' className='text-blue-800 font-semibold hover:underline'>Create an account</Link>
                    </div>
                    
                    <button type='submit' className='bg-green-500 text-white hover:shadow-md p-1 mb-3 hover:font-bold w-[280px]'>Login</button>
                    <Link to='/' className='bg-red-500 text-white hover:shadow-md p-1 mb-3 hover:font-bold w-[280px] flex justify-center'>Cancel</Link>
                </form>
                
            </div>
        );
    }
}

export default DoctorLogin;