import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminLogin extends Component {
    handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            username: formData.get('username'),
            password: formData.get('password'),
        };

        try {
            const response = await fetch('http://127.0.0.1:5555/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (response.ok) {
                // Login successful, redirect or show success message
                console.log('Login successful');
                // Redirect to admin page
                this.props.history.push('http://127.0.0.1:5555/admin');
            } else {
                // Login failed, show error message
                console.error(result.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    render() {
        return (
            <div className='flex justify-center mt-5'>
                <form onSubmit={this.handleSubmit} className='flex flex-col w-[500px] p-3 rounded-md shadow-md items-center'>
                    <h1 className='font-bold text-2xl mb-4'>Admin Login</h1>
                    <div className='items-center mb-1'>
                        <label className='font-semibold mr-2'>Username</label>
                        <input type='username' name='username' className='px-2 border-2 border-gray-150' />
                    </div>
                    <div className='items-center mb-1'>
                        <label className='font-semibold mr-3'>Password</label>
                        <input type='password' name='password' className='px-2 border-2 border-gray-150' />
                    </div>
                    <button type='submit' className='bg-green-500 text-white hover:shadow-md p-1 mb-3 hover:font-bold w-[280px]'>Login</button>
                    <Link to='/' className='bg-red-500 text-white hover:shadow-md p-1 mb-3 hover:font-bold w-[280px] flex justify-center'>Cancel</Link>
                </form>
            </div>
        );
    }
}

export default AdminLogin;
