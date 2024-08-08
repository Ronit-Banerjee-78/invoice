import React, { useState } from 'react'
import Form from '../Components/Form.jsx'
import { FaPlus } from "react-icons/fa";

const Home = () => {
  const [isFormVisible, setIsFormVisible] = useState(false)

  const controlFormVisibility = () => {
    setIsFormVisible(prevState => !prevState)
  }

  return (
    <div className='home relative p-4'>
      <div className="taskbar border-2 border-solid border-black w-full p-4 flex items-center justify-between">
        <div>
          <h1 className="title font-bold text-xl md:text-2xl lg:text-3xl tracking-wider">Invoices</h1>
          <p>There are 7 total Invoices</p>
        </div>

        <div className="actions">
          <div className="filters">

          </div>
          <button className={`addInvoice flex items-center justify-center px-4 py-3 font-semibold rounded-full text-base tracking-widest ${isFormVisible ? 'cursor-not-allowed' : 'cursor-pointer'} `} disabled={isFormVisible} onClick={controlFormVisibility}>
            <FaPlus className='mr-2' />
            New Invoice
          </button>
        </div>
      </div>
      {isFormVisible && <Form controlFormVisibility={controlFormVisibility} isFormVisible={isFormVisible} />}
      <h1>Home Page</h1>
    </div>
  )
}

export default Home
