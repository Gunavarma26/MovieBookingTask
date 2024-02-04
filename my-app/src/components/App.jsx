import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import MoveApp from './MoveApp'
import SignUp from './Signup'

function App() {


let [signName, setSignName] =useState('')
let [signPassword, setSignPassword] =useState('')


  return (
   <div>
    <Routes>
      <Route path='/' element={ <Login signName={signName}  signPassword={signPassword}/>} />
      <Route path='/signup' element={ <SignUp  setSignName={setSignName}  setSignPassword={setSignPassword} />} />
      <Route path='/move' element={ <MoveApp/>} />
     
    </Routes>
   </div>
  )
}

export default App
