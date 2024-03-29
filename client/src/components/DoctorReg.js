import React from "react"

function DoctorReg(){
    return(
        <div className="flex justify-center mt-5">

            <form action="/doctors" method="POST" className="flex flex-col w-[500px] p-3 rounded-md shadow-md items-center">
            <h1 className="text-center font-bold text-xl tracking-wide mb-5">Doctor Registration</h1>
                {/* <label>Name</label> */}
                <input type="text" placeholder="enter your name here..." className="mb-2 px-2 w-[250px] border-2 border-gray-150" />
                {/* <label>Speciality</label> */}
                <input type="text" placeholder="enter your speciality here..." className="mb-3 px-2 w-[250px] border-2 border-gray-150" />
                <input type="submit" value="Register" className="p-1 mb-1 bg-green-500 text-white hover:font-bold w-[250px]"/>
                <input type="submit" value="Cancel" className="p-1 bg-red-700 text-white hover:font-bold w-[250px]"/>
            </form>
        </div>
    )
}

export default DoctorReg;