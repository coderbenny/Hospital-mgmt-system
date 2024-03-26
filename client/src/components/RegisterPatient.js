import React, { Component } from 'react';


class RegisterPatient extends Component {
    render() {
        return (
            <div>
                <div>
                <h1> Patient Registration Form</h1>
                <form action =''>
                    <div>
                        <input type='text' />
                        <label>First Name</label>
                    </div>
                    <div>
                        <input type='text' />
                        <label>Last Name</label>
                    </div>
                    <div>
                        <input type='date' />
                        <label>Date of Birth</label>
                    </div>
                    <div>
                        <input type='tel' />
                        <label>Phone Number</label>
                    </div>
                    <div>
                        <input type='password' />
                        <label>Login Password</label>
                    </div>
                    <div>
                        <input type='text' />
                        <label>Address</label>
                    </div>
                        <div>
                            <input type='checkbox' name='' id='' />
                            <label>Remember Me</label>
                        </div>
                        <span>Forgot Password?</span>
                        <button type='submit'>Login</button>
                        </form>
                </div>
            </div>
        );
    }
}


export default RegisterPatient;