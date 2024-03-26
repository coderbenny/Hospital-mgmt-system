import React, { useState } from "react"

function RegisterPatient(){

    // State for patient registration details
    const[newPatient, setNewPatient]=useState({
        'name':'',
        'age':'',
        'email':''
    })

    return(
        <div className="">
            <h1 className="">Patient Registration</h1>

            <form method="POST" action="/patients" className="">
                <input type="text" name="name" />
                <input type="number" name="age" />
                <input type="email" name="email" />
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}

export default RegisterPatient;