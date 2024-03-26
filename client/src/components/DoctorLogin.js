import React, { Component } from 'react';


class DoctorLogin extends Component {
    render() {
        return (
            <div>
                <div>
                <h1>Doctor Login</h1>
                <form action =''>
                    <div>
                        <input type='username' />
                        <label>Your Username</label>
                    </div>
                    <div>
                        <input type='password' />
                        <label>Your Password</label>
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


export default DoctorLogin;