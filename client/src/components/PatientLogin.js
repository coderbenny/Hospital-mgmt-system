import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class PatientLogin extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Patient Login</h1>
                    <form action="">
                        <div>
                            <input type='text' id='username' />
                            <label htmlFor='username'>Your Username</label>
                        </div>
                        <div>
                            <input type='password' id='password' />
                            <label htmlFor='password'>Your Password</label>
                        </div>
                        <div>
                            <input type='checkbox' id='rememberMe' />
                            <label htmlFor='rememberMe'>Remember Me</label>
                        </div>
                        <span>Forgot Password?</span>
                        <button type='submit'>Login</button>
                    </form>
                    <span>New Patient? <Link to='/register_patient'>Create an Account</Link></span>
                </div>
            </div>
        );
    }
}

export default PatientLogin;
