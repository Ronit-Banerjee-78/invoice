import React, { useState } from 'react'
import Form from '../Components/Form.jsx'
import { FaPlus } from "react-icons/fa";
import { InvoicesApi } from '../Redux/ApiSlice.js';
import InvoiceList from '../Components/InvoiceList.jsx';

const Home = () => {
  const [isFormVisible, setIsFormVisible] = useState(false)


  const controlFormVisibility = () => {
    setIsFormVisible(prevState => !prevState)
  }

  return (
    <div className='home relative p-4'>
      <div className="taskbar w-full p-4 flex items-center justify-between">
        <div>
          <h1 className="title font-bold text-xl md:text-2xl lg:text-3xl tracking-wider">Invoices</h1>
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
      <InvoiceList/>
    </div>
  )
}

export default Home
