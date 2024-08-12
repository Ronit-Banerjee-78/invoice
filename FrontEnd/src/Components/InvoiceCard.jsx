import React from 'react'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { NavLink } from 'react-router-dom';


const InvoiceCard = ({invoice}) => {
    const {_id , client , organization , items , invoiceDate , paymentTerms , status} = invoice
    const {name, steetAddress , city , postCode , country} = client

    const itemsTotal = items.map((item) => item.total)

    function calculateTotalAmount(accumulator,value){
        return accumulator + value
    }
    const totalAmount = itemsTotal.reduce(calculateTotalAmount,0)

   function calculateDueDate(invoiceDate, paymentTerms) {
    const date = new Date(invoiceDate);

    let daysToAdd = 0;
    if (paymentTerms === 'Net 30 Days') {
        daysToAdd = 30;
    } else if (paymentTerms === 'Net 60 Days') {
        daysToAdd = 60;
    } else if (paymentTerms === 'Net 90 Days') {
        daysToAdd = 90;
    }

    date.setDate(date.getDate() + daysToAdd);

    const day = date.getDate();
    const monthName = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    return `${day} ${monthName} ${year}`;
}
const dueDate = calculateDueDate(invoiceDate, paymentTerms);


const trimId = _id.substr(-5)


  return (
    <section className='invoiceCard font-semibold tracking-wider text-base rounded-lg flex items-center justify-around shadow-lg p-8 my-8'>
        <p className='uppercase'>#{trimId}</p>
        <p>Due {dueDate}</p>
        <p className='capitalize'>{name}</p>
        <p className='text-xl font-bold'>${totalAmount}</p>
        <p className={`flex items-center justify-center
            ${status === 'Pending' ? 'bg-yellow-300 text-yellow-600' : ''}
            ${status === 'Paid' ? 'text-green-600 bg-green-300' : ''}
            ${status === 'Draft' ? 'bg-gray-500 text-gray-100' : ''}
         px-4 py-2 rounded-md`}>
            <GoDotFill size={18} />{status}
        </p>
        <NavLink to={`/${_id}`}>
            <button className='invoiceCardButton'><IoIosArrowDroprightCircle  size={32} /></button>
        </NavLink>
    </section>
  )
}

export default InvoiceCard
