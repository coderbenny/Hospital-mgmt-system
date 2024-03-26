import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Home extends Component {
    render() {
        return (
            <div>
             <h1 className='text-5xl '>Hospital Management System</h1>
             <div>
                <Link to='/doctor_login'><button>Doctor Login</button></Link>
                <Link to='/patient_login'><button>Patient Login</button></Link>
                <Link to='/admin_login'><button>Admin Login</button></Link>
             </div>  
            </div>
        );
    }
}



export default Home;