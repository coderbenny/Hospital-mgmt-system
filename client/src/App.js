import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"


function App() {
  return (
    <div className=''>
        <BrowserRouter>
            <h1 className='text-center font-bold text-2xl tracking-wide'>Hospital Management System</h1>
            <Routes>
                <Route path="/doctor_view"></Route>
                <Route path="/doctor_registration"></Route>
                <Route path="/doctor_update"></Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;