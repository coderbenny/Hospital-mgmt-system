import logo from './logo.svg';
import './App.css';
import DoctorView from './components/DoctorView';
import DoctorUpdate from './components/DoctorUpdate';
import DoctorReg from './components/DoctorReg';

function App() {
  return (
    <div className="">
      <h1 className='font-bold text-2xl text-center'>Hospital Management System</h1>
      <DoctorView/>
      {/* <DoctorUpdate/>  */}
      {/* <DoctorReg/> */}
    </div>
  );
}

export default App;


// MVPs

// Doctor/Patient Login
// Appointment booking - Patient
// Appointment management (deleting etc) - Doctor