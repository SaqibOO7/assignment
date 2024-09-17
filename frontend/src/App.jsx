import React from "react"
import { Toaster } from 'react-hot-toast'
import Home from "./pages/home/Home"
import NewSheet from "./pages/newJobSheet/NewSheet"
import ViewSheet from "./pages/view/ViewSheet"
import { Route, Routes } from "react-router-dom"
import Edit from "./pages/edit/Edit"


function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/view/:id" element={<ViewSheet/>}/>
        <Route path="/edit/:id" element={<Edit/>} />
        <Route path="/newjob" element={<NewSheet/>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
