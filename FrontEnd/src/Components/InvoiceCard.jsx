import React from 'react'
import { IoIosArrowForward } from "react-icons/io";

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
    <section className='invoice-card '>
        <p>#{trimId}</p>
        <p>Due {dueDate}</p>
        <p>{name}</p>
        <p>${totalAmount}</p>
        <p className=''>{status}</p>
        <button><IoIosArrowForward /></button>
    </section>
  )
}

export default InvoiceCard
