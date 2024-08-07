import React, { useState } from 'react'
import Form from '../Components/Form.jsx'

const Home = () => {
  const [isFormVisible , setIsFormVisible] = useState(false)

  const controlFormVisibility = (control) => {
    setIsFormVisible(!control)
  }

  return (
    <div className='home relative h-fit p-4'>
      <div className="taskbar">
        <button onClick={() => controlFormVisibility()}>New Invoice</button>
      </div>
        {isFormVisible && <Form controlFormVisibility={controlFormVisibility} isFormVisible={isFormVisible}/>}
        <h1>Home Page</h1>
    </div>
  )
}

export default Home


