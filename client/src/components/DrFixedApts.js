import React, { useState, useEffect } from 'react';
import httpsClient from './httpsClient';

function DrFixedApts() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch]=useState("");

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    try {
      const resp = await httpsClient.get("http://127.0.0.1:5555/appointments");
      setAppointments(resp.data);
    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        alert("Invalid Credentials");
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };


  const deleteAppointment = async(id) =>{
    const resp = await httpsClient.delete(`http://127.0.0.1:5555/appointments/${id}`)
    getAppointments()
    console.log(resp)
  }

  const HandleDelete = (id) =>{
    if(window.confirm('Are you sure ?')){
      deleteAppointment(id);
    }
  };

  const patchAppointment = async (id ,updatedappointment) =>{
    try{
      const resp = await httpsClient.patch(`http://127.0.0.1:5555/appointments/${id}`,updatedappointment);
      console.log(resp)
      getAppointments(); 
    }catch(error){
      if (error && error.response && error.response.status === 401) {
        alert("Invalid Credentials");
      } else {
        console.error("An unexpected error occurred:", error);
        alert(`$Update Failed ${error}`);
      }
    }
  }


  useEffect(() => {
    getAppointments();
  }, []);

  const handleSearch = () => {
    const filteredAppointments = appointments.filter((appointment) =>
      appointment.patient_id.toString().toLowerCase().includes(search.toLowerCase())
    );
    return filteredAppointments;
  };

  const Home = () =>{window.location.href='http://localhost:3000/patientview'}
  return (
    <div className='flex flex-col justify-center items-center'>
      <h3 className='font-bold text-center mb-4 text-xl'>Your Appointments</h3>
      <nav style={{ marginBottom: '15px' }}>
        <input 
        className='rounded-full border-2 border-green-500 focus:outline-none shadow-xl bg-opacity-50 text-center ' 
        type='text' 
        name='search' 
        placeholder='Patient id' 
        autoComplete='off' 
        value={search} 
        onChange={(e)=>setSearch(e.target.value)} 
        />
        {/* <button className='bg-green-500 rounded-full' 
        style={{ marginLeft: '20px' }} 
        onClick={handleSearch}>
                    🔎︎
                    </button> */}
      </nav>
      <div className="overflow-x-auto rounded-md shadow-xl bg-opacity-50">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-green-500 text-center text-white">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b" >Patient ID</th>
              <th className="px-4 py-2 border-b">Doctor ID</th>
              <th className="px-4 py-2 boarder-b">Appointment Date</th>
              <th className="px-4 py-2 boarder-b">Update</th>
              <th className="px-4 py-2 boarder-b">Delete</th>
            </tr>
          </thead>
          <tbody>
            {handleSearch().map((appointment, index) => (
              <tr key={index} className="text-black-900 text-center ">
                <td className="px-4 py-2 border-b">{appointment.id}</td>
                <td className="px-4 py-2 border-b">{appointment.patient_id}</td>
                <td className="px-4 py-2 border-b">{appointment.doctor_id}</td>
                <td className="px-4 py-2 border-b">{appointment.date}</td> 
                
                <td className="px-4 py-2 border-b"><button onClick={()=>patchAppointment(appointment.id)}>
                  ✎
                  </button>
                  </td>
                <td className="px-4 py-2 border-b"><button onClick={()=>HandleDelete(appointment.id)}>
                  🚮
                  </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button 
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    onClick={Home}
                    type="submit"
                    style={{ marginLeft: '300px' }}
                >
                  🏠 
        </button>
      </div>
    </div>
  );
}

export default DrFixedApts;
