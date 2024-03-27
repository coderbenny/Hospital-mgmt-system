

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-5xl font-bold mb-10">Hospital Management System</h1>
                <div className="flex flex-col space-y-4">
                    <Link to="/doctor_login">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Doctor Login
                        </button>
                    </Link>
                    <Link to="/patient_login">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Patient Login
                        </button>
                    </Link>
                    <Link to="/admin_login">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Admin Login
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Home;
